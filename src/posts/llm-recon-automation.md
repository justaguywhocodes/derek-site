---
title: "Using LLMs to Accelerate Recon: What Works, What Doesn't"
slug: "llm-recon-automation"
date: "2026-01-10"
tags: ["automation", "LLM", "python"]
---

I integrated GPT-4 into our red team reconnaissance and vulnerability triage workflow and cut manual effort by roughly 30%. Here's exactly how I did it, what surprised me, and where the limits are.

## The problem

Recon generates massive amounts of data — subdomain enumeration, port scans, web crawling, JavaScript analysis, API endpoint discovery. The bottleneck isn't collecting the data; it's triaging it. A human analyst can spend hours sifting through scan results to identify what's actually interesting.

## The approach

I built a Python pipeline that feeds structured scan output (Nmap XML, httpx JSON, nuclei findings) into GPT-4 with carefully crafted system prompts that act as a senior pentester reviewing the data. The model returns prioritized findings with reasoning.

## What worked

The LLM excels at pattern recognition across large datasets — identifying unusual services, spotting misconfigurations in HTTP headers, and correlating findings that a human might miss when fatigued.

## What didn't

It can't replace hands-on validation. False positive rates are non-trivial, and the model occasionally hallucinates vulnerabilities that don't exist.

More details coming soon — this is a placeholder post.
