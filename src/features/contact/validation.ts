/**
 * Validaciones de contacto compartidas por el formulario y el asistente del avatar.
 * El backend vuelve a validar siempre (BACKEND/src/modules/contact/contact.schema.ts).
 * Cada función devuelve el mensaje de error o null si es válido.
 */

export const validateName = (value: string) => (value.trim().length < 2 ? "Indica el nombre del responsable" : null);

export const validateCompany = (value: string) => (value.trim().length < 2 ? "Indica la empresa" : null);

export const validateEmail = (value: string) => (/^\S+@\S+\.\S+$/.test(value.trim()) ? null : "Introduce un email válido");

export const validatePhone = (value: string) => (/^[+()\d\s.-]{9,30}$/.test(value.trim()) ? null : "Introduce un teléfono válido");

/** Primer nombre con mayúscula inicial ("jose daniele" → "Jose"). */
export const firstName = (fullName: string) => {
  const first = fullName.trim().split(/\s+/)[0] ?? "";
  return first.charAt(0).toLocaleUpperCase("es") + first.slice(1).toLocaleLowerCase("es");
};
