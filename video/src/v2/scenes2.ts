// Reel v2 (rev 5) overlays: type and motion graphics as HTML/SVG strings, one function per shot.
// Footage sits underneath (ReelV2.tsx). Text stays in the safe zone: y 330-1350 of 1920 (17.2%-70.3%),
// x 9%-88% (clear of the right-side buttons). Story: contradiction → recognition → turning point →
// the test → where/why/what next → CTM demo → bonus → one next step. Every time is a spoken word or a shot edge.
import { staticFile } from 'remotion';
import { S, W, WE, clamp, draw, drop, easeInOut, easeOut, fade, lerp, n, pop, prog, rise, sp, write } from './time';

const tick = (style: string) => `<svg class="mark" viewBox="0 0 40 40" style="${style}"><use href="#sc-tick"/></svg>`;
/** Masked reveal: the line rises into view from behind its own baseline. */
const mask = (t: number, at: number, inner: string, cls = '', style = '') => {
  const p = sp(t, at, 150, 17);
  return `<div class="maskline ${cls}" style="${style}"><span style="display:inline-block;transform:translateY(${n((1 - p) * 105, 1)}%)">${inner}</span></div>`;
};
/** Spring "bounce" for pen marks. */
const bounce = (t: number, at: number, from = 0.2) => {
  const p = sp(t, at, 230, 8);
  return `display:inline-block;opacity:${n(clamp(p * 3))};transform:scale(${n(from + (1 - from) * p)})`;
};

/* ---------- 1a · C1: "Maths concepts are clear…" ---------- */
export function s1a(t: number) {
  return `
  <div class="safe-stack end" style="gap:1.6cqw">
    <div class="sub c-white" style="font-size:8cqw;${rise(t, W('s1', 0))}"><span class="rel">Maths<svg class="mark" viewBox="0 0 40 40" style="left:calc(100% + 3cqw);top:-1.5cqw;width:11cqw;height:11cqw;stroke:var(--lime);${draw(t, W('s1', 4), 0.3)}"><use href="#sc-tick"/></svg></span></div>
    <div class="d c-white" style="font-size:17cqw;${rise(t, W('s1', 2))}">concepts</div>
    <div class="d c-lime" style="font-size:17cqw;${rise(t, W('s1', 3))}">are clear…</div>
  </div>`;
}

/* ---------- 1b · the same worksheet goes wrong: SILLY MISTAKES? ---------- */
export function s1b(t: number) {
  const a = S('s1b')[0];
  const up = sp(t, a, 110, 16);
  const m1 = a + 0.2, m2 = W('s1', 7), m3 = W('s1', 8), m4 = W('s1', 8) + 0.4;
  const ans = (at: number, wrong: string, right: string) =>
    t >= at ? `<s>${wrong}</s> <em style="${bounce(t, at + 0.08, 0.3)}">${right}</em>` : wrong;
  const x = (at: number) => `<span class="x" style="${bounce(t, at)}">✗</span>`;
  return `
  <div class="exam" style="top:10.5%;transform-origin:50% 0;transform:translateY(${n((1 - up) * 90, 2)}cqw) rotate(-2.5deg) scale(.64)">
    <div class="ex-h"><div><div class="ex-t">MATHS · UNIT TEST</div><div class="ex-n">Name: <span class="hand c-ball">Aarav</span> &nbsp; Class: <span class="hand c-ball">4-B</span></div></div>
      <div class="ex-s rel" style="${bounce(t, m4, 0.5)}">12<span style="font-size:.6em">/20</span><svg class="mark c-pen" viewBox="0 0 200 100" style="left:-30%;top:-25%;width:160%;height:150%;${draw(t, m4, 0.4)}"><use href="#sc-circle"/></svg></div></div>
    <div class="ex-q"><span class="qn">1.</span><span class="qa">48 + 37 = 85</span>${tick(`position:static;width:7cqw;height:7cqw;stroke:var(--pen);${draw(t, m1, 0.25)}`)}</div>
    <div class="ex-q"><span class="qn">2.</span><span class="qa">7 × 8 = ${ans(m2, '54', '56')}</span>${t >= m2 ? x(m2) : ''}</div>
    <div class="ex-q"><span class="qn">3.</span><span class="qa">125 − 68 = ${ans(m3, '67', '57')}</span>${t >= m3 ? x(m3) : ''}</div>
  </div>
  <div class="safe-stack end" style="gap:2.2cqw">
    ${mask(t, W('s1', 5), 'Still making', 'sub c-white', 'font-size:7.4cqw')}
    <div class="rel" style="align-self:flex-start">${mask(t, W('s1', 7) - 0.04, 'SILLY', 'wide c-pen', 'font-size:32cqw')}<svg class="mark c-pen" viewBox="0 0 200 20" preserveAspectRatio="none" style="left:0;bottom:-1cqw;width:100%;height:4cqw;${draw(t, W('s1', 7) + 0.15, 0.3)}"><use href="#sc-under"/></svg></div>
    ${mask(t, W('s1', 8) - 0.04, 'MISTAKES?', 'wide c-white', 'font-size:16.5cqw;margin-top:1cqw')}
  </div>`;
}

