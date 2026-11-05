# Assets used: sources and licences

Every clip, sound, font and logo in the reel. Add a row whenever an asset goes in; remove the row if it comes out.

## Logos and marks

| Asset | File | Source | Licence / status |
|---|---|---|---|
| Guinness World Records emblem | `public/gwr-logo.png` (from `source/logo-g.png`) | Supplied by the client | **Needs Guinness World Records' licence and approval of this ad before it runs.** Do not alter the emblem. |
| Giane Future Gurukull name + mark | drawn in code (`src/defs.ts`, `gfg-mark`) | Redrawn from the brochure | Client's own brand. Swap for the official logo file if the client sends one. |
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
| v2 | Sarvam Bulbul API (account of the client) | Per Sarvam's API terms; record the model ID and voice here when generated. |

## Footage (`source/footage/`)

| Clip | Source | Licence / notes |
|---|---|---|
| (none yet) | AI video (Veo / other) per `storyboard-v4/veo-prompts-v2.md`, or filmed at the centres | Record the tool and plan used for each take. AI video: check Meta's AI-content ad policy. Filmed: written parental consent for every identifiable child. |

## Storyboard stand-ins (not in the reel)

`storyboard-v4/assets/classroom.jpg`, `kid-stressed.jpg`, `mother-son.jpg` are crops of the client's brochure photos,
used only to show where footage goes.
