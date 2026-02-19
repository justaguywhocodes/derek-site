import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ title, description, pathname, date, tags, isArticle, image, children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  const {
    title: defaultTitle,
    description: defaultDesc,
    author,
    siteUrl,
  } = site.siteMetadata

  const seo = {
    title: title ? `${title} | ${defaultTitle}` : defaultTitle,
    description: description || defaultDesc,
    url: `${siteUrl}${pathname || ``}`,
    image: image || `${siteUrl}/icons/icon-512x512.png`,
    author,
  }

  const jsonLd = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: seo.description,
        author: { "@type": "Person", name: author, url: siteUrl },
        url: seo.url,
        image: seo.image,
        ...(date && { datePublished: date }),
        ...(tags && { keywords: tags.join(", ") }),
        publisher: { "@type": "Person", name: author },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: defaultTitle,
        description: defaultDesc,
        url: siteUrl,
        author: { "@type": "Person", name: author },
      }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={defaultTitle} />

      {isArticle && date && (
        <meta property="article:published_time" content={date} />
      )}
      {isArticle && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@derekhacks" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {children}
    </>
  )
}

export default Seo
