import React from "react"

const Seo = ({ title, description }) => {
  const defaultTitle = "Derek Martin"
  const defaultDesc = "Red Team Operator & Security Engineer — blog, projects, and notes on offensive security."

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
    </>
  )
}

export default Seo
