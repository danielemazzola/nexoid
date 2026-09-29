import Button from "../components/ui/Button";
import Seo from "../features/seo/Seo";
import seo from "../data/seo";
import "./pages.css";

const NotFound = () => (
  <section className="not_found">
    <Seo {...seo.notFound} noindex />
    <div className="container not_found_inner">
      <span className="not_found_code text-gradient">404</span>
      <p className="mono">[WARN] Recurso no encontrado en este tenant.</p>
      <h1>Esta página no existe.</h1>
      <Button value="Volver al inicio" href="/" />
    </div>
  </section>
);

export default NotFound;
