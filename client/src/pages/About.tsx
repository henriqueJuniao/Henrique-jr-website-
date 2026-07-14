/** Editorial Discipline: About page leads with supplied biography copy, teaching imagery before competition context, and no invented claims. */
import SiteLayout from "@/components/SiteLayout";
import { EditorialImage, Reveal, SectionLabel } from "@/components/Editorial";
import { ConsultationCta, ImageStatement, PrinciplesSection } from "@/components/InnerPage";
import { images } from "@/lib/assets";

export default function About() {
  return (
    <SiteLayout>
      <section className="about-hero">
        <div className="about-hero__copy">
          <SectionLabel index="01">About</SectionLabel>
          <h1>Henrique Jr.</h1>
          <p>Henrique Jr. is a 3rd Degree Roger Gracie Black Belt and Head Coach at Roger Gracie Euston.</p>
          <p>Teaching since 2009, he has helped complete beginners, experienced practitioners, business leaders, children and competitors develop through Brazilian Jiu-Jitsu.</p>
        </div>
        <figure className="about-hero__portrait">
          <EditorialImage
            image={images.henriqueJrRogerGracieBlackBeltPortrait}
            alt="Henrique Jr. wearing a gi in a portrait at Roger Gracie Euston"
            className="about-hero__image"
            sizes="(max-width: 900px) 100vw, 38vw"
            loading="eager"
            fetchPriority="high"
          />
        </figure>
      </section>

      <PrinciplesSection
        image={images.henriqueJrBjjDemonstrationStudents}
        alt="Henrique Jr. demonstrating Brazilian Jiu-Jitsu technique with students at Roger Gracie Euston"
      />

      <ImageStatement
        index="03"
        label="Teaching"
        title="Teaching comes first."
        image={images.henriqueJrLeadingFullClass}
        alt="Henrique Jr. leading a full Brazilian Jiu-Jitsu class as students drill at Roger Gracie Euston"
        className="image-statement--leadership"
      />

      <section className="about-gallery" aria-label="About Henrique Jr. photography">
        <Reveal>
          <EditorialImage
            image={images.henriqueJrWithRogerGracie}
            alt="Henrique Jr. with Roger Gracie at Roger Gracie Jiu Jitsu Moorgate"
            className="about-gallery__image about-gallery__image--roger"
            sizes="(max-width: 600px) 100vw, 52vw"
          />
        </Reveal>
        <Reveal delay={80}>
          <EditorialImage
            image={images.henriqueJrBeltGradingRogerGracieEuston}
            alt="Henrique Jr. tying a blue belt during a belt grading at Roger Gracie Euston"
            className="about-gallery__image about-gallery__image--belt"
            sizes="(max-width: 600px) 100vw, 48vw"
          />
        </Reveal>
      </section>

      <ConsultationCta />
    </SiteLayout>
  );
}