/* ---------- 2 · recognition: four moments on one worksheet card (no checklist) ---------- */
const M2 = [
  { cap: 'Rushing through questions', w: 0 },
  { cap: 'Calculation mistakes', w: 5 },
  { cap: 'Trouble focusing', w: 7 },
  { cap: 'Forgetting formulas', w: 11 },
];
function moment(i: number, t: number, at: number) {
  const k = (s: string, x: number, y: number, size = 30, fill = '#2a3a94', extra = '') =>
    `<text x="${x}" y="${y}" font-family="Kalam" font-weight="700" font-size="${size}" fill="${fill}" ${extra}>${s}</text>`;
  if (i === 0) {
    // the hurried answer overtakes the question
    const p = easeOut(prog(t, at + 0.1, 0.35));
    const lines = [0, 1, 2].map((j) => `<path d="M${n(lerp(330, 200, p) + j * 12, 1)} ${248 + j * 12}h${n(30 + j * 10, 1)}" stroke="#ef4136" stroke-width="3" stroke-linecap="round" opacity="${n(1 - prog(t, at + 0.5, 0.3))}"/>`).join('');
    return `${k('36 × 4 =', 70, 270, 32)}<g transform="translate(${n(lerp(110, 0, p), 1)} 0)" opacity="${n(clamp(p * 2))}">${k('142', 210, 270, 34, '#2a3a94', 'font-style:italic')}</g>${lines}
      <path d="M200 282q30 6 70-2" stroke="#2a3a94" stroke-width="2.5" fill="none" opacity="${n(p)}"/>`;
  }
  if (i === 1) {
    // a digit corrected
    return `${k('7 × 8 =', 76, 270, 32)}${k('54', 210, 270, 34)}
      <path pathLength="1" d="M206 258l54 0" stroke="#ef4136" stroke-width="4" style="${draw(t, at + 0.25, 0.2)}"/>
      <g style="transform-box:fill-box;transform-origin:center;${t >= at + 0.45 ? bounce(t, at + 0.45, 0.3) : 'opacity:0'}">${k('56', 236, 236, 28, '#ef4136')}</g>`;
  }
  if (i === 2) {
    // attention drifting between parts of the question
    const u = t - at;
    const fx = 120 + Math.sin(u * 2.3) * 70 + Math.sin(u * 5.1) * 18, fy = 262 + Math.cos(u * 3.1) * 22;
    return `${k('125 − 68 = ___', 62, 270, 30)}
      <circle cx="${n(fx, 1)}" cy="${n(fy, 1)}" r="26" fill="rgba(200,242,58,.25)" stroke="#9cc21a" stroke-width="3" opacity="${n(clamp(prog(t, at + 0.1, 0.2)))}"/>`;
  }
  // a formula partly fading
  const f = prog(t, at + 0.3, 0.8);
  return `${k('Area =', 62, 270, 32)}<g opacity="${n(1 - f * 0.85)}" style="filter:blur(${n(f * 2.5, 2)}px)">${k('l × b', 180, 270, 32)}</g>
    <text x="214" y="${n(258 - 10 * easeOut(prog(t, at + 0.8, 0.3)), 1)}" font-family="Bricolage Grotesque" font-weight="800" font-size="40" fill="#ef4136" opacity="${n(clamp(prog(t, at + 0.8, 0.2)))}">?</text>`;
}
export function s2(t: number) {
  const a = S('s2')[0];
  const ats = M2.map((m) => W('s2', m.w) - 0.1);
  const cur = ats.reduce((c, at, i) => (t >= at ? i : c), 0);
  const cards = M2.map((_, i) => {
    if (i < cur - 1 || i > cur) return '';
    const inP = easeOut(prog(t, ats[i], 0.35));
    const outP = i < cur ? easeInOut(prog(t, ats[cur], 0.3)) : 0;
    const y = (1 - inP) * 60 - outP * 60;
    const op = (i === 0 ? clamp(prog(t, a + 0.2, 0.3)) : inP) * (1 - outP);
    return `<g transform="translate(0 ${n(y, 1)})" opacity="${n(op)}">${moment(i, t, ats[i])}</g>`;
  }).join('');
  const cap = M2.map((m, i) => (i === cur ? mask(t, ats[i] + 0.05, m.cap, 'd c-white', 'font-size:10.5cqw;white-space:normal;line-height:1.02') : '')).join('');
  return `
  <div style="position:absolute;left:9%;right:12%;top:18.5%;${rise(t, a + 0.1)}">
    <div class="sub c-white" style="font-size:6.4cqw">Have you noticed</div>
    <div class="d c-lime" style="font-size:11cqw">signs like these?</div>
  </div>
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
    <g transform="rotate(-2 180 270)" opacity="${n(clamp(prog(t, a + 0.15, 0.3)))}">
      <rect x="40" y="204" width="280" height="128" rx="8" fill="#000" opacity=".25" transform="translate(4 8)"/>
      <rect x="40" y="204" width="280" height="128" rx="8" fill="#fdfdfb"/>
      <path d="M56 300h248" stroke="#e3e7ef" stroke-width="2"/>
      ${cards}
    </g>
  </svg>
  <div style="position:absolute;left:9%;right:12%;top:56%">${cap}</div>`;
}

