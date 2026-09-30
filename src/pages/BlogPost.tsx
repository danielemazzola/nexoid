import { useCallback, useMemo, useState, type MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import blog from "../data/blog";
import site from "../data/site";
import avatar from "../assets/img/avatar-dani.svg";
import Button from "../components/ui/Button";
import Seo from "../features/seo/Seo";
import { blogPostingJsonLd, breadcrumbTrailJsonLd, faqJsonLd } from "../features/seo/schema";
import { formatDate, relatedPosts, useBlogPost, useBlogPosts } from "../features/blog/blogData";
import { renderMarkdown } from "../features/blog/markdown";
import PostCard from "../features/blog/PostCard";
import QuestionsSection from "../features/blog/QuestionsSection";
import SubscribeBox from "../features/blog/SubscribeBox";
import DocModal, { type OfficialDoc } from "../features/blog/DocModal";
import NotFound from "./NotFound";
import "../features/blog/blog.css";

const DAY = 864e5;

/** Artículo del blog: contenido prerenderizado (SEO), índice, documentación oficial en modal, preguntas y relacionados. */
const BlogPost = ({ slug }: { slug: string }) => {
  const { post, status } = useBlogPost(slug);
  const posts = useBlogPosts();
  const [doc, setDoc] = useState<OfficialDoc | null>(null);
  const closeDoc = useCallback(() => setDoc(null), []);
  const content = post?.content;
  const rendered = useMemo(() => (content ? renderMarkdown(content) : null), [content]);

  if (status === "not-found") return <NotFound />;
  if (!post || !rendered) {
    return (
      <section className="section post_loading" aria-busy="true">
        <div className="container">
          <p className="muted">Cargando artículo…</p>
        </div>
      </section>
    );
  }

  const toc = rendered.headings.filter((h) => h.level === 2);
  const wordCount = (post.content ?? "").split(/\s+/).filter(Boolean).length;
  const questions = post.questions ?? [];
  const updated = Date.parse(post.updatedAt) - Date.parse(post.publishedAt) > DAY;
  const related = relatedPosts(post, posts);

  // Enlaces a Microsoft Learn: se abren en el modal (el enlace sigue siendo normal para buscadores y sin JS)
  const onArticleClick = (event: MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[data-doc]");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setDoc({ title: link.textContent ?? "Documentación oficial", summary: link.title, url: link.href });
  };

  const jsonLd: object[] = [
    blogPostingJsonLd(post, wordCount),
    breadcrumbTrailJsonLd([
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
  if (questions.length) jsonLd.push(faqJsonLd(questions));

  return (
    <>
      <Seo
        title={post.seoTitle ?? post.title}
        description={post.seoDescription ?? post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.coverUrl ?? undefined}
        article={{ publishedTime: post.publishedAt, modifiedTime: post.updatedAt, section: post.category, tags: post.tags, author: post.authorName }}
        jsonLd={jsonLd}
      />

      <article className="post" data-section="Artículo">
        <header className="post_hero">
          <div className="container post_hero_inner">
            <nav className="breadcrumbs" aria-label="Migas de pan">
              <ol>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li aria-current="page">{post.category}</li>
              </ol>
            </nav>
            <Link to={`/blog?categoria=${encodeURIComponent(post.category)}`} className="post_category">
              {post.category}
            </Link>
            <h1>{post.title}</h1>
            <p className="post_lead">{post.excerpt}</p>
            <div className="post_meta">
              <img src={avatar} alt="" width={40} height={40} />
              <div>
                <strong>{post.authorName}</strong>
                <span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {blog.minutes(post.readingMinutes)}
                  {updated && (
                    <>
                      {" "}
                      · {blog.updated} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container post_layout">
          {toc.length > 2 && (
            <aside className="post_toc" aria-label={blog.toc}>
              <details open>
                <summary>{blog.toc}</summary>
                <ol>
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            </aside>
          )}

          <div className="post_main">
            {post.coverUrl && <img className="post_cover" src={post.coverUrl} alt={post.coverAlt ?? ""} decoding="async" />}
            <div className="post_content" onClick={onArticleClick} dangerouslySetInnerHTML={{ __html: rendered.html }} />

            {post.tags.length > 0 && (
              <ul className="post_tags" aria-label="Etiquetas">
                {post.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            )}

            <aside className="post_author card" aria-label="Sobre el autor">
              <img src={avatar} alt={`Avatar de ${post.authorName}`} width={64} height={64} loading="lazy" />
              <div>
                <strong>{post.authorName}</strong>
                <span className="post_author_role">{blog.author.role}</span>
                <p>{blog.author.bio}</p>
                <Link to="/quienes-somos">Conoce {site.name}</Link>
              </div>
            </aside>

            <aside className="post_cta" aria-label="Llamada a la acción" data-section="Llamada a la acción del artículo">
              <h2>{blog.cta.title}</h2>
              <p>{blog.cta.text}</p>
              <div className="post_cta_buttons">
                <Button value={blog.cta.primary.text} href={blog.cta.primary.href} />
                <Button value={blog.cta.secondary.text} href={blog.cta.secondary.href} variant="ghost" arrow={false} />
              </div>
            </aside>

            <QuestionsSection slug={post.slug} questions={questions} />
            <SubscribeBox compact />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section post_related" data-section="Artículos relacionados">
          <div className="container">
            <h2>{blog.related}</h2>
            <div className="posts_grid">
              {related.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} headingLevel={3} />
              ))}
            </div>
          </div>
        </section>
      )}

      {doc && <DocModal doc={doc} onClose={closeDoc} />}
    </>
  );
};

/** Ruta /blog/:slug para artículos publicados después del último build (se cargan en el navegador). */
export const BlogPostRoute = () => {
  const { slug = "" } = useParams();
  return <BlogPost key={slug} slug={slug} />;
};

export default BlogPost;
