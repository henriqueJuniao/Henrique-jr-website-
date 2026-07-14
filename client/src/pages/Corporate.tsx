/** Editorial Discipline: Corporate page presents Brazilian Jiu-Jitsu expertise first, using the supplied event image and exact brief language without generic executive-coaching copy. */
import SiteLayout from "@/components/SiteLayout";
import { Reveal, SectionLabel, TestimonialInterlude } from "@/components/Editorial";
import { ConsultationCta, InternalPageLinks, PageHero, PrinciplesSection } from "@/components/InnerPage";
import { images } from "@/lib/assets";
import { testimonials } from "@/lib/content";

export default function Corporate() {
  return (
    <SiteLayout>
      <PageHero
        index="01"
        label="Corporate"
        title="Corporate Brazilian Jiu-Jitsu Programmes"
        intro="Corporate clients include law firms, financial institutions, technology companies and professional service firms."
        image={images.henriqueJrCorporateBjjProgramme}
        alt="Steele & Rose outdoor corporate Brazilian Jiu-Jitsu programme with branded banner and mats"
        imagePosition="center 58%"
      />

      <section className="corporate-positioning">
        <Reveal>
          <SectionLabel index="02">Brazilian Jiu-Jitsu</SectionLabel>
        </Reveal>
        <Reveal delay={70}>
          <h2>BJJ is always the core of the brand.</h2>
          <p>Corporate coaching, executive programmes and seminars are applications of this expertise—not the identity itself.</p>
        </Reveal>
      </section>

      <TestimonialInterlude testimonial={testimonials[0]} index="Corporate Programmes" />
      <PrinciplesSection />
      <InternalPageLinks />
      <ConsultationCta />
    </SiteLayout>
  );
}
