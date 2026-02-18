import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const ContactPage = () => (
  <Layout>
    <div className="post-header">
      <div className="section-label">Contact</div>
      <h1>Get in touch</h1>
    </div>

    <div className="post-content">
      <p>
        Want to chat about red teaming, offensive tooling, career transitions into
        security, or something else entirely? I'd love to hear from you.
      </p>

      <h2>Reach me at</h2>
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

      <p>
        I'm generally open to speaking about offensive security topics, purple
        team methodology, career advice for people transitioning into infosec, and
        collaborative projects.
      </p>
    </div>
  </Layout>
)

export const Head = () => <Seo title="Contact" />

export default ContactPage
