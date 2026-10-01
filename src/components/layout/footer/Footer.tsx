import { Link } from "react-router-dom";
import site from "../../../data/site";
import Logo from "../../ui/Logo";
import Icon from "../../ui/Icon";
import { useConsent } from "../../../features/consent/ConsentContext";
import "./footerLayout.css";

const START_YEAR = 2026;

const Footer = () => {
  const { openPreferences } = useConsent();
  const year = new Date().getFullYear();
  const yearRange = year > START_YEAR ? `${START_YEAR}–${year}` : `${year}`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_top">
          <div className="footer_brand">
            <Logo />
            <p>{site.tagline}</p>
            <Link className="footer_mail" to="/contacto">
              <Icon name="mail" size={18} />
              Escríbenos desde el formulario
            </Link>
          </div>

          <div className="footer_cols">
            <div>
              <h4 className="footer_title mono">Navegación</h4>
              <ul>
                {site.navigation.map((item) => (
                  <li key={item.id}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
                <li>
                  <a href={site.clientArea.href}>{site.clientArea.text}</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer_title mono">Legal</h4>
              <ul>
                {site.legal.map((item) => (
                  <li key={item.id}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
                <li>
                  <button type="button" className="footer_link_btn" onClick={openPreferences}>
                    Configurar cookies
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer_title mono">Tecnología</h4>
              <ul>
                {site.stack.map((item) => (
                  <li key={item} className="footer_muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <span>
            © {yearRange} {site.name}. Todos los derechos reservados.
          </span>
          <span className="footer_status mono">
            <i /> Sistemas operativos
          </span>
        </div>
      </div>

      <div className="footer_wordmark" aria-hidden="true">
        NEXOID
      </div>
    </footer>
  );
};

export default Footer;
