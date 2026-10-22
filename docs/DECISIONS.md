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

An older Netlify site, `lucent-strudel-b8c6cf` (created 2026-03-31), was also connected to this repo. On 2026-10-22 the owner asked for it to be deleted. When `netlify sites:delete` ran, the site was already gone: the API returned "no project with that ID" and its URL returns 404. `adss-website` is now the only Netlify site in the team.

## D8 — Netlify deploy notifications added by API — 2026-10-22

Because the site was created through the Netlify API, it had **no deploy notifications**, so Netlify posted no commit status on PRs. Deploy previews were built, but GitHub and the CMS couldn't see them. The standard notifications the Netlify dashboard creates for Git-linked sites were added: `github_app_commit_status` and `github_app_checks` for `deploy_building`, `deploy_created` and `deploy_failed`. After a retry, both PRs showed `netlify/adss-website/deploy-preview: success`, and Sveltia's **View Preview** button opened the right preview.

## CMS demonstration (BRIEF Section 0 / Section 16 step 2)

**D7 — Proof run with the owner account (2026-10-22).** On the owner's instruction, the first end-to-end proof uses `jpfox88-debug`, the repo **owner/admin** account, because no ordinary editor account is available yet. This **does not satisfy** the brief's requirement for an ordinary (non-admin) editor account. **A repeat of the proof with a non-admin collaborator (write access only) is still required before launch.** It is tracked in MISSING-CONTENT.md as must resolve before launch.

**Result: PASS with the owner account, 2026-10-22, run in Chrome against https://adss-website.netlify.app/admin/.**

| Step | Evidence |
|---|---|
| Login | "Sign in with GitHub" through Netlify's OAuth provider landed in the CMS as `jpfox88-debug`. |
| Edit | Homepage → Welcome text: appended `[CMS TEST EDIT]`. |
| Photo upload | Homepage → Opening photo: uploaded a 3000×2000 JPEG (77 KB). The CMS converted it to `src/assets/uploads/cms-test-photo.webp` before committing. Astro then built 640/1280 px WebP variants. |
| Draft → PR | Save created PR #1 (`cms/pages/home`, label `sveltia-cms/draft`) containing the photo and the YAML change. |
| PDF upload | Downloads → new entry "[CMS TEST] PDF upload test": uploaded `cms-test-document.pdf` to `public/documents/`, creating PR #2. |
| Preview | Netlify deploy previews `deploy-preview-1--…` and `deploy-preview-2--…` built. The CMS **View Preview** button opened preview 1, showing the edited text and the new photo. Preview 2 listed the document, and the PDF is served as `application/pdf`. |
| Review → publish | Status Draft/In review → Ready → Publish merged PR #1 (`f78235e`) and PR #2 (`b19a3af`) into `main`. |
| Production | Production deploy `b19a3af` is live. The homepage shows `[CMS TEST EDIT]` and the responsive WebP hero, and `/documents/cms-test-document.pdf` returns 200. |

**Not yet proven:** the same flow with a non-admin collaborator (write access only). That is still required before launch; see MISSING-CONTENT.md.

**Notes for later steps:**
- The CMS rewrites YAML in its own quoting style on first save, which makes the first diff noisy. Seed files should be written in that style (step 4).
- The owner confirmed the proof on 2026-10-22, including publishing a change of their own from the CMS, which went live. The test content was then removed.
