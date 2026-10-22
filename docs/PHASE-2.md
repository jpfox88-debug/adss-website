# Phase 2: members' area, online joining and payments

A recommendation only; nothing here is built. It assumes the stack is unchanged: Astro on Netlify, plus **Supabase** (accounts and data) and **Stripe** (payments).

## What it would add

| Feature | How |
|---|---|
| **Online membership applications** | An application form on `/join/` posting to a Netlify Function. The function writes an `applications` row in Supabase and notifies the membership secretary. The WhatsApp route stays as the alternative. |
| **Payments and renewals** | **Stripe Checkout** for the first payment; **Stripe Billing** (an annual subscription) or a yearly payment link for renewals. A Stripe webhook (a Netlify Function) marks the member as paid in Supabase. Stripe's own customer portal handles receipts and card changes. |
| **Member accounts** | **Supabase Auth** with email magic links, so members have no passwords to manage. Accounts are created when an application is approved, or when payment succeeds. |
| **Members-only area** | New pages under `/members/` (discounts, redemption codes and instructions, member-only documents). These pages need server rendering: switch those routes to on-demand with Astro's Netlify adapter and check the Supabase session on each request. The rest of the site stays static. |
| **Status and expiry** | A `members` table (name, email, membership type, status, `expires_on`), protected by Supabase row-level security. Members see their own record; committee admins see everyone. A scheduled function sends renewal reminders, for example 30 days before expiry. |

## Costs and limitations

- **Stripe:** no monthly fee. Every payment carries a per-transaction fee, and card fees in the UAE are higher than in Europe; check Stripe's current UAE pricing before committing. Payouts need a UAE-registered entity and a bank account in the society's name. Confirm the society is eligible for a Stripe account, or use the UAE-available alternative the bank recommends.
- **Supabase:** the free tier is enough for a few hundred members, but **free projects are paused after a week without use**. For a members' area that must always work, budget for the Pro plan, about US$25 a month.
- **Netlify:** functions and on-demand pages use credits for compute and requests on top of publishes, so the Free plan's 300 credits will run out sooner. Expect the **Personal plan (US$9/month) or higher**; see HANDOVER.md for the credit rates.
- **Data protection:** storing members' names, emails and payment status makes the society responsible for that data under the UAE's data protection law. The privacy page will need rewriting, and the committee will need a short data-handling policy (who has admin access, how long records are kept).
- **Workload:** someone has to approve applications, deal with refunds and keep discount partners current. Software doesn't remove that work.

## What Phase 1 already does to make this easy

- **Content is separate from code.** Membership options, prices and benefits already sit in one structured file (`src/content/membership/membership.yaml`). Phase 2 can reuse it for the application form and Stripe product names.
- **Public benefits and private codes are already kept apart.** Benefit descriptions are public; the CMS hint tells editors to keep codes out. A `members-benefits` collection can be added later without touching the public pages.
- **URLs are reserved by convention:** `/members/` and `/account/` are unused, so the new area can sit alongside the public site.
- **Hosting stays the same:** Netlify Functions and the Astro Netlify adapter add server routes without moving off Netlify.
- **Keep in mind:** don't put member-only information in the CMS or the repository. Anything committed to GitHub is effectively public. Members-only content must live in Supabase.
