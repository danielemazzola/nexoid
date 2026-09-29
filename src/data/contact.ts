/**
 * Opciones del formulario de contacto.
 * ⚠️ Los "id" deben coincidir con BACKEND/src/shared/topics.ts.
 */
export const contactTopics = [
  { id: "auditoria", label: "Auditoría de Microsoft Entra ID" },
  { id: "consultoria", label: "Consultoría especializada" },
  { id: "automatizacion", label: "Automatización con PowerShell y Graph" },
  { id: "mfa-acceso-condicional", label: "MFA y acceso condicional" },
  { id: "pim-privilegios", label: "PIM y cuentas privilegiadas" },
  { id: "identidad-hibrida", label: "Identidad híbrida / Entra Connect" },
  { id: "incidencia", label: "Resolver una incidencia" },
  { id: "otro", label: "Otra consulta" },
] as const;

export type ContactTopicId = (typeof contactTopics)[number]["id"];
