import React, { useState, useEffect, useRef, useCallback } from "react"
import { navigate } from "gatsby"

// Inline SVG icons
const IconSearch = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const IconDocument = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
)

const IconFolder = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
  </svg>
)

const Search = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [index, setIndex] = useState(null)
  const [posts, setPosts] = useState([])
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

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
    setFocusedIndex(-1)
    loadIndex()
  }, [loadIndex])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery("")
    setResults([])
    setFocusedIndex(-1)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50)
    }
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
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
      setFocusedIndex(-1)
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
    setFocusedIndex(matched.length > 0 ? 0 : -1)
  }, [query, index, posts])

  // Get the visible list of items (recent when no query, results when searching)
  const displayItems = query.trim() ? results : posts.slice(0, 3)
  const hasProjectTag = (post) => (post.tags || []).some(t =>
    ["project", "tool", "tooling", "framework"].includes(t.toLowerCase())
  )

  const goToResult = (slug) => {
    closeSearch()
    navigate(`/blog/${slug}`)
  }

  // Arrow key navigation
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex((prev) => Math.min(prev + 1, displayItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && focusedIndex >= 0 && displayItems[focusedIndex]) {
      e.preventDefault()
      goToResult(displayItems[focusedIndex].slug)
    }
  }

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll("[data-search-item]")
      if (items[focusedIndex]) {
        items[focusedIndex].scrollIntoView({ block: "nearest" })
      }
    }
  }, [focusedIndex])

  return (
    <>
      <button
        className="search-toggle"
        onClick={openSearch}
        aria-label="Search"
        title="Search (Ctrl+K)"
      >
        <IconSearch />
      </button>

      {isOpen && (
        <div className="cmd-backdrop" onClick={closeSearch} role="presentation">
          <div className="cmd-container">
            <div
              className="cmd-panel"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Search"
            >
              {/* Input row */}
              <div className="cmd-input-row">
                <IconSearch className="cmd-input-icon" />
                <input
                  ref={inputRef}
                  className="cmd-input"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
              </div>

              {/* Results / Recent */}
              {(displayItems.length > 0 || !query.trim()) && (
                <div className="cmd-results" ref={resultsRef}>
                  <div className="cmd-group">
                    {!query.trim() && (
                      <h2 className="cmd-group-title">Recent searches</h2>
                    )}
                    <ul className="cmd-list">
                      {displayItems.map((post, i) => (
                        <li
                          key={post.slug}
                          data-search-item
                          className={`cmd-item${focusedIndex === i ? " cmd-item-focused" : ""}`}
                          onClick={() => goToResult(post.slug)}
                          onMouseEnter={() => setFocusedIndex(i)}
                        >
                          {hasProjectTag(post) ? (
                            <IconFolder className="cmd-item-icon" />
                          ) : (
                            <IconDocument className="cmd-item-icon" />
                          )}
                          <span className="cmd-item-title">{post.title}</span>
                          <span className="cmd-item-action">Jump to&hellip;</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {query.trim() && results.length === 0 && (
                <div className="cmd-empty">
                  <IconFolder className="cmd-empty-icon" />
                  <p className="cmd-empty-text">
                    No results found for &ldquo;{query}&rdquo;. Try a different search.
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="cmd-footer">
                <div className="cmd-footer-keys">
                  <kbd className="cmd-kbd">&uarr;&darr;</kbd>
                  <span>to navigate</span>
                </div>
                <div className="cmd-footer-keys">
                  <kbd className="cmd-kbd">&crarr;</kbd>
                  <span>to select</span>
                </div>
                <div className="cmd-footer-keys">
                  <kbd className="cmd-kbd">esc</kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Search
