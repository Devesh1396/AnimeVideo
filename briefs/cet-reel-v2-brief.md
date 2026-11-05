CET reel v2: hybrid edit (motion graphics + real footage) on the client's 7-slide script. Read this whole brief before doing anything.

CONTEXT
- Repo: the Hindi/Hinglish reel for Giane Future Gurukull's free Calculation Efficiency Test. Work on branch claude/reel-illustrated.
- v1 (Remotion, 32 s, old script) is in video/; render at video/renders/cet-reel-illustrated-v1.mp4. Keep its engine (timeline.json-driven scenes, word-timed animation).
- The approved plan for v2 is storyboard-v4/index.html (published: https://claude.ai/artifact/Ed9hBCvhuQv55ASEeDKrGg). Read it first: 7 slides, 13 shots, timings, on-screen text, sound cues.
- Footage prompts: storyboard-v4/veo-prompts-v2.md (C1, C3, C4, C5 required; C2, C7, C8 optional). Older references: storyboard/index.html (v3) and storyboard/veo-prompts.md.
- Brochure pages (the only source of facts besides client confirmations): source/Pg1.png–Pg4.png. The facts list is already built: video/facts.yaml.
- Footage is in source/Footages/ (note the folder name and the mixed-case file names). Delivered, all 1080x1920 at 24 fps:
  - C1.mp4 (9.96 s): boy confident in class, for 1a.
  - C3.mp4 (7.93 s): the four signs at home, for slide 2. The shot needs 8.8 s, so play it at about 0.9x speed.
  - c4-part2.mp4 (7.93 s): head in hands, for 3a. CLIENT NOTE: trim off the first few seconds and use only the SECOND PART of this clip. Watch a small contact sheet to pick the cut, and show me the in/out you chose at gate 1.
  - c5.mp4 (7.93 s): the new standalone scene, mother reading the test paper, for 3b (red duotone).
  - c8.mp4 (7.93 s): masterclass with a different boy ([Boy 2]), for 6b (dark ink tint).
  - Not delivered: C2 (so 1b uses C1 blurred and darkened behind the exam paper) and C7 (so slide 5 stays plain violet motion graphics).
  - The reel renders at 30 fps; OffthreadVideo plays the 24 fps clips fine. Check every take for AI artefacts (hands, pencils, fake text) before using it.
- Asset log: video/assets-used.md (started; keep it current).

THE SCRIPT (client's, final wording; on-screen text in caps)
1 Hook. On screen: MATHS CONCEPTS ARE CLEAR... STILL MAKING SILLY MISTAKES?!  VO: "Maths के concepts clear हैं… फिर भी silly mistakes हो जाती हैं?" No more voice to the end of the slide.
2 Signs. On screen: HAVE YOU NOTICED SIGNS LIKE THESE?  VO: "जल्दी-जल्दी questions solve करना, calculation mistakes, focus की problem, या formulas बार-बार भूल जाना…"
3 Beyond the signs. On screen: THESE MAY BE JUST THE VISIBLE SIGNS...  VO: "लेकिन ये तो सिर्फ़ दिखने वाले signs हैं। Silly mistakes के पीछे की असली वजह कुछ और भी हो सकती है।"
4 The test. On screen: CALCULATION EFFICIENCY TEST  VO: "इसीलिए Giane Future Gurukull लेकर आया है FREE Calculation Efficiency Test। ताकि बच्चे की calculation skills को बेहतर समझा जा सके।"
5 Why / what next. On screen: MORE THAN JUST A SCORE!  VO: "जानिए mistakes कहाँ हो रही हैं, उनके possible reasons क्या हैं, और improvement की शुरुआत कहाँ से करनी चाहिए।"
6 CTM bonus. On screen: EXPERIENCE CTM™ — CALCULATION THINKING METHOD  VO: "और special bonus में पाइए CTM की sixty-minute masterclass, worth five hundred rupees। Experience कीजिए calculation का एक different approach।"
7 CTA. On screen: BOOK YOUR CALCULATION EFFICIENCY TEST, WhatsApp 8062365298  VO: "तो आज ही WhatsApp पर Calculation Efficiency Test लिखकर भेजिए।"
Write English words in Latin script and Hindi in Devanagari (Sarvam handles code-mixed text best that way).
Decided: build VERSION A first (the script as written, ≈61 s) with the number NOT read aloud. After A is final, build the tightened VERSION B (≈40 s, lines in the storyboard's "Length" card) from the same storyboard and footage. Decided: the slide 4 voice line includes "FREE" (shown above); make the FREE badge land on that word.

GOAL FOR v2
Rule: FOOTAGE FOR FEELINGS, MOTION FOR FACTS. Mapping (from storyboard-v4; times are from a draft read and move with the Sarvam voice):
| Shot | Draft time | Picture |
|---|---|---|
| 1a | 0:00–0:02.9 | C1 boy confident in class, push-in, natural colour; "Maths concepts are clear…" |
| 1b | 0:02.9–0:06.0 | illustrated exam paper (keep from v1) over C1 blurred/darkened (C2 was not delivered); "Still making silly mistakes?!" |
| 2 | 0:06.0–0:14.8 | C3 blurred + darkened behind the 4-line checklist (ticks on the spoken words) |
| 3a | 0:14.8–0:18.4 | C4 head in hands, natural colour, bottom scrim; "These may be just the visible signs…" |
| 3b | 0:18.4–0:23.6 | C5 mother reading her son's marked test paper, then looking toward him (boy from behind, out of focus), red duotone; "…not the real reasons behind those silly mistakes." |
| 4a | 0:23.6–0:29.6 | motion graphics (violet), centred, no logo: a big FREE badge and CALCULATION / EFFICIENCY / TEST filling the screen |
| 4b | 0:29.6–0:34.2 | motion graphics, centred: "Understand your child's calculation skills better", divider, Guinness emblem, "Specially designed by Deveshh Sir", "Guinness World Record Holder in Memory" |
| 5 | 0:34.2–0:42.6 | motion graphics on plain violet (C7 not delivered); MORE THAN JUST A SCORE! → WHERE / WHY / WHAT NEXT |
| 6a | 0:42.6–0:49.8 | motion graphics (lime), centred with clear spacing: gift, "special bonus", CTM™ 60-minute Masterclass, worth ₹500, "with the test · limited period" |
| 6b | 0:49.8–0:54.0 | optional C8 (children in an energetic class) in a dark ink tint behind: EXPERIENCE CTM™ — Calculation Thinking Method, See → Process → Answer (no "different approach" line on screen) |
| 7a | 0:54.0–0:57.6 | motion graphics: "Book your Calculation Efficiency Test", WhatsApp message typed and sent; the reply is a registration form card ("Open form") |
| 7b | 0:57.6–1:01.5 | centred end card: WhatsApp 80623 65298, send CALCULATION EFFICIENCY TEST, Class 3 onwards · Ahmedabad · Vadodara, then the client's logo (source/Giane future gurukull logog F(2).png) large with www.gianefuturegurukull.com; hold ≥3 s |
No cartoon people in v2 (real children in slides 1–3 must not sit next to cartoon children). Missing or weak clip = that shot falls back to the storyboard's motion/illustrated version.
For each clip: pick the usable seconds noted in veo-prompts-v2.md, crop to 9:16, grade as noted (blur, darken, duotone), reject any take with AI artefacts (hands, warped pencils, fake text). Use OffthreadVideo in Remotion.
Pacing: calmer than v1. One idea per shot, holds of 3–5 s, soft transitions; nothing faster than the voice.

HARD RULES
1. Gates. First show me: (a) the footage found, (b) the shot table above with the exact clip and in/out times you chose, (c) video/facts.yaml (already built; check it against the pages and the script). Wait for my OK. Then render a LOW-RES preview (half scale) plus a 1-fps contact sheet. Wait for my OK. Only then render the final.
2. No invented facts. Every on-screen and spoken claim must match facts.yaml: "Deveshh Sir" (double h), Guinness World Record Holder in Memory, free Calculation Efficiency Test, ₹500 CTM™ 60-minute Masterclass bonus for a limited period, Class 3 onwards, WhatsApp 8062365298 with the message "CALCULATION EFFICIENCY TEST", centres in Ahmedabad and Vadodara.
3. Licensed assets only. Log every clip, sound, font and logo in video/assets-used.md with source and licence. The Guinness emblem needs GWR approval before the ad runs (already noted in the log).
4. timeline.json stays the single source of timing. The new script needs new timings: rebuild them from the Sarvam word timings, keeping the storyboard's shot order and holds.

SETUP (a new session is a fresh container; only committed files survive. If the environment's setup script already installed earshot and the Python tools, check them with `earshot doctor` and `pip show faster-whisper sarvamai` and skip those steps)
- cd video && npm install   (package.json now includes @remotion/transitions, @remotion/motion-blur, @remotion/paths, @remotion/media-utils, all 4.0.536)
- Remotion agent skills are committed in video/.agents/skills (Claude Code sees them through video/.claude/skills). Use remotion-best-practices for springs, transitions, OffthreadVideo and audio.
- python3 -m venv video/.venv && video/.venv/bin/pip install -r video/requirements.txt   (faster-whisper, sarvamai, pyloudnorm)
- earshot (lets you "hear" the mix): git clone https://github.com/Leonxlnx/earshot ~/earshot (outside the repo); cd ~/earshot; python3 -m venv .venv; .venv/bin/pip install torch --index-url https://download.pytorch.org/whl/cpu; .venv/bin/pip install -e ".[mcp]"; .venv/bin/python -m earshot doctor --fetch (~1.1 GB of models, tell me before downloading). Use it to: rank SFX candidates against a description (earshot rank), check sync of sounds to cuts and the music arc (earshot timeline mix.wav --video preview.mp4, earshot sheet ... -o sheet.png), measure LUFS / true peak (earshot measure), and score the whole film (earshot critique). It does NOT judge Hindi pronunciation; for the voice, transcribe each line back with faster-whisper (language hi) and compare to the script.

VOICE (replace the draft Edge TTS, which isn't licensed for an ad)
- Sarvam Bulbul via the API with the SARVAM_API_KEY environment variable. Check docs.sarvam.ai for the current model ID (V4 Flash if available, else bulbul:v3). Use the 7 lines above (or the tightened set if I pick option B).
- VOICE: I will name the Sarvam voice (speaker) when I start the session. Use that speaker: generate ONLY the slide 1 line in it first and give me the file to approve, then all lines. If I haven't named one, generate the slide 1 line in 3 warm female voices that handle Hindi with English words well (check the current speaker list in docs.sarvam.ai) and let me pick. Then all lines in the chosen voice. Total TTS budget: ₹100.
- If Sarvam returns no word timings, get them with faster-whisper (language hi) and write vo-timings.json so every animation still lands on its word.
- If SARVAM_API_KEY is missing or the API is blocked, tell me and stop. Don't fall back to Edge TTS.

SOUND
- Use the real CC0 / free-licence sounds already in video/public/audio/sfx/ (Kenney interface + UI sets, a Mixkit shortlist). Only the 9 cues in the storyboard: paper slide, 4 soft checklist ticks, whoosh into slide 4, soft chime on the test name, whoosh into slide 6, soft pop on the gift, key taps + sent swoosh, final chime. Pick each with earshot rank, then confirm by ear-check numbers (onset, level). If a needed sound is missing, tell me which and I'll upload it.
- Music: keep the synthesized score but make it calmer: piano-led, no drums in slides 1–3, thin out in slide 3, lift at slide 4. Duck it under the voice. Final mix at -14 LUFS, true peak -1.5 dBTP.

MOTION POLISH (only where it helps)
- Remotion springs instead of hand-written easing for pops and slams. Short transitions at the 3→4 (circular wipe) and 5→6 (lime swipe) idea changes, light motion blur on fast moves only.
- Keep text inside the safe zone (y 330–1350 of 1920), clear of the right-side buttons.

EFFICIENCY (my credits are limited)
- Work from timeline.json and contact sheets. Look at small frames only, not full-size ones.
- Before any expensive step (a full render, a large download, a re-render after notes), tell me first.

DELIVERABLES
1. video/renders/cet-reel-v2.mp4 (1080x1920, 30 fps) + the contact sheet.
2. If budget allows after the final: one Director's Cut of only the first 3 seconds (a stronger hook idea of yours), as cet-reel-v2-hook-alt.mp4.
3. video/assets-used.md and video/facts.yaml, up to date.
4. HANDOFF.md at the repo root: what v2 contains, the decisions made, the open notes, and the exact commands to rebuild. I'll continue on my Windows desktop, so give Windows commands (PowerShell, .venv\Scripts\python, no /opt paths; let Remotion download its own browser).
5. Commit and push everything to this branch.

Start with step 1 of the gates: list the footage you found, show the shot table with your chosen clips and in/out times, and show facts.yaml.
