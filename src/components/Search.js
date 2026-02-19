import React, { useState, useEffect, useRef, useCallback } from "react"
import { navigate } from "gatsby"

const Search = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [index, setIndex] = useState(null)
  const [posts, setPosts] = useState([])
  const inputRef = useRef(null)

  // Fetch index JSON and build FlexSearch index on first open
  const loadIndex = useCallback(async () => {
    if (index) return
    try {
      const res = await fetch("/search-index.json")
      const data = await res.json()
      setPosts(data)

      const FlexSearch = await import("flexsearch")
      const Document = FlexSearch.Document || FlexSearch.default?.Document
      const doc = new Document({
        document: {
          id: "slug",
          index: ["title", "excerpt", "tags"],
        },
        tokenize: "forward",
        resolution: 9,
      })

      data.forEach((post) => {
        doc.add({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          tags: (post.tags || []).join(" "),
        })
      })

      setIndex(doc)
    } catch (err) {
      console.error("Failed to load search index:", err)
    }
  }, [index])

  const openSearch = useCallback(() => {
    setIsOpen(true)
    loadIndex()
  }, [loadIndex])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery("")
    setResults([])
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50)
    }
  }, [isOpen])

  // Keyboard shortcuts: Cmd/Ctrl+K to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) closeSearch()
        else openSearch()
      }
      if (e.key === "Escape" && isOpen) {
        closeSearch()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, openSearch, closeSearch])

  // Search on query change
  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([])
      return
    }

    const searchResults = index.search(query, { limit: 10, enrich: true })
    const slugSet = new Set()
    const matched = []
    searchResults.forEach((fieldResult) => {
      fieldResult.result.forEach((item) => {
        const id = item.id || item
        if (!slugSet.has(id)) {
          slugSet.add(id)
          const post = posts.find((p) => p.slug === id)
          if (post) matched.push(post)
        }
      })
    })
    setResults(matched)
  }, [query, index, posts])

  const goToResult = (slug) => {
    closeSearch()
    navigate(`/blog/${slug}`)
  }

  return (
    <>
      <button
        className="search-toggle"
        onClick={openSearch}
        aria-label="Search posts"
        title="Search (Ctrl+K)"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {isOpen && (
        <div className="search-overlay" onClick={closeSearch} onKeyDown={(e) => e.key === "Escape" && closeSearch()} role="presentation">
          <div
            className="search-modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search posts"
          >
            <div className="search-input-wrapper">
              <svg
                className="search-input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="search-kbd">ESC</kbd>
            </div>

            <div className="search-results">
              {query.trim() && results.length === 0 && (
                <p className="search-no-results">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
              {results.map((post) => (
                <button
                  key={post.slug}
                  className="search-result-item"
                  onClick={() => goToResult(post.slug)}
                >
                  <div className="search-result-title">{post.title}</div>
                  <p className="search-result-excerpt">{post.excerpt}</p>
                  <div className="search-result-meta">
                    <span>{post.date}</span>
                    <div className="search-result-tags">
                      {post.tags &&
                        post.tags.map((tag, i) => (
                          <span key={i} className="tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Search
