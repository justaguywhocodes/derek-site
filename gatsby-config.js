module.exports = {
  siteMetadata: {
    title: `Derek Martin`,
    description: `Red Team Operator & Security Engineer — blog, projects, and notes on offensive security.`,
    author: `Derek Martin`,
    siteUrl: `https://derekmartin.dev`,
  },
  plugins: [
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
  ],
}
