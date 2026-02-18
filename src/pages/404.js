import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage = () => (
  <Layout>
    <div className="post-header" style={{ minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h1>404: Not found</h1>
      <p style={{ color: "var(--text-secondary)", marginTop: "1rem", fontSize: "1.1rem" }}>
        This page doesn't exist — which, as a red teamer, I should probably find suspicious.
      </p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link to="/" className="btn btn-primary">Back to safety &rarr;</Link>
      </p>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
