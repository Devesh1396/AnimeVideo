// Reel v2 overlays: type and motion graphics as HTML strings (same approach as v1), one function per shot.
// Footage sits underneath (ReelV2.tsx). Text stays in the safe zone: y 330-1350 of 1920 (17.2%-70.3%),
// clear of the right 12%. Layout follows storyboard-v4/index.html.
import { staticFile } from 'remotion';
import { S, W, WE, clamp, draw, drop, easeInOut, easeOut, fade, lerp, n, pop, prog, rise, sp, write } from './time';

const tick = (style: string) => `<svg class="mark" viewBox="0 0 40 40" style="${style}"><use href="#sc-tick"/></svg>`;

/* ---------- 1a · C1, "Maths concepts are clear…" ---------- */
export function s1a(t: number) {
  return `
  <div class="safe-stack end">
    <div class="m c-white sh" style="font-size:8.6cqw;${rise(t, W('s1', 0))}">Maths</div>
    <div class="d c-white sh" style="font-size:17cqw;${rise(t, W('s1', 2))}">concepts</div>
    <div class="d c-lime sh rel" style="font-size:17cqw;${rise(t, W('s1', 3))}">are clear…<svg class="mark" viewBox="0 0 40 40" style="right:-13cqw;top:1cqw;width:11cqw;height:11cqw;stroke:var(--lime);${draw(t, W('s1', 4), 0.3)}"><use href="#sc-tick"/></svg></div>
  </div>`;
}

/* ---------- 1b · exam paper over C1 (blurred), "Still making silly mistakes?!" ---------- */
export function s1b(t: number) {
  const a = S('s1b')[0];
  const up = sp(t, a, 90, 17);
  const m1 = a + 0.35, m2 = a + 0.7, m3 = a + 1.05, m4 = a + 1.4;
  const ans = (at: number, wrong: string, right: string) =>
    t >= at ? `<s>${wrong}</s> <em style="display:inline-block;${pop(t, at, 0.5)}">${right}</em>` : wrong;
  const x = (at: number) => `<span class="x" style="display:inline-block;${pop(t, at, 0.3)}">✗</span>`;
  return `
  <div class="exam" style="top:15%;transform:translateY(${n((1 - up) * 110, 2)}cqw) rotate(-2.5deg)">
    <div class="ex-h"><div><div class="ex-t">MATHS · UNIT TEST</div><div class="ex-n">Name: <span class="hand c-ball">Aarav</span> &nbsp; Class: <span class="hand c-ball">4-B</span></div></div>
      <div class="ex-s rel" style="${fade(t, m4, 0.2)}">12<span style="font-size:.6em">/20</span><svg class="mark c-pen" viewBox="0 0 200 100" style="left:-30%;top:-25%;width:160%;height:150%;${draw(t, m4, 0.4)}"><use href="#sc-circle"/></svg></div></div>
    <div class="ex-q"><span class="qn">1.</span><span class="qa">48 + 37 = 85</span>${tick(`position:static;width:7cqw;height:7cqw;stroke:var(--pen);${draw(t, m1, 0.25)}`)}</div>
    <div class="ex-q"><span class="qn">2.</span><span class="qa">7 × 8 = ${ans(m2, '54', '56')}</span>${t >= m2 ? x(m2) : ''}</div>
    <div class="ex-q"><span class="qn">3.</span><span class="qa">125 − 68 = ${ans(m3, '67', '57')}</span>${t >= m3 ? x(m3) : ''}</div>
  </div>
  <div class="safe-stack end" style="gap:.4cqw">
    <div class="m c-white sh" style="font-size:8cqw;${rise(t, W('s1', 5))}">Still making</div>
    <div class="d c-pen sh" style="font-size:19cqw;transform-origin:left bottom;${pop(t, W('s1', 7), 0.6)}">silly</div>
    <div class="d c-white sh" style="font-size:15cqw;${rise(t, W('s1', 8))}">mistakes?!</div>
  </div>`;
}