/* ---------- 3a · C4: the visible signs float on the surface ---------- */
const CHIPS = [['✗ 54', 12, 19], ['✗ 67', 56, 22.5], ['142?', 20, 28.5], ['l × b ?', 56, 32]];
export function s3a(t: number) {
  const a = S('s3a')[0], b = S('s3a')[1];
  const lift = easeInOut(prog(t, b - 0.35, 0.6));
  const hl = easeInOut(prog(t, W('s3', 6) + 0.05, 0.45));
  const chips = CHIPS.map(([s, x, y], i) => {
    const p = sp(t, a + 0.35 + i * 0.22, 120, 14);
    const dy = Math.sin(t * 1.2 + i) * 0.6 - lift * 40;
    return `<div class="glass" style="left:${x}%;top:${n((y as number) + dy, 2)}%;opacity:${n(clamp(p * 2) * (1 - lift))};transform:scale(${n(lerp(0.7, 1, p))})">${s}</div>`;
  }).join('');
  return `
  ${chips}
  <div class="safe-stack end" style="gap:2.6cqw">
    ${mask(t, W('s3', 4) - 0.1, 'These may be just the', 'sub c-white', 'font-size:7.2cqw')}
    ${mask(t, W('s3', 5) - 0.05, 'visible', 'wide c-white', 'font-size:17cqw')}
    <div class="wide" style="font-size:17cqw;${rise(t, W('s3', 6))}"><span class="hl c-ink" style="background-position:0 62%;background-size:${n(hl * 100, 1)}% 84%;padding:0 2cqw">signs…</span></div>
  </div>`;
}

/* ---------- 3b · C5 (red): under the surface, the steps behind the answer ---------- */
export function s3b(t: number) {
  const a = S('s3b')[0], b = S('s3b')[1];
  const nodes = [[80, 200, '7'], [150, 170, '×'], [220, 200, '8'], [290, 170, '=']];
  const net = nodes.map(([x, y, s], i) => {
    const p = sp(t, a + 0.15 + i * 0.15, 150, 13);
    return `<g transform="translate(${x} ${y}) scale(${n(p)})"><circle r="24" fill="rgba(255,255,255,.92)"/><text y="10" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="26" fill="#a8170f">${s}</text></g>`;
  }).join('');
  const links = nodes.slice(1).map((nd, i) => {
    const [x0, y0] = nodes[i], [x1, y1] = nd;
    const broken = i === 2;
    return `<path pathLength="1" d="M${x0} ${y0}L${x1} ${y1}" stroke="${broken ? '#ffd2cc' : '#fff'}" stroke-width="4" stroke-linecap="round" ${broken ? 'stroke-dasharray="0.08 0.08"' : ''} style="${broken ? `opacity:${n(clamp(prog(t, a + 0.7, 0.3)))}` : draw(t, a + 0.3 + i * 0.15, 0.3)}"/>`;
  }).join('');
  const q = sp(t, a + 0.95, 160, 10);
  const circ = draw(t, b - 0.55, 0.45);
  return `
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
    ${links}${net}
    <g transform="translate(255 185) scale(${n(q)})"><circle r="15" fill="#16142b"/><text y="7" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="20" fill="#fff">?</text></g>
    <ellipse pathLength="1" cx="180" cy="288" rx="70" ry="70" fill="none" stroke="#fff" stroke-width="5" style="${circ}"/>
  </svg>
  <div class="safe-stack end" style="gap:1cqw">
    ${mask(t, a, '…not the', 'sub c-white', 'font-size:7.4cqw')}
    ${mask(t, W('s3', 13) + 0.02, 'REAL REASONS', 'wide c-white', 'font-size:13cqw')}
    ${mask(t, W('s3', 14) + 0.2, 'behind those silly mistakes.', 'sub c-white', 'font-size:6.4cqw')}
  </div>`;
}

/* ---------- 4a · violet: the test name builds as a ghost, fills on its words ---------- */
export function s4a(t: number) {
  const a = S('s4a')[0];
  const out = 0;
  const ring = easeInOut(prog(t, a + 0.2, 1.6));
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const ang = (i / 36) * Math.PI * 2 - Math.PI / 2 + (t - a) * 0.15;
    const on = i / 36 < ring;
    const r0 = i % 3 ? 132 : 124;
    return `<path d="M${n(180 + Math.cos(ang) * r0, 1)} ${n(318 + Math.sin(ang) * r0, 1)}L${n(180 + Math.cos(ang) * 140, 1)} ${n(318 + Math.sin(ang) * 140, 1)}" stroke="#c8f23a" stroke-width="${i % 3 ? 2 : 3.5}" stroke-linecap="round" opacity="${on ? 0.55 : 0.08}"/>`;
  }).join('');
  const word = (txt: string, at: number, size: number, color: string, ghostAt: number) => {
    const g = clamp(prog(t, ghostAt, 0.4));
    const f = sp(t, at, 170, 13);
    return `<div class="wide ghost" style="font-size:${size}cqw;color:${t >= at ? color : 'transparent'};-webkit-text-stroke:${n(0.35 * (1 - clamp(f * 1.5)), 2)}cqw rgba(255,255,255,${n(0.6 * g)});opacity:${n(Math.max(g * 0.9, clamp(f * 2)))};transform:scale(${n(t >= at ? lerp(1.08, 1, f) : 1)})">${txt}</div>`;
  };
  return `
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="opacity:${n(1 - out)}">${ticks}
    <circle cx="180" cy="318" r="112" fill="none" stroke="#5b3cf5" stroke-width="22" opacity=".35"/></svg>
  <div class="cstack" style="gap:.4cqw;opacity:${n(1 - out)}">
    <div class="hand c-white" style="font-size:8.5cqw;margin-bottom:2cqw;${write(t, W('s4', 0), 0.45)}">That's why…</div>
    <div style="margin-bottom:2.6cqw"><span class="freetag" style="opacity:${n(Math.max(0.35 * clamp(prog(t, a + 0.6, 0.4)), t >= W('s4', 7) ? 1 : 0))};${t >= W('s4', 7) ? drop(t, W('s4', 7), -4) : 'transform:rotate(-4deg);background:transparent;color:transparent;-webkit-text-stroke:.3cqw rgba(200,242,58,.8);box-shadow:inset 0 0 0 .5cqw rgba(200,242,58,.6)'}">FREE</span></div>
    ${word('CALCULATION', W('s4', 8), 13.2, '#ffffff', a + 0.8)}
    ${word('EFFICIENCY', W('s4', 9), 13.2, '#ffffff', a + 1.1)}
    ${word('TEST', W('s4', 10), 27, '#c8f23a', a + 1.4)}
  </div>`;
}

