import type { ElementType, ReactNode } from "react";
import "./section.css";

interface SectionProps {
  id?: string;
  as?: ElementType;
  eyebrow?: string | null;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

/**
 * Sección genérica con cabecera (eyebrow + título + descripción).
 * align: "left" | "center"
 */
const Section = ({
  id,
  as: Target = "h2",
  eyebrow = null,
  title,
  description = null,
  align = "left",
  className = "",
  children,
}: SectionProps) => {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">
        {title && (
          <header className={`section_head section_head_${align} reveal`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <Target>{title}</Target>
            {description && <p>{description}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
