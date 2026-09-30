import { Link } from "react-router-dom";
import blog from "../../data/blog";
import Icon from "../../components/ui/Icon";
import delay from "../../utils/delay";
import { formatDate, type BlogPost } from "./blogData";

/** Tarjeta de artículo: toda la tarjeta enlaza, con un único enlace accesible (el título). */
const PostCard = ({ post, index = 0, featured = false, headingLevel = 2 }: { post: BlogPost; index?: number; featured?: boolean; headingLevel?: 2 | 3 }) => {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={`post_card card reveal ${featured ? "post_card_featured" : ""}`} style={delay(index * 0.05)}>
      {post.coverUrl && <img className="post_card_cover" src={post.coverUrl} alt={post.coverAlt ?? ""} loading="lazy" decoding="async" />}
      <div className="post_card_body">
        <p className="post_card_meta">
          <span className="post_category">{post.category}</span>
          <span>{blog.minutes(post.readingMinutes)}</span>
        </p>
        <Heading className="post_card_title">
          <Link to={`/blog/${post.slug}`} className="post_card_link">
            {post.title}
          </Link>
        </Heading>
        <p className="post_card_excerpt">{post.excerpt}</p>
        <p className="post_card_foot">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="post_card_more" aria-hidden="true">
            {blog.readMore} <Icon name="arrow" size={16} />
          </span>
        </p>
      </div>
    </article>
  );
};

export default PostCard;
