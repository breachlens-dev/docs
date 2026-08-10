# BreachLens documentation — writing instructions

Conventions for editing the BreachLens docs (Mintlify, MDX + `docs.json`).
These exist because past drift (a leaked architecture page, inconsistent
callouts, orphaned card grids, tables in lists) all traced back to there being
no written standard. Read this before editing.

## About this project

- Mintlify site; pages are MDX with YAML frontmatter; config in `docs.json`.
- Brand type: **Geist** (body/headings), self-hosted in `/fonts/` and declared
  via `docs.json` `fonts` (body 400, heading 600). Mintlify has no code-font key,
  so **Geist Mono** (400/500) plus the Geist 500 weight are self-hosted in
  `/fonts/` and applied via the auto-loaded root `style.css`. Primary blue `#1D4ED8`;
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
- **Trust-relationship / identity diagrams are the welcome exception.** A
  corporate-IdP→app or org→IdP-routing diagram names only the customer's own
  IdPs and code hosts, carries no stack, and is exactly what a procurement
  reviewer wants — keep these. The ban is on **infrastructure topology** (our
  services, ports-as-wiring, data stores, queues), in any format.
- **Operator-necessity carve-out (ports & enrollment).** A component's listening
  port, address, and enrollment field ARE publishable when an operator must know
  them to open a firewall or enroll something (e.g. the runtime sensor-manager
  port `1514`) — the same trust-boundary exception as above. Naming the port is
  fine; naming the engine behind it is not.
- **No internal model/field names in prose either.** `Repository.url`,
  `Finding.filePath`, `SsoConfig.allowedEmailDomains` — a PascalCase entity plus a
  dotted property IS the ORM schema, and it slips past tool-name sweeps because it
  carries no product name. It also buys the reader nothing (the REST API returns
  `filePath`, not `Finding.filePath`). Say it in reader vocabulary — "the file path
  shown in the finding drawer", "the SSO config's allowed email domains". A field
  name is fine inside a config **table's own column**, never in running prose.
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
- **Diagrams:** only trust/identity diagrams are publishable (see content
  boundary) — never infrastructure topology. For those, prefer ```mermaid over
  ASCII box-art (ASCII can't reflow and overflows at 375px). Keep code blocks
  under ~70 chars wide.
- Every page ends with a **"Next steps"** `<CardGroup cols={2}>`.
