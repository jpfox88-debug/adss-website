# Launch checklist

Mirrors BRIEF.md Section 13B. The site is **not ready to launch** while any "must resolve before launch" item remains in [MISSING-CONTENT.md](../MISSING-CONTENT.md). Every item needs human sign-off.

## Content (committee sign-off)

- [ ] Membership WhatsApp number, membership email, prices and eligibility confirmed and entered. The **Join via WhatsApp** button is live and opens the right chat on a phone and on a desktop.
- [ ] Every public page contains approved content and **no placeholder text remains**. `npm run build:launch` must pass. It removes the demonstration files, then fails while any of these remain on the public site: placeholder text (including alt text and meta tags), a demonstration or test entry or file, a preview-only note or link, a noindex tag, a hosting address (`pages.dev` or `netlify.app`) instead of the Society's domain, no committee member, or no current constitution. Optional phone, postal address and social links that were never supplied are left out automatically.
- [ ] Placeholder committee profiles, events and albums removed. With `EXCLUDE_PLACEHOLDERS=true` they are left out of the build anyway.
- [ ] Documents and media approved for publication; minutes checked for personal details.
- [ ] CMS proof repeated with a **non-admin editor account** (write-access collaborator), as recorded in DECISIONS.md.

## Settings (website owner)

Hosting is Cloudflare Pages (project `adss-website`, production branch `main`). Sign-in to `/admin` goes through the `adss-cms-auth` Worker. Do these in order, **before** the domain switch, so the launch checks run on the build that goes live.

- [ ] In Cloudflare → Workers & Pages → adss-website → Settings → Variables and secrets, **Production** environment, add:
  - `SITE_LAUNCHED` = `true`: allows search engines (robots.txt, the noindex meta tag and the `X-Robots-Tag` header);
  - `EXCLUDE_PLACEHOLDERS` = `true`;
  - `SITE_URL` = `https://<society domain>`: sets canonical links, the sitemap and share images.
  Keep `NODE_VERSION` = `24`. Leave the **Preview** environment without these, so draft previews stay hidden from search engines and still show placeholders.
- [ ] Settings → Build → Build command: change `npm run build` to `npm run build:launch`. The build then fails, and nothing is published, if any placeholder, demonstration entry, test file, preview-only note, noindex tag or `pages.dev`/`netlify.app` address remains, or if there is no committee or current constitution. Note that this command applies to previews too, so draft previews will also fail while placeholders exist; only switch it once the content is complete.
- [ ] Trigger a production deployment (Deployments → the latest `main` build → Retry deployment, or publish any change) and confirm it **succeeds** on `https://adss-website.pages.dev` before going further.
- [ ] In `public/admin/config.yml`, set `site_url` and `display_url` to the society domain.
- [ ] Domain: in the Pages project → Custom domains → Set up a custom domain, add the society domain (and `www`). Cloudflare then shows the DNS records to create. The domain's DNS is currently served by the old host (`in3/in4.cloudhostingforlinux.com`), so either move the domain's nameservers to Cloudflare or create the CNAME records it gives at the current DNS host. Confirm HTTPS works.
- [ ] Keep the old site available until the new one is live on the domain. After the switch, check a few old URLs from [REDIRECTS.md](REDIRECTS.md).
- [ ] The `adss-cms-auth` Worker already allows `adscottishsociety.com` and `www.adscottishsociety.com` (`cms-auth/wrangler.toml`, `ALLOWED_DOMAINS`). If the domain is different, update that list and run `npx wrangler deploy` in `cms-auth/`. Update the GitHub OAuth App's homepage URL to the domain; its callback stays `https://adss-cms-auth.jpfox88.workers.dev/callback`.
- [ ] The `pages.dev` address stays online after launch. Its canonical links point to the society domain, so it isn't treated as a duplicate.
- [ ] The society controls the domain, the Cloudflare account, the GitHub repo and the OAuth App, and at least two committee members have access to each.
- [ ] Editors' GitHub accounts invited as collaborators with **Write** access, not Admin.
- [ ] Free-plan limits reviewed in [HANDOVER.md](HANDOVER.md#10-hosting-costs-and-limits).
