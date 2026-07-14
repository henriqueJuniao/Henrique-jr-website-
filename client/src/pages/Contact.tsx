/** Editorial Discipline: Contact page is a restrained, accessible enquiry form using only supplied field labels, services, and CTA language. */
import type { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { SectionLabel } from "@/components/Editorial";

export default function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = [
      `Name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      `Service: ${data.get("service") ?? ""}`,
      "",
      `${data.get("message") ?? ""}`,
    ].join("\n");
    window.location.href = `mailto:hello@henriquejr.com?subject=${encodeURIComponent("Request a Consultation")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <SiteLayout>
      <section className="contact-page">
        <div className="contact-page__heading">
          <SectionLabel index="01">Contact</SectionLabel>
          <h1>Contact HenriqueJR</h1>
          <p>Request a Consultation</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="button button--dark contact-form__submit">
            Request a Consultation
            <ArrowUpRight aria-hidden="true" size={18} />
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
