// Reel v2 timing: everything comes from timeline.json + vo-timings-v2.json (no times typed in scenes
// except small offsets after a word).
import { spring } from 'remotion';
import timeline from '../timeline.json';
import vo from '../vo-timings-v2.json';

export const TL = timeline;
export type Line = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7';
export type Shot = keyof typeof timeline.shots;
type Words = { w: string; start: number; end: number }[];
const LINES = (vo as unknown as { lines: Record<Line, { words: Words }> }).lines;

type Seg = { at: number; src: [number, number]; line?: string };
const SEGS = Object.entries(timeline.vo)
  .filter(([k]) => k !== 'file')
  .map(([k, v]) => ({ key: k, ...(v as Seg) }));
/** A voice line can be split into segments at its natural pauses (e.g. s6 + s6x); find the one holding time `src`. */
const seg = (line: Line, src: number) => {
  const s = SEGS.find((g) => (g.line ?? g.key) === line && src >= g.src[0] - 0.02 && src <= g.src[1] + 0.02);
  if (!s) throw new Error(`no voice segment for ${line} @ ${src}`);
  return s;
};
/** Reel time (s) where word i of a voice line starts. */
export const W = (line: Line, i: number) => {
  const w = LINES[line].words[i];
  const g = seg(line, w.start);
  return g.at + (w.start - g.src[0]);
};
/** Reel time (s) where word i ends. */
export const WE = (line: Line, i: number) => {
  const w = LINES[line].words[i];
  const g = seg(line, w.start);
  return g.at + (w.end - g.src[0]);
};
export const S = (shot: Shot) => timeline.shots[shot] as [number, number];

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const prog = (t: number, at: number, dur: number) => clamp((t - at) / dur);
export const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
export const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const n = (x: number, d = 3) => x.toFixed(d);

/** Remotion spring, driven by reel time. Calm by default (no big overshoot). */
export const sp = (t: number, at: number, stiffness = 120, damping = 16, mass = 1) =>
  t < at ? 0 : spring({ frame: (t - at) * timeline.fps, fps: timeline.fps, config: { stiffness, damping, mass } });

/** Fade + rise in (spring). */
export const rise = (t: number, at: number, dy = 5) => {
  const p = sp(t, at, 110, 18);
  return `opacity:${n(clamp(p * 1.4))};transform:translateY(${n((1 - p) * dy, 2)}cqw)`;
};
/** Pop in with a gentle overshoot (spring). */
export const pop = (t: number, at: number, from = 0.4, rot = 0) => {
  const p = sp(t, at, 160, 12);
  return `opacity:${n(clamp(p * 3))};transform:scale(${n(from + (1 - from) * p)}) rotate(${n(rot * (1 - p) , 2)}deg)`;
};
/** Drop in from above with a tilt (spring), for the FREE badge. */
export const drop = (t: number, at: number, tilt = -3) => {
  const p = sp(t, at, 170, 13);
  return `opacity:${n(clamp(p * 3))};transform:translateY(${n((1 - p) * -40, 2)}cqw) rotate(${n(lerp(-14, tilt, p), 2)}deg) scale(${n(lerp(1.25, 1, p))})`;
};
/** Left-to-right reveal (handwriting). */
export const write = (t: number, at: number, dur = 0.45) =>
  `clip-path:inset(-20% ${n((1 - easeInOut(prog(t, at, dur))) * 100, 1)}% -20% -5%)`;
/** Draw a pathLength=1 stroke. */
export const draw = (t: number, at: number, dur = 0.35) =>
  `stroke-dasharray:1;stroke-dashoffset:${n(1 - easeOut(prog(t, at, dur)))}`;
export const fade = (t: number, at: number, dur = 0.3) => `opacity:${n(easeOut(prog(t, at, dur)))}`;
