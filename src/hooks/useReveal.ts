import { useEffect } from "react";

/**
 * Añade la clase .is-visible a los elementos .reveal cuando entran en pantalla.
 * Se vuelve a ejecutar cada vez que cambia `key` (p. ej. la ruta actual).
 */
const useReveal = (key: unknown) => {
  useEffect(() => {
    const root = document.documentElement;
    const elements = document.querySelectorAll(".reveal:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [key]);
};

export default useReveal;
