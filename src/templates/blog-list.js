import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import BlogCard from "../components/BlogCard"

const BlogList = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`
  const nextPage = `/blog/${currentPage + 1}`

  return (
    <Layout>
      <section className="section" style={{ paddingTop: "calc(64px + 4rem)" }}>
        <div className="section-label">Blog</div>
        <h2>All posts</h2>
        <p className="section-desc">
          Writing about offensive security, tooling, automation, career, and whatever else is on my mind.
        </p>

        <div className="blog-grid">
          {posts.map(({ node }, index) => (
            <BlogCard
              key={node.frontmatter.slug}
              title={node.frontmatter.title}
              slug={node.frontmatter.slug}
              date={node.frontmatter.date}
              excerpt={node.excerpt}
              tags={node.frontmatter.tags}
              index={index}
            />
          ))}
        </div>

        {numPages > 1 && (
          <nav className="pagination" aria-label="Blog pagination">
            {isFirst ? (
              <span className="pagination-link disabled">&larr; Prev</span>
            ) : (
              <Link to={prevPage} className="pagination-link" rel="prev">
                &larr; Prev
              </Link>
            )}

            <div className="pagination-numbers">
              {Array.from({ length: numPages }, (_, i) => (
                <Link
                  key={`page-${i + 1}`}
                  to={i === 0 ? "/blog" : `/blog/${i + 1}`}
                  className={`pagination-number${currentPage === i + 1 ? " active" : ""}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>

            {isLast ? (
              <span className="pagination-link disabled">Next &rarr;</span>
            ) : (
              <Link to={nextPage} className="pagination-link" rel="next">
                Next &rarr;
              </Link>
            )}
          </nav>
        )}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 160)
          frontmatter {
            title
            slug
            date(formatString: "MMM D, YYYY")
            tags
          }
        }
      }
    }
  }
`

export const Head = ({ pageContext }) => {
  const { currentPage } = pageContext
  const title = currentPage === 1 ? "Blog" : `Blog — Page ${currentPage}`
  const pathname = currentPage === 1 ? "/blog" : `/blog/${currentPage}`

  return (
    <Seo
      title={title}
      description="Articles on offensive security, red teaming, tooling, and automation by Derek Martin."
      pathname={pathname}
    />
  )
}

export default BlogList