/* ---------- 4b · understanding comes into focus + Deveshh Sir (text credential, no emblem) ---------- */
export function s4b(t: number) {
  const a = S('s4b')[0];
  const L0 = W('s4', 17), L1 = L0 + 0.9;
  const lensX = lerp(10, 350, easeInOut(prog(t, L0, L1 - L0)));
  const lensOp = clamp(prog(t, L0 - 0.15, 0.15)) * (1 - prog(t, L1 + 0.1, 0.3));
  const syms: [string, number][] = [['7', 46], ['×', 92], ['3', 136], ['+', 180], ['8', 224], ['÷', 268], ['9', 314]];
  const Y = 296;
  const tiles = syms.map(([c, x], i) => {
    const sharp = easeOut(clamp((lensX - x + 10) / 26));
    const dy = Math.sin(t * 1.3 + i * 1.7) * 14 * (1 - sharp);
    const y = Y + dy + (i % 2 ? -18 : 16) * (1 - sharp);
    return `<g transform="translate(${n(x + Math.cos(t * 0.9 + i) * 8 * (1 - sharp), 1)} ${n(y, 1)})" style="filter:blur(${n(2.6 * (1 - sharp), 2)}px)" opacity="${n(lerp(0.4, 1, sharp))}">
      <circle r="${n(lerp(14, 19, sharp), 2)}" fill="#fff" opacity="${n(sharp)}"/>
      <text y="9" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="${n(lerp(30, 24, sharp), 1)}" fill="${sharp > 0.5 ? '#2812a6' : '#ffffff'}">${c}</text></g>`;
  }).join('');
  const credit = a + 0.35;
  return `
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="opacity:${n(clamp(prog(t, a + 0.1, 0.4)))}">
    ${tiles}
    <g transform="translate(${n(lensX, 1)} ${Y})" opacity="${n(lensOp)}"><circle r="40" fill="rgba(200,242,58,.14)" stroke="#c8f23a" stroke-width="6"/><path d="M28 28l22 22" stroke="#c8f23a" stroke-width="10" stroke-linecap="round"/></g>
  </svg>
  <div class="cstack" style="justify-content:flex-start;gap:.8cqw">
    <div class="hand c-white" style="font-size:7.2cqw;white-space:nowrap;${write(t, a + 0.02, 0.4)}">Understand your child's</div>
    <div class="d c-lime" style="font-size:13cqw;${rise(t, Math.max(a + 0.1, W('s4', 14) - 0.05))}">calculation skills</div>
    <div class="d" style="font-size:13cqw;${pop(t, L0 - 0.05, 0.6)}"><span class="hl c-ink" style="background-position:0 60%;background-size:${n(easeOut(prog(t, L0 + 0.05, 0.4)) * 100, 1)}% 84%;padding:0 2cqw">better</span></div>
  </div>
  <div style="position:absolute;left:12%;right:12%;top:51.5%;text-align:center;${rise(t, credit, 4)}">
    <div class="rule" style="margin:0 auto 2cqw;transform:scaleX(${n(easeOut(prog(t, credit, 0.5)))})"></div>
    <div class="sub c-white" style="font-size:5.4cqw;opacity:.9">Specially designed by</div>
    <div class="wide c-white" style="font-size:10.5cqw;margin-top:.4cqw">Deveshh Sir</div>
    <div class="sub c-lime" style="font-size:5.6cqw;font-weight:700;line-height:1.2;margin-top:1cqw">Guinness World Record<br>Holder in Memory</div>
  </div>`;
}

