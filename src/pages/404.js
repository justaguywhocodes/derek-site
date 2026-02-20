import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import Seo from "../components/Seo"
import "../styles/global.css"

const SECURITY_MESSAGES = [
  "ACCESS DENIED — INSUFFICIENT CLEARANCE",
  "SEGFAULT AT 0x00000000",
  "PACKET LOSS: 100%",
  "BREACH DETECTED IN SECTOR 7",
  "CONNECTION TERMINATED BY REMOTE HOST",
  "WARNING: UNAUTHORIZED ACCESS ATTEMPT LOGGED",
  "ERR_CERT_AUTHORITY_INVALID",
  "FIREWALL RULE 404: DROP ALL",
  "STACK SMASHING DETECTED",
  "INTRUSION DETECTION SYSTEM TRIGGERED",
  "KERNEL PANIC — NOT SYNCING",
  "SSH HANDSHAKE FAILED: PROTOCOL MISMATCH",
  "ARP POISONING DETECTED ON eth0",
  "BUFFER OVERFLOW IN 0xDEADBEEF",
]

const NotFoundPage = () => {
  const glitchRef = useRef(null)
  const messageRef = useRef(null)
  const containerRef = useRef(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return

    let gsap
    let timelines = []

    const initAnimations = async () => {
      const mod = await import("gsap")
      gsap = mod.default || mod.gsap || mod

      // Staggered entrance
      const elements = containerRef.current?.querySelectorAll(".t4-animate")
      if (elements?.length) {
        const entranceTl = gsap.timeline()
        entranceTl.from(elements, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
        })
        timelines.push(entranceTl)
      }

      // 404 glitch flicker
      if (glitchRef.current) {
        const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 2 })
        glitchTl
          .to(glitchRef.current, {
            x: -2,
            skewX: 2,
            opacity: 0.8,
            duration: 0.05,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            x: 3,
            skewX: -1,
            opacity: 1,
            duration: 0.05,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            x: -1,
            skewX: 0.5,
            opacity: 0.9,
            duration: 0.04,
            ease: "power4.inOut",
          })
          .to(glitchRef.current, {
            x: 0,
            skewX: 0,
            opacity: 1,
            duration: 0.04,
            ease: "power4.inOut",
          })
        timelines.push(glitchTl)
      }

      // Cycling security messages
      if (messageRef.current) {
        const shuffled = [...SECURITY_MESSAGES].sort(() => Math.random() - 0.5)

        const cycleTl = gsap.timeline({ repeat: -1 })

        shuffled.forEach((msg) => {
          cycleTl
            .call(() => {
              if (messageRef.current) {
                messageRef.current.textContent = ""
              }
            })
            .to(messageRef.current, {
              duration: msg.length * 0.03,
              ease: "none",
              onUpdate: function () {
                if (messageRef.current) {
                  const progress = this.progress()
                  const chars = Math.floor(progress * msg.length)
                  messageRef.current.textContent = msg.slice(0, chars)
                }
              },
            })
            .to({}, { duration: 1.8 })
            .to(messageRef.current, {
              opacity: 0,
              duration: 0.15,
            })
            .set(messageRef.current, { opacity: 1 })

        })

        timelines.push(cycleTl)
      }
    }

    initAnimations()

    return () => {
      timelines.forEach((tl) => tl?.kill?.())
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=site:derekmartin.xyz+${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <div className="terminal-404" ref={containerRef}>
      <div className="terminal-scanlines" />

      <div className="terminal-content">
        <div className="t4-animate">
          <div className="terminal-prompt">
            derek@redteam:~$ <span className="terminal-cmd">curl -I /
            {typeof window !== "undefined" ? window.location.pathname : "unknown"}</span>
          </div>
        </div>

        <h1 className="glitch-text t4-animate" ref={glitchRef}>
          404
        </h1>

        <p className="terminal-subtitle t4-animate">
          <span className="terminal-accent">&gt;</span> TARGET NOT FOUND — ROUTE
          DOES NOT EXIST
        </p>

        <div className="terminal-message-box t4-animate">
          <span className="terminal-prefix">[SYS]</span>{" "}
          <span className="terminal-message" ref={messageRef}>
            INITIALIZING...
          </span>
          <span className="terminal-cursor">_</span>
        </div>

        <form className="terminal-search t4-animate" onSubmit={handleSearch}>
          <span className="terminal-search-prompt">&gt; search:</span>
          <input
            type="text"
            className="terminal-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="find what you're looking for..."
            aria-label="Search this site"
          />
        </form>

        <div className="terminal-actions t4-animate">
          <Link to="/" className="terminal-btn">
            <span className="terminal-btn-prefix">$</span> cd /home
          </Link>
          <Link to="/blog" className="terminal-btn terminal-btn-secondary">
            <span className="terminal-btn-prefix">$</span> ls /blog
          </Link>
        </div>

        <div className="terminal-footer-text t4-animate">
          <span className="terminal-dim">
            Connection closed by remote host. Press any link to reconnect.
          </span>
        </div>
      </div>
    </div>
  )
}

export const Head = () => <Seo title="404: Access Denied" pathname="/404" />

export default NotFoundPage
