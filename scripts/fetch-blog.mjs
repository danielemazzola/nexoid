/**
 * Antes de compilar: descarga los artículos publicados (con contenido y preguntas respondidas) de
 * GET /api/blog/posts?full=1 y los guarda en src/data/blog.snapshot.json. Con esa copia el prerender genera
 * un HTML por artículo (SEO), el sitemap y el feed RSS. Si la API no responde, se conserva la copia anterior.
 * Al publicar desde el portal, el backend lanza un Deploy Hook de Vercel que vuelve a ejecutar este paso.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "src/data/blog.snapshot.json");
const api = (process.env.VITE_API_URL || "https://nexoid-backend.vercel.app").replace(/\/$/, "");

try {
  const response = await fetch(`${api}/api/blog/posts?full=1`, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const { items } = await response.json();
  if (!Array.isArray(items) || !items.every((p) => p.slug && p.title && typeof p.content === "string")) {
    throw new Error("respuesta sin el formato esperado");
  }
  await writeFile(file, `${JSON.stringify(items, null, 2)}\n`);
  console.log(`  ✓ blog: ${items.length} artículos`);
} catch (error) {
  console.warn(`  ⚠ blog: no se pudieron descargar los artículos (${error.message}); se usa la copia guardada`);
}
