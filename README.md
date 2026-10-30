# Scottish Society Abu Dhabi website

Astro (static) site, hosted on Cloudflare Pages at https://adscottishsociety.com (project `adss-website`), edited through Sveltia CMS at `/admin`. CMS sign-in uses a GitHub OAuth proxy Worker in `cms-auth/`.

- Brief: [BRIEF.md](BRIEF.md)
- Placeholders and launch blockers: [MISSING-CONTENT.md](MISSING-CONTENT.md)
- Decisions and substitutions: [docs/DECISIONS.md](docs/DECISIONS.md)
- Committee guide and hosting costs: [docs/HANDOVER.md](docs/HANDOVER.md)
- Launch checklist: [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md)
- Old-site redirects: [docs/REDIRECTS.md](docs/REDIRECTS.md)
- Phase 2 (members' area): [docs/PHASE-2.md](docs/PHASE-2.md)

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/ (pre-launch: noindex, placeholders shown)
npm run build:launch   # launch build: placeholders excluded, fails if any [PLACEHOLDER] text remains
```

Content lives in `src/content/` (schemas in `src/content.config.ts`); uploaded photos in `src/assets/uploads/`; PDFs in `public/documents/`.
