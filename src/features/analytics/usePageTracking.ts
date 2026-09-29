import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useConsent } from "../consent/ConsentContext";
import { trackPageView } from "./tracker";

/** Registra una visita en cada cambio de ruta. */
const usePageTracking = () => {
  const { pathname } = useLocation();
  const { consent } = useConsent();
  const analytics = consent?.analytics ?? false;
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Evita dobles registros (StrictMode en desarrollo, re-renders por cambio de consentimiento)
    if (lastTracked.current === pathname) return;

    // Espera a que la página actualice su <title>
    const id = window.setTimeout(() => {
      lastTracked.current = pathname;
      trackPageView(pathname, analytics);
    }, 50);
    return () => window.clearTimeout(id);
  }, [pathname, analytics]);
};

export default usePageTracking;
