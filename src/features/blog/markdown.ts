import { Marked, type Tokens } from "marked";

/**
 * Markdown de los artículos → HTML (mismo resultado en el prerender y en el navegador).
 * Seguridad: el HTML incrustado se muestra como texto y solo se admiten enlaces http(s), mailto, internos y anclas.
 * SEO: un único <h1> (el título de la página): los "#" del contenido bajan a <h2>; cada encabezado lleva id para el índice.
 */

export interface Heading {
  id: string;
  text: string;
  level: number;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/** "¿Qué es PIM?" → "que-es-pim" */
export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const SAFE_URL = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;

export const renderMarkdown = (markdown: string): { html: string; headings: Heading[] } => {
  const headings: Heading[] = [];
  const used = new Map<string, number>();

  const marked = new Marked({
    gfm: true,
    renderer: {
      html: ({ text }: Tokens.HTML | Tokens.Tag) => escapeHtml(text),
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const level = Math.min(Math.max(depth, 2), 4);
        const text = inner.replace(/<[^>]+>/g, "");
        let id = slugify(text) || "seccion";
        const count = used.get(id) ?? 0;
        used.set(id, count + 1);
        if (count) id = `${id}-${count + 1}`;
        headings.push({ id, text, level });
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        if (!SAFE_URL.test(href)) return inner;
        const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?nexoid\.es/i.test(href);
        // Documentación oficial de Microsoft: la página la abre en un modal con el resumen (el título del enlace)
        const official = /^https:\/\/learn\.microsoft\.com\//i.test(href);
        const attrs = (external ? ' target="_blank" rel="noopener noreferrer"' : "") + (official ? ' class="doc_link" data-doc="microsoft"' : "");
        return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ""}${attrs}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        if (!/^(https:\/\/|\/(?!\/))/i.test(href)) return escapeHtml(text);
        return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ""} loading="lazy" decoding="async">`;
      },
      code({ text, lang }: Tokens.Code) {
        const language = (lang ?? "").match(/^[a-z0-9+#-]+/i)?.[0] ?? "";
        return `<pre class="post_code"${language ? ` data-lang="${language}"` : ""}><code${language ? ` class="language-${language}"` : ""}>${escapeHtml(text)}</code></pre>\n`;
      },
    },
  });

  const html = (marked.parse(markdown, { async: false }) as string)
    // Tablas con desplazamiento horizontal propio en móvil
    .replace(/<table>/g, '<div class="post_table" tabindex="0"><table>')
    .replace(/<\/table>/g, "</table></div>");

  return { html, headings };
};
