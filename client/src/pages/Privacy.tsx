import SiteLayout from "@/components/SiteLayout";
import { SectionLabel } from "@/components/Editorial";

export default function Privacy() {
  return (
    <SiteLayout>
      <article className="privacy-page">
        <header className="privacy-page__header">
          <SectionLabel index="01">Privacy</SectionLabel>
          <h1>Privacy &amp; analytics choices</h1>
          <p>
            This page explains what happens when you send an enquiry and how optional website analytics are controlled.
          </p>
          <span>Last updated 15 July 2026</span>
        </header>

        <div className="privacy-page__content">
          <section aria-labelledby="enquiries-heading">
            <h2 id="enquiries-heading">Enquiries</h2>
            <p>
              When you use the contact form, the site collects the name, email address, optional phone number,
              selected service and message you provide. The details are sent to the HenriqueJR business inbox so
              your enquiry can be answered.
            </p>
            <p>
              Please do not include sensitive personal information in the message. Enquiry emails should be kept
              only for as long as they are needed to respond and manage the resulting professional relationship.
            </p>
          </section>

          <section aria-labelledby="analytics-heading">
            <h2 id="analytics-heading">Optional analytics</h2>
            <p>
              Google Analytics and Microsoft Clarity may be used to understand how the public website performs and
              how visitors use its pages. These services are not loaded unless you select <strong>Accept analytics</strong>.
              Rejecting analytics does not affect access to the website or contact form.
            </p>
            <p>
              If analytics are enabled, the providers may receive information about the pages viewed, device and
              browser characteristics, approximate location derived from an internet address, and interactions with
              the site. HenriqueJR does not use this website setup for advertising personalisation.
            </p>
            <p>
              You can read the providers’ own information at{" "}
              <a href="https://policies.google.com/privacy" rel="external noreferrer">Google Privacy &amp; Terms</a>{" "}
              and{" "}
              <a href="https://privacy.microsoft.com/privacystatement" rel="external noreferrer">Microsoft Privacy</a>.
            </p>
          </section>

          <section aria-labelledby="choices-heading">
            <h2 id="choices-heading">Your choice</h2>
            <p>
              The site stores your analytics choice in your browser so it can be respected on later visits. This
              preference is necessary to remember whether analytics were accepted or rejected; it is not used to
              profile you.
            </p>
            <p>
              Use <strong>Analytics settings</strong> in the footer at any time to review or change the choice. Withdrawing
              consent stops future analytics loading and removes known analytics cookies that this site can access.
              You can also clear this site’s data using your browser controls.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Questions or requests</h2>
            <p>
              For a privacy question, correction or deletion request, email{" "}
              <a href="mailto:hello@henriquejr.com">hello@henriquejr.com</a>.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
