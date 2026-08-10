# BreachLens documentation — writing instructions

Conventions for editing the BreachLens docs (Mintlify, MDX + `docs.json`).
These exist because past drift (a leaked architecture page, inconsistent
callouts, orphaned card grids, tables in lists) all traced back to there being
no written standard. Read this before editing.

## About this project

- Mintlify site; pages are MDX with YAML frontmatter; config in `docs.json`.
- Brand type: **Geist** (body/headings), self-hosted in `/fonts/` and declared
  via `docs.json` `fonts`. (Mintlify has no code-font key, so the mono face is
  the theme default until we add custom CSS.) Primary blue `#1D4ED8`;
  `colors.light` must stay AA on white (`#2563EB`, not `#3B82F6`). No
  teal/amber/rose; red = errors/danger only.
- Audience is two-sided: an **operator** getting to a first scan, and a
  **technical buyer / procurement reviewer**. Serve one of them clearly.

## Content boundaries — READ THIS

- **NEVER publish internal architecture or name the tool stack.** No topology
  diagrams; no service/tech names (the app framework, ORM, queue, datastores,
  proxy); no per-tier OSS engine names (the SAST/DAST/SCA/container/IaC/pentest
  engines, the crawler, the runtime sensors). State **outcomes**, never the HOW.
  "It's operator/deployment docs, they need to know how it's built" is the exact
  wrong rationalization — operators need the trust boundary and the ports, not
  the engine list. Before publishing ANY page, grep the draft for tool/stack
  names. (An architecture page was published and reverted for this in Aug 2026.)
- **No fabricated evidence** — no invented metrics, logos, testimonials, counts.
  If a capability is partial or roadmap, say so.
- **Air-gap claims stay honest** — data residency is true; a *fully disconnected*
  deployment additionally needs operator-provisioned offline mirrors. Never write
  "fully air-gapped out of the box."

## Terminology

- The product is **BreachLens**. "DevSecOps" is technical framing, not the name.
- BreachLens runs **9 scanner tiers** — keep that count consistent.
- Match the app's exact UI labels incl. casing: **MCP servers** (lowercase `s`).
  Refer to a Settings tab by its exact in-app label, used the same everywhere.

## Style preferences

- Active voice, second person. One idea per sentence. Sentence-case headings.
  **Bold** for UI elements; `code` for file names, commands, paths, code refs.
- **Callout semantics:** `<Warning>` = will break or lose something (silent
  failure, security downgrade, data loss); `<Note>` = worth knowing; `<Tip>` =
  optional improvement. Use `<Warning>` for the dangerous cases only.
- **`CardGroup`:** default `cols={2}`; `cols={3}` only for a three-item set of
  one-line cards. Never leave an orphaned cell.
- **`CodeGroup`:** for **alternatives** (pick one) — e.g. curl / Node / Python,
  or install methods. For **procedures** (do all, in order) use plain sequential
  code blocks inside `<Steps>`, NOT a CodeGroup.
- **Tables** are top-level blocks — never nest a pipe table inside a list item.
  Keep tables narrow (fold secondary columns into the primary cell with `<br/>`)
  so the meaning column isn't the first thing pushed off-screen on mobile.
- **Diagrams:** prefer ```mermaid over ASCII box-art (ASCII can't reflow and
  overflows at 375px). Keep code blocks under ~70 chars wide.
- Every page ends with a **"Next steps"** `<CardGroup cols={2}>`.
