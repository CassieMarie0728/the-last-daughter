# The Last Daughter of the First Fyre

Official book website for **Volume One: The Embercrest Awakening**, by Cassandra Crossno.

Public URL: https://cassiemarie0728.github.io/the-last-daughter/

## Local preview

Requires Node.js 22 or newer.

```sh
npm ci
npm run build
npm test
npm run dev
```

Open http://127.0.0.1:4173/the-last-daughter/.

## Editing the website

- `content/site.mjs`: spoiler-light character and place descriptions.
- `content/excerpt.txt`: exact, limited opening excerpt. Do not replace with the whole manuscript.
- `scripts/build.mjs`: page copy, shared navigation, metadata, and page generation.
- `public/style.css`: responsive visual design.
- `public/app.js`: mobile menu, artwork dialog, reader preferences.
- `public/assets`: optimized artwork and locally served font.
- `public/book-fact-sheet.txt`: downloadable public press sheet.

No framework, analytics, account service, or backend is required. Main content and links are rendered as HTML. JavaScript enhances the reading controls and artwork viewer.

## Publishing

GitHub Pages publishes the `gh-pages` branch, root folder. Run `npm run publish:pages` after editing: it builds, validates, creates a commit containing only `dist`, and pushes the publication branch. Commit and push source edits to `main` separately. The current GitHub connection cannot upload workflow files, so this uses supported branch publishing without broader permissions. An optional GitHub Actions configuration is saved in `docs/optional-pages-workflow.yml` for a future switch if desired. The base path is `/the-last-daughter/`; update `scripts/build.mjs`, `scripts/serve.mjs`, and the validator if the repository URL changes.

## Source boundaries

`reference/` is a local-only, ignored author archive. It is never uploaded by the publisher or included in the Git index. Synced ChatGPT source files are not used as output. Normal builds require only curated committed content/assets, not the reference archive.

`scripts/prepare-assets.mjs` is an optional one-time local asset preparation utility. It requires the author's original local reference folder and the original generated hero artwork path. Do not run it in CI. It creates optimized derivatives and extracts the explicitly bounded excerpt without modifying originals.

See `docs/content-provenance.md` for canon sources and `docs/design.md` for the visual specification. All text and artwork rights remain with their respective rights holders; this repository is not licensed for unrestricted reuse.
