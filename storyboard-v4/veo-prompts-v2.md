# Veo / Omni prompts for reel v2 (final)

For the hybrid storyboard (`storyboard-v4/index.html`), built on the client's 7-slide script.
Only slides 1–3 use footage ("footage for feelings"); slides 4–7 are motion graphics. So this list is shorter
than the v3 one (`storyboard/veo-prompts.md`): **4 required clips, 3 optional**. C6 (teacher at the board) is dropped.

Upload each take to `source/footage/` as `C1a.mp4`, `C1b.mp4`, `C3a.mp4`, … (2–3 takes per clip if you can).

## Settings for every clip

- **Aspect ratio:** portrait 9:16, set in the tool's settings (not just in the prompt).
- **Length:** 8 s, the usual maximum. The "Needed" line under each clip says how much the edit uses.
- **Resolution:** 1080p if your plan has it.
- **Audio:** off, or ignored. The reel has its own voice, music and sound.
- **Negative prompt:** paste each clip's "Avoid" line into the negative-prompt field if the tool has one; otherwise
  leave it at the end of the prompt.
- **Same boy throughout, two outfits:** C1, C3, C4, C5, C7 and C8 all show the same boy, so the parent follows one
  child. At school (C1, C8) he wears the uniform; at home (C3, C4, C5, C7) he wears the same plain home T-shirt in
  every clip. Generate **C3 first** and pick the best take. Use a still of him from it as the **reference image** for:
  - C4, C5 and C7: face *and* clothes (same evening, same T-shirt);
  - C1 and C8: face only. Add "the same boy as in the reference image, now wearing his school uniform" so the tool
    keeps the face but changes the clothes.
  ("Ingredients" or "Frames to video" in Flow; "reference image" in other tools.)
- **If a prompt is refused** because it shows a child: keep the scene but frame it from behind, over the shoulder or
  on the hands. That works for C1, C2 and C3, which the edit blurs or shows small.

## The cast (paste these exactly where a prompt says [Boy] or [Mother])

- **[Boy]** a 9-year-old Indian boy with short neat black hair and a medium-brown complexion. (Add one of the two
  outfits below right after it.)
- **[School outfit]** wearing a plain light-blue short-sleeved school shirt with no badge or logo. Use in C1, C8.
- **[Home outfit]** wearing a plain mustard-yellow cotton round-neck T-shirt with no print or logo, and dark shorts.
  Use in C3, C4, C5, C7, always the same.
- **[Mother]** an Indian woman in her mid-thirties, hair tied back in a low bun, wearing a simple cotton kurta in a
  soft muted colour, a small bindi, thin glass bangles, no other jewellery.

---

## C1 · Slide 1a (0:00–0:02.9) · "Maths ke concepts clear hain…" · REQUIRED

**Revised.** The first version asked for the teacher and chalkboard "in the background" while the camera faced the boy.
In a real classroom the children face the board, so a camera looking at the boy's face has the board *behind the
camera*, not behind him. That's why the result looked wrong. Now the camera stands where the teacher stands.

> Vertical 9:16 video. A bright Indian primary-school classroom in Gujarat, morning. The camera is at the front of the
> classroom, where the teacher stands, looking toward the students. [Boy], [School outfit], sits in the second row at a wooden twin
> desk, facing the camera. He listens, nods with quiet confidence and raises his hand to answer, with a small sure
> smile. Behind him are more rows of Indian children aged 8 to 10 in plain light-blue school shirts, softly out of
> focus, and the back wall of the classroom with tall windows and soft daylight. Camera at a seated child's eye
> level, slow smooth push-in toward the boy. Ceiling fans turning slowly. Natural documentary look, realistic skin
> tones, shallow depth of field, 35mm lens.
>
> Avoid: blackboard, chalkboard, whiteboard, teacher or any adult in the frame, readable writing, letters, numbers,
> logos, posters with text, watermarks, cartoon or CGI look, extra fingers, warped desks.

