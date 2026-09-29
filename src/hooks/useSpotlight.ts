import { useEffect } from "react";

/**
 * Actualiza las variables --mx / --my de cualquier elemento .spotlight
 * bajo el cursor, para el efecto de luz que sigue al ratón.
 */
const useSpotlight = () => {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
};

export default useSpotlight;