/* ---------- 2 · C3 (blurred) behind the checklist ---------- */
export function s2(t: number) {
  const a = S('s2')[0];
  const items: [string, number][] = [
    ['Rushes through questions', W('s2', 0)],
    ['Makes calculation mistakes', W('s2', 5)],
    ['Has trouble focusing', W('s2', 7)],
    ['Keeps forgetting formulas', W('s2', 11)],
  ];
  return `
  <div class="safe-stack" style="gap:4.2cqw">
    <div style="${rise(t, a + 0.1)}"><div class="m c-white" style="font-size:7.6cqw">Have you noticed</div><div class="d c-lime" style="font-size:12.5cqw">signs like these?</div></div>
    <div style="display:grid;gap:3.4cqw;margin-top:2cqw">
    ${items
      .map(
        ([label, at]) => `
      <div class="check" style="${rise(t, at - 0.15, 4)}"><span class="box"><svg viewBox="0 0 40 40" style="stroke:#fff"><use href="#sc-box"/></svg><svg viewBox="0 0 40 40" style="stroke:var(--lime);inset:-25% -10% 10% 10%;${draw(t, at + 0.12, 0.3)}"><use href="#sc-tick"/></svg></span><span class="m c-white" style="font-size:8.2cqw;font-weight:700;line-height:1.05">${label}</span></div>`
      )
      .join('')}
    </div>
  </div>`;
}

/* ---------- 3a · C4, "These may be just the visible signs…" ---------- */
export function s3a(t: number) {
  const hl = easeInOut(prog(t, W('s3', 6), 0.5));
  return `
  <div class="safe-stack end" style="gap:.6cqw">
    <div class="m c-white sh" style="font-size:8.6cqw;${rise(t, W('s3', 4) - 0.1)}">These may be just</div>
    <div class="d c-white sh" style="font-size:17cqw;${rise(t, W('s3', 5))}">the visible</div>
    <div class="d c-white" style="font-size:20cqw;${rise(t, W('s3', 6))}"><span class="hl c-ink" style="background-position:0 62%;background-size:${n(hl * 100, 1)}% 86%;padding:0 2cqw">signs…</span></div>
  </div>`;
}

/* ---------- 3b · C5 (red duotone), "…not the real reasons behind those silly mistakes." ---------- */
export function s3b(t: number) {
  const a = S('s3b')[0];
  return `
  <div class="safe-stack end" style="gap:.8cqw">
    <div class="m c-white sh" style="font-size:8.6cqw;${rise(t, a)}">…not the</div>
    <div class="d c-white sh" style="font-size:20cqw;transform-origin:left bottom;${pop(t, W('s3', 13), 0.7)}">real reasons</div>
    <div class="m c-white sh" style="font-size:7.6cqw;${rise(t, W('s3', 14) + 0.15)}">behind those silly mistakes.</div>
  </div>`;
}

/* ---------- 4a · violet: FREE + CALCULATION / EFFICIENCY / TEST ---------- */
export function s4a(t: number) {
  const out = prog(t, S('s4a')[1] - 0.3, 0.3);
  const free = W('s4', 7);
  const burst = sp(t, free + 0.05, 140, 14);
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 + (t - free) * 0.25;
    const r0 = 31, r1 = 31 + 8 * burst;
    return `<path d="M${n(Math.cos(a) * r0, 1)} ${n(Math.sin(a) * r0 * 0.62, 1)}L${n(Math.cos(a) * r1, 1)} ${n(Math.sin(a) * r1 * 0.62, 1)}"/>`;
  }).join('');
  const spark = (x: string, y: string, s: number, d: number) =>
    `<svg class="mark c-white" viewBox="0 0 40 40" style="left:${x};top:${y};width:${s}cqw;height:${s}cqw;transform:rotate(${n((t - free) * 60, 1)}deg) scale(${n(sp(t, free + d, 160, 12))})"><use href="#sc-spark"/></svg>`;
  return `
  <div class="cstack" style="gap:.6cqw;opacity:${n(1 - out)}">
    <div class="hand c-white" style="font-size:9.5cqw;${write(t, W('s4', 0), 0.45)}">That's why…</div>
    <div class="brand c-white" style="font-size:5.4cqw;opacity:.92;${rise(t, W('s4', 1), 3)}">Giane Future Gurukull brings you</div>
    <div class="rel" style="margin:3cqw 0 2.6cqw">
      <svg viewBox="-50 -32 100 64" style="position:absolute;left:-22%;top:-30%;width:144%;height:160%;overflow:visible;opacity:${n(clamp(burst))}"><g stroke="#c8f23a" stroke-width="2.4" stroke-linecap="round" fill="none">${rays}</g></svg>
      <span class="freepill" style="display:inline-block;position:relative;font-size:32cqw;box-shadow:0 2cqw 0 #16142b;${drop(t, free)}">FREE</span>
      ${spark('-12cqw', '-6cqw', 9, 0.2)}${spark('calc(100% + 2cqw)', '60%', 7, 0.3)}
    </div>
    <div class="d c-white" style="font-size:16cqw;${rise(t, W('s4', 8))}">CALCULATION</div>
    <div class="d c-white" style="font-size:16cqw;${rise(t, W('s4', 9))}">EFFICIENCY</div>
    <div class="rel"><span class="d c-lime" style="display:inline-block;font-size:21cqw;${pop(t, W('s4', 10), 0.6)}">TEST</span><svg class="mark c-lime" viewBox="0 0 200 20" preserveAspectRatio="none" style="left:-6%;bottom:-2.6cqw;width:112%;height:4cqw;${draw(t, W('s4', 10) + 0.2, 0.4)}"><use href="#sc-under"/></svg></div>
  </div>`;
}

