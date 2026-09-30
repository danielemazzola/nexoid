import Hero from "../features/home/Hero";
import Stats from "../components/sections/Stats";
import Problems from "../components/sections/Problems";
import ServicesGrid from "../components/sections/ServicesGrid";
import Solutions from "../components/sections/Solutions";
import Sectors from "../components/sections/Sectors";
import Why from "../components/sections/Why";
import Process from "../components/sections/Process";
import Faq from "../components/sections/Faq";
import CtaBanner from "../components/sections/CtaBanner";
import PricingPlans from "../features/pricing/PricingPlans";
import Seo from "../features/seo/Seo";
import { faqJsonLd, servicesJsonLd } from "../features/seo/schema";
import seo from "../data/seo";

const Home = () => (
  <>
    <Seo {...seo.home} path="/" jsonLd={[servicesJsonLd(), faqJsonLd()]} />
    <Hero />
    <Stats />
    <Problems />
    <ServicesGrid />
    <Solutions />
    <Sectors />
    <Why />
    <Process />
    <PricingPlans compact />
    <Faq />
    <CtaBanner />
  </>
);

export default Home;
