import type { ReactElement } from "react";

import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import { SNAPSHOT as blogPosts } from "../features/blog/blogData";
import Contact from "../pages/Contact";
import LegalNotice from "../pages/legal/LegalNotice";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import CookiesPolicy from "../pages/legal/CookiesPolicy";

export interface SitemapEntry {
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  /** Última modificación (ISO); por defecto, el día del build */
  lastmod?: string;
}

export interface AppRoute {
  path: string;
  element: ReactElement;
  /** null = no aparece en sitemap.xml (p. ej. páginas sin contenido o noindex) */
  sitemap: SitemapEntry | null;
}

/**
 * Única fuente de verdad de las páginas públicas.
 * La usan el router, el prerender (HTML estático por página para SEO) y el sitemap.xml generado al compilar.
 * Para añadir una página: créala en pages/ y añádela aquí.
 */
export const routes: AppRoute[] = [
  { path: "/", element: <Home />, sitemap: { priority: 1.0, changefreq: "weekly" } },
  { path: "/servicios", element: <Services />, sitemap: { priority: 0.9, changefreq: "monthly" } },
  { path: "/precios", element: <Pricing />, sitemap: { priority: 0.9, changefreq: "weekly" } },
  { path: "/quienes-somos", element: <About />, sitemap: { priority: 0.7, changefreq: "monthly" } },
  { path: "/contacto", element: <Contact />, sitemap: { priority: 0.8, changefreq: "monthly" } },
  { path: "/blog", element: <Blog />, sitemap: { priority: 0.8, changefreq: "weekly", lastmod: blogPosts[0]?.updatedAt } },
  // Un HTML prerenderizado por artículo publicado (copia del build: scripts/fetch-blog.mjs)
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    element: <BlogPost key={post.slug} slug={post.slug} />,
    sitemap: { priority: 0.7, changefreq: "monthly" as const, lastmod: post.updatedAt },
  })),
  { path: "/legal", element: <LegalNotice />, sitemap: { priority: 0.2, changefreq: "yearly" } },
  { path: "/privacidad", element: <PrivacyPolicy />, sitemap: { priority: 0.2, changefreq: "yearly" } },
  { path: "/cookies", element: <CookiesPolicy />, sitemap: { priority: 0.2, changefreq: "yearly" } },
];
