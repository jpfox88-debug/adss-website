# Missing content: launch handover checklist

One line per piece of information. Where the same detail appears in several places on the site, it is listed once, with every place it fills. Nothing in square brackets on the preview is confirmed content.

The launch build checks this automatically: `npm run build:launch` fails while any placeholder text, demonstration entry, test file or preview-only link is left, while there is no committee member or no current constitution, or while addresses still use a hosting address (pages.dev or netlify.app) instead of the Society's domain.

## A. Launch essentials — information the committee must supply

### Membership (CMS: Site pages & settings → Membership & joining)

- [ ] **Membership WhatsApp number**, international format (e.g. +971 50 123 4567). Turns on the **Join via WhatsApp** button, which stays disabled until then. *Replaces* `[MEMBERSHIP WHATSAPP NUMBER]`.
- [x] **Membership email**: committee@adscottishsociety.com (26 Oct).
- [x] **Membership price**: AED 100, Society membership — a single option (26 Oct).
- [x] **Membership period and renewals**: calendar year January–December, renewals from 1 January (26 Oct).
- [x] **Who can join**: anyone (26 Oct).
- [x] **Member benefits**: four benefits written by JP (26 Oct) — a warm Scottish welcome, first access to events, keeping traditions thriving, member discounts.

### Committee (CMS: Committee, and Site pages & settings)

- [ ] **Current committee**: the nine-member 2026 list is in (confirmed by JP, 26 Oct); biographies are deliberately not shown for now. Still needed: portraits for Jane Taylor and Heather Gorman (initials tiles until then), and confirmation that the role email addresses carried over from the old site are still live.
- [x] **Committee term**: 2026–2027 (confirmed by JP).
- [x] **Committee introduction** for the homepage: confirmed by JP.

### General contact (CMS: Site pages & settings → Contacts, social links & committee term)

- [x] **General contact email**: committee@adscottishsociety.com (confirmed by JP, 26 Oct).
- [x] **WhatsApp**: the footer links to the Society's Updates WhatsApp group instead of a number (confirmed by JP, 26 Oct).

### Constitution (CMS: Downloads)

- [x] **Constitution**: v1.2 (revised 8 June 2026, SSAD001-02) is on the Downloads page as the current version (supplied by JP, 26 Oct).

### Sign-off

- [ ] **Homepage welcome and about wording**, drafted from the old site's objectives: committee approval or edits.

### Photo albums (repository: `src/content/albums/`)

- [ ] **St Andrew's Ball 2025 date.** The old website gives no date for this album; the entry uses 29 November 2025 as a placeholder and carries a `[DATE TO CONFIRM]` note in its description, which the launch build rejects. Confirm the actual date, set `date` in `src/content/albums/2025-st-andrews-ball.md` and remove the bracketed note. *Replaces* `[DATE TO CONFIRM …]`.

## B. Launch essentials — setup by the website owner

- [ ] **Launch date.** (`[INSERT DATE]` in the brief.)
- [ ] **Domain**: the production domain, added to the Cloudflare Pages project as a custom domain (currently www.adscottishsociety.com, whose DNS is still served by the old host). Then set `site_url` and `display_url` in `public/admin/config.yml`.
- [ ] **Cloudflare Pages launch settings**: in the production environment `SITE_LAUNCHED=true`, `EXCLUDE_PLACEHOLDERS=true`, `SITE_URL=<domain>`, and the build command `npm run build:launch`, all before the domain switch (docs/LAUNCH-CHECKLIST.md).
- [ ] **Ownership and access**: a Society-owned GitHub account to own the repo and the CMS OAuth App (the repo is currently under `jpfox88-debug`), and at least two committee members with Cloudflare and GitHub access. The CMS sign-in OAuth App and the Cloudflare account are currently the owner's personal ones.
- [ ] **Editors**: the GitHub usernames of everyone who will edit, to invite as collaborators.

## C. Can follow later

- [ ] **Committee portraits**: five carried over from the old site; Jane Taylor and Heather Gorman show an initials tile until a photo is supplied.
- [x] **Confirmed events**: the Cèilidh at The Club, Saturday 14 November 2026, is in with prices, dress code, age limit, menu link and email booking (from the poster supplied by JP). The demonstration event has been removed. Add further events in the CMS as they're confirmed.
- [ ] **Event photos or artwork**: any event without its own image shows a Society photo (the Ceilidh saltire bar) captioned "Illustrative image".
- [ ] **Old-site redirects to the imported albums.** The old site's five albums (St Andrew's Ball 2025, May 2025 Ceilidh, Six Nations February 2025, Burns Supper 2025, St Andrew's Gathering November 2024) are now on the site under `/photos/`. Point each old photo-page redirect at its album rather than `/photos/` (docs/REDIRECTS.md). The pre-Christmas drinks 2024 album is gone from the old server; if someone still has the photos they can be added as a new album.
- [ ] **Old-site videos** (seven, MP4 on the old server, not downloaded): re-host each on YouTube or Vimeo (unlisted is fine) and add the link under **Videos** in the matching album.
  - Six Nations, February 2025: `https://adscottishsociety.com/SixNations25-Italy/Videos/SixNats-SnB.mp4`, `https://adscottishsociety.com/SixNations25-Italy/Videos/Slideshow.mp4`
  - Burns Supper 2025: `https://adscottishsociety.com/Burns25Club/Videos/Burns%20Video%20Clip%202025-01-25.mp4`, `https://adscottishsociety.com/Burns25Club/Videos/SeanVideo.mp4`, `https://adscottishsociety.com/Burns25Club/Videos/Burns25Slideshow.mp4`
  - St Andrew's Gathering, November 2024: `https://adscottishsociety.com/Nov24Club/Videos/Nov24VideoClip-01.mp4`, `https://adscottishsociety.com/Nov24Club/Videos/WhatsApp%20Video%202024-11-25.mp4`
- [x] **Committee minutes 2026**: twelve meetings (5 Jan – 5 Oct) are on Downloads in a by-year carousel; two personal email addresses in the 15 June minutes were redacted before publishing. Earlier years and AGM minutes can be added in the CMS when approved.
- [ ] **Partner names, logos and offers**, only if current and approved.
- [x] **Social links**: Facebook and Instagram set (26 Oct). Phone and postal address are not shown.
- [x] **Homepage opening photo**: now a Society photo from the St Andrew's Ball 2025 dance floor (album photo 180), chosen by JP. Inner-page headers keep the Scottish landscapes.
- [ ] **Vector logo** (SVG or PDF) for print and very large display. The supplied JPEGs are fine on screen.

Not used on the site, so no action is needed: the `tagline` setting (`[TAGLINE — optional]`).
