import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import BlogCard from "../components/BlogCard"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-label">Red Team Operator &bull; Berkeley, CA</div>
          <h1>
            Hi, I'm <span className="accent">Derek</span>.
          </h1>
          <p className="hero-desc">
            I'm a red team operator, offensive security engineer, and{" "}
            <Link to="/blog">occasional writer</Link>. I break into things for a
            living at a Tier&nbsp;1 global investment bank, build custom offensive
            tooling in Python, Go, and PowerShell, and{" "}
            <Link to="/blog">blog here</Link> about security, automation, and the
            craft of ethical hacking.
          </p>
          <div className="hero-links">
            <Link to="/blog" className="btn btn-primary">
              Read the blog &rarr;
            </Link>
            <Link to="/about" className="btn btn-secondary">
              More about me
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section">
        <div className="section-label">Latest writing</div>
        <h2>Recent posts</h2>
        <p className="section-desc">
          Notes on offensive security, red teaming, tooling, automation, and the
          occasional tangent.
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

      {/* About Preview */}
      <section className="about-section">
        <div className="section">
          <div className="section-label">About me</div>
          <h2>A bit about Derek</h2>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a red team analyst at <strong>BNP Paribas CIB</strong>, where
                I simulate advanced persistent threats against the infrastructure
                of a global investment bank. My days involve breaking Active
                Directory environments, writing custom offensive tools, running
                phishing campaigns, and collaborating with the blue team to make
                sure they can actually catch what I throw at them.
              </p>
              <p>
                Before offensive security, I spent 8+ years in software
                engineering — leading an engineering team at Metric Theory,
                building API integrations for 10+ ad platforms, and managing
                $157MM+ in client spend. That engineering background isn't just
                backstory; it's what lets me build my own C2 infrastructure and
                think like a developer when I'm looking for ways in.
              </p>
              <p>
                I started my career as an auditor at <strong>PwC</strong> and hold
                a CPA alongside my OSCP+, CISSP, and CPTS.{" "}
                <Link to="/about">Read more &rarr;</Link>
              </p>
              <div className="cert-badges">
                <span className="cert-badge">OSCP+</span>
                <span className="cert-badge">CISSP</span>
                <span className="cert-badge">CPTS</span>
                <span className="cert-badge">ISC2</span>
                <span className="cert-badge">CPA</span>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years in offensive security</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8+</div>
                <div className="stat-label">Years in software engineering</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">~15</div>
                <div className="stat-label">Purple team tests / month</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">30%</div>
                <div className="stat-label">Recon reduced via LLM automation</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 6
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

export const Head = () => <Seo pathname="/" />

export default IndexPage
