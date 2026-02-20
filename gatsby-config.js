module.exports = {
  siteMetadata: {
    title: `Derek Martin`,
    description: `Red Team Operator & Security Engineer — blog, projects, and notes on offensive security.`,
    author: `Derek Martin`,
    siteUrl: `https://derekmartin.xyz`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-WHK2Z5T9`,
        includeInDevelopment: false,
        defaultDataLayer: { platform: `gatsby` },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-J998F3JG0L`],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Derek Martin`,
        short_name: `derek`,
        start_url: `/`,
        background_color: `#FAFAF8`,
        theme_color: `#C2564B`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://derekmartin.xyz`,
        sitemap: `https://derekmartin.xyz/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + `/blog/` + node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + `/blog/` + node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                  nodes {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                      slug
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Derek Martin — Blog`,
          },
        ],
      },
    },
  ],
}
