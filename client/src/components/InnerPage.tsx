/** Editorial Discipline: inner pages use sparse typographic hierarchy, exact brief language, generous white space, and supplied documentary images. */
import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ResponsiveImage } from "@/lib/assets";
import { EditorialImage, Reveal, SectionLabel, TextLink } from "@/components/Editorial";

export function PageHero({
  index,
  label,
  title,
  intro,
  image,
  alt,
  imagePosition = "center",
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  image: ResponsiveImage;
  alt: string;
  imagePosition?: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__content">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
        <Link href="/contact" className="button button--dark">
          Request a Consultation
          <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
      <figure
        className="page-hero__media"
        style={{
          "--image-ratio": `${image.width} / ${image.height}`,
          "--image-position": imagePosition,
        } as CSSProperties}
      >
        <EditorialImage
          image={image}
          alt={alt}
          className="page-hero__image"
          sizes="(max-width: 900px) 100vw, 52vw"
          loading="eager"
          fetchPriority="high"
        />
        <span className="page-hero__image-index">HenriqueJR · {index}</span>
      </figure>
    </section>
  );
}

export function PrinciplesSection({ image, alt }: { image?: ResponsiveImage; alt?: string }) {
  return (
    <section className="principles-section">
      <Reveal className="principles-section__heading">
        <SectionLabel index="02">Philosophy</SectionLabel>
        <h2>His philosophy is simple:</h2>
      </Reveal>
      <div className="principles-list">
        {["Technical excellence.", "Individual attention.", "Long-term development."].map((item, index) => (
          <Reveal key={item} delay={index * 60}>
            <div className="principle-row">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </div>
          </Reveal>
        ))}
      </div>
      {image && alt ? (
        <Reveal className="principles-section__image-wrap">
          <EditorialImage
            image={image}
            alt={alt}
            className="editorial-image principles-section__image"
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </Reveal>
      ) : null}
    </section>
  );
}

export function ImageStatement({
  index,
  label,
  title,
  body,
  image,
  alt,
  reverse = false,
  className,
}: {
  index: string;
  label: string;
  title: string;
  body?: string;
  image: ResponsiveImage;
  alt: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <section className={`image-statement${reverse ? " image-statement--reverse" : ""}${className ? ` ${className}` : ""}`}>
      <Reveal
        className="image-statement__media"
        style={{ "--image-ratio": `${image.width} / ${image.height}` } as CSSProperties}
      >
        <EditorialImage
          image={image}
          alt={alt}
          className="image-statement__image"
          sizes="(max-width: 900px) 100vw, 58vw"
        />
      </Reveal>
      <Reveal delay={80} className="image-statement__content">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </Reveal>
    </section>
  );
}

export function InternalPageLinks() {
  return (
    <nav className="internal-links" aria-label="Related pages">
      <Link href="/" className="internal-link"><span>Home</span><ArrowRight aria-hidden="true" size={18} /></Link>
      <Link href="/testimonials" className="internal-link"><span>Testimonials</span><ArrowRight aria-hidden="true" size={18} /></Link>
      <Link href="/contact" className="internal-link"><span>Contact</span><ArrowRight aria-hidden="true" size={18} /></Link>
    </nav>
  );
}

export function ConsultationCta() {
  return (
    <section className="final-cta inner-page-cta">
      <div>
        <span className="eyebrow">Contact</span>
        <h2>Request a Consultation</h2>
      </div>
      <Link href="/contact" className="button button--light">
        Request a Consultation
        <ArrowUpRight aria-hidden="true" size={18} />
      </Link>
    </section>
  );
}

export function TestimonialLink() {
  return <TextLink href="/testimonials">Testimonials</TextLink>;
}
