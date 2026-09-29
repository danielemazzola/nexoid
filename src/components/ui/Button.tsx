import { Link } from "react-router-dom";
import Icon from "./Icon";
import "./button.css";

/**
 * Botón/enlace. Rutas internas usan <Link>; externas (http, mailto) usan <a>.
 * variant: "primary" | "ghost"
 */
interface ButtonProps {
  value: string;
  href: string;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  value,
  href,
  variant = "primary",
  arrow = true,
  className = "",
  onClick,
}: ButtonProps) => {
  const classes = `btn btn_${variant} ${className}`.trim();
  const content = (
    <>
      <span>{value}</span>
      {arrow && <Icon name="arrow" size={18} className="btn_arrow" />}
    </>
  );

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} to={href} onClick={onClick}>
      {content}
    </Link>
  );
};

export default Button;
