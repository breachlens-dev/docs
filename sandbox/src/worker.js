// BreachLens Sandbox — a public, read-only Cloudflare Worker that powers the
// "Sandbox (demo)" server in the docs API playground (docs.breachlens.app).
//
// It is ISOLATED from production (aurora) by construction: it holds no database,
// no scanner, no queue — only canned trigger/status responses plus the real,
// sanitized 17-finding DVWA SARIF. Evaluators click Send and get real findings
// back with zero setup, and nothing they do can touch production.
//
// Routes:
//   POST /api/scans/from-github                     -> 202 (canned)
//   POST /api/{repos,containers,domains}/:id/scan   -> 202 (canned)
//   GET  /api/scans/:id                             -> { status: "COMPLETED" }
//   GET  /api/scans/:id/export.sarif                -> the seeded SARIF (17 findings)
// Auth: any `Authorization: Bearer blt_…` (the docs pre-fill a demo token).

import seed from "./seed.sarif.json" with { type: "json" };

const SCAN_TYPES = ["SAST", "SCA", "SECRET", "IAC"];
const DEMO_SCAN = "demo-scan-01";
const STARTED = seed.runs?.[0]?.invocations?.[0]?.startTimeUtc ?? null;
const COMPLETED = seed.runs?.[0]?.invocations?.[0]?.endTimeUtc ?? null;

// Public read-only demo → permissive CORS so the playground works both through
// Mintlify's proxy and browser-direct. Also allow the CF Access headers so a
// request shaped for the real (edge-fronted) API still passes cleanly here.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Authorization, Content-Type, CF-Access-Client-Id, CF-Access-Client-Secret",
  "Access-Control-Max-Age": "86400",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-breachlens-sandbox": "true",
      ...CORS,
    },
  });
}

export default {
  async fetch(request) {
    const { method } = request;
    const path = new URL(request.url).pathname;

    if (method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    if (method === "GET" && (path === "/" || path === "/health")) {
      return json({
        service: "breachlens-sandbox",
        status: "ok",
        note: "Read-only demo API for the docs playground. Isolated from production.",
      });
    }

    // No auth required — this is a public, read-only demo sandbox. A bearer is
    // accepted if sent (so a request shaped for the real API still works), but
    // none is needed: there is nothing here worth protecting, and zero-setup
    // "just click Send" is the whole point.

    // Trigger (canned) — from-github
    if (method === "POST" && path === "/api/scans/from-github") {
      return json(
        {
          scanJobId: DEMO_SCAN,
          status: "PENDING",
          scanTypes: SCAN_TYPES,
          repository: { id: "demo-repo-01", fullName: "breachlens-demo/dvwa", newlyCreated: false },
        },
        202,
      );
    }

    // Trigger (canned) — existing repo / container / domain
    if (method === "POST" && /^\/api\/(repos|containers|domains)\/[^/]+\/scan$/.test(path)) {
      return json({ scanJobId: DEMO_SCAN, status: "PENDING", scanTypes: SCAN_TYPES }, 202);
    }

    // SARIF export — the real seeded findings
    if (method === "GET" && /^\/api\/scans\/[^/]+\/export\.sarif$/.test(path)) {
      return json(seed);
    }

    // Status — always COMPLETED (canned data is instant)
    if (method === "GET" && /^\/api\/scans\/[^/]+$/.test(path)) {
      return json({
        id: path.split("/").pop(),
        status: "COMPLETED",
        scanTypes: SCAN_TYPES,
        currentPhase: null,
        currentPhasePct: 100,
        startedAt: STARTED,
        completedAt: COMPLETED,
      });
    }

    return json({ error: "Not found in sandbox", path }, 404);
  },
};
