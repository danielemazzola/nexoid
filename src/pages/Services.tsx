import company from "../data/company";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import ServiceCatalog from "../features/services/ServiceCatalog";
import Solutions from "../components/sections/Solutions";
import Problems from "../components/sections/Problems";
import Process from "../components/sections/Process";
import Faq from "../components/sections/Faq";
import CtaBanner from "../components/sections/CtaBanner";
import Seo from "../features/seo/Seo";
import { breadcrumbJsonLd, faqJsonLd, servicesJsonLd } from "../features/seo/schema";
import seo from "../data/seo";

const Services = () => {
  const { services, hero } = company;

  return (
    <>
      <Seo
        {...seo.services}
        jsonLd={[servicesJsonLd(), faqJsonLd(), breadcrumbJsonLd("Servicios", "/servicios")]}
      />
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Seguridad de identidad, <span className="text-gradient">de principio a fin</span>.
          </>
        }
        description={services.description}
      >
        <Button value={hero.primaryButton.text} href={hero.primaryButton.href} />
      </PageHero>
      <ServiceCatalog />
      <Solutions />
      <Process />
      <Problems />
      <Faq />
      <CtaBanner />
    </>
  );
};

export default Services;
