/** Editorial Discipline: Kids Coaching page stays calm and parent-facing through exact brief language and the complete assigned documentary photo sequence. */
import SiteLayout from "@/components/SiteLayout";
import { EditorialImage, Reveal, SectionLabel, TestimonialInterlude } from "@/components/Editorial";
import { ConsultationCta, ImageStatement, InternalPageLinks, PageHero, PrinciplesSection } from "@/components/InnerPage";
import { images } from "@/lib/assets";
import { testimonials } from "@/lib/content";

export default function Kids() {
  return (
    <SiteLayout>
      <PageHero
        index="01"
        label="Kids Coaching"
        title="Kids Brazilian Jiu-Jitsu Coaching London"
        intro="Teaching since 2009, he has helped complete beginners, experienced practitioners, business leaders, children and competitors develop through Brazilian Jiu-Jitsu."
        image={images.teenBrazilianJiuJitsuStudents}
        alt="Teen students smiling together during Brazilian Jiu-Jitsu coaching in London"
        imagePosition="center"
      />

      <ImageStatement
        index="02"
        label="Kids Coaching"
        title="Individual attention."
        image={images.kidsBrazilianJiuJitsuTeamGame}
        alt="Children playing a team game during Brazilian Jiu-Jitsu coaching"
      />

      <section className="kids-page-gallery" aria-labelledby="kids-gallery-heading">
        <div className="kids-page-gallery__heading">
          <SectionLabel index="03">Coaching</SectionLabel>
          <h2 id="kids-gallery-heading">Long-term development.</h2>
        </div>
        <div className="kids-page-gallery__grid">
          <Reveal>
            <EditorialImage
              image={images.henriqueJrCoachingChildrenBjj}
              alt="Henrique Jr. coaching seated children in a Brazilian Jiu-Jitsu class"
              className="kids-page-gallery__image"
            />
          </Reveal>
          <Reveal delay={70}>
            <EditorialImage
              image={images.childBrazilianJiuJitsuExercise}
              alt="A child completing an exercise during Brazilian Jiu-Jitsu coaching"
              className="kids-page-gallery__image"
            />
          </Reveal>
          <Reveal delay={140}>
            <EditorialImage
              image={images.kidsBrazilianJiuJitsuClassCircle}
              alt="Children seated in a circle during a Brazilian Jiu-Jitsu class"
              className="kids-page-gallery__image"
            />
          </Reveal>
        </div>
      </section>

      <TestimonialInterlude testimonial={testimonials[1]} index="Coaching" />
      <PrinciplesSection />
      <InternalPageLinks />
      <ConsultationCta />
    </SiteLayout>
  );
}
