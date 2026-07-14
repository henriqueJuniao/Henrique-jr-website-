import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const ALLOWED_ORIGINS = [
  "https://henriquejr.com",
  "https://www.henriquejr.com",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phone, service, message, _honey } = req.body ?? {};

  // Honeypot check
  if (_honey) {
    return res.status(200).json({ success: true });
  }

  // Validation
  if (!name || !email || !service || !message) {
    return res.status(400).json({ success: false, message: "Please fill in all required fields." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Please provide a valid email address." });
  }

  // Rate limiting via simple timestamp check (basic protection)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlBody = `
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:system-ui,-apple-system,sans-serif;">
      <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:600;width:120px;">Name</td><td style="padding:12px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:600;">Email</td><td style="padding:12px;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:600;">Phone</td><td style="padding:12px;border-bottom:1px solid #eee;">${escapeHtml(phone)}</td></tr>` : ""}
      <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:600;">Service</td><td style="padding:12px;border-bottom:1px solid #eee;">${escapeHtml(service)}</td></tr>
      <tr><td style="padding:12px;font-weight:600;vertical-align:top;">Message</td><td style="padding:12px;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: `"HenriqueJR Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Consultation Request: ${service} — ${name}`,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ success: false, message: "Unable to send. Please try again." });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
