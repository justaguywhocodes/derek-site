import React from "react"
import { Link } from "gatsby"

const gradients = [
  "linear-gradient(135deg, #2A1A1A 0%, #C2564B 100%)",
  "linear-gradient(135deg, #0d1117 0%, #238636 100%)",
  "linear-gradient(135deg, #1E1E1E 0%, #E07060 50%, #1A1410 100%)",
  "linear-gradient(135deg, #16213E 0%, #0F3460 50%, #E94560 100%)",
  "linear-gradient(135deg, #2D1B69 0%, #C2564B 100%)",
  "linear-gradient(135deg, #0D1117 0%, #58A6FF 100%)",
]

const BlogCard = ({ title, slug, date, excerpt, tags, index }) => {
  const grad = gradients[index % gradients.length]

  return (
    <Link to={`/blog/${slug}`} className="blog-card">
      <div className="blog-card-img" style={{ background: grad }}>
        <span className="icon">&#128274;</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-card-tags">
          {tags &&
            tags.map((tag, i) => (
              <span key={i} className={`tag${i === 0 ? " tag-accent" : ""}`}>
                {tag}
              </span>
            ))}
        </div>
        <h3>{title}</h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        <div className="blog-card-meta">
          <span>{date}</span>
          <span className="read-more">Read more &rarr;</span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
