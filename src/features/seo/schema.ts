import company from "../../data/company";
import site from "../../data/site";

/** Generadores de datos estructurados (schema.org · JSON-LD). */

const organizationId = `${site.website}/#organization`;

/** Servicios ofrecidos, enlazados a la organización. */
export const servicesJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": company.services.items.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.tag,
    areaServed: { "@type": "Country", name: "España" },
    availableLanguage: "es",
    provider: { "@id": organizationId },
  })),
});

/** Preguntas frecuentes. */
export const faqJsonLd = (items: readonly { question: string; answer: string }[] = company.faq.items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
});

/** Migas de pan de una página interna. */
export const breadcrumbJsonLd = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: site.website },
    { "@type": "ListItem", position: 2, name, item: `${site.website}${path}` },
  ],
});
