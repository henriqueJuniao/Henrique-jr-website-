/** Editorial Discipline: Contact page is a restrained, accessible enquiry form using only supplied field labels, services, and CTA language. */
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { SectionLabel } from "@/components/Editorial";
import { trackConversion } from "@/lib/analytics";

const FORM_ENDPOINT = "/api/contact";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type FormSubmitResponse = {
  success?: boolean | string;
};

export default function Contact() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionStatus === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      _honey: String(formData.get("_honey") ?? ""),
    };

    setSubmissionStatus("submitting");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as FormSubmitResponse | null;
      const submissionFailed = result?.success === false || result?.success === "false";

      if (!response.ok || submissionFailed) {
        throw new Error("The consultation request could not be sent.");
      }

      form.reset();
      setSubmissionStatus("success");
      trackConversion("contact_form_submit");
    } catch {
      setSubmissionStatus("error");
    }
  }

  const isSubmitting = submissionStatus === "submitting";

  return (
    <SiteLayout>
      <section className="contact-page">
        <div className="contact-page__heading">
          <SectionLabel index="01">Contact</SectionLabel>
          <h1>Contact HenriqueJR</h1>
          <p>Request a Consultation</p>
        </div>

        <form
          className="contact-form"
          action="/api/contact"
          method="POST"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >

          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="company-website">Leave this field empty</label>
            <input
              id="company-website"
              name="_honey"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone <span>(optional)</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="form-field">
            <label htmlFor="service">Service</label>
            <select id="service" name="service" defaultValue="" required>
              <option value="" disabled>Service</option>
              <option value="Private Coaching">Private Coaching</option>
              <option value="Corporate Programmes">Corporate Programmes</option>
              <option value="Kids Coaching">Kids Coaching</option>
              <option value="Seminars">Seminars</option>
            </select>
          </div>
          <div className="form-field form-field--full">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={7} required />
          </div>

          {submissionStatus === "success" && (
            <div className="contact-form__status contact-form__status--success" role="status">
              <span>Request received</span>
              <p>Thank you. Your consultation request has been sent. I’ll be in touch personally.</p>
            </div>
          )}

          {submissionStatus === "error" && (
            <div className="contact-form__status contact-form__status--error" role="alert">
              <span>Unable to send</span>
              <p>Please try again. If the problem continues, contact hello@henriquejr.com directly.</p>
            </div>
          )}

          <button
            type="submit"
            className="button button--dark contact-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Request a Consultation"}
            <ArrowUpRight aria-hidden="true" size={18} />
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
