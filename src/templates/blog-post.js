import React, { useState, useEffect, useRef, useCallback } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const BlogPost = ({ data, children }) => {
  const post = data.mdx
  const { title, date, tags } = post.frontmatter
  const wordCount = post.body ? post.body.split(/\s+/).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 250))

  const [progress, setProgress] = useState(0)
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")
  const [tocOpen, setTocOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 768
    }
    return true
  })
  const contentRef = useRef(null)

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Extract headings from rendered content
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const nodes = el.querySelectorAll("h2, h3")
    const items = []
    nodes.forEach((node) => {
      const id = slugify(node.textContent)
      node.id = id
      items.push({
        id,
        text: node.textContent,
        level: node.tagName === "H2" ? 2 : 3,
      })
    })
    setHeadings(items)
  }, [children])

  // Active heading tracking via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = useCallback((e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
  }, [])

  return (
    <Layout>
      {/* Reading progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

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
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Table of Contents */}
      {headings.length > 0 && (
        <nav className="toc" aria-label="Table of contents">
          <div className="toc-card">
            <button
              className="toc-toggle"
              onClick={() => setTocOpen(!tocOpen)}
              aria-expanded={tocOpen}
            >
              <span className="toc-toggle-label">
                <svg className="toc-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="10" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></svg>
                Table of Contents
              </span>
              <svg className={`toc-chevron${tocOpen ? " toc-chevron-open" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 4 10 8 6 12"/></svg>
            </button>
            {tocOpen && (
              <ul className="toc-list">
                {headings.map(({ id, text, level }) => (
                  <li key={id} className={`toc-item${level === 3 ? " toc-item-nested" : ""}`}>
                    <a
                      href={`#${id}`}
                      className={`toc-link${activeId === id ? " toc-link-active" : ""}`}
                      onClick={(e) => scrollToHeading(e, id)}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      )}

      <div className="post-content" ref={contentRef}>
        {children}
      </div>

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
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        slug
        date(formatString: "MMMM D, YYYY")
        rawDate: date
        tags
      }
    }
  }
`

export const Head = ({ data }) => {
  const { frontmatter, excerpt } = data.mdx
  return (
    <Seo
      title={frontmatter.title}
      description={excerpt}
      pathname={`/blog/${frontmatter.slug}`}
      date={frontmatter.rawDate}
      tags={frontmatter.tags}
      isArticle={true}
    />
  )
}

export default BlogPost