/* ---------- 4b · why it exists + Deveshh Sir ---------- */
export function s4b(t: number) {
  const a = S('s4b')[0];
  const credit = Math.max(a + 1.1, W('s4', 15) + 0.35);
  return `
  <div class="cstack" style="gap:.8cqw">
    <div class="hand c-white" style="font-size:9cqw;${write(t, a + 0.05, 0.45)}">Understand your child's</div>
    <div class="d c-lime" style="font-size:19cqw;${rise(t, Math.max(a + 0.25, W('s4', 14)))}">calculation</div>
    <div class="rel"><span class="d c-white" style="display:inline-block;font-size:19cqw;${rise(t, Math.max(a + 0.4, W('s4', 15)))}">skills better</span><svg class="mark c-lime" viewBox="0 0 200 20" preserveAspectRatio="none" style="left:0;bottom:-2.4cqw;width:100%;height:4cqw;${draw(t, Math.max(a + 0.6, W('s4', 15) + 0.2), 0.45)}"><use href="#sc-under"/></svg></div>
    <div class="credit" style="margin-top:8cqw;${rise(t, credit, 4)}">
      <img src="${staticFile('gwr-logo.png')}" style="transform:rotate(${n(lerp(-120, 0, easeOut(prog(t, credit, 0.6))), 1)}deg)">
      <div style="text-align:left">
        <div class="m c-white" style="font-size:5.4cqw;opacity:.85">Specially designed by</div>
        <div class="d c-white" style="font-size:12.5cqw">Deveshh Sir</div>
        <div class="m c-lime" style="font-size:5cqw;font-weight:700;line-height:1.15">Guinness World Record<br>Holder in Memory</div>
      </div>
    </div>
  </div>`;
}

/* ---------- 5 · violet: MORE THAN JUST A SCORE! → WHERE / WHY / WHAT NEXT (with icons) ---------- */
const ICON_WHERE = (t: number, at: number) => `
  <svg viewBox="0 0 60 60"><rect x="8" y="6" width="36" height="46" rx="3" fill="#fff"/>
    <path d="M14 16h24M14 24h24M14 32h24M14 40h16" stroke="#c9bfff" stroke-width="3" stroke-linecap="round"/>
    <path d="M30 29l6 6M36 29l-6 6" stroke="#ef4136" stroke-width="3.4" stroke-linecap="round"/>
    <g transform="translate(${n(lerp(12, 0, easeOut(prog(t, at + 0.1, 0.6))), 1)} 0)"><circle cx="34" cy="32" r="11" fill="rgba(200,242,58,.18)" stroke="#c8f23a" stroke-width="4.5"/><path d="M42 40l10 10" stroke="#c8f23a" stroke-width="6" stroke-linecap="round"/></g></svg>`;
const ICON_WHY = () => `
  <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="#ef4136"/><circle cx="30" cy="30" r="25" fill="none" stroke="#fff" stroke-width="3"/>
    <text x="30" y="42" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="36" fill="#fff">?</text></svg>`;
