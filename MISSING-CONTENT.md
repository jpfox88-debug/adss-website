# Missing content: launch handover checklist

One line per piece of information. Where the same detail appears in several places on the site, it is listed once, with every place it fills. Nothing in square brackets on the preview is confirmed content.

The launch build checks this automatically: `npm run build:launch` fails while any placeholder text, demonstration entry, test file or preview-only link is left, while there is no committee member or no current constitution, or while addresses still point at Netlify instead of the Society's domain.

## A. Launch essentials — information the committee must supply

### Membership (CMS: Site pages & settings → Membership & joining)

- [ ] **Membership WhatsApp number**, international format (e.g. +971 50 123 4567). Turns on the **Join via WhatsApp** button, which stays disabled until then. *Replaces* `[MEMBERSHIP WHATSAPP NUMBER]`.
- [ ] **Membership email address.** *Replaces* `[MEMBERSHIP EMAIL ADDRESS]`.
- [ ] **Membership options and prices in AED**: each option's name, price and one-line description, e.g. individual, family, student. Shown on Join and in the homepage "Why join" panel. *Replaces* `[MEMBERSHIP OPTIONS]`, `[PRICES IN AED]`, `[OPTION DESCRIPTION]`.
- [ ] **Membership period and renewals**: calendar year or rolling, and how renewal works. Shown on Join and in its questions and answers. *Replaces* `[MEMBERSHIP PERIOD]`, `[RENEWAL ARRANGEMENTS]`.
- [ ] **Eligibility**: who can join. Shown on Join and in its questions and answers. *Replaces* `[ELIGIBILITY RULES]`.
- [ ] **Confirmed member benefits**: each benefit's title and a short description. Shown on Join and on the homepage. *Replaces* `[CONFIRMED BENEFITS]`, `[BENEFIT DESCRIPTION]`.

### Committee (CMS: Committee, and Site pages & settings)

- [ ] **Current committee**: the seven members and vacant Secretary post listed on the old site (February 2025) have been imported with their roles, role email addresses and six portraits. The committee has changed since — confirm who is current, remove or add people, and supply a short approved biography for each. *Replaces* `[BIOGRAPHY — short, approved biography to follow]` on each profile. Jane Taylor has no portrait.
- [ ] **Committee term**, e.g. 2026–27. Shown on The Committee page. *Replaces* `[COMMITTEE TERM — confirm, e.g. 2026–27]`.
- [ ] **Committee introduction** for the homepage: one or two sentences. *Replaces* `[COMMITTEE INTRO — confirm wording]`.

### General contact (CMS: Site pages & settings → Contacts, social links & committee term)

- [ ] **General contact email.** Shown in the footer of every page and on Privacy. *Replaces* `[GENERAL CONTACT EMAIL]`.
- [ ] **General WhatsApp number.** Shown in the footer of every page and on Privacy. *Replaces* `[GENERAL WHATSAPP NUMBER]`.

### Constitution (CMS: Downloads)

- [ ] **Approved current constitution** as a PDF, uploaded with **Current version** ticked. The demonstration constitution and its placeholder PDF are dropped from the launch build.

### Sign-off

- [ ] **Homepage welcome and about wording**, drafted from the old site's objectives: committee approval or edits.

### Photo albums (repository: `src/content/albums/`)

- [ ] **St Andrew's Ball 2025 date.** The old website gives no date for this album; the entry uses 29 November 2025 as a placeholder and carries a `[DATE TO CONFIRM]` note in its description, which the launch build rejects. Confirm the actual date, set `date` in `src/content/albums/2025-st-andrews-ball.md` and remove the bracketed note. *Replaces* `[DATE TO CONFIRM …]`.

## B. Launch essentials — setup by the website owner

