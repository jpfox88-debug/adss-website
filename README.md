# Abu Dhabi Scottish Society website

Astro (static) site, hosted on Netlify, edited through Sveltia CMS at `/admin`.

- Brief: [BRIEF.md](BRIEF.md)
- Placeholders and launch blockers: [MISSING-CONTENT.md](MISSING-CONTENT.md)
- Decisions and substitutions: [docs/DECISIONS.md](docs/DECISIONS.md)

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Content lives in `src/content/` (schemas in `src/content.config.ts`); uploaded photos in `src/assets/uploads/`; PDFs in `public/documents/`.
