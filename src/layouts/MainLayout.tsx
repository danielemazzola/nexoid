import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import FloatingContact from "../components/layout/floating-contact/FloatingContact";
import useReveal from "../hooks/useReveal";
import useSpotlight from "../hooks/useSpotlight";
import CookieBanner from "../features/consent/CookieBanner";
import usePageTracking from "../features/analytics/usePageTracking";

import "./mainLayout.css";

const MainLayout = () => {
  const { pathname } = useLocation();

  // Al cambiar de página, vuelve arriba
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useReveal(pathname);
  useSpotlight();
  usePageTracking();

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop_grid" />
        <div className="backdrop_glow backdrop_glow_1" />
        <div className="backdrop_glow backdrop_glow_2" />
        <div className="backdrop_noise" />
      </div>

      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
      <FloatingContact />
      <CookieBanner />
    </>
  );
};

export default MainLayout;
