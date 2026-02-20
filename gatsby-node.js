const path = require("path")
const fs = require("fs")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            excerpt(pruneLength: 200)
            frontmatter {
              title
              slug
              date(formatString: "MMM D, YYYY")
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges

  // Create individual blog post pages
  posts.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })

  // Create paginated blog listing pages
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve(`./src/templates/blog-list.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Generate search index
  const searchIndex = posts.map(({ node }) => ({
    title: node.frontmatter.title,
    slug: node.frontmatter.slug,
    date: node.frontmatter.date,
    tags: node.frontmatter.tags,
    excerpt: node.excerpt,
  }))

  fs.mkdirSync(path.join("public"), { recursive: true })
  fs.writeFileSync(
    path.join("public", "search-index.json"),
    JSON.stringify(searchIndex)
  )
}
