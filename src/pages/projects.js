import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import projectsData from "../data/projects.json"

const PROJECTS_PER_PAGE = 9
const CATEGORIES = ["All", ...Array.from(new Set(projectsData.map(p => p.category))).sort()]

const SORT_OPTIONS = [
  { label: "Name A\u2013Z", value: "name-asc" },
  { label: "Name Z\u2013A", value: "name-desc" },
  { label: "Category", value: "category" },
]

const ProjectsPage = () => {
  const [activeFilters, setActiveFilters] = useState([])
  const [sortBy, setSortBy] = useState("name-asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOpen, setSortOpen] = useState(false)

  const toggleFilter = (category) => {
    if (category === "All") {
      setActiveFilters([])
    } else {
      setActiveFilters(prev =>
        prev.includes(category)
          ? prev.filter(f => f !== category)
          : [...prev, category]
      )
    }
    setCurrentPage(1)
  }

  const removeFilter = (category) => {
    setActiveFilters(prev => prev.filter(f => f !== category))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setActiveFilters([])
    setCurrentPage(1)
  }

  const filtered = useMemo(() => {
    let result = [...projectsData]

    if (activeFilters.length > 0) {
      result = result.filter(p => activeFilters.includes(p.category))
    }

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "category":
        result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [activeFilters, sortBy])

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE)
  const paged = filtered.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  )

  return (
    <Layout>
      <div className="section" style={{ paddingTop: "calc(64px + 3rem)" }}>
        <div className="section-label">Portfolio</div>
        <h2>Projects</h2>
        <p className="section-desc">
          Open-source tools and research across offensive security, automation, and AI.
        </p>

        {/* Toolbar: Sort + Filters */}
        <div className="proj-toolbar">
          {/* Sort dropdown */}
          <div className="proj-sort-wrapper">
            <button
              className="proj-sort-btn"
              onClick={() => setSortOpen(!sortOpen)}
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="14" y2="12" />
                <line x1="4" y1="18" x2="8" y2="18" />
              </svg>
              Sort
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {sortOpen && (
              <div className="proj-sort-dropdown" role="listbox">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`proj-sort-option${sortBy === opt.value ? " active" : ""}`}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                  >
                    {opt.label}
                    {sortBy === opt.value && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="proj-toolbar-divider" />

          {/* Category filters */}
          <div className="proj-filters">
            {CATEGORIES.map(cat => {
              const isActive = cat === "All" ? activeFilters.length === 0 : activeFilters.includes(cat)
              return (
                <button
                  key={cat}
                  className={`proj-filter-btn${isActive ? " active" : ""}`}
                  onClick={() => toggleFilter(cat)}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="proj-filter-count">
                      {projectsData.filter(p => p.category === cat).length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active filter pills */}
        {activeFilters.length > 0 && (
          <div className="proj-active-filters">
            <span className="proj-active-label">Filtered by:</span>
            {activeFilters.map(f => (
              <span key={f} className="proj-active-pill">
                {f}
                <button
                  onClick={() => removeFilter(f)}
                  aria-label={`Remove ${f} filter`}
                  className="proj-pill-remove"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
            <button className="proj-clear-btn" onClick={clearFilters}>
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="proj-results-count">
          Showing {paged.length} of {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Project cards grid */}
        <div className="proj-grid">
          {paged.map((project, i) => (
            <a
              key={i}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card"
            >
              <div className="proj-card-header">
                <svg className="proj-card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                </svg>
                <svg className="proj-card-external" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <h3 className="proj-card-title">{project.name}</h3>
              <p className="proj-card-desc">{project.description}</p>
              <div className="proj-card-footer">
                <span className="proj-card-category">{project.category}</span>
                <div className="proj-card-tags">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="proj-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>No projects match your filters.</p>
            <button className="btn btn-secondary" onClick={clearFilters} style={{ marginTop: "0.5rem" }}>
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className={`pagination-link${currentPage === 1 ? " disabled" : ""}`}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &larr; Prev
            </button>
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`pagination-number${num === currentPage ? " active" : ""}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              className={`pagination-link${currentPage === totalPages ? " disabled" : ""}`}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Projects"
    description="Open-source security tools, red team frameworks, and automation projects by Derek Martin."
    pathname="/projects"
  />
)

export default ProjectsPage
