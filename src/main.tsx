import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
// Fuentes alojadas en nuestro propio dominio (sin peticiones a Google Fonts → RGPD)
import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./styles/global.css";

// Quita los metadatos por defecto de index.html: cada página define los suyos con <Seo />
document.head.querySelectorAll("[data-default]").forEach((element) => element.remove());

// Activa las animaciones de aparición antes del primer render (evita parpadeos)
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
