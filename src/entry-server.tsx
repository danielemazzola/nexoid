import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./App";
import { routes } from "./routes/routes";

/**
 * Render en Node para el prerender (scripts/prerender.mjs): genera el HTML de cada página
 * en tiempo de compilación para que los buscadores reciban contenido y metadatos reales.
 */
export const render = (url: string): string =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );

export const pages = routes.map(({ path, sitemap }) => ({ path, sitemap }));
