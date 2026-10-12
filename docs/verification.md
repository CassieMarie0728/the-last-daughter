# Launch verification — October 12, 2026

Live site: https://cassiemarie0728.github.io/the-last-daughter/

## Functional and publication checks

- Nine reader-facing routes plus the custom 404 page build successfully.
- 173 internal links/assets, anchor targets, CSS assets, page headings, and descriptions pass the static validator.
- Browser checks passed on the local preview and the public GitHub Pages site: desktop 1536 × 1024; mobile/tablet widths 320, 390, and 768 at height 844.
- Verified mobile navigation, character artwork dialog, map viewer, Escape-to-close and restored focus, excerpt text-size controls, light/dark reader, preference persistence, clearing preferences, and content-note disclosure.
- No horizontal page overflow or browser script/network errors in the tested routes. All content images decoded successfully.
- Public HTML, CSS, JavaScript, hero image, font, and press fact sheet match the local build (text line endings normalized).
- A nonexistent public route returns HTTP 404 and the custom “This path has gone to ash” page.
- The 723-word opening excerpt matches the current manuscript exactly apart from newline normalization and semantic rendering of Markdown emphasis.
- `reference/` is ignored and absent from both the source index and the publication branch. The public branch contains only the static website.

The IAB preview was attempted first but timed out while attaching its webview. Browser QA therefore used Playwright with installed Chrome in headless mode. Screenshots explicitly wait for fonts and images to decode; early transient loading captures were replaced.

## Visual comparison ledger

The chosen concept files are recorded in `docs/design.md`. Those concepts and final rendered screenshots were inspected with `view_image`, including a native-size 1536 × 1024 desktop comparison and a 390 × 844 phone view.

| Comparison | Evidence and resolution |
| --- | --- |
| Opening copy | Same title, volume, premise, navigation, and both CTA labels as the selected home concept. No added above-the-fold promotional copy. |
| Hero layout | Retains the left title/negative space and right landscape composition. The first implementation sat too low; its top position and headline size were corrected. |
| Typography | Locally hosted Cormorant Garamond preserves the literary serif hierarchy; Courier handles navigation and utility text. Corrected the downloaded font's file format, enlarged desktop CTA proportions, and refined the volume line. |
| Palette | Void black, antique gold, blood red, and ghost white retained. The standalone generated landscape is used without a colored wash. |
| Book section | Open cover-and-copy columns, red CTA, and the following world band match the concept's structure. The actual supplied cover intentionally replaces the concept's invented book. |
| Character section | Open three-portrait desktop composition preserved. Reduced excess introductory spacing and corrected portrait proportions so names fit in the first desktop screen. All supplied portraits replace the concept stand-ins. |
| Mobile layout | Stacked actions and editorial sections; one-column portraits; expandable navigation. Inspected phone screenshots and verified no overflow at 320, 390, and 768 pixels. |
| Interaction | Buttons and navigation are native HTML. Artwork dialogs, map enlargement, and reader preferences operate as real interfaces, not screenshot decoration. |

The implementation was verified against the selected design for faithful composition, hierarchy, palette, and content, with intentional deviations below. No remaining material clipping, missing-asset, or overflow issues were found in the tested views. This is visual review plus automated browser verification, not a claim of literal pixel identity between generated concept art and HTML.

## Intentional deviations and boundaries

- Actual cover, map, character and location artwork replace generated concept stand-ins.
- One compact header is used consistently throughout the site.
- Character biographies are visible under their portraits; dialogs enlarge the artwork. This keeps the introductions available without JavaScript.
- The home character preview and opening quote extend the portrait and editorial systems below the initial concept sections.
- Reader, author, press, privacy, and guide pages extend the same system for the requested complete book website.
- No invented purchase destination, release date, newsletter service, author photograph, or personal biography.
- GitHub rejected an automation workflow upload because the saved OAuth connection lacks workflow scope. The site uses supported `gh-pages` branch publishing instead; no broader permission was requested. The optional workflow is retained as documentation only.

## Evidence and future updates

Final screenshot directory on the author's machine:
`C:/Users/c728/.codex/visualizations/2026/10/12/01a12eeb-54a3-7b42-8398-26482f6a1198/website/`

Key captures: `home-desktop.png`, `home-mobile.png`, `home-continuation.png`, `characters-desktop.png`, `characters-mobile.png`, `world-desktop.png`, and `reader-light.png`.

Source is on `main`; only built assets are on `gh-pages`. See README for editing and the `npm run publish:pages` command. Release information and retail links remain to be supplied by the author when ready.
