import { useEffect, useState } from "react";
import { ENV } from "../../config/env";
import { postJson } from "../../services/http";
import snapshot from "../../data/blog.snapshot.json";
import type { CaptchaAnswer } from "../captcha/captchaApi";

export interface BlogQuestion {
  id: string;
  name: string | null;
  question: string;
  answer: string;
  answeredAt: string | null;
  publishedAt: string | null;
}

/** Artículo publicado tal como lo devuelve la API (GET /api/blog/posts/:slug). */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  tags: string[];
  coverUrl: string | null;
  coverAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  publishedQuestions: number;
  questions?: BlogQuestion[];
}

/** Artículos incluidos en el build (prerender, sitemap y RSS). */
export const SNAPSHOT = snapshot as BlogPost[];

const dateFmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Madrid" });
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));

const getJson = async <T>(path: string): Promise<T | null> => {
  if (!ENV.API_URL) return null;
  try {
    const response = await fetch(`${ENV.API_URL}${path}`);
    if (response.status === 404) throw Object.assign(new Error("not-found"), { notFound: true });
    return response.ok ? ((await response.json()) as T) : null;
  } catch (error) {
    if ((error as { notFound?: boolean }).notFound) throw error;
    return null;
  }
};

/** Listado: la copia del build y, en el navegador, lo último publicado. */
export const useBlogPosts = (): BlogPost[] => {
  const [posts, setPosts] = useState<BlogPost[]>(SNAPSHOT);
  useEffect(() => {
    let alive = true;
    getJson<{ items: BlogPost[] }>("/api/blog/posts")
      .then((data) => {
        if (alive && data?.items?.length) setPosts(data.items);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);
  return posts;
};

/**
 * Un artículo: si está en la copia del build se pinta al instante (y coincide con el HTML prerenderizado);
 * después se actualiza desde la API (preguntas nuevas). Si no está (recién publicado), se carga en el navegador.
 */
export const useBlogPost = (slug: string) => {
  const initial = SNAPSHOT.find((p) => p.slug === slug) ?? null;
  const [post, setPost] = useState<BlogPost | null>(initial);
  const [status, setStatus] = useState<"ready" | "loading" | "not-found">(initial ? "ready" : "loading");

  useEffect(() => {
    let alive = true;
    getJson<BlogPost>(`/api/blog/posts/${encodeURIComponent(slug)}`)
      .then((data) => {
        if (!alive) return;
        if (data) {
          setPost(data);
          setStatus("ready");
        } else if (!initial) setStatus("not-found");
      })
      .catch(() => {
        if (alive && !initial) setStatus("not-found");
      });
    return () => {
      alive = false;
    };
  }, [slug, initial]);

  return { post, status };
};

/** Artículos relacionados: misma categoría primero, luego etiquetas en común y, si no, los más recientes. */
export const relatedPosts = (post: BlogPost, posts: BlogPost[], limit = 3) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || b.p.publishedAt.localeCompare(a.p.publishedAt))
    .slice(0, limit)
    .map(({ p }) => p);

// ---------- Formularios ----------

export interface QuestionPayload {
  name: string;
  email: string;
  question: string;
  notifyAnswer: boolean;
  privacyAccepted: boolean;
  website: string;
  captcha: CaptchaAnswer;
}

export const sendQuestion = (slug: string, payload: QuestionPayload) =>
  postJson<{ status: string }>(`/api/blog/posts/${encodeURIComponent(slug)}/questions`, payload);

export const subscribeToBlog = (payload: { email: string; privacyAccepted: boolean; website: string; captcha: CaptchaAnswer }) =>
  postJson<{ status: string }>("/api/blog/subscribe", { ...payload, sourcePath: window.location.pathname });

export const confirmUnsubscribe = (id: string, token: string) => postJson<{ status: string }>("/api/blog/unsubscribe", { id, token });
