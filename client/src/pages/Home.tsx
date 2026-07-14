/** Editorial Discipline: asymmetrical white-space composition, documentary photography, exact supplied copy, and testimonials distributed as reading pauses. */
import { Link } from "wouter";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { EditorialImage, Reveal, SectionLabel, TestimonialInterlude, TextLink } from "@/components/Editorial";
import { images } from "@/lib/assets";
import { credentials, services, testimonials } from "@/lib/content";

const serviceVisuals = [
  {
    image: images.henriqueJrPrivateBjjTechniqueDemonstration,
    alt: "Henrique Jr. demonstrating a Brazilian Jiu-Jitsu technique during private coaching",
  },
  {
    image: images.henriqueJrCorporateBjjProgramme,
    alt: "Henrique Jr. delivering a corporate Brazilian Jiu-Jitsu programme",
  },
  {
    image: images.henriqueJrCoachingChildrenBjj,
    alt: "Henrique Jr. coaching children during a Brazilian Jiu-Jitsu class",
  },
  {
    image: images.henriqueJrBjjSeminarLondon,
    alt: "Henrique Jr. leading a Brazilian Jiu-Jitsu seminar in London",
  },
] as const;

export default function Home() {
  return (
    <SiteLayout>
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero__content">
          <div className="home-hero__kicker">
            <span className="gold-rule" aria-hidden="true" />
            <span>Brazilian Jiu-Jitsu Coaching · London</span>
          </div>
          <h1 id="home-heading">Helping people unlock their potential through Brazilian Jiu-Jitsu.</h1>
          <p className="home-hero__intro">
            Private coaching, corporate programmes, seminars and children's coaching delivered by Henrique Jr., 3rd Degree Roger Gracie Black Belt, Head Coach at Roger Gracie Euston, 3× IBJJF European Champion and 4× British Champion.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button button--dark">
              Request a Consultation
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <a href="#coaching" className="button button--text">
              Explore Coaching
              <ArrowDown aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
        <figure className="home-hero__media">
          <EditorialImage
            image={images.henriqueJrMentoringStudent}
            alt="Henrique Jr. mentoring a Brazilian Jiu-Jitsu student at Roger Gracie Euston"
            className="home-hero__image"
            sizes="(max-width: 767px) 100vw, 55vw"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>
            <span>Henrique Jr.</span>
            <span>3rd Degree Roger Gracie Black Belt</span>
          </figcaption>
        </figure>
      </section>

      <section className="credential-rail" aria-label="Henrique Jr. credentials">
        {credentials.map((credential, index) => (
          <div key={credential}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{credential}</p>
          </div>
        ))}
      </section>

      <section className="editorial-section meet-section">
        <Reveal className="editorial-section__rail">
          <SectionLabel index="01">Meet Henrique</SectionLabel>
        </Reveal>
        <div className="meet-section__body">
          <Reveal>
            <h2>Henrique Jr.</h2>
            <p className="lead-copy">Henrique Jr. is a 3rd Degree Roger Gracie Black Belt and Head Coach at Roger Gracie Euston.</p>
            <p>Teaching since 2009, he has helped complete beginners, experienced practitioners, business leaders, children and competitors develop through Brazilian Jiu-Jitsu.</p>
            <TextLink href="/about">About Henrique</TextLink>
          </Reveal>
          <Reveal delay={90} className="meet-section__image-wrap">
            <EditorialImage
              image={images.henriqueJrTechnicalBjjInstruction}
              alt="Henrique Jr. giving technical Brazilian Jiu-Jitsu instruction to students"
              className="editorial-image editorial-image--landscape"
            />
          </Reveal>
        </div>
      </section>

      <TestimonialInterlude testimonial={testimonials[1]} index="01 / 06" />

      <section className="editorial-section why-section">
        <Reveal className="editorial-section__rail">
          <SectionLabel index="02">Why Brazilian Jiu-Jitsu</SectionLabel>
        </Reveal>
        <div className="why-section__body">
          <Reveal className="why-section__statement">
            <h2>Why Brazilian Jiu-Jitsu</h2>
            <blockquote>
              “Jiu-Jitsu has given me so much more than the ability to defend myself. It's built my confidence, made me stronger, more athletic and more resilient. It has taught me how to stay calm under pressure.”
            </blockquote>
            <p>Bijan Dhanani · Property Developer</p>
          </Reveal>
          <Reveal delay={90} className="why-section__mosaic">
            <EditorialImage
              image={images.henriqueJrCoachingBjjStudents}
              alt="Henrique Jr. coaching Brazilian Jiu-Jitsu students during a class"
              className="editorial-image why-section__main-image"
            />
            <EditorialImage
              image={images.rogerGracieEustonBjjCommunity}
              alt="Roger Gracie Euston Brazilian Jiu-Jitsu community group"
              className="editorial-image why-section__secondary-image"
            />
          </Reveal>
        </div>
      </section>

      <TestimonialInterlude testimonial={testimonials[2]} index="02 / 06" />

      <section id="coaching" className="services-section">
        <div className="services-section__heading">
          <SectionLabel index="03">Services</SectionLabel>
          <h2>Coaching</h2>
        </div>
        <div className="services-list">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href} className="service-row">
              <span>{service.index}</span>
              <div className="service-row__image-wrap">
                <EditorialImage
                  image={serviceVisuals[index].image}
                  alt={serviceVisuals[index].alt}
                  className="service-row__image"
                  sizes="(max-width: 600px) 96px, 180px"
                />
              </div>
              <h3>{service.title}</h3>
              <ArrowRight aria-hidden="true" size={24} strokeWidth={1.4} />
            </Link>
          ))}
        </div>
      </section>

      <TestimonialInterlude testimonial={testimonials[3]} index="03 / 06" />

      <section className="service-feature service-feature--private">
        <Reveal className="service-feature__media">
          <EditorialImage
            image={images.henriqueJrPrivateCoachingLondon}
            alt="Henrique Jr. making an individual technical correction during private Brazilian Jiu-Jitsu coaching"
            className="service-feature__image"
          />
        </Reveal>
        <Reveal delay={80} className="service-feature__content">
          <SectionLabel index="04">Individual attention</SectionLabel>
          <h2>Private Coaching</h2>
          <TextLink href="/private-coaching">Explore Private Coaching</TextLink>
        </Reveal>
      </section>

      <TestimonialInterlude testimonial={testimonials[0]} index="04 / 06" />

      <section className="service-feature service-feature--corporate">
        <Reveal className="service-feature__content">
          <SectionLabel index="05">For organisations</SectionLabel>
          <h2>Corporate Programmes</h2>
          <TextLink href="/corporate">Explore Corporate Programmes</TextLink>
        </Reveal>
        <Reveal delay={80} className="service-feature__media">
          <EditorialImage
            image={images.henriqueJrCorporateBjjProgramme}
            alt="Steele & Rose corporate Brazilian Jiu-Jitsu programme event with branded mats"
            className="service-feature__image"
          />
        </Reveal>
      </section>

      <TestimonialInterlude testimonial={testimonials[4]} index="05 / 06" />

      <section className="kids-feature">
        <div className="kids-feature__heading">
          <SectionLabel index="06">Children's coaching</SectionLabel>
          <h2>Kids Coaching</h2>
          <TextLink href="/kids">Explore Kids Coaching</TextLink>
        </div>
        <div className="kids-feature__images">
          <Reveal>
            <EditorialImage
              image={images.teenBrazilianJiuJitsuStudents}
              alt="Teen Brazilian Jiu-Jitsu students smiling together during class"
              className="editorial-image kids-feature__wide"
            />
          </Reveal>
          <Reveal delay={80}>
            <EditorialImage
              image={images.kidsBrazilianJiuJitsuTeamGame}
              alt="Children playing a team game during Brazilian Jiu-Jitsu coaching"
              className="editorial-image kids-feature__wide"
            />
          </Reveal>
        </div>
      </section>

      <TestimonialInterlude testimonial={testimonials[5]} index="06 / 06" />

      <section className="final-cta">
        <div>
          <span className="eyebrow">Start a conversation</span>
          <h2>Request a Consultation</h2>
        </div>
        <Link href="/contact" className="button button--light">
          Request a Consultation
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </SiteLayout>
  );
}