/* ---------- 5 · navy grid: WHERE / WHY / WHAT NEXT told by one worksheet ---------- */
export function s5(t: number) {
  const a = S('s5')[0];
  const tW = W('s5', 2), tY = W('s5', 7) - 0.1, tN = W('s5', 12) - 0.1, tStep = W('s5', 14);
  const toWhy = easeInOut(prog(t, tY, 0.5));
  const toNext = easeInOut(prog(t, tN, 0.45));
  const wsX = lerp(180, 92, toWhy), wsY = lerp(282, 276, toWhy), wsS = lerp(0.85, 0.55, toWhy) * (1 - 0.15 * toNext);
  const wsIn = sp(t, a + 0.1, 120, 15);
  const wsOp = clamp(wsIn * 2) * (1 - toNext);
  const m1 = easeInOut(prog(t, tW, 0.45)), m2 = easeInOut(prog(t, tW + 0.7, 0.4));
  const mx = lerp(lerp(70, 40, m1), 44, m2), my = lerp(lerp(-70, -12, m1), 52, m2);
  const magOp = clamp(prog(t, tW - 0.15, 0.2)) * (1 - prog(t, tY, 0.25));
  const circ = (at: number) => `style="${draw(t, at, 0.35)}"`;
  const rows = [['48 + 37 = 85', '✓'], ['7 × 8 = 54', ''], ['36 ÷ 4 = 9', '✓'], ['125 − 68 = 67', '']];
  const sheet = `
    <g transform="translate(${n(wsX, 1)} ${n(wsY + (1 - wsIn) * 60, 1)}) scale(${n(wsS * lerp(0.9, 1, wsIn))}) rotate(-2)" opacity="${n(wsOp)}">
      <rect x="-104" y="-104" width="208" height="200" rx="8" fill="#000" opacity=".3" transform="translate(4 8)"/>
      <rect x="-104" y="-104" width="208" height="200" rx="8" fill="#fdfdfb"/>
      <text x="-88" y="-78" font-family="Bricolage Grotesque" font-weight="800" font-size="15" fill="#16142b" letter-spacing="1">MATHS · WORKSHEET</text>
      <path d="M-88-68h176" stroke="#16142b" stroke-width="2.5"/>
      ${rows.map(([q, ok], i) => `<text x="-86" y="${-38 + i * 38}" font-family="Kalam" font-weight="700" font-size="21" fill="#2a3a94">${q}</text>${ok ? `<text x="70" y="${-38 + i * 38}" font-family="Kalam" font-weight="700" font-size="22" fill="#2a3a94">${ok}</text>` : ''}<path d="M-88 ${-30 + i * 38}h176" stroke="#e3e7ef" stroke-width="2"/>`).join('')}
      <ellipse pathLength="1" cx="38" cy="-17" rx="24" ry="16" fill="none" stroke="#ef4136" stroke-width="4" ${circ(tW + 0.45)}/>
      <ellipse pathLength="1" cx="62" cy="59" rx="24" ry="16" fill="none" stroke="#ef4136" stroke-width="4" ${circ(tW + 1.1)}/>
      <g transform="translate(${n(mx, 1)} ${n(my, 1)})" opacity="${n(magOp)}"><circle r="26" fill="rgba(200,242,58,.3)" stroke="#16142b" stroke-width="7"/><path d="M19 19l26 26" stroke="#16142b" stroke-width="11" stroke-linecap="round"/></g>
    </g>`;
  const badgeY = [196, 276, 356];
  const bOp = 1 - toNext;
  const lines = badgeY.map((y, i) => {
    const sx = wsX + (i === 2 ? 30 : 24) * wsS, sy = wsY + (i === 0 ? -17 : i === 1 ? 20 : 59) * wsS;
    const st = tY + 0.3 + i * 0.15;
    const op = clamp(prog(t, st, 0.1)) * bOp;
    const P = [[sx, sy], [sx + 60, sy], [200, y], [248, y]];
    const bez = (u: number) => [0, 1].map((k) => (1 - u) ** 3 * P[0][k] + 3 * (1 - u) ** 2 * u * P[1][k] + 3 * (1 - u) * u * u * P[2][k] + u ** 3 * P[3][k]);
    const dots = t > st + 0.45 ? [0, 1, 2].map((k) => {
      const u = ((t - st - 0.45) * 0.7 + k / 3) % 1;
      const [x, yy] = bez(u);
      return `<circle cx="${n(x, 1)}" cy="${n(yy, 1)}" r="4.5" fill="#c8f23a" style="filter:drop-shadow(0 0 4px rgba(200,242,58,.9))" opacity="${n(op * Math.sin(u * Math.PI))}"/>`;
    }).join('') : '';
    return `<path pathLength="1" d="M${n(sx, 1)} ${n(sy, 1)}C${n(sx + 60, 1)} ${n(sy, 1)} 200 ${y} 248 ${y}" fill="none" stroke="#c8f23a" stroke-width="2.5" stroke-opacity=".45" stroke-linecap="round" style="${draw(t, st, 0.45)};opacity:${n(op)}"/>${dots}`;
  }).join('');
  const bp = (i: number) => sp(t, tY + 0.6 + i * 0.18, 170, 12);
  const sw = (t - tY) * 260;
  const badge = (i: number, inner: string) => `<g transform="translate(286 ${badgeY[i] + toNext * 40}) scale(${n(bp(i) * 0.9)})" opacity="${n(clamp(bp(i) * 2) * bOp)}"><circle r="34" fill="#fff"/>${inner}</g>`;
  const badges = [
    badge(0, `<circle r="21" fill="none" stroke="#16142b" stroke-width="4.5"/><path d="M0 0V-14" stroke="#ef4136" stroke-width="4.5" stroke-linecap="round" transform="rotate(${n(sw, 1)})"/><rect x="-6" y="-33" width="12" height="7" rx="2" fill="#16142b"/>`),
    badge(1, `<path d="M-21 0s9-13 21-13 21 13 21 13-9 13-21 13-21-13-21-13z" fill="none" stroke="#16142b" stroke-width="4.5"/><circle cx="${n(Math.sin((t - tY) * 3) * 7, 1)}" cy="2" r="6" fill="#16142b"/>`),
    badge(2, `<rect x="-16" y="-19" width="32" height="38" rx="4" fill="none" stroke="#16142b" stroke-width="4.5"/><text x="0" y="10" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="27" fill="#ef4136" transform="rotate(${n(Math.sin((t - tY) * 5) * 10, 1)})">?</text>`),
  ].join('');
  const pulse = 0.5 + 0.5 * Math.sin((t - tStep) * 4);
  const stairs = `
    <path pathLength="1" d="M40 352h96v-56h96v-56h96" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" style="${draw(t, tN + 0.3, 0.6)}"/>
    <rect x="40" y="342" width="96" height="14" rx="3" fill="#c8f23a" style="opacity:${n(clamp(prog(t, tStep, 0.2)))};filter:drop-shadow(0 0 ${n(4 + 6 * pulse, 1)}px rgba(200,242,58,.7))"/>
    <g transform="translate(86 344) scale(1 ${n(sp(t, tStep + 0.15, 160, 12))})"><path d="M0 0V-64" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M0-64h42l-9 13 9 13H0z" fill="#ef4136"/></g>
    <path pathLength="1" d="M104 318C150 292 170 272 190 266S252 230 288 196" fill="none" stroke="#c8f23a" stroke-width="5" stroke-dasharray="0.03 0.04" stroke-linecap="round" style="stroke-dashoffset:${n(1 - easeOut(prog(t, tStep + 0.35, 0.8)) - (t - tStep) * 0.05)}"/>
    <path d="M274 194l18-4-4 18" fill="none" stroke="#c8f23a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="opacity:${n(clamp(prog(t, tStep + 1.0, 0.15)))}"/>`;
  const chip = (label: string, sub: string, at: number, until: number) =>
    t >= at - 0.05 && t < until
      ? `<div style="${rise(t, at, 3)}"><span class="chip" style="${pop(t, at, 0.5)}">${label}</span><div class="sub c-white" style="font-size:5.8cqw;margin-top:1.6cqw">${sub}</div></div>`
      : '';
  return `
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">${sheet}${lines}${badges}${t >= tN ? stairs : ''}</svg>
  <div class="safe-stack" style="justify-content:flex-start">
    <div class="d c-white" style="font-size:11cqw;white-space:normal;${rise(t, a + 0.05)}">More than just a <span class="hl c-ink" style="background-position:0 62%;background-size:${n(easeOut(prog(t, a + 0.4, 0.4)) * 100, 1)}% 80%;padding:0 1.6cqw">score!</span></div>
  </div>
  ${t >= tN ? `<div class="hand c-lime" style="position:absolute;left:11%;top:36%;font-size:7.6cqw;${write(t, tStep + 0.25, 0.4)}">start here</div>` : ''}
  <div style="position:absolute;left:9%;right:12%;top:58.5%">${chip('WHERE', 'where mistakes are happening', tW, tY)}${chip('WHY', 'the possible reasons', tY + 0.3, tN)}${chip('WHAT NEXT', 'where improvement should start', tN + 0.3, 99)}</div>`;
}

