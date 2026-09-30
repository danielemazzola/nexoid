import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import blog from "../data/blog";
import seo from "../data/seo";
import PageHero from "../components/ui/PageHero";
import Icon from "../components/ui/Icon";
import Seo from "../features/seo/Seo";
import { blogJsonLd, breadcrumbJsonLd } from "../features/seo/schema";
import { confirmUnsubscribe, useBlogPosts } from "../features/blog/blogData";
import PostCard from "../features/blog/PostCard";
import SubscribeBox from "../features/blog/SubscribeBox";
import "../features/blog/blog.css";

type Notice = { tone: "ok" | "error" | "ask"; text: string } | null;

/** Avisos que llegan por la URL: suscripción confirmada / enlace no válido / petición de baja (desde el email). */
const useSubscriptionNotice = () => {
  const [params, setParams] = useSearchParams();
  const [notice, setNotice] = useState<Notice>(null);
  const [unsubscribe, setUnsubscribe] = useState<{ id: string; token: string } | null>(null);

  // Se lee tras montar: el HTML prerenderizado no lleva parámetros
  useEffect(() => {
    const state = params.get("suscripcion");
    const baja = params.get("baja");
    if (state === "confirmada") setNotice({ tone: "ok", text: blog.subscribe.confirmed });
    else if (state === "error") setNotice({ tone: "error", text: blog.subscribe.confirmError });
    else if (baja) {
      const [id, token] = baja.split(".");
      if (id && token) {
        setUnsubscribe({ id, token });
        setNotice({ tone: "ask", text: blog.subscribe.unsubscribeAsk });
      }
    }
  }, [params]);

  const confirm = async () => {
    if (!unsubscribe) return;
    try {
      await confirmUnsubscribe(unsubscribe.id, unsubscribe.token);
      setNotice({ tone: "ok", text: blog.subscribe.unsubscribed });
      setUnsubscribe(null);
      setParams({}, { replace: true });
    } catch (error) {
      setNotice({ tone: "error", text: error instanceof Error ? error.message : "No se pudo completar la baja" });
    }
  };

  return { notice, confirm, dismiss: () => setNotice(null) };
};

/** Blog: último artículo destacado, filtro por categoría, listado y suscripción. */
const Blog = () => {
  const posts = useBlogPosts();
  const [params] = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const { notice, confirm, dismiss } = useSubscriptionNotice();

  // ?categoria=… (enlace desde un artículo)
  useEffect(() => {
    setCategory(params.get("categoria"));
  }, [params]);

  const categories = [...new Set(posts.map((p) => p.category))].sort((a, b) => a.localeCompare(b, "es"));
  const filtered = category ? posts.filter((p) => p.category === category) : posts;
  const [featured, ...rest] = filtered;

  return (
    <>
      <Seo {...seo.blog} path="/blog" jsonLd={[blogJsonLd(posts), breadcrumbJsonLd("Blog", "/blog")]} />
      <PageHero eyebrow={blog.eyebrow} title={<>{blog.heroTitle}</>} description={blog.heroDescription} />

      <section className="section blog_list" data-section="Artículos">
        <div className="container">
          {notice && (
            <div className={`blog_notice blog_notice_${notice.tone}`} role="status">
              <Icon name={notice.tone === "error" ? "shield" : notice.tone === "ask" ? "mail" : "check"} size={18} />
              <span>{notice.text}</span>
              {notice.tone === "ask" ? (
                <button type="button" className="btn btn_primary" onClick={confirm}>
                  <span>{blog.subscribe.unsubscribeButton}</span>
                </button>
              ) : (
                <button type="button" className="blog_notice_close" onClick={dismiss} aria-label="Cerrar aviso">
                  ×
                </button>
              )}
            </div>
          )}

          {categories.length > 1 && (
            <nav className="blog_filters" aria-label="Categorías">
              <button type="button" className={!category ? "is-active" : ""} aria-pressed={!category} onClick={() => setCategory(null)}>
                {blog.allCategories}
              </button>
              {categories.map((c) => (
                <button key={c} type="button" className={category === c ? "is-active" : ""} aria-pressed={category === c} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </nav>
          )}

          {!featured ? (
            <p className="muted">{blog.empty}</p>
          ) : (
            <>
              <PostCard post={featured} featured />
              {rest.length > 0 && (
                <div className="posts_grid">
                  {rest.map((post, index) => (
                    <PostCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <div className="section blog_subscribe_section">
        <div className="container">
          <SubscribeBox />
        </div>
      </div>
    </>
  );
};

export default Blog;
