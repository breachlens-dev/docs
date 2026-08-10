# BreachLens documentation

The public documentation for [BreachLens](https://breachlens.app) — the
self-hosted application-security platform that proves which findings are
exploitable. Built with [Mintlify](https://mintlify.com).

## Editing

- Pages are MDX with YAML frontmatter, organised by section at the repo root
  (`quickstart.mdx`, `deployment/`, `scanning/`, `ai-identity/`, `pipeline/`, …).
- Navigation, theme, and redirects live in `docs.json`.
- **Read [`AGENTS.md`](./AGENTS.md) before editing** — it holds the writing and
  component conventions (callout semantics, `CardGroup` rules, table placement,
  terminology) that keep pages consistent.

## Preview locally

```bash
npm i -g mint
mint dev
```

Opens at `http://localhost:3000`. Run it from the repo root, where `docs.json` lives.

## Check links before pushing

```bash
mint broken-links
```

Run this before every PR — it catches internal links that point at routes that
don't exist (the most common docs regression).

## Publishing

Pushes to `main` deploy to production automatically via the Mintlify GitHub app.
Open a PR for review; merging to `main` ships it.