- **Needed:** 2.9 s, the push-in ending on the raised hand.
- **Grade:** natural colour, dark gradient at the bottom for the text.
- **If you still get a board or a teacher:** add "seen from the teacher's point of view" to the first sentence, and
  keep "blackboard, teacher" in the negative prompt.

**Fallback, C1-alt (if faces keep coming out wrong):** shoot from behind instead, where the board belongs in front.

> Vertical 9:16 video. A bright Indian primary-school classroom in Gujarat, morning. Over-the-shoulder shot from
> just behind [Boy], [School outfit], who sits at a wooden desk in the middle row, facing a green chalkboard at the front where a
> young Indian woman teacher is explaining. He confidently raises his hand to answer. The boy's shoulder and raised
> hand are in the foreground; the teacher and the board are ahead of him, soft and out of focus. Other children in
> plain light-blue shirts at desks on both sides. Soft daylight, slow push-in past his shoulder. Natural documentary
> look, 35mm lens, shallow depth of field.
>
> Avoid: readable writing on the board, letters, numbers, logos, watermarks, cartoon or CGI look, extra fingers.

The alt shows the boy from behind, so his face first appears in C3. Use it only if the main C1 keeps failing.

## C2 · Slide 1b (0:02.9–0:06.0) · test paper on the desk · OPTIONAL

> Vertical 9:16 video, close-up at desk level. On a wooden school desk, an adult hand places a single exam sheet in
> front of a child; the child's hands, with a light-blue shirt cuff, slowly pull the paper closer and the fingers
> tighten on its edge. Red-ink marks on the page, too out of focus to read. Blurred classroom behind, warm daylight.
> Static camera, 50mm lens, shallow depth of field, realistic.
>
> Avoid: readable text or numbers, faces, logos, watermarks, extra fingers, hands merging into paper.

- **Needed:** 3.1 s. **Grade:** heavy blur and darkening behind the illustrated exam paper. If you skip C2, the edit
  reuses C1 blurred.

## C3 · Slide 2 (0:06.0–0:14.8) · the four signs at home · REQUIRED (generate first)

> Vertical 9:16 video. Evening in a modest, tidy Indian apartment in Ahmedabad. [Boy], [Home outfit], sits at a small study table
> against a plain wall, a maths exercise book open in front of him, under a warm table lamp. In one continuous take:
> he writes very fast, rushing; stops and rubs out an answer with an eraser, frowning; glances away out of the frame,
> distracted, tapping the pencil; then stops with the pencil held still above the page, taps the end of the pencil
> lightly against his temple and looks up, trying to remember something, then gives a small unsure shake of the
> head. The book stays open on the same page the whole time; he never turns a page. Camera at table
> height, slightly to the side, very slow gentle drift. Warm lamp light mixed with cool window light. Realistic,
> natural, documentary style, 35mm lens.
>
> Avoid: turning or flipping pages, readable writing in the book, logos, branded stationery, posters with text,
> watermarks, pencil merging into fingers, extra fingers.

- **Needed:** 8.8 s, the whole take (played at about 0.9× speed, or two takes joined with a slow dissolve).
- **Grade:** blurred and darkened behind the checklist. The four actions (rushing, erasing, looking away, pencil to the
  temple trying to remember) line up with the four ticks, so keep the order.
- **Why no page flip:** video models rarely get a page turn right (it half-turns and falls back). Trying to remember
  shows "keeps forgetting formulas" with the face and a hand, which they handle well.
- **If the take runs out before the fourth action:** generate it as two clips, C3a (rushing + erasing) and C3b (looking
  away + trying to remember), from the same reference image; the edit joins them with a slow dissolve.

## C4 · Slide 3a (0:14.8–0:18.4) · "Lekin ye toh sirf dikhne wale signs hain" · REQUIRED

