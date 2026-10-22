# Abu Dhabi Scottish Society (ADSS) — Website Build Brief

Build a new website for the **Abu Dhabi Scottish Society (ADSS)**, replacing the current site at https://www.adscottishsociety.com/ (a hand-written static HTML site with no CMS; nothing to migrate except the logo and the society objectives, both reproduced below).

We need a professional, welcoming website launched quickly. Prioritise clear information, strong photography, straightforward navigation and easy updates by the committee.

**Target launch date: [INSERT DATE]**

---

## 0. Platform and architecture

The stack below is decided. Do not propose a different framework, host or CMS family. Where a named component turns out to be deprecated or unsupported, substitute the current supported equivalent and record the decision in `docs/DECISIONS.md`.

- **Framework:** Astro (static output). Minimal client-side JavaScript: gallery lightbox, mobile nav, and the event-date logic in Section 6.
- **Repository:** GitHub, repo name `adss-website`. Deploy from `main`; deploy previews on pull requests.
- **Hosting:** Netlify. DNS will be on Cloudflare (human task, see Section 14).
- **CMS:** a git-based CMS at `/admin` — **Decap CMS or Sveltia CMS** (Sveltia is Decap-config-compatible with a better editor; choose whichever gives the simplest supported login). Use the **GitHub backend** with a supported OAuth route; do not use Netlify Git Gateway (deprecated). Committee editors will have free GitHub accounts invited as repo collaborators. Enable an editorial workflow (draft → review → publish) with deploy-preview links. All content lives as Markdown/YAML in `src/content/` using Astro content collections, so every editable thing has a schema.
- **Prove the CMS first:** before building pages, demonstrate login → edit → preview → publish end-to-end using an ordinary editor account (not an owner/admin account), and demonstrate a photo upload and a PDF upload from the editor. Record the result in `docs/DECISIONS.md`.
- **Images:** uploaded through the CMS media library into `src/assets/uploads/` so Astro's image pipeline resizes, converts and generates thumbnails at build time. No external media service in Phase 1. Set a 2 MB per-image guidance note in the editor and in HANDOVER.md. Lazy-load gallery and below-the-fold images; the homepage hero and the first event image load eagerly with high fetch priority.
- **Video:** YouTube or Vimeo embeds only (unlisted is fine). No self-hosted video files. Embeds must not autoplay with sound.
- **Documents:** PDFs uploaded through the CMS file widget into `public/documents/`; the repo is the document store for Phase 1.
- **Forms and payments:** none in Phase 1. Joining is via WhatsApp click-to-chat.
- **Phase 2 path (do not build now):** Supabase for member accounts, auth and a members-only area, with Stripe for payments. Structure content so a members-only section can be added alongside the public site without reworking it.

## 1. Purpose and audience

The website should help visitors:

- Understand what the society does and who can get involved.
- Find upcoming events and understand how to book.
- See photographs and videos from previous events.
- Understand membership prices and benefits.
- Join by contacting the society through WhatsApp.
- Meet the committee and download approved society documents.

The audience includes Scottish people living in Abu Dhabi, their families and people interested in Scotland and Scottish culture.

Use warm, natural British English. Keep the copy concise and welcoming. Use the `[ELIGIBILITY RULES]` placeholder for any statement about who can join; do not draft eligibility rules.

**Reuse this text from the current site for the About section (edit lightly for tone, keep the substance):**

> The objectives of the Society are:
> - To foster social relations amongst Scottish people, their families and anyone interested in Scotland and Scottish culture in Abu Dhabi
> - To foster Scottish cultural activities and institutions
> - To arrange for the appropriate celebration of the Scottish anniversaries — the Committee will organise a Burns Supper, a Chieftain's Ceilidh/Ball and a St Andrew's Ball each year
> - To support both local and Scottish charities actively when funds are available

## 2. Design direction

Create a contemporary Scottish community website with warmth and personality.

Use:

- Deep navy, warm white and restrained accent colours.
- Subtle tartan details where they add character — use a generic navy/green/thin-red-line tartan, not a specific clan tartan.
- Clear typography, generous spacing and readable text.
- Strong photographs from actual society events.
- Excellent mobile, tablet and desktop layouts.
- Prominent calls to action for **"Upcoming Events"** and **"Join the Society."**

