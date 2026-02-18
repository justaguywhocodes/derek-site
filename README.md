# derek-martin.dev

Personal site and blog — built with [Gatsby](https://www.gatsbyjs.com/) and ready for [Vercel](https://vercel.com).

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8000)
npm run develop

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → select the repo
3. Vercel auto-detects Gatsby — no config needed
4. Deploy

That's it. Every push to `main` triggers a new deploy.

## Project Structure

```
├── gatsby-config.js        # Site metadata, plugins
├── gatsby-node.js          # Creates blog pages from markdown
├── gatsby-browser.js       # Global CSS + Prism.js theme
├── src/
│   ├── components/
│   │   ├── Layout.js       # Nav, footer, theme toggle
│   │   ├── BlogCard.js     # Blog post card component
│   │   └── Seo.js          # <head> meta tags
│   ├── pages/
│   │   ├── index.js        # Homepage (hero + recent posts + about)
│   │   ├── blog.js         # Blog listing
│   │   ├── about.js        # About page
│   │   ├── contact.js      # Contact page
│   │   └── 404.js          # 404 page
│   ├── templates/
│   │   └── blog-post.js    # Individual blog post template
│   ├── posts/              # Markdown blog posts (add new .md files here)
│   │   ├── msbuild-defense-evasion.md
│   │   ├── c2-over-dns.md
│   │   ├── llm-recon-automation.md
│   │   ├── purple-team-framework.md
│   │   ├── career-path.md
│   │   └── smart-contract-auditing.md
│   ├── styles/
│   │   └── global.css      # All styles (light/dark themes)
│   └── images/
│       └── icon.png        # Favicon / manifest icon
└── package.json
```

## Writing Blog Posts

Add a new `.md` file to `src/posts/` with this frontmatter:

```md
---
title: "Your Post Title"
slug: "your-post-slug"
date: "2026-03-15"
tags: ["red team", "python"]
---

Your content here. Supports full Markdown + Prism.js code highlighting.
```

The post will automatically appear on the blog page and homepage.

## Customization

- **Colors & theme:** Edit CSS variables in `src/styles/global.css`
- **Fonts:** Loaded via Google Fonts in `Layout.js` — swap Fraunces/Outfit/JetBrains Mono as desired
- **Site metadata:** Edit `gatsby-config.js` → `siteMetadata`
- **Icon:** Replace `src/images/icon.png` with your own 512x512 PNG

## Tech Stack

- **Framework:** Gatsby 5
- **Blog:** Markdown via gatsby-transformer-remark
- **Code highlighting:** Prism.js via gatsby-remark-prismjs
- **Hosting:** Vercel (or Netlify, GitHub Pages, etc.)
- **Fonts:** Fraunces, Outfit, JetBrains Mono (Google Fonts)
