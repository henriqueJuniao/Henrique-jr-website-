/** Editorial Discipline: every testimonial is unedited long-form reading, separated by whitespace and rules, paired only with relevant supplied coaching photography. */
import type { CSSProperties } from "react";
import SiteLayout from "@/components/SiteLayout";
import { EditorialImage, Reveal, SectionLabel } from "@/components/Editorial";
import { ConsultationCta } from "@/components/InnerPage";
import { images, type ResponsiveImage } from "@/lib/assets";
import { testimonials } from "@/lib/content";

const testimonialImages: readonly { image: ResponsiveImage; alt: string }[] = [
  {
    image: images.henriqueJrCorporateBjjProgramme,
    alt: "Corporate Brazilian Jiu-Jitsu programme event delivered for Steele & Rose",
  },
  {
    image: images.henriqueJrTechnicalBjjInstruction,
    alt: "Henrique Jr. explaining Brazilian Jiu-Jitsu technique to students",
  },
  {
    image: images.rogerGracieEustonBjjCommunity,
    alt: "Roger Gracie Euston Brazilian Jiu-Jitsu community group",
  },
  {
    image: images.henriqueJrPrivateCoachingLondon,
    alt: "Individual technical correction during private Brazilian Jiu-Jitsu coaching",
  },
  {
    image: images.brazilianJiuJitsuClassLondon,
    alt: "Brazilian Jiu-Jitsu students training together in London",
  },
  {
    image: images.henriqueJrBjjSeminarLondon,
    alt: "Henrique Jr. leading a Brazilian Jiu-Jitsu seminar in London",
  },
] as const;

export default function Testimonials() {
  return (
    <SiteLayout>
      <section className="testimonials-hero">
        <SectionLabel index="01">Testimonials</SectionLabel>
        <h1>Reviews &amp; Testimonials</h1>
      </section>

      <section className="testimonials-list" aria-label="Full testimonials">
        {testimonials.map((testimonial, index) => {
          const visual = testimonialImages[index];
          return (
            <article
              key={testimonial.name}
              className={`testimonial-entry${index % 2 ? " testimonial-entry--reverse" : ""}`}
              aria-labelledby={`testimonial-${index}`}
            >
              <Reveal
                className="testimonial-entry__image-wrap"
                style={{ "--image-ratio": `${visual.image.width} / ${visual.image.height}` } as CSSProperties}
              >
                <EditorialImage
                  image={visual.image}
                  alt={visual.alt}
                  className="testimonial-entry__image"
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
              </Reveal>
              <Reveal delay={70} className="testimonial-entry__copy">
                <div className="testimonial-entry__index">{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</div>
                <blockquote>
                  {testimonial.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </blockquote>
                <footer>
                  <strong id={`testimonial-${index}`}>{testimonial.name}</strong>
                  <span>{testimonial.title}</span>
                </footer>
              </Reveal>
            </article>
          );
        })}
      </section>

      <ConsultationCta />
    </SiteLayout>
  );
}
