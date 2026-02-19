import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const AboutPage = () => (
  <Layout>
    <div className="post-header">
      <div className="section-label">About</div>
      <h1>A bit about me</h1>
      <div className="post-meta">
        <span>Red Team Operator &bull; Berkeley, CA</span>
      </div>
    </div>

    <div className="post-content">
      <p>
        I'm Derek Martin — a red team analyst at <strong>BNP Paribas CIB</strong>,
        where I simulate advanced persistent threats against the infrastructure of
        a Tier 1 global investment bank. I design and execute full-scope
        engagements covering network, web application, and Active Directory
        penetration testing, social engineering, and adversary simulation mapped to
        MITRE ATT&CK.
      </p>

      <h2>What I do day-to-day</h2>
      <p>
        I build custom offensive tooling in Python, PowerShell, and Go for payload
        delivery, C2 communication, and defense evasion. I lead purple team testing
        cycles — roughly 15 per month — collaborating with detection engineers to
        validate and improve alerting coverage across the enterprise. When I'm not
        actively breaking things, I'm producing executive-level engagement reports
        that translate complex attack chains into business risk.
      </p>

      <h2>Before offensive security</h2>
      <p>
        I spent 8+ years in software engineering. Most recently, I was Director of
        Ad Technology at Metric Theory, where I led a 3-person engineering team
        building API integrations for 10+ advertising platforms, ETL pipelines on
        BigQuery, and internal tools serving 180+ clients and $157MM+ in managed
        spend. That engineering background is core to how I operate — I write my
        own tools, automate entire engagement phases, and think like a developer
        when I'm looking for attack surface.
      </p>

      <h2>The non-linear path</h2>
      <p>
        I started my career as an auditor at PwC, worked in accounting and
        financial analysis, pivoted into ad tech and SaaS development, and
        eventually found my way to offensive security through Hack The Box, bug
        bounties, and a relentless curiosity about how things break. I hold a CPA
        alongside my OSCP+, CISSP, and CPTS — which gives me an unusual
        perspective on both the technical attack surface and the
        regulatory/governance context that makes findings actionable.
      </p>

      <h2>Certifications</h2>
      <ul>
        <li>OSCP+ (Offensive Security Certified Professional Plus)</li>
        <li>CISSP (Certified Information Systems Security Professional)</li>
        <li>CPTS (Certified Penetration Testing Specialist)</li>
        <li>ISC2 Cybersecurity Certification</li>
        <li>CPA (Certified Public Accountant)</li>
      </ul>

      <h2>Education</h2>
      <p>
        B.S. Accounting and B.S. Finance from Villanova University (2002–2006).
        Continuous learning through Hack The Box (25+ challenges), HTB Academy
        Pentester Track, and Cybrary.it coursework.
      </p>

      <h2>Elsewhere</h2>
      <ul>
        <li>
          <a href="https://linkedin.com/in/derekmartinoscp">LinkedIn</a>
        </li>
        <li>
          <a href="https://docs.martinomics.dev">Blog / Docs</a>
        </li>
        <li>
          <a href="https://martinomics.dev">Martinomics</a>
        </li>
      </ul>

      <p>
        <Link to="/contact">Get in touch &rarr;</Link>
      </p>
    </div>
  </Layout>
)

export const Head = () => (
  <Seo
    title="About"
    description="About Derek Martin — red team operator and offensive security engineer with OSCP+, CISSP, and CPTS certifications."
    pathname="/about"
  />
)

export default AboutPage