**Logo:** the existing society logo is at https://www.adscottishsociety.com/Images/ADSS-Logo.png — download it into the repo and use it. If it is low-resolution, use it as-is and log "higher-resolution logo needed" in MISSING-CONTENT.md.

Photography should show the range of society activities and people involved. Use clearly labelled placeholders wherever original assets are missing. Do not generate fictional photographs of society members or events.

## 3. Navigation

Use these main sections:

**Home | The Committee | Upcoming Events | Photos & Videos | Downloads | Join the Society**

Make **Join the Society** a prominent navigation button.

Include general contact details, a WhatsApp contact link and social media links in the footer. All contact and social values come from a single `site settings` content file editable in the CMS; use placeholders until confirmed.

## 4. Homepage

The homepage should immediately communicate that this is an active, welcoming community.

Arrange the main content in this order:

1. **Opening image and welcome:** a strong photograph from a real society event, a short introduction and buttons for upcoming events and joining.
2. **Next confirmed event:** prominently display its date, venue and booking or enquiry button. Selected from the events collection as the soonest event whose end time (Asia/Dubai) is in the future and whose status is not cancelled or postponed — see Section 6 for how this stays current between builds.
3. **About the society:** briefly explain its purpose, community and activities (use the objectives text above).
4. **Why join:** summarise confirmed benefits, membership price and a link to the joining page. Pulled from the membership content file.
5. **Recent event highlights:** show a small selection of photographs linking to event albums. Derived from the most recent albums.
6. **Meet the committee:** a short introduction linking to the committee page.

Keep the opening copy short and the next event easy to find. When there are no upcoming events, show a graceful "No events are currently scheduled — follow us or join to hear first" block. Never display invented events or dates.

## 5. The Committee

Create a page introducing the current committee.

Each profile (one content entry per person) supports:

- Photograph.
- Name.
- Committee role.
- Short biography.
- Optional approved contact link.
- Sort order.

Display the committee year or term (from site settings). Use consistent portrait sizes and a layout that works well on mobile.

The committee must be able to add, remove, edit and reorder profiles in the CMS without touching code.

Use labelled placeholders for missing information. Do not invent names, roles or biographies. Seed the collection with a small number of clearly labelled placeholder profiles (e.g. "[PRESIDENT NAME]") so the layout can be reviewed.

## 6. Upcoming Events

Create an upcoming events listing with a dedicated page for each event.

Every event page should make these questions easy to answer:

**Can I attend? What does it cost? How do I book?**

Each event (one content entry) supports:

- Event name and image.
- Date and start/end times in Abu Dhabi local time (Asia/Dubai).
- Venue, address and map link.
- Event description.
- Eligibility or age restrictions, where applicable.
- Dress code, where applicable.
- Member and non-member prices, where applicable.
- Booking deadline, where applicable.
- Booking method: external URL, WhatsApp, or email — rendered as one clear booking or enquiry button.
- Status: bookings open, sold out, postponed or cancelled.
- Links to photo/video albums (for past events).

Make event booking and society membership distinct journeys.

Publish only confirmed event details. Seed with one clearly labelled placeholder event so the layout can be reviewed; do not invent a real event.

**Keeping "upcoming" accurate on a static site:** every page that shows event lists renders the full set of events it might need, each with its end time (Asia/Dubai) and status as data attributes, and a small shared client-side script decides at load time what to show:

- **Homepage:** renders all not-cancelled, not-postponed future-or-recent events; the script selects the soonest one whose end time is in the future as "next event", or shows the no-events block if none qualifies.
- **Upcoming events page:** renders all events; the script hides those whose end time has passed.
- **Archive page:** renders all events; the script hides those whose end time is still in the future.

Each page is therefore self-sufficient and correct without a rebuild. Pages must render sensibly with JavaScript disabled (showing the build-time split). The site must not rely on scheduled rebuilds. Cancelled and postponed events are never selected as the next event, but remain visible with their status.

Past events appear in a simple archive page.

## 7. Photos & Videos

Create a gallery organised into albums by event, with the event date clearly displayed.