const ICON_NEXT = (t: number, at: number) => {
  const p = easeOut(prog(t, at + 0.15, 0.35));
  return `
  <svg viewBox="0 0 60 60"><circle cx="28" cy="32" r="22" fill="#fff"/><circle cx="28" cy="32" r="15" fill="#ef4136"/><circle cx="28" cy="32" r="8" fill="#fff"/><circle cx="28" cy="32" r="3.5" fill="#ef4136"/>
    <g transform="translate(${n(lerp(26, 0, p), 1)} ${n(lerp(-26, 0, p), 1)})" opacity="${n(clamp(p * 3))}"><path d="M29 31 52 8" stroke="#c8f23a" stroke-width="4" stroke-linecap="round"/><path d="M52 8l-1 9M52 8l-9 1" stroke="#c8f23a" stroke-width="4" stroke-linecap="round"/></g></svg>`;
};
export function s5(t: number) {
  const a = S('s5')[0];
  const mag = easeInOut(prog(t, a + 0.35, 1.1));
  const row = (icon: string, label: string, sub: string, at: number) => `
    <div class="qrow" style="${rise(t, at, 4)}"><div class="qicon" style="${pop(t, at, 0.3, -12)}">${icon}</div>
      <div><div class="d c-lime" style="font-size:12.5cqw">${label}</div><div class="m c-white" style="font-size:6cqw;margin-top:.4cqw">${sub}</div></div></div>`;
  return `
  <div class="safe-stack" style="gap:3.4cqw;justify-content:flex-start;padding-top:1cqw">
    <div class="scorehead">
      <div class="scorecard" style="${drop(t, a, -5)}">
        <div class="sc-t">MATHS TEST</div>
        <div class="rel" style="display:inline-block"><span class="hand c-pen" style="font-size:12cqw">12</span><span class="hand c-pen" style="font-size:6cqw">/20</span>
          <svg class="mark c-pen" viewBox="0 0 200 100" style="left:-25%;top:-15%;width:150%;height:130%;${draw(t, a + 0.25, 0.4)}"><use href="#sc-circle"/></svg></div>
        <div class="sc-l"></div><div class="sc-l" style="width:70%"></div>
        <svg viewBox="0 0 60 60" style="position:absolute;width:20cqw;height:20cqw;left:${n(lerp(70, -10, mag), 1)}%;top:${n(18 + Math.sin(mag * Math.PI) * 10, 1)}%;opacity:${n(clamp(prog(t, a + 0.3, 0.2)) * (1 - prog(t, a + 1.5, 0.3)))}"><circle cx="24" cy="24" r="15" fill="rgba(200,242,58,.22)" stroke="#c8f23a" stroke-width="5"/><path d="M35 35l14 14" stroke="#c8f23a" stroke-width="7" stroke-linecap="round"/></svg>
      </div>
      <div>
        <div class="d c-white" style="font-size:10.5cqw;${rise(t, a + 0.1)}">More than</div>
        <div class="d c-white" style="font-size:10.5cqw;${rise(t, a + 0.25)}">just a</div>
        <div class="d c-ink" style="font-size:15cqw;${pop(t, a + 0.45, 0.5, -6)}"><span class="hl" style="background-position:0 60%;background-size:100% 80%;padding:0 1.6cqw">score!</span></div>
      </div>
    </div>
    ${t >= W('s5', 2) - 0.2 ? row(ICON_WHERE(t, W('s5', 2)), 'WHERE', 'mistakes are happening', W('s5', 2)) : ''}
    ${t >= W('s5', 8) - 0.2 ? row(ICON_WHY(), 'WHY', 'the possible reasons', W('s5', 8)) : ''}
    ${t >= W('s5', 12) - 0.2 ? row(ICON_NEXT(t, W('s5', 12)), 'WHAT NEXT', 'where improvement should start', W('s5', 12)) : ''}
  </div>`;
}

