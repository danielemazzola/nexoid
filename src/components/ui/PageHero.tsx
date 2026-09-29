import type { ReactNode } from "react";
import delay from "../../utils/delay";
import "./pageHero.css";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Cabecera para las páginas internas. */
const PageHero = ({ eyebrow, title, description, children }: PageHeroProps) => (
  <section className="page_hero">
    <div className="container page_hero_inner">
      <span className="eyebrow reveal">{eyebrow}</span>
      <h1 className="reveal" style={delay(0.06)}>
        {title}
      </h1>
      {description && (
        <p className="reveal" style={delay(0.12)}>
          {description}
        </p>
      )}
      {children && (
        <div className="page_hero_actions reveal" style={delay(0.18)}>
          {children}
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
