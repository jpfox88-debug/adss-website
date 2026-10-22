# Image credits

## Society logo

Supplied by the Society (Scottish Society Abu Dhabi), 22 October 2026, as three JPEGs: arched, stacked and horizontal layouts. The originals are kept as `src/assets/brand/logo-*-source.jpg`. `scripts/make-logos.mjs` builds the website files from them.

| File | What it is |
|---|---|
| `logo-arched.png`, `logo-stacked.png`, `logo-horizontal.png` | The supplied logos with the white background removed. Lettering and proportions unchanged. |
| `logo-thistle.png` | The thistle alone, cropped from the stacked logo, for the mobile header, favicon and apple-touch icon. |
| `logo-*-reversed.png` | **Derived from the supplied logo for on-screen use on dark (navy) backgrounds.** Black lettering and the black thistle head are recoloured to cream `#F5F0E8`. The blue lettering is lifted to sky blue `#7FB2FF`, which gives 7.4:1 contrast on navy `#14213D` and passes WCAG AA. Green and red are unchanged. |
| `public/og-default.jpg`, `public/favicon.png`, `public/apple-touch-icon.png` | Made from the arched logo (share image) and the thistle (icons) by `scripts/make-brand-images.mjs`. |

## Stock photography

These are decorative Scottish landscapes and streets, used as part of the site's look. **None of them shows a Society event or member.**

All are free to use under the [Unsplash License](https://unsplash.com/license): free for commercial and non-commercial use, with no permission or attribution required, though credit is given here. Each photo page was checked on 22 October 2026: "Free to use under the Unsplash License", not Unsplash+, not sponsored. The locations given are those stated on each photo page. All were downloaded on 22 October 2026 into `src/assets/stock/` and resized to at most 2400 px on the long side. Astro generates the smaller versions that visitors receive.

| File | Photographer | Subject (from the source page) | Photo page | Used for |
|---|---|---|---|---|
| `kilchurn-castle-loch-awe.jpg` | Connor Mollison | Kilchurn Castle ruins reflected in Loch Awe (Lochawe, Dalmally) | https://unsplash.com/photos/kilchurn-castle-ruins-on-loch-awe-3rkosR_Dgfg | Homepage hero |
| `skye-heather-hillside.jpg` | David Becker | Purple and orange heather on a misty hillside, Isle of Skye | https://unsplash.com/photos/purple-and-orange-heather-on-a-misty-scottish-hillside-8MjYLMXF-Gs | Band behind the next-event card |
| `skye-stone-bridge.jpg` | David Becker | Stone bridge over a river with mountains, Isle of Skye | https://unsplash.com/photos/stone-bridge-over-a-flowing-river-with-mountains--LI9pUZ_jeM | Committee header |
| `edinburgh-victoria-street.jpg` | Bruno BD | Victoria Street, Edinburgh | https://unsplash.com/photos/edinburghs-colorful-victoria-street-with-people-and-historic-architecture-sDDF7C7Uols | Events and past-events headers |
| `old-man-of-storr-skye.jpg` | Reuben Teo | The Old Man of Storr above a green valley, Isle of Skye | https://unsplash.com/photos/old-man-of-storr-on-skye-fUZWpaUknyI | Photos & Videos header |
| `edinburgh-clock-tower.jpg` | Henrique Ferreira | Clock tower above the city street, Edinburgh | https://unsplash.com/photos/a-large-clock-tower-towering-over-a-city-hUvMmHT_p54 | Downloads header |
| `skye-cottage-stream.jpg` | David Becker | A small house by a stream near a mountain, Isle of Skye | https://unsplash.com/photos/a-small-house-sits-by-a-stream-near-a-mountain-On1ns0kFzPc | Join the Society header |
| `shetland-eshaness-coast.jpg` | Gavin Allanwood | Eshaness coastline with sea stacks, Braewick, Shetland | https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-WRVFyzvjSuk | Illustrative cover for events without their own image |
| `skye-lighthouse-cliff.jpg` | David Becker | Lighthouse on a cliff above the sea, Isle of Skye | https://unsplash.com/photos/lighthouse-on-a-cliff-overlooking-the-ocean-2_GTUh93kv8 | Privacy and 404 headers |

Licence URL for every stock photo: https://unsplash.com/license

## Society photographs

Event albums and committee portraits must be **actual** Society photographs uploaded through the CMS, never stock images. Until they exist, the site shows a "Society event photos coming soon" state and initial tiles for committee members.
