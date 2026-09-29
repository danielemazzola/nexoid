# NexoID · Web

Web corporativa de NexoID (especialistas en Microsoft Entra ID).
Stack: **React 19 · TypeScript · Vite · React Router**. Desplegada en Vercel.

## Puesta en marcha

```bash
npm install
cp .env.example .env        # en Windows: copy .env.example .env
npm run dev                 # http://localhost:3000
```

Necesita el backend (`BACKEND/`) en marcha en `VITE_API_URL` para el formulario de contacto, la analítica y el registro de consentimientos.

## Scripts

| Script              | Descripción                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Servidor de desarrollo               |
| `npm run build`     | Comprobación de tipos + build        |
| `npm run lint`      | ESLint (TypeScript + React Hooks)    |
| `npm run typecheck` | Solo comprobación de tipos           |
| `npm run preview`   | Sirve el build localmente            |

## Estructura

```
src/
  data/          Todo el contenido editable (textos, SEO, cookies, temas de contacto)
  pages/         Páginas (una por ruta) y páginas legales
  components/    Layout (header, footer…), secciones y UI reutilizable
  features/      Lógica por dominio: contacto, captcha, consentimiento, analítica, SEO
  services/      Cliente HTTP y envío de eventos (beacon)
```

- Temas del formulario: `src/data/contact.ts` debe coincidir con `BACKEND/src/shared/topics.ts`.
- Si cambias rutas, actualiza `public/sitemap.xml`.
- Si añades una cookie, regístrala en `src/data/cookies.ts` (y sube `CONSENT_VERSION` si cambian las finalidades).

## Despliegue (Vercel)

Variable de entorno: `VITE_API_URL` = URL pública del backend (sin barra final).
