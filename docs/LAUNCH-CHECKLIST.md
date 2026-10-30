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
  - `SITE_URL` = `https://adscottishsociety.com`: sets canonical links, the sitemap and share images.
  Keep `NODE_VERSION` = `24`. Leave the **Preview** environment without these, so draft previews stay hidden from search engines and still show placeholders.
- [ ] Settings → Build → Build command: change `npm run build` to `npm run build:launch`. On `main` the build then fails, and the previous deployment stays live, if any placeholder, demonstration entry, test file, preview-only note, noindex tag or `pages.dev`/`netlify.app` address remains, or if there is no committee or current constitution. Cloudflare uses the same command for previews, so `scripts/build-launch.sh` runs the ordinary preview build on any other branch: CMS draft previews keep highlighting placeholders and stay noindex.
- [ ] Note: from this production build on, `https://adss-website.pages.dev` is indexable, with canonical links pointing at `adscottishsociety.com`, which still serves the old site until the domain switch. Keep the gap short.
- [ ] Trigger a production deployment (Deployments → the latest `main` build → Retry deployment, or publish any change) and confirm it **succeeds** on `https://adss-website.pages.dev` before going further.
- [ ] In `public/admin/config.yml`, set `site_url` and `display_url` to the society domain.
- [ ] Domain: in the Pages project → Custom domains → Set up a custom domain, add the society domain (and `www`). Cloudflare then shows the DNS records to create. The domain's DNS is currently served by the old host (`in3/in4.cloudhostingforlinux.com`), so either move the domain's nameservers to Cloudflare or create the CNAME records it gives at the current DNS host. Confirm HTTPS works.
- [ ] Keep the old site available until the new one is live on the domain. After the switch, check a few old URLs from [REDIRECTS.md](REDIRECTS.md).
- [ ] The `adss-cms-auth` Worker already allows `adscottishsociety.com` and `www.adscottishsociety.com` (`cms-auth/wrangler.toml`, `ALLOWED_DOMAINS`). If the domain is different, update that list and run `npx wrangler deploy` in `cms-auth/`. Update the GitHub OAuth App's homepage URL to the domain; its callback stays `https://adss-cms-auth.jpfox88.workers.dev/callback`.
- [ ] **After the domain is live**, send `adss-website.pages.dev` to the domain with a Cloudflare **Bulk Redirect** (prepared below, not yet enabled). Pages' `_redirects` file can't match hostnames, so this is done at account level. Previews (`*.adss-website.pages.dev`) are not redirected, so CMS draft previews keep working.
  1. Cloudflare dashboard → **Rules → Redirect Rules → Bulk Redirects** (account level) → **Create Bulk Redirect List**. Name `adss_pagesdev_to_domain`, description "adss-website.pages.dev → adscottishsociety.com". Add one URL redirect:
     - Source URL: `adss-website.pages.dev/`
     - Target URL: `https://adscottishsociety.com/`
     - Status: **301**
     - Edit parameters: tick **Preserve query string**, **Subpath matching** and **Preserve path suffix**. Leave **Include subdomains** unticked (it would redirect previews too).
  2. Save the list. **A list on its own does nothing.** To enable, go to **Bulk Redirect Rules → Create Bulk Redirect Rule**, name it `adss_pagesdev_to_domain`, choose the list above, and **Save and Deploy**.
  3. Check: `https://adss-website.pages.dev/join/?x=1` returns 301 to `https://adscottishsociety.com/join/?x=1`, and a preview URL such as `https://<branch>.adss-website.pages.dev/` still loads.
  4. Editors then sign in at `https://adscottishsociety.com/admin` (the Worker already allows that hostname). To undo, delete or disable the rule.
- [ ] The society controls the domain, the Cloudflare account, the GitHub repo and the OAuth App, and at least two committee members have access to each.
- [ ] Editors' GitHub accounts invited as collaborators with **Write** access, not Admin.
- [ ] Free-plan limits reviewed in [HANDOVER.md](HANDOVER.md#10-hosting-costs-and-limits).
