# Old site → new site redirects

The old URLs were found in the old site's menu scripts (`Scripts_CSS/menu_items.js`) on 22 October 2026. The rules are in `public/_redirects` (permanent 301 redirects). URLs not listed here get the 404 page; nothing is redirected to the homepage as a catch-all.

| Old URL | New URL | Note |
|---|---|---|
| `/index.html` | `/` | Cloudflare Pages redirects `/index.html` to `/` (301). |
| `/EventsList.html` | `/events/` | Upcoming Events |
| `/MemberDiscounts.html` | `/join/` | Confirmed benefits now sit on the joining page; redemption details are for the future members' area. |
| `/Committee/Committee.html`, `/Committee` | `/committee/` | |
| `/Constitution/constitution.html`, `/Constitution` | `/downloads/` | Constitution is listed first in Downloads. |
| `/2025StABall01/…` to `/2025StABall05/…` | `/photos/2025-st-andrews-ball/` | St Andrew's Ball 2025 photo pages |
| `/2025-05Ceilidh01/…` to `/2025-05Ceilidh07/…` | `/photos/2025-05-ceilidh/` | May 2025 Ceilidh photo pages |
| `/Burns25Club/…` | `/photos/2025-burns-supper/` | Burns Supper 2025 |
| `/Nov24Club/…` | `/photos/2024-11-the-club/` | St Andrew's Gathering, November 2024 at The Club |
| `/SixNations25-Italy/…` | `/photos/2025-six-nations-italy/` | Six Nations 2025, Scotland v Italy |
| `/XmasDrinks24/…` | `/photos/` | Pre-Christmas drinks 2024: no album, so the Photos & Videos page |
| `/sitemap.xml` | `/sitemap-index.xml` | Rewrite (200), not a redirect |

Each old photo folder now points at the album imported from it. Every page of a multi-page old album (e.g. `2025StABall01` to `05`) goes to the first page of the new album. If a pre-Christmas drinks 2024 album is added later, point `/XmasDrinks24/*` at it.

**Hostname redirect (prepared, not enabled):** `adss-website.pages.dev` → `https://adscottishsociety.com`, preserving path and query, via a Cloudflare Bulk Redirect. Enable it only after the domain is live; steps in [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md).

Album redirects updated 30 October 2026. First verified on the PR deploy preview on 22 October 2026. Each old URL above returned 301 to the new URL shown, and `/some/old/unknown.html` returned the 404 page.
