# BreachLens documentation — writing instructions

Conventions for editing the BreachLens docs (Mintlify, MDX + `docs.json`).
These exist because past drift (inconsistent callouts, orphaned card grids,
tables nested in lists) all traced back to there being no written standard.

## About this project

- Documentation site built on [Mintlify](https://mintlify.com); pages are MDX
  with YAML frontmatter; configuration lives in `docs.json`.
- Audience is two-sided: an **operator** getting to a first scan, and a
  **technical buyer / procurement reviewer** evaluating depth, self-hosting,
  and federal/regulated fit. Every page should serve one of them clearly.

## Terminology

- The product is **BreachLens**. "DevSecOps" is fine for technical/internal
  framing, never as the product name.
- BreachLens runs **9 scanner tiers** — keep that count consistent.
- Match the app's exact UI labels, including casing: **MCP servers** (lowercase
  `s`), not "MCP Servers".
- Refer to a Settings tab by its **exact in-app label**, used the same way on
  every page. The docs have varied between "Settings → Auth" and
  "Settings → Authentication" — confirm the real label against the running app
  and use it everywhere.

## Style preferences

- Active voice, second person ("you"). One idea per sentence. Sentence case for
  headings. **Bold** for UI elements (Click **Settings**). Code formatting for
  file names, commands, paths, and code references.
- **Callout semantics — apply consistently:**
  - `<Warning>` — will break or lose something (silent install failure, a
    security downgrade, data loss). Use it for the dangerous cases only.
  - `<Note>` — worth knowing; neutral context.
  - `<Tip>` — an optional improvement.
- **`CardGroup`:** default to `cols={2}`. Use `cols={3}` only for a three-item
  set where each card is one short line. Never leave an orphaned cell — a
  three-card `cols={2}` grid orphans the third card; drop a card or move to
  `cols={3}`.
- **Tables** are top-level blocks. Never nest a pipe table inside a list item
  (it's the flakiest MDX construct and renders as a heading-less table).
- **Diagrams:** prefer a ```mermaid fenced block over ASCII box-art — ASCII
  frames can't reflow and overflow at 375px. Keep code blocks under ~70
  characters wide so they don't horizontal-scroll on mobile.
- Every page ends with a **"Next steps"** `<CardGroup cols={2}>` — reference
  pages need wayfinding too, since readers land on them from search.

## Content boundaries

- Document how to **deploy, configure, secure, operate, and use** BreachLens.
  Do **not** reveal proprietary scanner or correlation **algorithms/internals** —
  state outcomes ("proves which findings are exploitable"), not the mechanism.
- **No fabricated evidence** — no invented metrics, logos, testimonials, or
  counts. If a capability is partial or roadmap, say so.
- **Air-gap claims stay honest:** data residency (your code, findings, and AI
  inference stay in your network) is true; a *fully disconnected* deployment
  additionally requires the operator to provision offline mirrors for scanner
  rules and vulnerability data. Never write "fully air-gapped out of the box."
