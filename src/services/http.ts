import { ENV } from "../config/env";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: { field: string; message: string }[],
  ) {
    super(message);
  }
}

/** POST JSON a la API con manejo de errores homogéneo. */
export const postJson = async <T>(endpoint: string, payload: unknown): Promise<T> => {
  if (!ENV.API_URL) throw new ApiError(0, "La API no está configurada (VITE_API_URL).");

  let response: Response;
  try {
    response = await fetch(`${ENV.API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError(0, "No hemos podido conectar con el servidor. Revisa tu conexión.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(response.status, data.error ?? "Error inesperado", data.details);
  return data as T;
};
