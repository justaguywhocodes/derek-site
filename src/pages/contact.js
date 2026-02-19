import React, { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("idle") // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("https://formspree.io/f/xeelzpgz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "contact_form_submission", {
            event_category: "engagement",
            event_label: "contact_page",
          })
        }
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <Layout>
      <div className="post-header">
        <div className="section-label">Contact</div>
        <h1>Get in touch</h1>
      </div>

      <div className="post-content">
        <p>
          Want to chat about red teaming, offensive tooling, career transitions
          into security, or something else entirely? I'd love to hear from you.
        </p>

        {status === "success" ? (
          <div className="form-status form-status-success">
            <span>&#10003;</span> Message sent — I'll get back to you soon.
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-textarea"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="What's on your mind?"
                rows="6"
              />
            </div>

            {status === "error" && (
              <div className="form-status form-status-error">
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}

        <h2>Or reach me directly</h2>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:derekmartinsf@gmail.com">derekmartinsf@gmail.com</a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/derekmartinoscp">
              linkedin.com/in/derekmartinoscp
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Contact" />

export default ContactPage
