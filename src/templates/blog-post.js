import React, { useState, useEffect, useRef, useCallback } from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const ExternalLink = ({ href, children, ...props }) => {
  const isExternal = href && (href.startsWith("http://") || href.startsWith("https://"))
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return <a href={href} {...props}>{children}</a>
}

const mdxComponents = { a: ExternalLink }

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const SITE_URL = "https://derekmartin.xyz"

const BlogPost = ({ data, children }) => {
  const post = data.mdx
  const { title, date, tags, slug } = post.frontmatter
  const postUrl = `${SITE_URL}/blog/${slug}`
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

  // Open all links in blog content in a new tab
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const links = el.querySelectorAll("a[href]")
    links.forEach((link) => {
      if (!link.getAttribute("href").startsWith("#")) {
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")
      }
    })
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
        <MDXProvider components={mdxComponents}>
          {children}
        </MDXProvider>
      </div>

      <div
        className="post-content"
        style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
      >
        <div className="share-links">
          <span className="share-label">Share this article</span>
          <div className="share-icons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="share-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="share-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href={`https://www.threads.net/intent/post?text=${encodeURIComponent(title + " " + postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Threads"
              className="share-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.18.408-2.285 1.33-3.11.88-.787 2.154-1.275 3.594-1.378 1.048-.075 2.03.007 2.942.24-.084-1.076-.456-1.89-1.107-2.424-.747-.612-1.853-.918-3.286-.91l-.025.001c-1.14.012-2.139.34-2.89.949-.71.575-1.147 1.35-1.258 2.238l-2.02-.257c.158-1.29.816-2.419 1.9-3.296 1.07-.867 2.466-1.34 4.036-1.58l.25-.033.25-.023c1.986-.028 3.57.447 4.708 1.41.973.823 1.59 1.991 1.836 3.467.442.163.863.357 1.259.585 1.07.616 1.91 1.488 2.43 2.523.79 1.575.885 4.296-1.26 6.395-1.834 1.793-4.091 2.555-7.302 2.578zm-1.834-8.542c-1.04.074-1.863.384-2.393.849-.482.423-.676.963-.645 1.53.036.648.387 1.19.988 1.58.648.42 1.486.584 2.277.545 1.14-.062 1.994-.47 2.607-1.233.524-.652.869-1.552.994-2.59-.862-.296-1.82-.453-2.828-.453l-.528.013-.472-.241z"/></svg>
            </a>
          </div>
        </div>
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