- [ ] **Ordinary-editor CMS test.** Repeat login → edit → preview → publish, plus a photo upload and a PDF upload, with a committee editor's GitHub account that has write access but no owner or admin rights. The first test used the owner account (docs/DECISIONS.md D7). Needs the editor's GitHub username so they can be invited as a collaborator.
- [ ] **Launch date.** (`[INSERT DATE]` in the brief.)
- [ ] **Domain**: the production domain and the Cloudflare DNS switch (currently www.adscottishsociety.com). Then set `site_url` and `display_url` in `public/admin/config.yml`.
- [ ] **Netlify launch settings**: `SITE_LAUNCHED=true`, `EXCLUDE_PLACEHOLDERS=true`, `SITE_URL=<domain>`, and the build command `npm run build:launch` (docs/LAUNCH-CHECKLIST.md).
- [ ] **Ownership and access**: a Society-owned GitHub account to own the repo and the CMS OAuth App (the repo is currently under `jpfox88-debug`), and at least two committee members with Netlify and GitHub access.
- [ ] **Editors**: the GitHub usernames of everyone who will edit, to invite as collaborators.
- [ ] **Netlify plan**. The Free plan pauses every site on the account when its 300 credits run out (docs/HANDOVER.md §10).

## C. Can follow later

- [ ] **Committee portraits**: six carried over from the old site; Jane Taylor and any new members show an initials tile until a photo is supplied.
- [ ] **Confirmed events**: name, date and times, venue and address, member and non-member prices in AED, dress code, eligibility or age limits, and how to book. Until then, the homepage and Upcoming Events show "No events are currently scheduled", and the demonstration event is dropped from the launch build.
- [ ] **Event photos or artwork**: any event without its own image shows an illustrative Scottish landscape captioned "Illustrative image".
- [ ] **Old-site redirects to the imported albums.** The old site's five albums (St Andrew's Ball 2025, May 2025 Ceilidh, Six Nations February 2025, Burns Supper 2025, St Andrew's Gathering November 2024) are now on the site under `/photos/`. Point each old photo-page redirect at its album rather than `/photos/` (docs/REDIRECTS.md). The pre-Christmas drinks 2024 album is gone from the old server; if someone still has the photos they can be added as a new album.
- [ ] **Old-site videos** (seven, MP4 on the old server, not downloaded): re-host each on YouTube or Vimeo (unlisted is fine) and add the link under **Videos** in the matching album.
  - Six Nations, February 2025: `https://adscottishsociety.com/SixNations25-Italy/Videos/SixNats-SnB.mp4`, `https://adscottishsociety.com/SixNations25-Italy/Videos/Slideshow.mp4`
  - Burns Supper 2025: `https://adscottishsociety.com/Burns25Club/Videos/Burns%20Video%20Clip%202025-01-25.mp4`, `https://adscottishsociety.com/Burns25Club/Videos/SeanVideo.mp4`, `https://adscottishsociety.com/Burns25Club/Videos/Burns25Slideshow.mp4`
  - St Andrew's Gathering, November 2024: `https://adscottishsociety.com/Nov24Club/Videos/Nov24VideoClip-01.mp4`, `https://adscottishsociety.com/Nov24Club/Videos/WhatsApp%20Video%202024-11-25.mp4`
- [ ] **Approved, redacted committee and AGM minutes.**
- [ ] **Partner names, logos and offers**, only if current and approved.
- [ ] **Optional contact details**: general phone number, postal address, Facebook and Instagram links. Each is left out of the launch build automatically until it is supplied, so nothing needs to be done if the Society doesn't use them. *Replaces* `[GENERAL PHONE NUMBER — optional]`, `[POSTAL ADDRESS — optional]`, `[FACEBOOK URL]`, `[INSTAGRAM URL]`.
- [ ] **Homepage opening photo**: currently a decorative landscape (Kilchurn Castle). Replace it with an approved Society photo if the committee prefers.
- [ ] **Vector logo** (SVG or PDF) for print and very large display. The supplied JPEGs are fine on screen.

Not used on the site, so no action is needed: the `tagline` setting (`[TAGLINE — optional]`).