> Vertical 9:16 video, close-up. [Boy], [Home outfit], the same boy at the same lamp-lit study table, puts his pencil down, slowly
> rests his head in both hands over his maths exercise book and exhales, frustrated and tired, not crying. Face
> clearly visible in three-quarter view. Warm lamp light, soft shadows, shallow depth of field, very slow push-in.
> Realistic, natural, 50mm lens.
>
> Avoid: tears, exaggerated crying, readable text, logos, watermarks, distorted hands or face.

- **Needed:** 3.6 s, hands going to the head and the exhale.
- **Grade:** natural colour, dark gradient at the bottom for the text.

## C5 · Slide 3b (0:18.4–0:23.6) · "…asli wajah kuch aur bhi ho sakti hai" · REQUIRED

> Vertical 9:16 video. The same lamp-lit study table in an Indian apartment. [Mother] sits on a chair beside [Boy], [Home outfit],
> who is bent over his maths exercise book. She watches him quietly, chin resting on her hand, thoughtful and
> concerned, not angry. She looks at his book, then back at him, as if wondering what is really going wrong. Camera
> at her eye level, framing both, her face sharp and the boy slightly softer. Warm gentle light. Realistic, natural,
> 50mm lens, very slow push-in.
>
> Avoid: shouting, scolding or angry expressions, readable text, logos, watermarks, distorted hands.

- **Needed:** 5.2 s, her watching, glancing at the book, then back at him.
- **Grade:** red duotone. Contrast and lighting matter more than colour; a clear face with a dark background works best.

## C7 · Slide 5 (0:34.2–0:42.6) · thinking, then a small smile · OPTIONAL

> Vertical 9:16 video, medium close-up. [Boy], [Home outfit], sits at his study table at home by a window in the daytime, with a maths problem in front of him,
> the tip of his pencil resting on his chin, eyes up and to the side, thinking. After a moment his face relaxes into a
> small, confident smile, and he looks down to write. Soft bright daylight, clean uncluttered background. Static
> camera, shallow depth of field. Realistic, natural, 50mm lens.
>
> Avoid: exaggerated grin, looking into the camera, readable text, logos, watermarks, distorted hands.

- **Needed:** up to 8.4 s (slowed slightly). The smile should land around 5 s into the clip, on "improvement".
- **Grade:** violet duotone behind the WHERE / WHY / WHAT NEXT text. If it's weak, slide 5 stays plain violet.

## C8 · Slide 6b (0:49.8–0:54.0) · "Experience kijiye calculation ka ek different approach" · OPTIONAL

> Vertical 9:16 video. A bright, modern Indian classroom during an energetic maths session. Indian children aged 8
> to 11 in plain light-blue school shirts sit at desks, quickly working out answers in their notebooks, looking up
> eagerly and raising hands; in the middle, [Boy], [School outfit], answers quickly with a confident smile. A young Indian woman teacher
> stands at the side, encouraging them, slightly out of focus. Lively but calm, focused energy. Camera at child eye
> level, slow lateral glide across the desks. Bright, even daylight. Realistic, natural, 35mm lens, shallow depth of
> field.
>
> Avoid: readable writing on boards, books or screens, abacus, rods or counting beads, logos, posters with text,
> watermarks, distorted hands, exaggerated cheering.

- **Needed:** 4.2 s of the glide. **Grade:** dark ink tint (desaturated, darkened to about 40%) behind the CTM™ type;
  the type must stay the hero. No abacus in frame: the brochure's point is "No abacus. No Vedic sutras."
- **If it's weak or missing:** slide 6b stays plain ink.

---

## Checking each take before upload

- Hands and fingers: count them; no pencil melting into a finger.
- Faces: stable from start to end, same boy as C3.
- Paper and boards: no fake "text" that looks like letters. Blurred clips still show this.
- No watermark in the corner (some plans add one). Google's invisible SynthID mark is fine.
- Reject anything that looks staged or glossy; the reel works because it feels like a real home.

## Before the reel runs as an ad

- Meta may label photorealistic AI video ("AI info"). Check Meta's current ad policy on AI-generated content.
- Filming at the centres is still the most authentic option. If you film real children, get written consent from a
  parent for every child who can be identified.
