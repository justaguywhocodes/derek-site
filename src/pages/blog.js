import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import BlogCard from "../components/BlogCard"

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

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
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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

export const Head = () => <Seo title="Blog" />

export default BlogPage