/* ---------- 6a · lime: the gift ---------- */
export function s6a(t: number) {
  const open = W('s6', 2);
  const lidP = sp(t, open, 90, 14);
  const lid = `translate(${n(lerp(0, -26, lidP), 1)} ${n(lerp(-6, -70, lidP), 1)}) rotate(${n(lerp(0, -24, lidP), 1)})`;
  const count = Math.round((easeOut(prog(t, W('s6', 11), 0.6)) * 500) / 10) * 10;
  const stamp = W('s6', 11) + 0.6;
  return `
  <div class="cstack" style="gap:.6cqw">
    <div style="display:flex;align-items:center;gap:3cqw">
      <svg viewBox="-70 -105 140 175" style="width:30cqw;height:37.5cqw;flex:none;${pop(t, S('s6a')[0] + 0.3, 0.5)}">
        <g transform="scale(${n(easeOut(prog(t, open, 0.3)))})" opacity="${n(prog(t, open, 0.3))}"><path d="M0-80V-100M-46-64-58-78M46-64 58-78" stroke="#16142b" stroke-width="5" stroke-linecap="round"/></g>
        <rect x="-52" y="-6" width="104" height="70" rx="6" fill="#fff"/><rect x="12" y="-6" width="40" height="70" fill="#e6ebf3"/><rect x="-8" y="-6" width="16" height="70" fill="#ef4136"/>
        <g transform="${lid}"><rect x="-58" y="-10" width="116" height="20" rx="4" fill="#fff"/><rect x="-9" y="-10" width="18" height="20" fill="#d22f25"/><path d="M0-10c-8-16-30-20-30-6 0 8 16 8 30 6zM0-10c8-16 30-20 30-6 0 8-16 8-30 6z" fill="#ef4136"/></g>
      </svg>
      <div class="hand c-pen" style="font-size:11cqw;line-height:.95;text-align:left;${write(t, open, 0.5)}">special<br>bonus</div>
    </div>
    <div class="d c-ink" style="font-size:24cqw;margin-top:2cqw;${pop(t, W('s6', 5), 0.6)}">CTM™</div>
    <div class="d c-ink" style="font-size:10cqw;${rise(t, W('s6', 7))}">60-minute Masterclass</div>
    <div style="display:flex;align-items:baseline;gap:2.4cqw;margin-top:2.4cqw;${rise(t, W('s6', 10))}"><span class="hand c-ink" style="font-size:9cqw">worth</span>
      <span class="rel"><span class="d c-ink" style="font-size:22cqw;font-variant-numeric:tabular-nums">₹${count}</span><svg class="mark c-pen" viewBox="0 0 200 100" style="left:-6%;top:-4%;width:112%;height:112%;${draw(t, stamp, 0.35)}"><use href="#sc-circle"/></svg></span></div>
    <div class="pill-ink" style="margin-top:3cqw;${rise(t, stamp + 0.25, 3)}">with the test · limited period</div>
  </div>`;
}

/* ---------- 6b · C8 (ink tint): EXPERIENCE CTM™ ---------- */
const STEP_ICONS = [
  '<svg viewBox="0 0 40 40"><path d="M4 20s6-10 16-10 16 10 16 10-6 10-16 10S4 20 4 20z" fill="none" stroke="#16142b" stroke-width="3.4"/><circle cx="20" cy="20" r="5" fill="#16142b"/></svg>',
  '<svg viewBox="0 0 40 40"><g fill="none" stroke="#16142b" stroke-width="3.4" stroke-linecap="round"><circle cx="20" cy="20" r="6"/><path d="M20 5v5M20 30v5M5 20h5M30 20h5M9.5 9.5l3.5 3.5M27 27l3.5 3.5M30.5 9.5 27 13M13 27l-3.5 3.5"/></g></svg>',
  '<svg viewBox="0 0 40 40"><path d="M8 21l8 8L33 11" fill="none" stroke="#16142b" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
];
export function s6b(t: number) {
  const a = S('s6b')[0];
  const st = W('s6', 19) - 0.5;
  const step = (i: number, label: string) => `
    <div class="step" style="${pop(t, st + i * 0.28, 0.4)}"><div class="step-i">${STEP_ICONS[i]}</div><div class="m c-white" style="font-size:6cqw;font-weight:700">${label}</div></div>`;
  const arrow = (i: number) => `<div class="hand c-lime" style="font-size:9cqw;margin-top:2cqw;${fade(t, st + i * 0.28 + 0.14, 0.2)}">→</div>`;
  return `
  <div class="cstack" style="gap:1cqw">
    <div class="m c-white" style="font-size:8.5cqw;letter-spacing:.08em;${rise(t, W('s6', 14))}">EXPERIENCE</div>
    <div class="d c-lime" style="font-size:38cqw;${pop(t, W('s6', 14) + 0.25, 0.5)}">CTM™</div>
    <div class="hand c-white" style="font-size:8.6cqw;${write(t, a + 0.75, 0.6)}">Calculation Thinking Method</div>
    <div style="display:flex;align-items:flex-start;gap:2cqw;margin-top:6cqw">${step(0, 'See')}${arrow(0)}${step(1, 'Process')}${arrow(1)}${step(2, 'Answer')}</div>
  </div>`;
}