/* ---------- 6b (plays before 6a) · the sum from the worksheet: SEE → PROCESS → ANSWER → CTM™ ---------- */
export function s6b(t: number) {
  const a = S('s6b')[0];
  const tS = Math.max(a + 0.2, W('s6', 14)), tP = W('s6', 16), tA = W('s6', 19);
  const Z = tA + 0.6;
  const zoom = easeInOut(prog(t, Z, 0.6));
  const pulse = 1 + 0.07 * Math.sin((t - tS) * 9) * (t >= tS && t < tP ? 1 : 0);
  const mv = easeInOut(prog(t, tP, 0.4));
  const magX = lerp(292, 200, mv), magY = lerp(212, 336, mv);
  const magOp = clamp(prog(t, tS, 0.15)) * (1 - prog(t, tA, 0.25));
  const scan = prog(t, tS + 0.15, 0.6);
  const work = (i: number) => draw(t, tP + 0.15 + i * 0.22, 0.3);
  const chip = (label: string, at: number) => `<span class="${t >= at ? 'on' : ''}" style="${t >= at ? pop(t, at, 0.6) : 'opacity:.5'}">${label}</span>`;
  const burst = t >= tA ? Array.from({ length: 8 }, (_, i) => {
    const p = easeOut(prog(t, tA + 0.05, 0.5)), ang = (i / 8) * Math.PI * 2;
    return `<path d="M${n(268 + Math.cos(ang) * 30 * p, 1)} ${n(284 + Math.sin(ang) * 30 * p, 1)}l${n(Math.cos(ang) * 10, 1)} ${n(Math.sin(ang) * 10, 1)}" stroke="#c8f23a" stroke-width="4" stroke-linecap="round" opacity="${n(1 - prog(t, tA + 0.3, 0.3))}"/>`;
  }).join('') : '';
  return `
  <div class="layer" style="transform:scale(${n(lerp(1, 0.55, zoom))}) translateY(${n(-zoom * 16, 2)}cqw);opacity:${n(1 - zoom)};transform-origin:50% 45%">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect x="${n(lerp(50, 300, scan), 1)}" y="258" width="5" height="56" rx="2" fill="#c8f23a" opacity="${n(scan > 0 && scan < 1 ? 0.9 : 0)}"/>
      <g fill="none" stroke="#c8f23a" stroke-width="4" stroke-linecap="round" opacity="${n(clamp(prog(t, tP, 0.2)))}">
        <path pathLength="1" d="M92 338h60" style="${work(0)}"/><path pathLength="1" d="M92 360h96" style="${work(1)}"/><path pathLength="1" d="M92 382h42" style="${work(2)}"/>
        <path pathLength="1" d="M118 254C140 214 220 214 238 254" stroke-dasharray="0.04 0.05" style="stroke-dashoffset:${n(-(t - tP) * 0.8)}"/>
      </g>
      ${burst}
      <g transform="translate(${n(magX, 1)} ${n(magY, 1)}) scale(${n(pulse)})" opacity="${n(magOp)}"><circle r="26" fill="rgba(200,242,58,.2)" stroke="#c8f23a" stroke-width="6"/><path d="M19 19l22 22" stroke="#c8f23a" stroke-width="10" stroke-linecap="round"/></g>
    </svg>
    <div class="sumline" style="top:39%;${fade(t, a + 0.05, 0.3)}">48 + 37${t >= tA ? ` <span class="c-lime" style="display:inline-block;${pop(t, tA, 0.4)}">= 85</span>` : ''}</div>
  </div>
  <div class="cstack" style="justify-content:flex-start;padding-top:10cqw;opacity:${n(zoom)};transform:scale(${n(lerp(1.5, 1, zoom))})">
    <div class="wide c-lime" style="font-size:30cqw">CTM™</div>
    <div class="hand c-white" style="font-size:8.6cqw">Calculation Thinking Method</div>
  </div>
  <div style="position:absolute;left:0;right:0;top:61%"><div class="seq">${chip('SEE', tS)}<i>→</i>${chip('PROCESS', tP)}<i>→</i>${chip('ANSWER', tA)}</div></div>`;
}

