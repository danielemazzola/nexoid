/**
 * Prerender (SEO): tras `vite build` y el build SSR, genera un HTML estático por página con su contenido,
 * <title>, meta description, canonical, Open Graph y datos estructurados. También genera 404.html y sitemap.xml.
 * El navegador recibe la página ya pintada y React toma el control al cargar.
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE = "https://nexoid.es";

const { render, pages } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await readFile(path.join(dist, "index.html"), "utf8");

// Metadatos que React 19 emite dentro del HTML renderizado y que deben ir en <head>
const HEAD_TAG = /<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g;

const buildPage = (url) => {
  const rendered = render(url);
  const headTags = rendered.match(HEAD_TAG) ?? [];
  const body = rendered.replace(HEAD_TAG, "");
  if (!headTags.some((tag) => tag.startsWith("<title>"))) throw new Error(`La página ${url} no define <title> (usa <Seo />)`);

  // data-default: main.tsx los retira al arrancar y React pone los suyos (evita duplicados)
  const head = headTags.map((tag) => tag.replace(/^<(\w+)/, "<$1 data-default")).join("\n    ");

  return template
    .replace(/\s*<(title|meta|link)\b[^>]*\bdata-default\b[^>]*>(?:[^<]*<\/title>)?/g, "") // metadatos genéricos
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
};

const outFile = (url) => (url === "/" ? "index.html" : `${url.slice(1)}.html`);

for (const { path: url } of pages) {
  const file = path.join(dist, outFile(url));
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, buildPage(url));
  console.log(`  ✓ ${url}`);
}

await writeFile(path.join(dist, "404.html"), buildPage("/__404__"));
console.log("  ✓ 404.html");

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((page) => page.sitemap)
  .map(
    ({ path: url, sitemap }) => `  <url>
    <loc>${SITE}${url === "/" ? "" : url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${sitemap.changefreq}</changefreq>
    <priority>${sitemap.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log("  ✓ sitemap.xml");

await rm(ssrDir, { recursive: true, force: true });
