import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme")
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute("data-theme", saved)
    } else {
      document.documentElement.setAttribute("data-theme", "light")
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    localStorage.setItem("theme", next)
  }

  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            derek<span>.</span>
          </Link>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                title="Toggle theme"
              >
                {theme === "dark" ? "☽" : "☀"}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main>{children}</main>

      <footer>
        <div className="footer-inner">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://linkedin.com/in/derekmartinoscp">LinkedIn</a>
            <a href="https://docs.martinomics.dev">Docs</a>
          </div>
          <p className="footer-copy">
            &copy; 2025&ndash;2026 <span className="highlight">Derek Martin</span>
            <br />
            All content written by a real human with actual fingers&mdash;em dashes and all.
            <br />
            No tracking. No cookies.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Layout
