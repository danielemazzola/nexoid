import catalog, { euros, type CatalogService } from "../../data/serviceCatalog";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import delay from "../../utils/delay";
import "./serviceCatalog.css";

const contactHref = (service: CatalogService, option: string) =>
  `/contacto?servicio=${service.id}&opcion=${encodeURIComponent(option)}`;

/** Catálogo de servicios con precios: qué incluye cada línea y sus opciones con precio o "a medida". */
const ServiceCatalog = () => (
  <Section id="catalogo" eyebrow={catalog.eyebrow} title={catalog.title} description={catalog.description} align="center" className="service_catalog">
    <nav className="catalog_nav reveal" aria-label="Servicios">
      {catalog.services.map((s) => (
        <a key={s.id} href={`#${s.id}`}>
          {s.name}
        </a>
      ))}
    </nav>

    <div className="catalog_list">
      {catalog.services.map((service, index) => (
        <article key={service.id} id={service.id} className="catalog_item card reveal" style={delay(index * 0.05)} data-section={service.name}>
          <div className="catalog_info">
            <span className="icon_box" aria-hidden="true">
              <Icon name={service.icon} />
            </span>
            <h2>{service.name}</h2>
            <p className="catalog_tagline">{service.tagline}</p>
            <p className="catalog_for">{service.forWhom}</p>
            <h3 className="catalog_includes_title">{catalog.includesTitle}</h3>
            <ul className="check_list catalog_includes">
              {service.includes.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="catalog_prices">
            <ul className="catalog_options">
              {service.options.map((option) => (
                <li key={option.name} className="catalog_option">
                  <div className="catalog_option_text">
                    <strong>{option.name}</strong>
                    <span>{option.detail}</span>
                  </div>
                  <div className="catalog_option_price">
                    {option.price !== undefined ? (
                      <>
                        {option.from && <small>{catalog.from}</small>}
                        <strong>{euros(option.price)}</strong>
                      </>
                    ) : (
                      <strong className="catalog_custom">{catalog.custom}</strong>
                    )}
                  </div>
                  <Button value={catalog.cta} href={contactHref(service, option.name)} variant="ghost" className="catalog_option_cta" />
                </li>
              ))}
            </ul>
            {service.note && <p className="catalog_note">{service.note}</p>}
          </div>
        </article>
      ))}
    </div>
    <p className="catalog_vat">{catalog.vatNote}</p>
  </Section>
);

export default ServiceCatalog;
