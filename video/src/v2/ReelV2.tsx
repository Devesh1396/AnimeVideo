// Reel v2 (version A): footage for feelings (slides 1-3), motion graphics for facts (4-7).
// Every time comes from timeline.json; word times from vo-timings-v2.json (see time.ts).
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import '../styles.css';
import './v2.css';
import { DEFS } from '../defs';
import faces from '../../public/fonts/faces.json';
import { OVERLAYS } from './scenes2';
import { S, Shot, TL, clamp, easeInOut, easeOut, n, prog } from './time';

type Face = { family: string; file: string; weight: string; stretch: string; unicodeRange: string };
function useFonts() {
  const [handle] = useState(() => delayRender('Loading fonts'));
  useEffect(() => {
    Promise.all(
      (faces as Face[]).map((f) => {
        const ff = new FontFace(f.family, `url(${staticFile(`fonts/${f.file}`)}) format('woff2')`, {
          weight: f.weight, stretch: f.stretch, unicodeRange: f.unicodeRange, display: 'block',
        });
        (document.fonts as unknown as { add: (f: FontFace) => void }).add(ff);
        return ff.load();
      })
    )
      .then(() => continueRender(handle))
      .catch((e) => { console.error(e); continueRender(handle); });
  }, [handle]);
}

const FPS = TL.fps;
const SHOTS = Object.keys(TL.shots) as Shot[];
/** How long a shot stays visible under the next one while that one comes in. */
const TAIL: Partial<Record<Shot, number>> = { s1b: 0.35, s2: 0.45, s3a: 0.5, s3b: 0.5, s4a: 0.3, s4b: 0.3, s5: 0.45, s6b: 0.3, s7a: 0.4 };
/** Footage that starts before its shot (the 3a->3b cross-dissolve starts early so the cut lands on "asli wajah"). */
const LEAD: Partial<Record<Shot, number>> = { s3b: 0.25 };
const C3B_RATE = 0.92; // c5 slightly slowed so its usable first 3.5 s cover the shot + wipe (lips move after ~4 s)

/** Background layer per shot: footage (graded) or a flat motion-graphics colour. */
const Background: React.FC<{ shot: Shot; t: number }> = ({ shot, t }) => {
  const [a, b] = S(shot);
  const clip = (TL.clips as Record<string, { file: string; in: number; rate: number; grade: string }>)[shot];
  if (!clip) {
    const cls = shot.startsWith('s4') ? 'f-vio' : shot === 's5' ? 'f-paper' : shot === 's6a' ? 'f-night' : shot === 's6b' ? 'f-deep' : 'f-ink';
    return <div className={`layer ${cls}`} />;
  }
  const lead = LEAD[shot] ?? 0;
  const rate = shot === 's3b' ? C3B_RATE : clip.rate;
  // gentle push-in over the shot on natural-colour footage
  const push = clip.grade === 'natural' ? 1 + 0.045 * easeInOut(prog(t, a, b - a)) : 1;
  let filter = 'none';
  let extra = 1;
  if (clip.grade === 'blur') {
    // 1b: blur ramps in as the paper arrives (continuous with 1a, same clip)
    const k = shot === 's1b' ? easeOut(prog(t, a, 0.45)) : 1;
    filter = `blur(${n(18 * k, 1)}px) brightness(${n(1 - 0.55 * k, 3)}) saturate(.9)`;
    extra = 1.06;
  } else if (clip.grade === 'red') filter = 'grayscale(1) contrast(1.15) brightness(1.1)';
  else if (clip.grade === 'ink') filter = 'grayscale(1) brightness(.85) contrast(1.05)';
  else if (clip.grade === 'visible') filter = 'brightness(.92) saturate(.95)';
  const redIn = clip.grade === 'red' ? easeInOut(prog(t, a - lead, 0.6)) : 0;
  return (
    <div className="layer" style={{ background: '#111' }}>
      <Sequence from={Math.round((a - lead) * FPS)} layout="none">
        <div className="layer" style={{ filter, transform: `scale(${n(push * extra, 4)})`, transformOrigin: '50% 40%' }}>
          {/* watermark crop: keep x 65-1015, y 0-1690, scaled to 1080x1920 */}
          <OffthreadVideo
            src={staticFile(clip.file)}
            trimBefore={Math.round(clip.in * FPS)}
            playbackRate={rate}
            muted
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${TL.crop.scale})`, transformOrigin: TL.crop.origin }}
          />
        </div>
      </Sequence>
      {clip.grade === 'red' && <div className="layer" style={{ background: '#ef4136', mixBlendMode: 'multiply', opacity: redIn }} />}
      {clip.grade === 'ink' && <div className="layer" style={{ background: '#2b2856', mixBlendMode: 'multiply' }} />}
      {clip.grade === 'ink' && <div className="layer" style={{ background: 'rgba(22,20,43,.28)' }} />}
      {clip.grade === 'visible' && <div className="layer" style={{ background: 'radial-gradient(75% 42% at 50% 42%, rgba(16,12,46,.72), rgba(16,12,46,.18) 100%)' }} />}
      {(clip.grade === 'natural' || clip.grade === 'red') && <div className="layer scrim" />}
    </div>
  );
};

/** Opacity / clip of a shot as it comes in (transitions from timeline.json). */
function entrance(shot: Shot, t: number): React.CSSProperties {
  const a = S(shot)[0] - (LEAD[shot] ?? 0);
  const kind = (TL.transitions as Record<string, string>)[shot];
  if (kind === 'circle') return { clipPath: `circle(${n(easeInOut(prog(t, a, 0.45)) * 120, 2)}% at 50% 45%)` };
  if (kind === 'lime-swipe') return { clipPath: `inset(0 ${n((1 - easeInOut(prog(t, a, 0.4))) * 100, 2)}% 0 0)` };
  if (kind === 'dissolve') return { opacity: easeInOut(prog(t, a, 0.6)) };
  if (kind === 'fade') return { opacity: easeOut(prog(t, a, 0.35)) };
  if (shot === 's4b' || shot === 's5' || shot === 's6b' || shot === 's7a') return { opacity: easeOut(prog(t, a, 0.3)) };
  return {};
}

export const ReelV2: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const live = SHOTS.filter((s) => {
    const [a, b] = S(s);
    return t >= a - (LEAD[s] ?? 0) && t < b + (TAIL[s] ?? 0);
  });
  return (
    <AbsoluteFill style={{ backgroundColor: '#16142b' }}>
      <div className="frame v2">
        <div dangerouslySetInnerHTML={{ __html: DEFS }} />
        {live.map((s) => {
          // overlays of the outgoing shot fade out during its tail
          const [, b] = S(s);
          const outP = clamp((t - b) / (TAIL[s] ?? 0.001));
          return (
            <div key={s} className="layer" style={entrance(s, t)}>
              <Background shot={s} t={t} />
              <div className="layer" style={{ opacity: 1 - outP }} dangerouslySetInnerHTML={{ __html: OVERLAYS[s](t) }} />
            </div>
          );
        })}
      </div>
      <Audio src={staticFile('audio/mix-v2.wav')} />
    </AbsoluteFill>
  );
};
