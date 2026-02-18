import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const BlogPost = ({ data }) => {
  const post = data.markdownRemark
  const { title, date, tags } = post.frontmatter

  return (
    <Layout>
      <div className="post-header">
        <div className="blog-card-tags" style={{ marginBottom: "1rem" }}>
          {tags &&
            tags.map((tag, i) => (
              <span key={i} className={`tag${i === 0 ? " tag-accent" : ""}`}>
                {tag}
              </span>
            ))}
        </div>
        <h1>{title}</h1>
        <div className="post-meta">
          <span>{date}</span>
          <span>&bull;</span>
          <span>{post.timeToRead} min read</span>
        </div>
      </div>

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <div
        className="post-content"
        style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
      >
        <p>
          <Link to="/blog">&larr; Back to all posts</Link>
        </p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        tags
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
)

export default BlogPost
