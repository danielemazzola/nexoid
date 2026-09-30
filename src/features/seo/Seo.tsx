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
}

/**
 * Metadatos por página. React 19 eleva <title>, <meta> y <link> al <head> automáticamente.
 * Bing da mucho peso a title, meta description, canonical y datos estructurados.
 */
const Seo = ({ title, description, path, noindex = false, jsonLd }: SeoProps) => {
  const { pathname } = useLocation();
  const url = `${site.website}${path ?? pathname}`.replace(/\/$/, "") || site.website;
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.website}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name} · Seguridad en Microsoft Entra ID`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${site.website}/og-image.png`} />

      {(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </>
  );
};

export default Seo;
