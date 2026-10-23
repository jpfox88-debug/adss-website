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

## D9 — Self-hosted fonts — 2026-10-22

Cormorant Garamond (headings) and Source Sans 3 (body), originally Alegreya and Alegreya Sans (see D13), are served from the site itself through `@fontsource` packages, with Latin subsets only, rather than from Google Fonts. Public pages therefore contact no third party, which keeps the privacy page simple and avoids a cookie or consent question.

## D10 — Markdown processor — 2026-10-22

Astro 7's default Markdown processor (Sätteri) doesn't run rehype plugins. `@astrojs/markdown-remark` is installed so that `src/lib/rehype-placeholders.mjs` can highlight `[PLACEHOLDER]` text in Markdown bodies (biographies, event descriptions) the same way as in fields.

## D11 — Pre-launch protection and launch gate — 2026-10-22

- Until `SITE_LAUNCHED=true` is set in Netlify, every page carries `noindex` and `robots.txt` disallows everything, so the placeholder site isn't indexed.
- `EXCLUDE_PLACEHOLDERS=true` drops every entry marked `placeholder: true` from the build.
- `npm run build:launch` sets both and then fails if any `[PLACEHOLDER]` text remains on a public page (`scripts/check-placeholders.mjs`). Using it as the production build command after launch means a placeholder can never be published by accident. Tested: the launch build drops the placeholder event, album, committee and document, shows the "No events are currently scheduled" block, and the gate lists the 67 placeholder fields still waiting for confirmed content.

## D12 — Event "upcoming" logic — 2026-10-22

As BRIEF §6 specifies, every list renders all the events it might need, with `data-end` (absolute ISO time) and `data-status`. `src/scripts/event-visibility.ts` re-splits them against the visitor's clock. Without JavaScript the build-time split stands. This was tested with temporary past and cancelled events, which were not committed:
- the build-time split was correct on the homepage, upcoming and archive pages;
- a cancelled event was never chosen as next;
- moving an end time into the past in the browser hid the event, showed the no-events block, and switched the event page to "This event has finished" with booking hidden.

## D13 — Name, logo and visual redesign — 2026-10-22

- **Name:** the Society is **Scottish Society Abu Dhabi**. It is changed everywhere, including BRIEF.md. "ADSS" remains only in historical source URLs and the repo/domain identifiers.
- **Logo:** the three supplied logos replace the old site's low-resolution PNG. Reversed variants (black → cream, blue → sky `#7FB2FF`, green and red unchanged) are used on navy and over photos; the originals are used on cream. The owner approved this on 2026-10-22. Provenance is in IMAGE-CREDITS.md.
- **Typography:** Cormorant Garamond (display) and Source Sans 3 (body, navigation, buttons), self-hosted. Lining figures are used throughout, because Cormorant's old-style "1" reads as "I" in dates.
- **Palette:** warm cream `#F5F0E8` dominant; navy for the hero overlay, event band, footer and calls to action; the logo's green `#2E7D32` (text links `#25692A`) and red `#E8363A` (decorative only; `#C62D33` where red must be read) as restrained accents. The logo's blue stays inside the logo. Tartan is no longer used.
- **Photography:** decorative Scottish stock (nine Unsplash photos, credited in IMAGE-CREDITS.md) appears only in the homepage hero, the next-event band, compact inner-page headers, and as the illustrative fallback for events without an image, which carries an "Illustrative image" caption. Albums and committee portraits are always genuine Society photos, never stock. Without them the site shows a "coming soon" state and initials tiles.
- **Bug fixed:** component `display` rules were overriding the `hidden` attribute, so ended or future events could still be visible on the wrong list. The global rule `[hidden] { display: none !important }` fixes this. It was re-verified with computed visibility, not just the attribute.

## D14 — Review tidy-ups and stricter launch gate — 2026-10-22

