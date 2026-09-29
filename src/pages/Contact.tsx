import company from "../data/company";
import PageHero from "../components/ui/PageHero";
import ContactForm from "../features/contact/ContactForm";
import delay from "../utils/delay";
import Seo from "../features/seo/Seo";
import { breadcrumbJsonLd } from "../features/seo/schema";
import seo from "../data/seo";
import "./pages.css";

const Contact = () => {
  const { process, cta } = company;

  return (
    <>
      <Seo {...seo.contact} jsonLd={breadcrumbJsonLd("Contacto", "/contacto")} />
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Hablemos de tu <span className="text-gradient">identidad digital</span>.
          </>
        }
        description={cta.description}
      />

      <section className="section contact_section">
        <div className="container contact_grid">
          <div className="contact_card card reveal">
            <h2>Solicita tu auditoría</h2>
            <p>Déjanos tus datos y te contactamos personalmente. Recibirás un email de confirmación al momento.</p>
            <ContactForm />
          </div>

          <div className="contact_steps reveal" style={delay(0.1)}>
            <h3 className="mono contact_steps_title">Qué pasa después</h3>
            <ol>
              {process.items.map((step) => (
                <li key={step.id}>
                  <span className="mono">{step.step}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