/* ---------- 6a · the bonus: the CTM™ wordmark becomes a masterclass ticket ---------- */
export function s6a(t: number) {
  const a = S('s6a')[0];
  const open = W('s6', 2);
  const lidP = sp(t, open, 120, 11);
  const flash = clamp(1 - Math.abs(t - open - 0.08) / 0.25);
  const body = sp(t, open + 0.1, 120, 14);
  const count = Math.round((easeOut(prog(t, W('s6', 11), 0.6)) * 500) / 10) * 10;
  const stampAt = W('s6', 13);
  const st = sp(t, stampAt, 260, 16);
  const float = Math.sin((t - a) * 1.6) * 0.6;
  const gift = sp(t, a + 0.1, 200, 10);
  const sparks = t >= open
    ? Array.from({ length: 7 }, (_, i) => {
        const p = prog(t, open, 1.4);
        const ang = -Math.PI / 2 + (i - 3) * 0.36;
        const v = 110 + (i % 3) * 35;
        const x = 180 + Math.cos(ang) * v * p, y = 470 + Math.sin(ang) * v * p + 80 * p * p;
        return `<rect x="${n(x - 3, 1)}" y="${n(y - 6, 1)}" width="6" height="12" rx="2" fill="${['#c8f23a', '#ffffff', '#ef4136'][i % 3]}" opacity="${n(1 - p)}" transform="rotate(${n(i * 40 + t * 200, 1)} ${n(x, 1)} ${n(y, 1)})"/>`;
      }).join('')
    : '';
  return `
  <div class="rays-spin" style="top:72%;transform:translate(-50%,-50%) rotate(${n((t - a) * 8, 1)}deg);opacity:${n(0.55 + 0.45 * flash)}"></div>
  <div class="layer" style="background:radial-gradient(36cqw 36cqw at 50% 72%,rgba(200,242,58,${n(0.35 * flash, 3)}),transparent 70%)"></div>
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
    ${sparks}
    <g transform="translate(180 492) scale(${n(0.85 * gift)})">
      <rect x="-52" y="-6" width="104" height="66" rx="6" fill="#fff"/><rect x="12" y="-6" width="40" height="66" fill="#e6ebf3"/><rect x="-8" y="-6" width="16" height="66" fill="#ef4136"/>
      <g transform="translate(${n(lerp(0, -58, lidP), 1)} ${n(lerp(-6, -40, lidP), 1)}) rotate(${n(lerp(0, -30, lidP), 1)})"><rect x="-58" y="-10" width="116" height="20" rx="4" fill="#fff"/><rect x="-9" y="-10" width="18" height="20" fill="#d22f25"/><path d="M0-10c-8-16-30-20-30-6 0 8 16 8 30 6zM0-10c8-16 30-20 30-6 0 8-16 8-30 6z" fill="#ef4136"/></g>
    </g>
  </svg>
  <div class="cstack" style="justify-content:flex-start;gap:1.6cqw">
    <div class="hand c-lime" style="font-size:9.5cqw;${write(t, a + 0.1, 0.45)}">special bonus</div>
    <div class="rel" style="margin-top:2cqw;transform:translateY(${n(float, 2)}cqw) rotate(-2deg)">
      <div class="ticket" style="background:rgba(200,242,58,${n(body)});box-shadow:0 2cqw 0 rgba(0,0,0,${n(0.28 * body)});padding:3.4cqw ${n(lerp(2, 8, body), 2)}cqw 4cqw">
        <div class="wide" style="font-size:${n(lerp(24, 15, body), 2)}cqw;color:${body > 0.5 ? '#16142b' : '#c8f23a'}">CTM™</div>
        <div class="wide" style="font-size:9cqw;color:#16142b;${rise(t, W('s6', 9) - 0.1, 3)}">Masterclass</div>
        <div class="sub" style="font-size:6.2cqw;font-weight:700;color:#16142b;margin-top:1cqw;${rise(t, W('s6', 7), 3)}">60 minutes</div>
      </div>
      <div class="stamp" style="width:26cqw;height:26cqw;right:-7cqw;bottom:-15cqw;opacity:${n(clamp(prog(t, W('s6', 10), 0.15)))};transform:rotate(-12deg) scale(${n(t < stampAt ? 0.92 : lerp(1.6, 1, st))})"><span style="font-size:4.6cqw">worth</span><span style="font-size:10cqw;font-variant-numeric:tabular-nums">₹${count}</span></div>
    </div>
  </div>
  <div style="position:absolute;left:12%;right:20%;top:57.5%;text-align:center;${rise(t, stampAt + 0.25, 3)}"><span class="pill-lime" style="line-height:1.15"><b style="font-weight:800">FREE</b> with the test<br><span style="font-size:.8em;font-weight:600">limited period</span></span></div>`;
}

