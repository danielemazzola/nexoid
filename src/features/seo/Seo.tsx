import { useLocation } from "react-router-dom";
import site from "../../data/site";

interface SeoProps {
  title: string;
  description: string;
  /** Ruta canónica; por defecto la actual */
  path?: string;
  /** Evitar indexación (404, páginas legales provisionales…) */
  noindex?: boolean;
  /** Datos estructurados adicionales (schema.org) */
  jsonLd?: object | object[];
  /** Artículo del blog: og:type=article con fechas, sección y etiquetas */
  article?: { publishedTime: string; modifiedTime: string; section: string; tags: string[]; author: string };
  /** Imagen para redes (URL absoluta o ruta de la web); por defecto la genérica */
  image?: string;
}

/**
 * Metadatos por página. React 19 eleva <title>, <meta> y <link> al <head> automáticamente.
 * Bing da mucho peso a title, meta description, canonical y datos estructurados.
 */
const Seo = ({ title, description, path, noindex = false, jsonLd, article, image }: SeoProps) => {
  const { pathname } = useLocation();
  const url = `${site.website}${path ?? pathname}`.replace(/\/$/, "") || site.website;
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const imageUrl = image ? (image.startsWith("/") ? `${site.website}${image}` : image) : `${site.website}/og-image.png`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />

      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={image ? title : `${site.name} · Seguridad en Microsoft Entra ID`} />
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          <meta property="article:author" content={article.author} />
          {article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      <link rel="alternate" type="application/rss+xml" title={`Blog de ${site.name}`} href={`${site.website}/blog/rss.xml`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </>
  );
};

export default Seo;
