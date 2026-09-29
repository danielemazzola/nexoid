import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

interface TagProps {
  children: ReactNode;
  icon?: IconName;
}

/** Etiqueta pequeña en monoespaciada (licencias, temas, categorías). */
const Tag = ({ children, icon }: TagProps) => (
  <span className="tag mono">
    {icon && <Icon name={icon} size={13} />}
    {children}
  </span>
);

export default Tag;
