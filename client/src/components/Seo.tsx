/** Editorial Discipline: technical SEO is route-specific, factual, concise, and derived only from the supplied brief and confirmed contact address. */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { images, logos } from "@/lib/assets";

const SITE_URL = "https://henriquejr.com";

const metadata: Record<string, { title: string; description: string; label: string }> = {
  "/": {
    title: "HenriqueJR | Private Brazilian Jiu-Jitsu Coaching London",
    description: "Private Brazilian Jiu-Jitsu coaching in London with Henrique Jr., 3rd Degree Roger Gracie Black Belt. Request a consultation for coaching or seminars.",
    label: "Home",
  },
  "/about": {
    title: "Henrique Jr. | Brazilian Jiu-Jitsu Coach London",
    description: "Meet Henrique Jr., 3rd Degree Roger Gracie Black Belt and Head Coach at Roger Gracie Euston, teaching Brazilian Jiu-Jitsu since 2009. Learn more today.",
    label: "About",
  },
  "/private-coaching": {
    title: "Private Brazilian Jiu-Jitsu Lessons | HenriqueJR",
    description: "Explore private Brazilian Jiu-Jitsu lessons in London with Henrique Jr., with technical excellence, individual attention and long-term development. Enquire now.",
    label: "Private Coaching",
  },
  "/corporate": {
    title: "Corporate Brazilian Jiu-Jitsu Programmes | HenriqueJR",
    description: "Corporate Brazilian Jiu-Jitsu programmes for law firms, financial institutions and technology companies. Request a consultation with HenriqueJR today.",
    label: "Corporate",
  },
  "/kids": {
    title: "Kids Brazilian Jiu-Jitsu Coaching London | HenriqueJR",
    description: "Kids Brazilian Jiu-Jitsu coaching in London with Henrique Jr., built on technical excellence, individual attention and long-term development. Enquire today.",
    label: "Kids",
  },
  "/testimonials": {
    title: "Reviews & Testimonials | HenriqueJR",
    description: "Read full testimonials about Henrique Jr.'s Brazilian Jiu-Jitsu coaching, technical skill, leadership and individual attention. Explore their experiences today.",
    label: "Testimonials",
  },
  "/contact": {
    title: "Contact HenriqueJR | Brazilian Jiu-Jitsu London",
    description: "Contact HenriqueJR about private coaching, corporate Brazilian Jiu-Jitsu programmes, kids coaching or seminars in London. Request a consultation today.",
    label: "Contact",
  },
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function schemaFor(path: string, label: string) {
  const personId = `${SITE_URL}/#person`;
  const organizationId = `${SITE_URL}/#organization`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "HenriqueJR",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Henrique Jr.",
      url: `${SITE_URL}/about`,
      image: images.henriqueJrProfessionalPortraitLondon.src,
      jobTitle: "Brazilian Jiu-Jitsu Coach",
      description: "3rd Degree Roger Gracie Black Belt and Head Coach at Roger Gracie Euston.",
      worksFor: { "@type": "Organization", name: "Roger Gracie Euston" },
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "HenriqueJR",
      url: SITE_URL,
      logo: logos.black,
      email: "hello@henriquejr.com",
      founder: { "@id": personId },
    },
  ];

  if (path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Why Brazilian Jiu-Jitsu",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jiu-Jitsu has given me so much more than the ability to defend myself. It's built my confidence, made me stronger, more athletic and more resilient. It has taught me how to stay calm under pressure.",
          },
        },
      ],
    });
  }

  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${path}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: label, item: `${SITE_URL}${path}` },
      ],
    });
  }

  const serviceNames: Record<string, string> = {
    "/private-coaching": "Private Coaching",
    "/corporate": "Corporate Programmes",
    "/kids": "Kids Coaching",
  };
  if (serviceNames[path]) {
    graph.push({
      "@type": "Service",
      name: serviceNames[path],
      url: `${SITE_URL}${path}`,
      provider: { "@id": organizationId },
      areaServed: { "@type": "City", name: "London" },
    });
  }

  if (path === "/contact") {
    graph.push({
      "@type": "ProfessionalService",
      name: "HenriqueJR",
      url: SITE_URL,
      email: "hello@henriquejr.com",
      areaServed: { "@type": "City", name: "London" },
      founder: { "@id": personId },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default function Seo() {
  const [location] = useLocation();
  const path = location.split("?")[0].replace(/\/$/, "") || "/";
  const page = metadata[path] ?? metadata["/"];
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  useEffect(() => {
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "HenriqueJR");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", images.henriqueJrProfessionalPortraitLondon.src);
    setMeta("property", "og:image:alt", "Henrique Jr., Brazilian Jiu-Jitsu coach in London");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", images.henriqueJrProfessionalPortraitLondon.src);
    setCanonical(canonical);

    let script = document.head.querySelector<HTMLScriptElement>('script[data-henriquejr-schema="true"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.henriquejrSchema = "true";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaFor(path, page.label));
  }, [canonical, page.description, page.label, page.title, path]);

  return null;
}
