# Launch checklist

Mirrors BRIEF.md Section 13B. The site is **not ready to launch** while any "must resolve before launch" item remains in [MISSING-CONTENT.md](../MISSING-CONTENT.md). Every item needs human sign-off.

## Content (committee sign-off)

- [ ] Membership WhatsApp number, membership email, prices and eligibility confirmed and entered. The **Join via WhatsApp** button is live and opens the right chat on a phone and on a desktop.
- [ ] Every public page contains approved content and **no placeholder text remains**. `npm run build:launch` must pass: it fails while any `[PLACEHOLDER]` text is still on a public page.
- [ ] Placeholder committee profiles, events and albums removed. With `EXCLUDE_PLACEHOLDERS=true` they are left out of the build anyway.
- [ ] Documents and media approved for publication; minutes checked for personal details.
- [ ] CMS proof repeated with a **non-admin editor account** (write-access collaborator), as recorded in DECISIONS.md.

## Settings (website owner)

- [ ] In Netlify → Site configuration → Environment variables, set:
  - `SITE_LAUNCHED=true`, which allows search engines (robots.txt and the noindex tag);
  - `EXCLUDE_PLACEHOLDERS=true`;
  - `SITE_URL=https://<society domain>`, which sets canonical links, the sitemap and share images.
- [ ] Change the Netlify build command to `npm run build:launch`, so a placeholder can never be published.
- [ ] In `public/admin/config.yml`, update `site_url` and `display_url` to the society domain.
- [ ] Add the domain in Netlify (Domain management), then point Cloudflare DNS at Netlify and confirm HTTPS works.
- [ ] Keep the old site available until the new one is live on the domain. After the switch, check a few old URLs from [REDIRECTS.md](REDIRECTS.md).
- [ ] Add the domain as the GitHub OAuth App's homepage URL. The callback stays `https://api.netlify.com/auth/done`.
- [ ] The society controls the domain, the Netlify team and the GitHub repo and OAuth App, and at least two committee members have access to each.
- [ ] Editors' GitHub accounts invited as collaborators with **Write** access, not Admin.
- [ ] Netlify plan chosen using the estimate in [HANDOVER.md](HANDOVER.md#10-hosting-costs-and-when-to-upgrade).