- **Header logo:** the homepage header shows the thistle alone at every width, because the hero already carries the stacked logo. Inner pages keep the horizontal logo (thistle alone on phones).
- **Buttons:** the main action is navy on light backgrounds. On the navy photo overlays (hero, transparent header) it becomes cream with navy text, because a navy button would disappear there. Secondary actions are outlined. Green and red are no longer button colours; they stay as small accents (rules, bullets, panel edges, the current-page underline).
- **Numerals:** dates in the event tiles and membership prices use Source Sans 3, because Cormorant's "1" reads as "I".
- **Launch gate:** `npm run build:launch` now also removes the demonstration files and fails on bracketed text anywhere in a page, demonstration or test entries and files, preview-only notes (`data-preview-only`), deploy-preview links, noindex tags, Netlify addresses instead of the Society domain, no committee members, or no current constitution. Optional phone, postal address and social links are dropped from the launch build while they are unsupplied.

## D15 — Album photos: two shapes (pipeline or pre-sized) — 2026-10-22

The `albums` collection accepts each photo, and the cover, in one of two shapes: a CMS-uploaded image (`{ image, alt, caption? }`, resolved by `image()` and resized by Astro at build time, as D3) or a pre-sized photo (`{ src, thumb, width, height, alt, caption? }`, pointing at files under `public/albums/<slug>/{full,thumb}/` that are served unchanged). The five albums imported from the old site (624 photos) use the second shape. Pushing 600+ photos through the image pipeline would have made every Netlify build slow and used build credits for images that never change, so they were resized once (full max 2000 px, thumb max 640 px) and committed as static files. The templates render both: pre-sized photos use the thumb in grids and the full file in the lightbox, with `width`/`height` attributes so the layout doesn't shift. New albums created in the CMS keep the first shape; the CMS can't edit the imported albums' photo lists, which are managed in the repository (docs/HANDOVER.md §5). Albums longer than 60 photos are paged at `/photos/<slug>/2/` etc.

## D16 — Public repository and the ordinary-editor test — 2026-10-23

- **Why public:** on the Free plan, Netlify only builds commits to a private repo from members of the Netlify account, and the Free plan has one member. The editor account's previews were blocked ("Unrecognized Git contributor"). Builds from public repos have no membership requirement, so the owner made the repo public instead of upgrading.
- **Checked first:** the full history on every branch and PR ref, including all images and PDFs. No keys, tokens, OAuth secret, real phone numbers or image GPS data were found. The owner's personal email is in the author field of 45 earlier commits; the owner accepted this. Future commits on the owner's machine use the GitHub no-reply address.
- **Netlify setting:** Netlify keeps its own `public_repo` flag from when the site was linked. It stayed `false` after the repo went public, and builds stayed blocked until the repo link was updated through the API.
- **Editors:** HANDOVER.md now warns that drafts are publicly readable.
- **Test result (ADSS2026, Write access, not admin):** login, edit, deploy preview, publish, photo upload (converted to WebP) and PDF upload all worked. Every draft and published commit is authored by ADSS2026, and publishing merged each draft into main. The three production builds were then skipped because the account's monthly credits had run out, so the live-site check is still to confirm (MISSING-CONTENT.md). The test content was removed from main in one revert commit.

## D17 — Hosting moved from Netlify to Cloudflare Pages — 2026-10-23

**Why:** the Netlify Free plan's monthly credits ran out during the build and the owner did not want to pay for it. Cloudflare Pages' free plan has no bandwidth charge and never pauses the site; the owner already uses Cloudflare.

