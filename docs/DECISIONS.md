# Decisions

Substitutions and choices made under BRIEF.md Section 0, plus the CMS demonstration result.

## D1 — CMS: Sveltia CMS (not Decap) — 2026-10-22

**Choice:** Sveltia CMS `0.250.1`, loaded from unpkg on `/admin`, pinned to an exact version.

**Why:** The brief allows Decap or Sveltia, whichever gives the simplest supported login. Both use the same login here (see D2), so login doesn't decide it. Sveltia wins on the other points:
- It supports what the brief needs: the GitHub backend, `publish_mode: editorial_workflow` (one pull request per draft), and deploy-preview links taken from Netlify's commit status on each PR.
- It's actively maintained, and its editor is faster and clearer for non-technical committee members.
- It can resize photos before they're committed (`transformations.raster_image`: WebP, max 2400 px). That keeps oversized phone photos out of the repo and supports the 2 MB guidance.
- Its config stays Decap-compatible. If Sveltia ever has to be dropped, swapping the script tag in `public/admin/index.html` for Decap is a small change. Sveltia-only options (`media_libraries.default.config`, `slug`) would need removing.

**Upgrade policy:** bump the pinned version deliberately, test login → edit → preview → publish on a PR deploy preview, then merge.

## D2 — CMS login: Netlify's GitHub OAuth provider — 2026-10-22

**Choice:** `backend: github` with no `base_url`. The "Sign in with GitHub" pop-up uses Netlify's hosted OAuth provider (`api.netlify.com`), backed by a GitHub OAuth App owned by the society account.

**Why:** It's the simplest supported route. Nothing extra to host (unlike a Cloudflare Worker authenticator), and editors don't handle personal access tokens. Netlify **Git Gateway** is *not* used, as the brief requires. This is separate from Netlify Identity: editors sign in with their own GitHub accounts, and their access comes from being repo collaborators.

**Setup (one-off, human):**
1. GitHub → Settings → Developer settings → OAuth Apps → New. Homepage URL = site URL; callback URL = `https://api.netlify.com/auth/done`.
2. Netlify → Site configuration → Access & security → OAuth → Install provider → GitHub → paste the client ID and secret.

## D3 — Image paths — 2026-10-22

Uploads go to `/src/assets/uploads` and are stored in content as root-relative paths (`/src/assets/uploads/x.webp`). Astro's `image()` schema helper resolves these through Vite, so every CMS-uploaded photo goes through the Astro image pipeline (resized, WebP, responsive `srcset`). This was checked with a production build.

## D4 — Event times — 2026-10-22

Event start and end are stored as `YYYY-MM-DDTHH:mm` **Abu Dhabi local time with no offset**. The CMS datetime field uses a fixed format, so the value doesn't depend on the editor's browser time zone. The site treats every stored time as UTC+04:00; the UAE has no daylight saving.

## D5 — Placeholder flag — 2026-10-22

Every repeatable entry (committee, events, albums, documents) has a `placeholder` boolean. It makes placeholder scaffolding machine-identifiable, so it can be excluded from the launch build (BRIEF Section 13B).

## D6 — Netlify site — 2026-10-22

A new site, **`adss-website`** (`https://adss-website.netlify.app`, site ID `5bafe88b-9964-4401-93c1-f52529aa8efb`), was created in team "jpfox88's team" (Free plan). It builds `main` through the Netlify GitHub App, and deploy previews are on for pull requests. It is not linked to any existing site.

Note: an older Netlify site, `lucent-strudel-b8c6cf` (created 2026-03-31), is also connected to this repo and builds on every push. It's left untouched pending the owner's decision. See MISSING-CONTENT.md.

## CMS demonstration (BRIEF Section 0 / Section 16 step 2)

_Not yet run. The result will be recorded here._
