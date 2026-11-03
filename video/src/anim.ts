// Small animation helpers. Every scene is a pure function of time t (seconds since the reel started).
import timings from './vo-timings.json';
import timeline from './timeline.json';

type Timings = Record<string, { duration: number; words: { w: string; t: number }[] }>;
const VO = timings as unknown as Timings;
export const TL = timeline;

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const prog = (t: number, at: number, dur: number) => clamp((t - at) / dur);
export const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
export const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const backOut = (p: number) => {
  const c1 = 2.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Start time (global seconds) of word i of a voice line. */
export const W = (line: keyof typeof timeline.vo, i: number) => timeline.vo[line] + VO[line].words[i].t;

/** Fade + rise in. */
export const rise = (t: number, at: number, dur = 0.35, dy = 6) => {
  const p = easeOut(prog(t, at, dur));
  return `opacity:${p.toFixed(3)};transform:translateY(${((1 - p) * dy).toFixed(2)}cqw)`;
};
/** Scale pop with overshoot. */
export const pop = (t: number, at: number, dur = 0.42, from = 0.3) => {
  const p = prog(t, at, dur);
  const s = from + (1 - from) * backOut(p);
  return `opacity:${clamp(p * 4).toFixed(3)};transform:scale(${s.toFixed(3)})`;
};
/** Slam down from bigger. */
export const slam = (t: number, at: number, dur = 0.22, from = 1.6) => {
  const p = easeOut(prog(t, at, dur));
  return `opacity:${clamp(p * 2).toFixed(3)};transform:scale(${lerp(from, 1, p).toFixed(3)})`;
};
/** Left-to-right reveal, like handwriting. */
export const write = (t: number, at: number, dur = 0.35) => {
  const p = prog(t, at, dur);
  return `clip-path:inset(-20% ${((1 - p) * 100).toFixed(1)}% -20% -5%)`;
};
/** Draw a stroke whose path has pathLength=1. */
export const draw = (t: number, at: number, dur = 0.3) =>
  `stroke-dasharray:1;stroke-dashoffset:${(1 - easeOut(prog(t, at, dur))).toFixed(3)}`;
export const show = (t: number, at: number) => (t >= at ? '' : 'opacity:0;');
export const fadeIn = (t: number, at: number, dur = 0.2) => `opacity:${easeOut(prog(t, at, dur)).toFixed(3)}`;
