import { images, logos } from "./assets";

export const SITE_URL = "https://henriquejr.com";
export const SITE_NAME = "HenriqueJR";
export const DEFAULT_SOCIAL_IMAGE_PATH = images.henriqueJrProfessionalPortraitLondon.src;
export const DEFAULT_SOCIAL_IMAGE_ALT = "Henrique Jr., Brazilian Jiu-Jitsu coach in London";

export type PublicPath =
  | "/"
  | "/about"
  | "/private-coaching"
  | "/corporate"
  | "/kids"
  | "/testimonials"
  | "/contact"
  | "/privacy";

export type SeoPage = {
  path: PublicPath;
  title: string;
  description: string;
  label: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const seoPages: readonly SeoPage[] = [
  {
    path: "/",
    title: "HenriqueJR | Private Brazilian Jiu-Jitsu Coaching London",
    description:
      "Private Brazilian Jiu-Jitsu coaching in London with Henrique Jr., 3rd Degree Roger Gracie Black Belt. Request a consultation for coaching or seminars.",
    label: "Home",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    title: "Henrique Jr. | Brazilian Jiu-Jitsu Coach London",
    description:
      "Meet Henrique Jr., 3rd Degree Roger Gracie Black Belt and Head Coach at Roger Gracie Euston, teaching Brazilian Jiu-Jitsu since 2009.",
    label: "About",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/private-coaching",
    title: "Private Brazilian Jiu-Jitsu Lessons | HenriqueJR",
    description:
      "Explore private Brazilian Jiu-Jitsu lessons in London with Henrique Jr., with technical excellence, individual attention and long-term development.",
    label: "Private Coaching",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/corporate",
    title: "Corporate Brazilian Jiu-Jitsu Programmes | HenriqueJR",
    description:
      "Corporate Brazilian Jiu-Jitsu programmes for law firms, financial institutions and technology companies. Request a consultation with HenriqueJR.",
    label: "Corporate Programmes",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/kids",
    title: "Kids Brazilian Jiu-Jitsu Coaching London | HenriqueJR",
    description:
      "Kids Brazilian Jiu-Jitsu coaching in London with Henrique Jr., built on technical excellence, individual attention and long-term development.",
    label: "Kids Coaching",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/testimonials",
    title: "Reviews & Testimonials | HenriqueJR",
    description:
      "Read testimonials about Henrique Jr.'s Brazilian Jiu-Jitsu coaching, technical skill, leadership and individual attention.",
    label: "Testimonials",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    title: "Contact HenriqueJR | Brazilian Jiu-Jitsu London",
    description:
      "Contact HenriqueJR about private coaching, corporate Brazilian Jiu-Jitsu programmes, kids coaching or seminars in London.",
    label: "Contact",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  {
    path: "/privacy",
    title: "Privacy & Analytics Choices | HenriqueJR",
    description:
      "Read how HenriqueJR handles website enquiries, analytics choices and privacy controls, including how to change cookie preferences.",
    label: "Privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const;

export const seoByPath = Object.fromEntries(
  seoPages.map((page) => [page.path, page]),
) as Record<PublicPath, SeoPage>;

export const notFoundSeo = {
  title: "Page Not Found | HenriqueJR",
  description: "The requested page could not be found.",
  label: "Page Not Found",
} as const;

export function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return path || "/";
}

export function canonicalFor(path: PublicPath): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function schemaFor(path: PublicPath, page: SeoPage) {
  const canonical = canonicalFor(path);
  const personId = `${SITE_URL}/#person`;
  const businessId = `${SITE_URL}/#professional-service`;
  const websiteId = `${SITE_URL}/#website`;
  const pageId = `${canonical}/#webpage`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-GB",
      publisher: { "@id": businessId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Henrique Jr.",
      url: `${SITE_URL}/about`,
      image: absoluteAssetUrl(images.henriqueJrProfessionalPortraitLondon.src),
      jobTitle: "Brazilian Jiu-Jitsu Coach",
      description: "3rd Degree Roger Gracie Black Belt and Head Coach at Roger Gracie Euston.",
      worksFor: {
        "@type": "Organization",
        name: "Roger Gracie Euston",
      },
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": businessId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteAssetUrl(logos.black),
      image: absoluteAssetUrl(DEFAULT_SOCIAL_IMAGE_PATH),
      email: "hello@henriquejr.com",
      founder: { "@id": personId },
      areaServed: {
        "@type": "City",
        name: "London",
      },
    },
    {
      "@type": path === "/contact" ? "ContactPage" : "WebPage",
      "@id": pageId,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "en-GB",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      breadcrumb: path === "/" ? undefined : { "@id": `${canonical}/#breadcrumb` },
    },
  ];

  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.label, item: canonical },
      ],
    });
  }

  const serviceNames: Partial<Record<PublicPath, string>> = {
    "/private-coaching": "Private Brazilian Jiu-Jitsu Coaching",
    "/corporate": "Corporate Brazilian Jiu-Jitsu Programmes",
    "/kids": "Kids Brazilian Jiu-Jitsu Coaching",
  };
  const serviceName = serviceNames[path];
  if (serviceName) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}/#service`,
      name: serviceName,
      url: canonical,
      provider: { "@id": businessId },
      areaServed: { "@type": "City", name: "London" },
    });
  }

  if (path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Why Brazilian Jiu-Jitsu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jiu-Jitsu can build confidence, strength, athleticism and resilience while teaching calm decision-making under pressure.",
          },
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
