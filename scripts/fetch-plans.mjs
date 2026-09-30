/**
 * Antes de compilar: descarga los packs activos de la API (GET /api/plans) y los guarda en
 * src/data/plans.snapshot.json. Así el HTML prerenderizado ya lleva los precios (SEO) y la web
 * se pinta sin esperar a la API; en el navegador se actualizan con lo último del portal.
 * Si la API no responde, se conserva la copia anterior y el build sigue.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "src/data/plans.snapshot.json");
const api = (process.env.VITE_API_URL || "https://nexoid-backend.vercel.app").replace(/\/$/, "");

try {
  const response = await fetch(`${api}/api/plans`, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const { items } = await response.json();
  if (!Array.isArray(items) || !items.every((p) => p.code && p.name && Array.isArray(p.features))) {
    throw new Error("respuesta sin el formato esperado");
  }
  await writeFile(file, `${JSON.stringify(items, null, 2)}\n`);
  console.log(`  ✓ packs: ${items.map((p) => p.name).join(", ")}`);
} catch (error) {
  console.warn(`  ⚠ packs: no se pudieron descargar (${error.message}); se usa la copia guardada`);
}