/* ---------- 7a · WhatsApp: open the chat, type, send, get the form ---------- */
const MSG = 'CALCULATION EFFICIENCY TEST';
export function s7a(t: number) {
  const a = S('s7a')[0];
  const typeA = W('s7', 5), typeB = WE('s7', 8);
  const sent = W('s7', 9);
  const wa = W('s7', 3);
  const typed = MSG.slice(0, Math.floor(MSG.length * prog(t, typeA, typeB - typeA)));
  const input = t < sent && typed ? `<span>${typed}<b style="opacity:${Math.floor(t * 4) % 2}">|</b></span>` : '<span class="ph">Message</span>';
  const ticks = t >= sent + 0.25 ? '<b style="color:#53bdeb;font-weight:700">✓✓</b>' : '✓';
  const outB = t >= sent ? `<div class="bub out" style="transform-origin:right bottom;${pop(t, sent, 0.6)}">${MSG}<small>10:24 ${ticks}</small></div>` : '';
  const reply = sent + 0.45;
  const form = t >= reply
    ? `<div class="formcard" style="${rise(t, reply, 3)}"><div class="fc-t">Thank you! Please fill in this form to book the test.</div><div class="fc-doc"><i></i><div><b>Registration form</b><small>Calculation Efficiency Test</small></div></div><div class="fc-btn">Open form</div></div>`
    : '';
  const up = sp(t, a, 110, 17);
  const hi = clamp(1 - Math.abs(t - wa - 0.2) / 0.5);
  return `
  <div style="position:absolute;left:12%;right:12%;top:17.5%;text-align:center;${rise(t, a + 0.05)}">
    <div class="sub c-white" style="font-size:6.6cqw">Book your</div>
    <div class="d c-lime" style="font-size:9cqw;white-space:nowrap">Calculation Efficiency Test</div>
  </div>
  <div class="phone big" style="top:${n(lerp(47, 29, sp(t, sent - 0.1, 120, 17)), 2)}%;transform:translateY(${n((1 - up) * 70, 2)}cqw)">
    <div class="ph-top" style="box-shadow:inset 0 0 0 ${n(hi * 0.8, 2)}cqw rgba(37,211,102,.9)"><span class="av"><svg viewBox="0 0 60 60" style="width:80%;height:80%"><use href="#gfg-mark" width="60" height="60"/></svg></span><div>Giane Future Gurukull<small>WhatsApp · online</small></div></div>
    <div class="ph-body">${outB}${form}</div>
    <div class="ph-in">${input}<i style="${t >= sent && t < sent + 0.15 ? 'transform:scale(.85)' : ''}">➤</i></div>
  </div>`;
}

/* ---------- 7b · end card ---------- */
export function s7b(t: number) {
  const a = S('s7b')[0];
  const digits = (s: string, start: number) =>
    s.split('').map((ch, i) => `<span class="ib" style="${drop(t, start + i * 0.045, 0)}">${ch}</span>`).join('');
  const glow = t > a + 1.3 ? 0.5 + 0.5 * Math.sin((t - a - 1.3) * 3.2) : 0;
  return `
  <div class="cstack" style="gap:1.2cqw">
    <div style="display:flex;align-items:center;gap:2.4cqw;${rise(t, a + 0.05)}"><svg viewBox="0 0 48 48" style="width:10cqw;height:10cqw"><use href="#wa" width="48" height="48"/></svg><span class="wide c-white" style="font-size:8.6cqw">WhatsApp</span></div>
    <div class="numblock" style="box-shadow:0 0 ${n(3 + 5 * glow, 2)}cqw rgba(200,242,58,${n(0.15 + 0.3 * glow)});transform:scale(${n(1 + 0.02 * glow)})"><span class="wide c-lime" style="font-size:14.4cqw;white-space:nowrap">${digits('8062365298', a + 0.15)}</span></div>
    <div class="sub c-white" style="font-size:5.8cqw;margin-top:2cqw;${rise(t, a + 0.75, 3)}">Send</div>
    <div class="d c-white" style="font-size:8.4cqw;${rise(t, a + 0.85, 3)}">CALCULATION EFFICIENCY TEST</div>
    <div class="sub c-lime" style="font-size:5.6cqw;margin-top:1.4cqw;font-weight:700;line-height:1.25;${rise(t, a + 1.0, 3)}">Class 3 onwards<br>Ahmedabad &amp; Vadodara</div>
    <div class="logo-card" style="margin-top:3cqw;${pop(t, a + 1.2, 0.85)}"><img src="${staticFile('gfg-logo.png')}" alt="Giane Future Gurukull"><div>www.gianefuturegurukull.com</div></div>
  </div>`;
}

export const OVERLAYS: Record<string, (t: number) => string> = { s1a, s1b, s2, s3a, s3b, s4a, s4b, s5, s6a, s6b, s7a, s7b };
export { clamp, fade };
