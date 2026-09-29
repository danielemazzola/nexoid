import type { CSSProperties } from "react";

/** Retardo escalonado para la animación .reveal (en segundos). */
const delay = (seconds: number): CSSProperties => ({ "--delay": `${seconds}s` }) as CSSProperties;

export default delay;