Include:

- Album cover image (chosen in the CMS).
- Responsive photo grids.
- A simple lightbox viewer with next/previous controls, keyboard support and touch/swipe on mobile.
- Video embeds (YouTube/Vimeo) within the same album as photographs.
- Build-time optimised thumbnails (Astro image pipeline) and lazy loading.

No autoplay with sound.

For launch, prioritise a small selection of strong, approved albums. Extensive historical migration and advanced filtering can follow later.

The committee creates albums, uploads media and picks cover photographs in the CMS. Seed one placeholder album.

## 8. Downloads

Create a clear document section covering:

- The society constitution.
- Approved committee meeting minutes.
- AGM minutes and reports.
- Other approved society documents.

Each document (one content entry) has:

- A readable title.
- A category.
- Its meeting date or version date.
- File type and size (derive automatically at build time where possible).
- A working view or download link.
- A "current" flag so the current constitution is easy to identify; older versions clearly labelled.

Administrators upload, replace and remove documents through the CMS.

Only publish documents approved for public access. Add a visible note in the CMS editor for this collection reminding editors to check minutes for personal details and to upload the approved redacted version where appropriate.

## 9. Join the Society — WhatsApp joining route

Create a dedicated membership page explaining:

- Who can join.
- Available membership options.
- Prices in AED.
- Whether membership runs for a calendar year or a rolling period.
- Renewal arrangements.
- Confirmed benefits.
- How to join through WhatsApp.

All of this is editable in one `membership` content file in the CMS.

Use **"Join via WhatsApp"** as the primary action on this page.

The button opens a WhatsApp conversation with the confirmed membership contact and this prefilled message:

"Hi, I'd like to join the Abu Dhabi Scottish Society. Could you please let me know the next steps?"

Use a standard `https://wa.me/<number>?text=<url-encoded message>` link with the number in international format. Must work on mobile and desktop.

Display the contact number as text as well, and include a confirmed email address as an alternative contact method.

Explain that membership is arranged directly with the society through WhatsApp.

Use these placeholders until details are confirmed:

- [MEMBERSHIP OPTIONS]
- [PRICES IN AED]
- [MEMBERSHIP PERIOD]
- [ELIGIBILITY RULES]
- [CONFIRMED BENEFITS]
- [MEMBERSHIP WHATSAPP NUMBER]
- [MEMBERSHIP EMAIL ADDRESS]

While the WhatsApp number is a placeholder, render the button in a visibly disabled state with the label "WhatsApp contact to be confirmed" — never a live-looking button that goes nowhere.

Include a short FAQ (editable list) covering eligibility, membership duration, joining and renewals.

Describe confirmed benefits publicly so prospective members understand the value. Any published partner names, logos or offers must be current and approved. Reserve restricted redemption information and codes for the future members' area.

## 10. Editing and administration

The CMS at `/admin` (see Section 0). Configure collections so authorised committee members can update, without a developer:

- Homepage content (hero image, welcome copy).
- Committee profiles.
- Events and booking links.
- Photo and video albums.
- Downloadable documents.
- Membership prices, benefits, FAQ and WhatsApp details.
- General contacts, committee term and social links (site settings).

Enable editorial workflow so changes can be previewed via a deploy preview before publishing. Keep the editing experience clear and proportionate — sensible field labels, hints and required-field validation; no exotic widgets.

## 11. Phase 2 (do not build — document only)

Write `docs/PHASE-2.md` (one page) explaining how to add, on this stack:

- Online membership applications.
- Membership payments and renewals (Stripe).
- Secure member accounts (Supabase Auth).
- A members-only area with discounts and redemption instructions.
- Membership status and expiry dates.

Include significant limitations and additional costs (Supabase, Stripe fees, any Netlify plan implications). Note what, if anything, in the Phase 1 structure should be kept in mind to make this easy.

## 12. Missing information

Treat all committee details, membership prices, contacts, discounts and event information as unconfirmed.

Maintain **one** file, `MISSING-CONTENT.md`, listing every placeholder, missing asset and launch decision, each marked "must resolve before launch" or "can follow later". Update it as you go. Never present a placeholder as confirmed content.

## 13. Quality gates

