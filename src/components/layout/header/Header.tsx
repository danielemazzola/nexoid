import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import site from "../../../data/site";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import "./header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de página
  useEffect(() => setOpen(false), [pathname]);

  // Bloquea el scroll del body con el menú abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "header_scrolled" : ""} ${open ? "header_open" : ""}`}>
      <div className="container header_inner">
        <Link to="/" className="header_logo" aria-label={`${site.name} · Inicio`}>
          <Logo />
        </Link>

        <nav className="header_nav" aria-label="Principal">
          {site.navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `header_link ${isActive ? "header_link_active" : ""}`}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="header_actions">
          <Button value={site.cta.text} href={site.cta.href} arrow={false} className="header_cta" />
          <button
            type="button"
            className="header_toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="header_mobile" aria-hidden={!open}>
        <nav className="container header_mobile_nav" aria-label="Móvil">
          {site.navigation.map((item, index) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${0.05 + index * 0.04}s` : "0s" }}
              className={({ isActive }) =>
                `header_mobile_link ${isActive ? "header_link_active" : ""}`
              }
            >
              <span className="mono">0{index + 1}</span>
              {item.title}
            </NavLink>
          ))}
          <Button value={site.cta.text} href={site.cta.href} className="header_mobile_cta" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
