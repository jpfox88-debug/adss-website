# Missing content and launch decisions

The single list of every placeholder, missing asset and launch decision. Each item is marked **must resolve before launch** or **can follow later**. Nothing listed here is confirmed content.

## Launch decisions

| Item | Status |
|---|---|
| Target launch date (`[INSERT DATE]` in the brief) | must resolve before launch |
| Production domain and Cloudflare DNS switch (currently www.adscottishsociety.com) | must resolve before launch |
| Society-owned GitHub account to own the repo and the CMS OAuth App (the repo currently lives under `jpfox88-debug`) | must resolve before launch |
| At least two committee members with Netlify and GitHub access | must resolve before launch |
| Editors' GitHub usernames to invite as collaborators | must resolve before launch |
| CMS proof (login → edit → preview → publish, photo upload, PDF upload) repeated with an **ordinary non-admin editor account** (write-only collaborator). The first proof used the owner account `jpfox88-debug`; see docs/DECISIONS.md D7 | must resolve before launch |

| Netlify environment variables `SITE_LAUNCHED=true`, `EXCLUDE_PLACEHOLDERS=true`, `SITE_URL=<domain>` and build command `npm run build:launch` (see docs/LAUNCH-CHECKLIST.md) | must resolve before launch |
| Update `site_url` / `display_url` in `public/admin/config.yml` to the production domain | must resolve before launch |
| Netlify plan choice (Free pauses every site when its 300 credits run out; see docs/HANDOVER.md §10) | must resolve before launch |

## Brand and media

| Item | Where | Status |
|---|---|---|
| Vector (SVG/PDF) versions of the Society logo, for crisper print and large display (the supplied JPEGs, up to 1600 px wide, are fine on screen) | `src/assets/brand/` | can follow later |
| Homepage opening photo: currently a decorative Unsplash landscape (Kilchurn Castle, Loch Awe). Replace with a strong, approved Society photo if the committee prefers one | Homepage → Opening photo | can follow later |
| Genuine Society event albums. Until one exists, Photos & Videos and the homepage show "Society event photos coming soon"; the seeded placeholder album is only a layout preview and is excluded at launch | Photos & videos | can follow later |
| Committee portraits of the actual members. Until uploaded, each member shows an initials tile (a thistle while the name is a placeholder) | Committee → Photo | can follow later |
| Event images: any event without its own image shows an illustrative Shetland coast photo with an "Illustrative image" caption. Upload the event's photo or artwork to replace it | Events → Event image | can follow later |
| The old site has photo pages for St Andrew's Ball 2025, May 2025 Ceilidh, Burns Supper 2025, Nov 2024 at The Club, Six Nations 2025 (Italy) and pre-Christmas drinks 2024. They are candidate sources for approved albums; once albums exist, point their redirects at them (docs/REDIRECTS.md) | Photos & videos | can follow later |

## Site settings (`src/content/settings/site.yaml`)

| Placeholder | Status |
|---|---|
| `[GENERAL CONTACT EMAIL]` | must resolve before launch |
| `[GENERAL WHATSAPP NUMBER]` | must resolve before launch |
| `[GENERAL PHONE NUMBER — optional]` | can follow later (remove if not used) |
| `[POSTAL ADDRESS — optional]` | can follow later (remove if not used) |
| `[COMMITTEE TERM, e.g. 2026–27]` | must resolve before launch |
| `[FACEBOOK URL]`, `[INSTAGRAM URL]` | must resolve before launch (or remove) |
| `[TAGLINE — optional]` | can follow later (remove if not used) |

## Homepage (`src/content/home/home.yaml`)

| Placeholder | Status |
|---|---|
| `[COMMITTEE INTRO — confirm wording]` | must resolve before launch |
| Welcome and about wording (drafted from the old site's objectives) — committee approval | must resolve before launch |

## Membership (`src/content/membership/membership.yaml`)

| Placeholder | Status |
|---|---|
| `[MEMBERSHIP OPTIONS]` | must resolve before launch |
| `[PRICES IN AED]` | must resolve before launch |
| `[MEMBERSHIP PERIOD]` | must resolve before launch |
| `[ELIGIBILITY RULES]` | must resolve before launch |
| `[RENEWAL ARRANGEMENTS]` | must resolve before launch |
| `[CONFIRMED BENEFITS]` | must resolve before launch |
| `[MEMBERSHIP WHATSAPP NUMBER]` — the Join button stays disabled until set | must resolve before launch |
| `[MEMBERSHIP EMAIL ADDRESS]` | must resolve before launch |
| Partner names, logos and offers (must be current and approved) | can follow later |

## Committee (`src/content/committee/`)

| Placeholder | Status |
|---|---|
| Placeholder profiles `[PRESIDENT NAME]`, `[SECRETARY NAME]`, `[TREASURER NAME]`: real names, roles, photos and approved bios for every member | must resolve before launch |

## Events (`src/content/events/`)

| Placeholder | Status |
|---|---|
| `[PLACEHOLDER EVENT — not a real event]` (its dates are layout placeholders only) | must resolve before launch (remove) |
| First confirmed real events with venue, prices and booking method | must resolve before launch |

## Downloads (`src/content/documents/`, `public/documents/`)

| Placeholder | Status |
|---|---|
| `[PLACEHOLDER] Society constitution` + `placeholder-document.pdf` | must resolve before launch (replace) |
| Approved current constitution | must resolve before launch |
| Approved (redacted) committee and AGM minutes | can follow later |
