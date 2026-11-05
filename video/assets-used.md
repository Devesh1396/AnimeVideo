# Assets used: sources and licences

Every clip, sound, font and logo in the reel. Add a row whenever an asset goes in; remove the row if it comes out.

## Logos and marks

| Asset | File | Source | Licence / status |
|---|---|---|---|
| Guinness World Records emblem | `public/gwr-logo.png` (from `source/logo-g.png`) | Supplied by the client | **Needs Guinness World Records' licence and approval of this ad before it runs.** Do not alter the emblem. |
| Giane Future Gurukull logo (official, ®) | `source/Giane future gurukull logog F(2).png` (4021×665, transparent); web copy `storyboard-v4/assets/gfg-logo.png` | Supplied by the client | Client's own brand. Used on the end card (7b). Don't recolour or stretch it. |
| Giane Future Gurukull mark (small) | drawn in code (`gfg-mark`) | Redrawn from the logo | Only as the tiny WhatsApp chat avatar in 7a. |
| CTM™ | typed in the reel's fonts | Brochure page 3 | Client's own trademark; keep the ™. |
| WhatsApp icon | drawn in code (`wa` symbol) | Generic chat-bubble + phone glyph | Used only to say "message us on WhatsApp"; check Meta's brand guidelines if the ad is boosted. |

## Fonts (all in `public/fonts/`)

| Font | Use | Licence |
|---|---|---|
| Bricolage Grotesque | display type | SIL Open Font License 1.1 (Google Fonts) |
| Kalam | handwriting, red-pen notes | SIL Open Font License 1.1 (Google Fonts) |
| Hind | Devanagari / UI text | SIL Open Font License 1.1 (Google Fonts) |
| Cinzel | Giane Future Gurukull name | SIL Open Font License 1.1 (Google Fonts) |

## Sound effects (`public/audio/sfx/`)

| Folder | Source | Licence |
|---|---|---|
| `kenney-interface/` (100 .ogg) | Kenney "Interface Sounds" 1.0, via https://opengameart.org/content/interface-sounds | CC0 1.0 (licence text in the folder). Credit to Kenney optional. |
| `ui-sfx-set/` (51 .wav) | Kenney "UI SFX set", via https://opengameart.org/content/51-ui-sound-effects-buttons-switches-and-clicks | CC0 per OpenGameArt; readme: "use in personal and commercial projects". |
| `mixkit/` (12 .mp3: whoosh, paper, bell shortlists, named by Mixkit ID) | https://mixkit.co/free-sound-effects/ (whoosh, paper, bell categories) | Mixkit Sound Effects Free License (commercial use allowed, no attribution). **Re-read the licence at https://mixkit.co/license/ before release**; the page text could not be read automatically. |

Only the sounds actually used in the final mix need to stay; list them here by file name once the mix is final.

## Music

| Track | Source | Licence |
|---|---|---|
| Score | Synthesized in code by `scripts/make_audio.py` | Original, no third-party material. |

## Voice

| Voice | Source | Licence |
|---|---|---|
| v1 draft (`public/audio/vo/s1–s6.wav`) | Microsoft Edge TTS, hi-IN-SwaraNeural | **Draft only, not licensed for ads.** Replaced in v2. |
| v2 | Sarvam Bulbul API (account of the client), model `bulbul:v4-flash`, speaker `ishita_hi_edtech` | Per Sarvam's API terms. |

## Footage (`source/Footages/`)

All clips: AI video, Google Flow Pro (Veo), 1080x1920, 24 fps. **Visible Veo watermark cropped; SynthID remains; Google Flow Pro.**
Crop (same on every clip): keep x 65-1015, y 0-1690, scaled to 1080x1920 (OffthreadVideo `scale(1.1368)`, `transform-origin: 50% 0%`).
AI video: check Meta's AI-content ad policy ("AI info" label) before the ad runs.

| Clip | Shot | Source in → out | Notes |
|---|---|---|---|
| `C1.mp4` | 1a | 3.10 → 6.00 | Visible Veo watermark cropped; SynthID remains; Google Flow Pro. Natural colour. |
| `C1.mp4` | 1b | 6.00 → 9.10 | Same clip, blurred + darkened behind the exam paper (C2 not delivered). |
| `C3.mp4` | 2 | 0.00 → 7.92 at 0.9x | Visible Veo watermark cropped; SynthID remains; Google Flow Pro. Blurred + darkened. |
| `c4-part2.mp4` | 3a | 2.40 → 7.70 | Visible Veo watermark cropped; SynthID remains; Google Flow Pro. First 2.4 s trimmed (client note). |
| `c5.mp4` | 3b | 0.00 → 3.50 | Visible Veo watermark cropped; SynthID remains; Google Flow Pro. Red duotone. Cut before 3.5 s: her lips move after that. |
| `c8.mp4` | 6b | 0.00 → 4.20 | Visible Veo watermark cropped; SynthID remains; Google Flow Pro. Dark ink tint. |

## Storyboard stand-ins (not in the reel)

`storyboard-v4/assets/classroom.jpg`, `kid-stressed.jpg`, `mother-son.jpg` are crops of the client's brochure photos,
used only to show where footage goes.
