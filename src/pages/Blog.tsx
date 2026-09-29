import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Tag from "../components/ui/Tag";
import Seo from "../features/seo/Seo";
import { breadcrumbJsonLd } from "../features/seo/schema";
import seo from "../data/seo";
import "./pages.css";

const topics = ["Microsoft Entra ID", "MFA", "Acceso condicional", "PIM", "PowerShell", "Microsoft Graph"];

const Blog = () => (
  <>
    <Seo {...seo.blog} jsonLd={breadcrumbJsonLd("Blog", "/blog")} />
    <PageHero
      eyebrow="Blog"
      title={
        <>
          Artículos sobre <span className="text-gradient">identidad digital</span>.
        </>
      }
      description="Guías prácticas, buenas prácticas y casos reales sobre seguridad en Microsoft Entra ID y Microsoft 365."
    />
    <section className="section">
      <div className="container">
        <div className="placeholder card reveal">
          <span className="icon_box">
            <Icon name="clock" />
          </span>
          <h2>Próximamente</h2>
          <p>Estamos preparando los primeros artículos. Estos serán algunos de los temas:</p>
          <ul className="topics">
            {topics.map((topic) => (
              <li key={topic}>
                <Tag>{topic}</Tag>
              </li>
            ))}
          </ul>
          <Button value="Contactar" href="/contacto" variant="ghost" />
        </div>
      </div>
    </section>
  </>
);

export default Blog;
