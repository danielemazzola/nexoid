import pricing from "../data/pricing";
import PageHero from "../components/ui/PageHero";
import Faq from "../components/sections/Faq";
import CtaBanner from "../components/sections/CtaBanner";
import PricingPlans from "../features/pricing/PricingPlans";
import PlanComparison from "../features/pricing/PlanComparison";
import Seo from "../features/seo/Seo";
import { breadcrumbJsonLd, faqJsonLd } from "../features/seo/schema";
import seo from "../data/seo";

/** Planes y precios: packs (editables en el portal), comparativa completa y preguntas sobre licencias. */
const Pricing = () => (
  <>
    <Seo {...seo.pricing} path="/precios" jsonLd={[faqJsonLd(pricing.faq), breadcrumbJsonLd("Planes y precios", "/precios")]} />
    <PageHero
      eyebrow="Planes y precios"
      title={
        <>
          Seguridad de Microsoft Entra ID <span className="text-gradient">a la medida de tu empresa</span>.
        </>
      }
      description={pricing.heroDescription}
    />
    <PricingPlans />
    <PlanComparison />
    <Faq eyebrow="Licencias" title="Preguntas sobre los planes" items={pricing.faq} />
    <CtaBanner />
  </>
);

export default Pricing;