There are two distinct states. Do not describe the site as launch-ready while any "must resolve before launch" item remains in MISSING-CONTENT.md.

**A. Preview complete (the build's job).** Verify and report:

- Navigation, WhatsApp links, booking links and downloads work, or are correctly shown as placeholder/disabled.
- Layouts work across mobile, tablet and desktop.
- Images are served responsively through Astro's image pipeline; hero and first event image load eagerly, everything else lazy.
- Text is readable, colour contrast meets WCAG AA and navigation works by keyboard.
- Every page has a title, meta description and Open Graph tags; a default social share image exists.
- `sitemap.xml`, `robots.txt` and a useful 404 page exist. Unknown URLs show the 404 page — do not catch-all redirect to the homepage.
- Redirects from identifiable old-site URLs to their closest replacements, listed in `docs/REDIRECTS.md`.
- A short privacy page exists, written after checking what the finished site actually uses (CMS login on `/admin` only, embedded video providers, any analytics if added) rather than assumed in advance.
- The CMS has been demonstrated end-to-end by an ordinary editor account (Section 0).
- Hosting cost estimate: confirm the current Netlify plan terms, estimate production deploys per month (each publish from the CMS is a production build) and bandwidth, and state the upgrade triggers in `docs/HANDOVER.md`. Use pull-request previews during development, not production deploys.

**B. Ready to launch (requires human sign-off, Section 14).**

- Membership WhatsApp number, email, prices and eligibility confirmed and live.
- All public pages contain approved content; no placeholder text remains on a public page.
- Placeholder committee profiles, events and albums removed or excluded from the build.
- Documents and media approved for publication.

## 14. Human tasks (not for the build — for the committee / JP)

- Confirm all placeholder content listed in MISSING-CONTENT.md and sign off Section 13B.
- Approve public documents and media.
- Keep the current website available until the replacement is ready; arrange the domain switch (Cloudflare DNS → Netlify).
- Ensure the society controls the domain, hosting (Netlify), and GitHub accounts; provide access for at least two committee members.
- Invite authorised editors' GitHub accounts as repo collaborators.
- Running costs: GitHub free; Netlify's free allowance is credit-based and each production deploy consumes credits, so cost depends on how often the committee publishes — see the estimate in HANDOVER.md; Cloudflare DNS free.

## 15. Deliverables

1. A complete website covering all Phase 1 sections, deployed to Netlify from the GitHub repo.
2. The CMS configured and demonstrated as above.
3. `MISSING-CONTENT.md` — consolidated placeholders and launch decisions, each marked "must resolve before launch" or "can follow later".
4. `docs/LAUNCH-CHECKLIST.md` — short, mirroring Section 13B.
5. `docs/HANDOVER.md` — plain-English instructions, with screenshots where useful, for updating events, committee profiles, galleries, membership details, documents and site settings in the CMS; plus the hosting cost estimate and upgrade triggers.
6. `docs/PHASE-2.md` — concise Phase 2 recommendation.
7. `docs/DECISIONS.md` — any substitutions made under Section 0 and the CMS demonstration result.
8. `docs/REDIRECTS.md` — old URL → new URL mapping.

## 16. How to work

1. Scaffold the Astro project, content collections with schemas, and the CMS config. Deploy to Netlify. Commit.
2. Prove the CMS: login → edit → preview → publish, photo upload, PDF upload, with an ordinary editor account. Record in `docs/DECISIONS.md`. Do not proceed to step 3 until this works.
3. Build all pages against placeholder content, working on a branch with PR previews. Commit after each page or section.
4. Seed content: logo, objectives text, placeholder committee/event/album/document entries, site settings and membership file with placeholders.
5. Run the Section 13A checks and write the docs in Section 15.
6. Keep MISSING-CONTENT.md current throughout.

Ask only questions that materially affect the build — anything that would otherwise be a wrong irreversible decision. Wherever missing content can be represented by a clear placeholder, use the placeholder, log it, and keep going. Section 0 fixes the framework, host and CMS family; substitutions are only for deprecated or unsupported components, and must be recorded.

**The priority is a polished website we can launch quickly, with clear event information, a simple WhatsApp joining route and easy committee updates.**
