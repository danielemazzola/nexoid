import company from "../../data/company";
import catalog from "../../data/serviceCatalog";
import site from "../../data/site";

/** Generadores de datos estructurados (schema.org · JSON-LD). */

const organizationId = `${site.website}/#organization`;

/** Servicios ofrecidos (catálogo con precios sin IVA), enlazados a la organización. */
export const servicesJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": catalog.services.map((service) => ({
    "@type": "Service",
    "@id": `${site.website}/servicios#${service.id}`,
    name: service.name,
    description: `${service.tagline} ${service.forWhom}`,
    url: `${site.website}/servicios#${service.id}`,
    areaServed: { "@type": "Country", name: "España" },
    availableLanguage: "es",
    provider: { "@id": organizationId },
    offers: service.options
      .filter((option) => "price" in option && option.price !== undefined)
      .map((option) => ({
        "@type": "Offer",
        name: option.name,
        description: option.detail,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          valueAddedTaxIncluded: false,
          ...("from" in option && option.from ? { minPrice: option.price } : { price: option.price }),
        },
      })),
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

/** Migas de pan con varios niveles (Inicio › Blog › Artículo). */
export const breadcrumbTrailJsonLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Inicio", path: "" }, ...trail].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${site.website}${item.path}`,
  })),
});

interface PostForSchema {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorName: string;
  publishedAt: string;
  updatedAt: string;
  coverUrl: string | null;
  readingMinutes: number;
}

const absolute = (url: string) => (url.startsWith("/") ? `${site.website}${url}` : url);

/** Artículo del blog (BlogPosting): autor, editor (NexoID), fechas, imagen y palabras clave. */
export const blogPostingJsonLd = (post: PostForSchema, wordCount: number) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${site.website}/blog/${post.slug}#article`,
  headline: post.title,
  description: post.excerpt,
  url: `${site.website}/blog/${post.slug}`,
  mainEntityOfPage: `${site.website}/blog/${post.slug}`,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  inLanguage: "es-ES",
  articleSection: post.category,
  keywords: post.tags.join(", "),
  wordCount,
  timeRequired: `PT${post.readingMinutes}M`,
  image: absolute(post.coverUrl ?? "/og-image.png"),
  author: { "@type": "Person", name: post.authorName, url: `${site.website}/quienes-somos` },
  publisher: { "@id": organizationId },
  isPartOf: { "@id": `${site.website}/blog#blog` },
});

/** El blog como colección de artículos. */
export const blogJsonLd = (posts: PostForSchema[]) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${site.website}/blog#blog`,
  name: `Blog de ${site.name}`,
  description: "Guías prácticas sobre seguridad en Microsoft Entra ID y Microsoft 365 para pymes.",
  url: `${site.website}/blog`,
  inLanguage: "es-ES",
  publisher: { "@id": organizationId },
  blogPost: posts.slice(0, 20).map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${site.website}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.authorName },
  })),
});
