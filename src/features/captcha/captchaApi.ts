import { ENV } from "../../config/env";

export interface CaptchaChallenge {
  token: string;
  nonce: string;
  difficulty: number;
  expiresAt: number;
}

export interface CaptchaAnswer {
  token: string;
  solution: number;
}

export const fetchChallenge = async (): Promise<CaptchaChallenge> => {
  const response = await fetch(`${ENV.API_URL}/api/captcha`, { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudo obtener el reto");
  return response.json();
};

/** Resuelve el reto en un Web Worker. `onProgress` recibe valores de 0 a 1. */
export const solveChallenge = (challenge: CaptchaChallenge, onProgress: (value: number) => void) =>
  new Promise<CaptchaAnswer>((resolve, reject) => {
    const worker = new Worker(new URL("./pow.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (event: MessageEvent<{ type: "progress" | "done"; value?: number; solution?: number }>) => {
      if (event.data.type === "progress") onProgress(event.data.value ?? 0);
      if (event.data.type === "done") {
        worker.terminate();
        resolve({ token: challenge.token, solution: event.data.solution ?? 0 });
      }
    };
    worker.onerror = (error) => {
      worker.terminate();
      reject(error);
    };
    worker.postMessage({ nonce: challenge.nonce, difficulty: challenge.difficulty });
  });
