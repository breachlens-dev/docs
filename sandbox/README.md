# BreachLens Sandbox Worker

A public, **read-only** Cloudflare Worker that powers the **“Sandbox (demo)”** server in
the docs API playground (`docs.breachlens.app`). Evaluators click **Send** and get the
**real, sanitized 17-finding DVWA SARIF** back — zero setup, no token of their own, no
deployment of their own.

**Isolated from production by construction.** No database, no scanner, no queue — just
canned trigger/status responses + a bundled SARIF blob. Nothing an anonymous visitor does
can reach aurora.

## Routes

| Method | Path | Response |
|---|---|---|
| `POST` | `/api/scans/from-github` | `202` canned `{ scanJobId, status: PENDING, … }` |
| `POST` | `/api/{repos,containers,domains}/:id/scan` | `202` canned |
| `GET`  | `/api/scans/:id` | `{ status: "COMPLETED" }` |
| `GET`  | `/api/scans/:id/export.sarif` | the seeded SARIF (17 findings) |

**Auth:** any `Authorization: Bearer blt_…` is accepted (the docs pre-fill a demo token).

## Seed data

`src/seed.sarif.json` is the **real** DVWA scan output from aurora, run through the same
`findingsToSarif` exporter, then **sanitized**: internal finding CUIDs → `demo-f-NN`,
fingerprints → `demo-fp-NN`, `helpUri`/`informationUri` → `sandbox.breachlens.app`. No
aurora host, no production identifiers. Regenerate via the seed-build script if the demo
findings change.

## Deploy (needs your Cloudflare account)

```bash
cd sandbox
npx wrangler login
npx wrangler deploy
```

Then point the domain at it — dashboard: **Workers & Pages → breachlens-sandbox →
Settings → Domains & Routes → Add → Custom domain → `sandbox.breachlens.app`**
(or uncomment the `routes` line in `wrangler.toml` and re-deploy; the `breachlens.app`
zone must be in this Cloudflare account).

**Verify:**
```bash
curl -s -H "Authorization: Bearer blt_demo" \
  https://sandbox.breachlens.app/api/scans/demo/export.sarif | head -c 200
```

## Rate limiting (recommended)

Add a Cloudflare **WAF rate-limiting rule** on `sandbox.breachlens.app/*` (e.g. 30 req/min
per IP). The responses are canned + read-only, so abuse value is near-zero — this is just
defense-in-depth.

## After it's live

Ping me — I'll wire **`Sandbox (demo)`** as the **default** server + the demo token into
`api-reference/openapi.json` (the last step), and the playground is live end-to-end.
