import type { CSSProperties, ElementType, ReactNode } from "react";
import Icon, { type IconName } from "./Icon";
import "./featureCard.css";

interface FeatureCardProps {
  icon: IconName;
  title: ReactNode;
  description?: ReactNode;
  /** Etiqueta pequeña junto al icono (p. ej. "Auditoría") */
  tag?: string;
  /** "column": icono arriba · "row": icono a la izquierda (tarjeta compacta) */
  layout?: "column" | "row";
  /** Elemento raíz: "article" para contenido, "li" dentro de listas */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Contenido extra al pie de la tarjeta */
  children?: ReactNode;
}

/** Tarjeta reutilizable con icono, título, texto y pie opcional. */
const FeatureCard = ({
  icon,
  title,
  description,
  tag,
  layout = "column",
  as: Root = "article",
  className = "",
  style,
  children,
}: FeatureCardProps) => (
  <Root
    className={`feature_card feature_card_${layout} card spotlight reveal ${className}`.trim()}
    style={style}
  >
    <div className="feature_card_head">
      <span className="icon_box">
        <Icon name={icon} />
      </span>
      {tag && <span className="feature_card_tag mono">{tag}</span>}
    </div>
    {layout === "row" ? <span className="feature_card_title">{title}</span> : <h3>{title}</h3>}
    {description && <p>{description}</p>}
    {children && <div className="feature_card_footer">{children}</div>}
  </Root>
);

export default FeatureCard;
