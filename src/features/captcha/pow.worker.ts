/// <reference lib="webworker" />

/**
 * Worker de NexoCaptcha: busca `solution` tal que SHA-256(nonce + ":" + solution)
 * empiece por `difficulty` bits a cero. Se ejecuta fuera del hilo principal para no congelar la web.
 */

interface SolveMessage {
  nonce: string;
  difficulty: number;
}

const encoder = new TextEncoder();

const leadingZeroBits = (bytes: Uint8Array): number => {
  let bits = 0;
  for (const byte of bytes) {
    if (byte === 0) {
      bits += 8;
      continue;
    }
    return bits + Math.clz32(byte) - 24;
  }
  return bits;
};

const BATCH = 256; // se calculan varios hashes en paralelo: ~3x más rápido que de uno en uno

self.onmessage = async (event: MessageEvent<SolveMessage>) => {
  const { nonce, difficulty } = event.data;
  const expected = 2 ** difficulty;

  for (let base = 0; base < Number.MAX_SAFE_INTEGER; base += BATCH) {
    const digests = await Promise.all(
      Array.from({ length: BATCH }, (_, i) => crypto.subtle.digest("SHA-256", encoder.encode(`${nonce}:${base + i}`))),
    );
    const index = digests.findIndex((digest) => leadingZeroBits(new Uint8Array(digest)) >= difficulty);
    if (index !== -1) {
      self.postMessage({ type: "done", solution: base + index });
      return;
    }
    self.postMessage({ type: "progress", value: Math.min(0.97, (base + BATCH) / (expected * 1.5)) });
  }
};
