# Old site → new site redirects

The old URLs were found in the old site's menu scripts (`Scripts_CSS/menu_items.js`) on 22 October 2026. The rules are in `public/_redirects` (permanent 301 redirects). URLs not listed here get the 404 page; nothing is redirected to the homepage as a catch-all.

| Old URL | New URL | Note |
|---|---|---|
| `/index.html` | `/` | Netlify serves the new homepage at this path directly, because the file exists; its canonical tag points to `/`. |
| `/EventsList.html` | `/events/` | Upcoming Events |
| `/MemberDiscounts.html` | `/join/` | Confirmed benefits now sit on the joining page; redemption details are for the future members' area. |
| `/Committee/Committee.html`, `/Committee` | `/committee/` | |
| `/Constitution/constitution.html`, `/Constitution` | `/downloads/` | Constitution is listed first in Downloads. |
| `/2025StABall01/…` to `/2025StABall05/…` | `/photos/` | St Andrew's Ball 2025 photo pages |
| `/2025-05Ceilidh01/…` to `/2025-05Ceilidh07/…` | `/photos/` | May 2025 Ceilidh photo pages |
| `/Burns25Club/…` | `/photos/` | Burns Supper 2025 |
| `/Nov24Club/…` | `/photos/` | November 2024 at The Club |
| `/SixNations25-Italy/…` | `/photos/` | Six Nations 2025, Italy |
| `/XmasDrinks24/…` | `/photos/` | Pre-Christmas drinks 2024 |
| `/sitemap.xml` | `/sitemap-index.xml` | Rewrite (200), not a redirect |

**Later:** if approved albums are created for these events, change each photo redirect to point at its album (e.g. `/Burns25Club/* /photos/burns-supper-2025/ 301`) and update this table.

Verified on the PR deploy preview on 22 October 2026. Each old URL above returned 301 to the new URL shown, and `/some/old/unknown.html` returned the 404 page.
