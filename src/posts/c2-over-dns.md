---
title: "Building a Custom C2 Channel Over DNS: Lessons from the Lab"
slug: "c2-over-dns"
date: "2026-01-28"
tags: ["tooling", "go", "evasion"]
---

Off-the-shelf C2 frameworks are powerful, but they come with known signatures. When you need to blend into normal network traffic, building your own channel is sometimes the only option.

I recently prototyped a DNS-based C2 channel in Go for use in red team engagements where HTTP/HTTPS egress was heavily monitored. This post covers the architecture, the trade-offs, and what I learned about DNS tunneling at the protocol level.

## Why DNS?

DNS is almost always allowed outbound, even in heavily restricted environments. By encoding commands and responses in DNS queries and TXT records, you can maintain a low-and-slow communication channel that's surprisingly hard to detect without dedicated DNS analytics.

## The Go implementation

I chose Go for its excellent cross-compilation support and small binary sizes. The agent compiles to a single static binary under 3MB that runs on Windows, Linux, and macOS.

More details coming soon — this is a placeholder post.
