/** Editorial Discipline: Private Coaching page is exact, sparse, and technically focused, using only assigned photography and brief language. */
import SiteLayout from "@/components/SiteLayout";
import { TestimonialInterlude } from "@/components/Editorial";
import { ConsultationCta, ImageStatement, InternalPageLinks, PageHero, PrinciplesSection } from "@/components/InnerPage";
import { images } from "@/lib/assets";
import { testimonials } from "@/lib/content";

export default function PrivateCoaching() {
  return (
    <SiteLayout>
      <PageHero
        index="01"
        label="Private Coaching"
        title="Private Brazilian Jiu-Jitsu Coaching"
        intro="3rd Degree Roger Gracie Black Belt, Head Coach at Roger Gracie Euston, 3× IBJJF European Champion and 4× British Champion."
        image={images.henriqueJrPrivateCoachingLondon}
        alt="Henrique Jr. making an individual technical correction during private Brazilian Jiu-Jitsu coaching in London"
        imagePosition="center 38%"
      />

      <ImageStatement
        index="02"
        label="Private Coaching"
        title="Individual attention."
        body="Teaching since 2009, he has helped complete beginners, experienced practitioners, business leaders, children and competitors develop through Brazilian Jiu-Jitsu."
        image={images.henriqueJrPrivateBjjTechniqueDemonstration}
        alt="Henrique Jr. demonstrating Brazilian Jiu-Jitsu technique during private coaching"
        reverse
      />

      <TestimonialInterlude testimonial={testimonials[3]} index="Private Coaching" />
      <PrinciplesSection />
      <InternalPageLinks />
      <ConsultationCta />
    </SiteLayout>
  );
}