/* ---------- 7a · WhatsApp: type, send, get the form ---------- */
const MSG = 'CALCULATION EFFICIENCY TEST';
export function s7a(t: number) {
  const a = S('s7a')[0];
  const typeA = W('s7', 5), typeB = WE('s7', 8);
  const sent = W('s7', 9);
  const typed = MSG.slice(0, Math.floor(MSG.length * prog(t, typeA, typeB - typeA)));
  const input = t < sent && typed ? `<span>${typed}<b style="opacity:${Math.floor(t * 4) % 2}">|</b></span>` : '<span class="ph">Message</span>';
  const ticks = t >= sent + 0.25 ? '<b style="color:#53bdeb;font-weight:700">✓✓</b>' : '✓';
  const outB = t >= sent ? `<div class="bub out" style="transform-origin:right bottom;${pop(t, sent, 0.6)}">${MSG}<small>10:24 ${ticks}</small></div>` : '';
  const reply = sent + 0.45;
  const form = t >= reply
    ? `<div class="formcard" style="${rise(t, reply, 3)}"><div class="fc-t">Thank you! Please fill in this form to book the test.</div><div class="fc-doc"><i></i><div><b>Registration form</b><small>Calculation Efficiency Test</small></div></div><div class="fc-btn">Open form</div></div>`
    : '';
  const up = sp(t, a, 90, 18);
  return `
  <div style="position:absolute;left:9%;right:12%;top:17.5%;text-align:center;${rise(t, a + 0.05)}">
    <div class="m c-white" style="font-size:7cqw">Book your</div>
    <div class="d c-lime" style="font-size:10.4cqw">Calculation Efficiency Test</div>
  </div>
  <div class="phone" style="top:30%;bottom:29.7%;left:16%;right:16%;transform:translateY(${n((1 - up) * 60, 2)}cqw)">
    <div class="ph-top"><span class="av"><svg viewBox="0 0 60 60" style="width:80%;height:80%"><use href="#gfg-mark" width="60" height="60"/></svg></span><div>Giane Future Gurukull<small>online</small></div></div>
    <div class="ph-body">${outB}${form}</div>
    <div class="ph-in">${input}<i style="${t >= sent && t < sent + 0.15 ? 'transform:scale(.85)' : ''}">➤</i></div>
  </div>`;
}

/* ---------- 7b · end card ---------- */
export function s7b(t: number) {
  const a = S('s7b')[0];
  const digits = (s: string, start: number) =>
    s.split('').map((ch, i) => `<span class="ib" style="${drop(t, start + i * 0.06, 0)}">${ch}</span>`).join('');
  return `
  <div class="cstack" style="gap:1cqw">
    <div style="display:flex;align-items:center;gap:2.4cqw;${rise(t, a + 0.05)}"><svg viewBox="0 0 48 48" style="width:10cqw;height:10cqw"><use href="#wa" width="48" height="48"/></svg><span class="d c-white" style="font-size:10cqw">WhatsApp</span></div>
    <div class="d c-lime" style="font-size:20cqw;letter-spacing:-.01em;margin-top:1cqw">${digits('80623', a + 0.15)}</div>
    <div class="d c-lime" style="font-size:20cqw;letter-spacing:-.01em">${digits('65298', a + 0.45)}</div>
    <div class="m c-white" style="font-size:5.4cqw;margin-top:2.4cqw;${rise(t, a + 0.95, 3)}">send</div>
    <div class="d c-white" style="font-size:7.6cqw;${rise(t, a + 1.0, 3)}">CALCULATION EFFICIENCY TEST</div>
    <div class="m c-lime" style="font-size:5.2cqw;margin-top:1.6cqw;font-weight:700;line-height:1.25;${rise(t, a + 1.15, 3)}">Class 3 onwards<br>Ahmedabad · Vadodara</div>
    <div class="logo-card" style="margin-top:3cqw;${pop(t, a + 1.35, 0.85)}"><img src="${staticFile('gfg-logo.png')}" alt="Giane Future Gurukull"><div>www.gianefuturegurukull.com</div></div>
  </div>`;
}

export const OVERLAYS: Record<string, (t: number) => string> = { s1a, s1b, s2, s3a, s3b, s4a, s4b, s5, s6a, s6b, s7a, s7b };
export { clamp };
