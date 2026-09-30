import { useEffect, useState } from "react";
import { ENV } from "../../config/env";
import snapshot from "../../data/plans.snapshot.json";

/** Pack público tal como lo devuelve GET /api/plans (editable en admin.nexoid.es → Licencias). */
export interface PublicPlan {
  code: string;
  name: string;
  tagline: string | null;
  audience: string | null;
  usage: string | null;
  kind: "trial" | "paid";
  trialDays: number | null;
  priceMonthlyCents: number | null;
  priceYearlyCents: number | null;
  currency: string;
  maxUsers: number | null;
  maxTenants: number;
  highlighted: boolean;
  features: { category: string; label: string; detail: string | null; included: boolean }[];
}

export type Period = "monthly" | "yearly";

const SNAPSHOT = snapshot as PublicPlan[];

/**
 * Packs para pintar: primero la copia del build (así el HTML prerenderizado ya lleva los precios)
 * y, en el navegador, se actualizan con lo último del portal.
 */
export const usePlans = (): PublicPlan[] => {
  const [plans, setPlans] = useState<PublicPlan[]>(SNAPSHOT);

  useEffect(() => {
    if (!ENV.API_URL) return;
    const controller = new AbortController();
    fetch(`${ENV.API_URL}/api/plans`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { items?: PublicPlan[] } | null) => {
        if (Array.isArray(data?.items) && data.items.length) setPlans(data.items);
      })
      .catch(() => {
        /* sin conexión: se queda la copia del build */
      });
    return () => controller.abort();
  }, []);

  return plans;
};

const grouped = { useGrouping: "always" as unknown as boolean }; // "1.290" (es-ES no agrupa 4 cifras por defecto)

/** 4900 → "49 €" · 129000 → "1.290 €" · 4950 → "49,50 €" */
export const money = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency, ...grouped, minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(cents / 100);

export const number = (value: number) => value.toLocaleString("es-ES", grouped);

/** Enlace al formulario con el plan elegido (el formulario prellena tema y mensaje). */
export const contactHref = (plan: PublicPlan, period: Period) =>
  plan.kind === "trial" ? `/contacto?plan=${plan.code}` : `/contacto?plan=${plan.code}&periodo=${period === "yearly" ? "anual" : "mensual"}`;

/** Precio a mostrar según el periodo elegido (si el plan no tiene ese periodo, el otro). */
export const priceFor = (plan: PublicPlan, period: Period) => {
  const yearly = plan.priceYearlyCents;
  const monthly = plan.priceMonthlyCents;
  if (period === "yearly" && yearly !== null) return { cents: yearly, unit: "/año", period: "yearly" as const };
  if (monthly !== null) return { cents: monthly, unit: "/mes", period: "monthly" as const };
  return yearly !== null ? { cents: yearly, unit: "/año", period: "yearly" as const } : null;
};