**What changed**
- **Pages project** `adss-website` on the owner's Cloudflare account, connected to the public GitHub repo through Cloudflare's GitHub integration (created with the Cloudflare API, not Direct Upload). Production branch `main`; previews for every branch and pull request, including the CMS's `cms/…` draft branches. Build command `npm run build`, output `dist`, Node 24 (`.node-version` and `NODE_VERSION=24` in both environments). Production: https://adss-website.pages.dev.
- **Headers:** `public/_headers` replaces `netlify.toml`'s headers. `scripts/write-headers.mjs` (run by both build commands) adds `X-Robots-Tag: noindex` to the `/*` rule until `SITE_LAUNCHED=true`. Cloudflare applies one rule per identical path and combines headers across matching rules, so a header is set in one rule only; a first attempt that appended a second `/*` rule silently dropped the security headers and was fixed before verification. `/admin/` stays noindex after launch. There was no Content Security Policy, so nothing had to change for the sign-in Worker.
- **Redirects and 404:** `public/_redirects` works unchanged (Cloudflare supports the same syntax; 16 wildcard rules against a limit of 100). Astro's `404.html` is served with a 404 status for unknown URLs.
- **CMS sign-in:** Netlify's OAuth provider is replaced by `sveltia-cms-auth` deployed as the Worker `adss-cms-auth` (https://adss-cms-auth.jpfox88.workers.dev), source and config in `cms-auth/`. `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are encrypted Worker secrets set by the owner; they are not in the repo. `ALLOWED_DOMAINS` is `adss-website.pages.dev`, `*.adss-website.pages.dev`, `adscottishsociety.com` and `www.adscottishsociety.com`. The new GitHub OAuth App (owned by jpfox88-debug) has callback `https://adss-cms-auth.jpfox88.workers.dev/callback`. `public/admin/config.yml` sets `base_url` to the Worker and `preview_context: Cloudflare Pages`, the check run Cloudflare posts with each preview address. The GitHub backend, editorial workflow and Write-only editor access are unchanged.
- **Site URL:** defaults to `https://adss-website.pages.dev`; `SITE_URL` overrides it at launch. The launch gate now rejects `pages.dev` as well as `netlify.app` addresses.
- **Netlify removed:** after verification, the Netlify site (`adss-website`, no custom domain) was deleted and `netlify.toml` removed. The Society domain never pointed at Netlify: it is still served by the old host (148.113.24.31, nameservers `in3/in4.cloudhostingforlinux.com`).

**Verification (2026-10-23)**
- First production build: commit `e14cd61` (current `main`, including `cd71a12` and `6f230b6`, plus the migration). Build stage 26 s; queue to live 58 s. Output 1,376 files (limit 20,000); largest file 471 KiB, `albums/2025-05-ceilidh/full/299.jpg` (limit 25 MiB).
- On https://adss-website.pages.dev: all pages 200, unknown URLs 404 with the site's 404 page, old-site redirects 301, `/sitemap.xml` 200, noindex header and meta, `/admin/` loads. The eight committee entries and the five imported albums are present; album photos, committee portraits, the hero and the PDF load; no test content; the design is unchanged; the Join button stays disabled while the WhatsApp number is a placeholder, and the message text is unchanged.
- Pull-request preview: PR #13 built at https://docs-cloudflare-hosting.adss-website.pages.dev (and https://7f1c0349.adss-website.pages.dev), with the same headers, redirects and 404.
- CMS sign-in through the Worker worked on production and on the preview hostname.

**Ordinary-editor test, final step (ADSS2026, Write access, not admin), 2026-10-23.** Signed into https://adss-website.pages.dev/admin as ADSS2026 through the Worker. Added "[EDITOR TEST — CLOUDFLARE]" to the homepage welcome text and saved: draft PR #14 (`cms/pages/home`, commit `2943e0a`, authored by ADSS2026). Cloudflare built the preview (https://cms-pages-home.adss-website.pages.dev, https://15f87f41.adss-website.pages.dev) and the editor's **View Preview** opened it; production was unchanged. Set to Ready and published: PR #14 merged by ADSS2026 as `e98c011`; Cloudflare production deployment `5845c992` (trigger: GitHub push) went live and the text appeared on https://adss-website.pages.dev. Removed by reverting it in `37f61c9`; production deployment `22c9c512` is clean. With the 22 October uploads (D16), the ordinary-editor test is **complete**.

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
