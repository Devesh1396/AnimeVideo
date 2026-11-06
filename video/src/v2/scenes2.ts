// Reel v2 overlays: type and motion graphics as HTML strings (same approach as v1), one function per shot.
// Footage sits underneath (ReelV2.tsx). Text stays in the safe zone: y 330-1350 of 1920 (17.2%-70.3%),
// clear of the right 12%. Layout follows storyboard-v4/index.html.
import { staticFile } from 'remotion';
import { S, W, WE, clamp, draw, drop, easeInOut, easeOut, fade, lerp, n, pop, prog, rise, sp, write } from './time';

const tick = (style: string) => `<svg class="mark" viewBox="0 0 40 40" style="${style}"><use href="#sc-tick"/></svg>`;

/* ---------- 1a · C1, "Maths concepts are clear…" ---------- */
export function s1a(t: number) {
  return `
  <div class="safe-stack end" style="gap:1.6cqw">
    <div class="m c-white sh" style="font-size:8.6cqw;${rise(t, W('s1', 0))}"><span class="rel">Maths<svg class="mark" viewBox="0 0 40 40" style="left:calc(100% + 3cqw);top:-1.5cqw;width:11cqw;height:11cqw;stroke:var(--lime);${draw(t, W('s1', 4), 0.3)}"><use href="#sc-tick"/></svg></span></div>
    <div class="d c-white sh" style="font-size:17cqw;${rise(t, W('s1', 2))}">concepts</div>
    <div class="d c-lime sh" style="font-size:17cqw;${rise(t, W('s1', 3))}">are clear…</div>
  </div>`;
}

/* ---------- 1b · exam paper over C1 (blurred), "Still making silly mistakes?!" ---------- */
export function s1b(t: number) {
  const a = S('s1b')[0];
  const up = sp(t, a, 90, 17);
  const m1 = a + 0.3, m2 = W('s1', 7), m3 = W('s1', 8), m4 = W('s1', 8) + 0.45;
  const bounce = (at: number, from = 0.2) => {
    const p = sp(t, at, 230, 8);
    return `display:inline-block;opacity:${n(clamp(p * 3))};transform:scale(${n(from + (1 - from) * p)})`;
  };
  const ans = (at: number, wrong: string, right: string) =>
    t >= at ? `<s>${wrong}</s> <em style="${bounce(at + 0.08, 0.3)}">${right}</em>` : wrong;
  const x = (at: number) => `<span class="x" style="${bounce(at)}">✗</span>`;
  return `
  <div class="exam" style="top:12.5%;transform-origin:50% 0;transform:translateY(${n((1 - up) * 110, 2)}cqw) rotate(-2.5deg) scale(.86)">
    <div class="ex-h"><div><div class="ex-t">MATHS · UNIT TEST</div><div class="ex-n">Name: <span class="hand c-ball">Aarav</span> &nbsp; Class: <span class="hand c-ball">4-B</span></div></div>
      <div class="ex-s rel" style="${bounce(m4, 0.5)}">12<span style="font-size:.6em">/20</span><svg class="mark c-pen" viewBox="0 0 200 100" style="left:-30%;top:-25%;width:160%;height:150%;${draw(t, m4, 0.4)}"><use href="#sc-circle"/></svg></div></div>
    <div class="ex-q"><span class="qn">1.</span><span class="qa">48 + 37 = 85</span>${tick(`position:static;width:7cqw;height:7cqw;stroke:var(--pen);${draw(t, m1, 0.25)}`)}</div>
    <div class="ex-q"><span class="qn">2.</span><span class="qa">7 × 8 = ${ans(m2, '54', '56')}</span>${t >= m2 ? x(m2) : ''}</div>
    <div class="ex-q"><span class="qn">3.</span><span class="qa">125 − 68 = ${ans(m3, '67', '57')}</span>${t >= m3 ? x(m3) : ''}</div>
  </div>
  <div class="safe-stack end" style="gap:1.4cqw">
    <div class="m c-white" style="font-size:7cqw;${rise(t, W('s1', 5))}">Still making</div>
    <div class="d c-pen" style="font-size:17cqw;transform-origin:left bottom;${pop(t, W('s1', 7) - 0.05, 0.7)}">silly</div>
    <div class="d" style="font-size:13cqw;transform-origin:left bottom;${pop(t, W('s1', 8) - 0.05, 0.7)}"><span class="hl c-ink" style="background-position:0 60%;background-size:100% 84%;padding:0 2cqw">mistakes?</span></div>
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
  <div class="safe-stack end" style="gap:3cqw">
    <div class="m c-white sh" style="font-size:8.6cqw;${rise(t, W('s3', 4) - 0.1)}">These may be just</div>
    <div class="d c-white sh" style="font-size:17cqw;${rise(t, W('s3', 5))}">the visible</div>
    <div class="d c-white" style="font-size:20cqw;${rise(t, W('s3', 6))}"><span class="hl c-ink" style="background-position:0 62%;background-size:${n(hl * 100, 1)}% 86%;padding:0 2cqw">signs…</span></div>
  </div>`;
}

/* ---------- 3b · C5 (red duotone), "…not the real reasons behind those silly mistakes." ---------- */
export function s3b(t: number) {
  const a = S('s3b')[0];
  return `
  <div class="safe-stack end" style="gap:2.4cqw">
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
  const L0 = W('s4', 17), L1 = L0 + 1.0;
  const lensX = lerp(10, 350, easeInOut(prog(t, L0, L1 - L0)));
  const lensOp = clamp(prog(t, L0 - 0.15, 0.15)) * (1 - prog(t, L1 + 0.1, 0.3));
  const syms: [string, number][] = [['7', 46], ['×', 92], ['3', 136], ['+', 180], ['8', 224], ['÷', 268], ['9', 314]];
  const tiles = syms.map(([c, x], i) => {
    const sharp = easeOut(clamp((lensX - x + 10) / 26));
    const dy = Math.sin(t * 1.3 + i * 1.7) * 18 * (1 - sharp);
    const dx = Math.cos(t * 0.9 + i) * 8 * (1 - sharp);
    const y = 300 + dy + (i % 2 ? -26 : 22) * (1 - sharp);
    return `<g transform="translate(${n(x + dx, 1)} ${n(y, 1)})" style="filter:blur(${n(2.6 * (1 - sharp), 2)}px)" opacity="${n(lerp(0.4, 1, sharp))}">
      <circle r="${n(lerp(14, 19, sharp), 2)}" fill="#fff" opacity="${n(sharp)}"/>
      <text y="9" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="${n(lerp(30, 24, sharp), 1)}" fill="${sharp > 0.5 ? '#2812a6' : '#ffffff'}">${c}</text></g>`;
  }).join('');
  const credit = Math.max(L1 + 0.1, a + 2.4);
  return `
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="opacity:${n(clamp(prog(t, a + 0.3, 0.4)))}">
    ${tiles}
    <g transform="translate(${n(lensX, 1)} 300)" opacity="${n(lensOp)}"><circle r="44" fill="rgba(200,242,58,.14)" stroke="#c8f23a" stroke-width="6"/><path d="M31 31l24 24" stroke="#c8f23a" stroke-width="11" stroke-linecap="round"/></g>
  </svg>
  <div class="cstack" style="justify-content:flex-start;gap:1.2cqw">
    <div class="hand c-white" style="font-size:8.6cqw;${write(t, a + 0.05, 0.45)}">Understand your child's</div>
    <div class="d c-lime" style="font-size:14cqw;${rise(t, Math.max(a + 0.25, W('s4', 14)))}">calculation skills</div>
    <div class="d" style="font-size:14cqw;${pop(t, Math.max(a + 0.45, W('s4', 17)), 0.6)}"><span class="hl c-ink" style="background-position:0 60%;background-size:${n(easeOut(prog(t, W('s4', 17) + 0.1, 0.4)) * 100, 1)}% 84%;padding:0 2cqw">better</span></div>
  </div>
  <div class="credit" style="position:absolute;left:12%;right:12%;top:56.5%;${rise(t, credit, 4)}">
    <img src="${staticFile('gwr-logo.png')}" style="width:18cqw;height:18cqw;transform:rotate(${n(lerp(-200, 0, easeOut(prog(t, credit, 0.7))), 1)}deg)">
    <div style="text-align:left">
      <div class="m c-white" style="font-size:4.8cqw;opacity:.85">Specially designed by</div>
      <div class="d c-white" style="font-size:10.5cqw">Deveshh Sir</div>
      <div class="m c-lime" style="font-size:4.4cqw;font-weight:700;line-height:1.15">Guinness World Record<br>Holder in Memory</div>
    </div>
  </div>`;
}

/* ---------- 5 · squared paper: WHERE / WHY / WHAT NEXT told by a worksheet (rev 2) ---------- */
export function s5(t: number) {
  const a = S('s5')[0];
  const tW = W('s5', 2), tY = W('s5', 7) - 0.1, tN = W('s5', 12) - 0.1, tStep = W('s5', 14);
  // phase blends
  const toWhy = easeInOut(prog(t, tY, 0.5));
  const toNext = easeInOut(prog(t, tN, 0.45));
  // worksheet: centred, then small on the left (WHY), then away (WHAT NEXT)
  const wsX = lerp(180, 92, toWhy), wsY = lerp(300, 290, toWhy), wsS = lerp(1, 0.62, toWhy) * (1 - 0.15 * toNext);
  const wsIn = sp(t, a + 0.15, 110, 15);
  const wsOp = clamp(wsIn * 2) * (1 - toNext);
  // magnifier path over the sheet (sheet coords): row 2 then row 4
  const m1 = easeInOut(prog(t, tW, 0.45)), m2 = easeInOut(prog(t, tW + 0.75, 0.4));
  const mx = lerp(lerp(70, 40, m1), 44, m2), my = lerp(lerp(-70, -12, m1), 52, m2);
  const magOp = clamp(prog(t, tW - 0.15, 0.2)) * (1 - prog(t, tY, 0.25));
  const circ = (at: number) => `style="${draw(t, at, 0.35)}"`;
  const rows = [['48 + 37 = 85', '✓'], ['7 × 8 = 54', ''], ['36 ÷ 4 = 9', '✓'], ['125 − 68 = 67', '']];
  const sheet = `
    <g transform="translate(${n(wsX, 1)} ${n(wsY + (1 - wsIn) * 60, 1)}) scale(${n(wsS * lerp(0.9, 1, wsIn))}) rotate(-2)" opacity="${n(wsOp)}">
      <rect x="-104" y="-104" width="208" height="200" rx="8" fill="#000" opacity=".12" transform="translate(4 8)"/>
      <rect x="-104" y="-104" width="208" height="200" rx="8" fill="#fff" stroke="#16142b" stroke-width="3"/>
      <text x="-88" y="-78" font-family="Bricolage Grotesque" font-weight="800" font-size="15" fill="#16142b" letter-spacing="1">MATHS · WORKSHEET</text>
      <path d="M-88-68h176" stroke="#16142b" stroke-width="2.5"/>
      ${rows.map(([q, ok], i) => `<text x="-86" y="${-38 + i * 38}" font-family="Kalam" font-weight="700" font-size="21" fill="#2a3a94">${q}</text>${ok ? `<text x="70" y="${-38 + i * 38}" font-family="Kalam" font-weight="700" font-size="22" fill="#2a3a94">${ok}</text>` : ''}<path d="M-88 ${-30 + i * 38}h176" stroke="#e3e7ef" stroke-width="2"/>`).join('')}
      <ellipse pathLength="1" cx="38" cy="-17" rx="24" ry="16" fill="none" stroke="#ef4136" stroke-width="4" ${circ(tW + 0.45)}/>
      <ellipse pathLength="1" cx="62" cy="59" rx="24" ry="16" fill="none" stroke="#ef4136" stroke-width="4" ${circ(tW + 1.15)}/>
      <g transform="translate(${n(mx, 1)} ${n(my, 1)})" opacity="${n(magOp)}"><circle r="26" fill="rgba(200,242,58,.28)" stroke="#16142b" stroke-width="7"/><path d="M19 19l26 26" stroke="#16142b" stroke-width="11" stroke-linecap="round"/></g>
    </g>`;
  // WHY: dotted lines + three reason badges (the signs from slide 2)
  const badgeY = [190, 292, 394];
  const bOp = (1 - toNext);
  const lines = badgeY.map((y, i) => {
    const sx = wsX + (i === 2 ? 30 : 24) * wsS, sy = wsY + (i === 0 ? -17 : i === 1 ? 20 : 59) * wsS;
    const st = tY + 0.3 + i * 0.15;
    const op = clamp(prog(t, st, 0.1)) * bOp;
    const P = [[sx, sy], [sx + 60, sy], [200, y], [248, y]];
    const bez = (u: number) => [0, 1].map((k) => (1 - u) ** 3 * P[0][k] + 3 * (1 - u) ** 2 * u * P[1][k] + 3 * (1 - u) * u * u * P[2][k] + u ** 3 * P[3][k]);
    const dots = t > st + 0.45 ? [0, 1, 2].map((k) => {
      const u = (((t - st - 0.45) * 0.7 + k / 3) % 1);
      const [x, yy] = bez(u);
      return `<circle cx="${n(x, 1)}" cy="${n(yy, 1)}" r="5" fill="#5b3cf5" style="filter:drop-shadow(0 0 4px rgba(91,60,245,.9))" opacity="${n(op * Math.sin(u * Math.PI))}"/>`;
    }).join('') : '';
    return `<path pathLength="1" d="M${n(sx, 1)} ${n(sy, 1)}C${n(sx + 60, 1)} ${n(sy, 1)} 200 ${y} 248 ${y}" fill="none" stroke="#3a1fd0" stroke-width="3" stroke-opacity=".45" stroke-linecap="round" style="${draw(t, st, 0.45)};opacity:${n(op)}"/>${dots}`;
  }).join('');
  const bp = (i: number) => sp(t, tY + 0.6 + i * 0.18, 170, 12);
  const sw = (t - tY) * 260;
  const badge = (i: number, inner: string) => `<g transform="translate(286 ${badgeY[i] + toNext * 40}) scale(${n(bp(i))})" opacity="${n(clamp(bp(i) * 2) * bOp)}"><circle r="36" fill="#fff" stroke="#16142b" stroke-width="4"/>${inner}</g>`;
  const badges = [
    badge(0, `<circle r="22" fill="none" stroke="#16142b" stroke-width="4.5"/><path d="M0 0V-15" stroke="#ef4136" stroke-width="4.5" stroke-linecap="round" transform="rotate(${n(sw, 1)})"/><rect x="-6" y="-35" width="12" height="7" rx="2" fill="#16142b"/>`),
    badge(1, `<path d="M-22 0s9-14 22-14 22 14 22 14-9 14-22 14-22-14-22-14z" fill="none" stroke="#16142b" stroke-width="4.5"/><circle cx="${n(Math.sin((t - tY) * 3) * 7, 1)}" cy="2" r="6" fill="#16142b"/>`),
    badge(2, `<rect x="-17" y="-20" width="34" height="40" rx="4" fill="none" stroke="#16142b" stroke-width="4.5"/><text x="0" y="10" text-anchor="middle" font-family="Bricolage Grotesque" font-weight="800" font-size="28" fill="#ef4136" transform="rotate(${n(Math.sin((t - tY) * 5) * 10, 1)})">?</text>`),
  ].join('');
  // WHAT NEXT: staircase, step one lights up, flag, climbing arrow
  const stairs = `
    <path pathLength="1" d="M40 380h96v-62h96v-62h96" fill="none" stroke="#16142b" stroke-width="6" stroke-linejoin="round" style="${draw(t, tN + 0.3, 0.6)}"/>
    <rect x="40" y="370" width="96" height="14" rx="3" fill="#c8f23a" stroke="#16142b" stroke-width="3" style="opacity:${n(clamp(prog(t, tStep, 0.2)))}"/>
    <g transform="translate(86 372) scale(1 ${n(sp(t, tStep + 0.15, 160, 12))})"><path d="M0 0V-70" stroke="#16142b" stroke-width="5" stroke-linecap="round"/><path d="M0-70h46l-10 14 10 14H0z" fill="#ef4136"/></g>
    <path pathLength="1" d="M104 352C150 326 170 304 190 296S252 254 288 218" fill="none" stroke="#3a1fd0" stroke-width="6" stroke-dasharray="0.03 0.04" stroke-linecap="round" style="stroke-dashoffset:${n(1 - easeOut(prog(t, tStep + 0.4, 0.8)))}"/>
    <path d="M274 216l18-4-4 18" fill="none" stroke="#3a1fd0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" style="opacity:${n(clamp(prog(t, tStep + 1.1, 0.15)))}"/>`;
  const chip = (label: string, at: number, until: number) =>
    t >= at - 0.05 && t < until ? `<span class="chip" style="${pop(t, at, 0.5)}">${label}</span>` : '';
  return `
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">${sheet}${lines}${badges}${t >= tN ? stairs : ''}</svg>
  <div class="safe-stack" style="justify-content:flex-start">
    <div class="d c-ink" style="font-size:11cqw;white-space:normal;${rise(t, a + 0.05)}">More than just a <span class="hl" style="background-position:0 62%;background-size:${n(easeOut(prog(t, a + 0.45, 0.4)) * 100, 1)}% 80%;padding:0 1.6cqw">score!</span></div>
  </div>
  ${t >= tN ? `<div class="hand c-pen" style="position:absolute;left:40%;top:52.5%;font-size:8cqw;${write(t, tStep + 0.25, 0.4)}">start here</div>` : ''}
  <div style="position:absolute;left:9%;top:62.5%">${chip('WHERE', tW, tY)}${chip('WHY', tY + 0.3, tN)}${chip('WHAT NEXT', tN + 0.3, 99)}</div>`;
}

/* ---------- 6a · violet night: the gift opens, a CTM™ ticket rises (rev 2) ---------- */
export function s6a(t: number) {
  const a = S('s6a')[0];
  const sw = prog(t, a, 0.4);
  const hopAt = W('s6', 1);
  const hop = Math.max(0, Math.sin(clamp((t - hopAt) / 0.3) * Math.PI * 2)) * (t < W('s6', 2) ? 1 : 0);
  const open = W('s6', 2);
  const lidP = sp(t, open, 120, 11);
  const flash = clamp(1 - Math.abs(t - open - 0.08) / 0.25);
  const tick = W('s6', 5);
  const up = sp(t, tick, 90, 13);
  const count = Math.round((easeOut(prog(t, W('s6', 11), 0.6)) * 500) / 10) * 10;
  const stampAt = W('s6', 13);
  const st = sp(t, stampAt, 260, 16);
  const shake = t > stampAt && t < stampAt + 0.25 ? Math.sin((t - stampAt) * 90) * 1.2 * (1 - (t - stampAt) / 0.25) : 0;
  const sparks = t >= open
    ? Array.from({ length: 9 }, (_, i) => {
        const p = prog(t, open, 1.6);
        const ang = -Math.PI / 2 + (i - 4) * 0.32;
        const v = 120 + (i % 3) * 40;
        const x = 180 + Math.cos(ang) * v * p;
        const y = 380 + Math.sin(ang) * v * p + 90 * p * p;
        const c = ['#c8f23a', '#ffffff', '#ef4136'][i % 3];
        return `<rect x="${n(x - 3, 1)}" y="${n(y - 6, 1)}" width="6" height="12" rx="2" fill="${c}" opacity="${n(1 - p)}" transform="rotate(${n(i * 40 + t * 220, 1)} ${n(x, 1)} ${n(y, 1)})"/>`;
      }).join('')
    : '';
  return `
  <div class="layer f-night"></div>
  <div class="rays-spin" style="transform:translate(-50%,-50%) rotate(${n((t - a) * 9, 1)}deg);opacity:${n(0.6 + 0.4 * flash)}"></div>
  <div class="layer" style="background:radial-gradient(40cqw 40cqw at 50% 62%,rgba(200,242,58,${n(0.35 * flash, 3)}),transparent 70%)"></div>
  <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
    ${sparks}
    <g transform="translate(180 ${n(410 - hop * 14, 1)}) scale(${n(1.15 * sp(t, a + 0.25, 200, 9))})">
      <rect x="-52" y="-6" width="104" height="70" rx="6" fill="#fff"/><rect x="12" y="-6" width="40" height="70" fill="#e6ebf3"/><rect x="-8" y="-6" width="16" height="70" fill="#ef4136"/>
      <g transform="translate(${n(lerp(0, -62, lidP), 1)} ${n(lerp(-6, -44, lidP), 1)}) rotate(${n(lerp(0, -32, lidP), 1)})"><rect x="-58" y="-10" width="116" height="20" rx="4" fill="#fff"/><rect x="-9" y="-10" width="18" height="20" fill="#d22f25"/><path d="M0-10c-8-16-30-20-30-6 0 8 16 8 30 6zM0-10c8-16 30-20 30-6 0 8-16 8-30 6z" fill="#ef4136"/></g>
    </g>
  </svg>
  <div class="cstack" style="justify-content:flex-start;gap:2cqw">
    <div class="hand c-lime" style="font-size:10cqw;${write(t, hopAt - 0.1, 0.5)}">special bonus</div>
    <div class="ticket" style="margin-top:3cqw;transform:translateY(${n((1 - up) * 70, 2)}cqw) scale(${n(lerp(0.3, 1, up))}) rotate(${n(lerp(0, -3, up) + shake, 2)}deg);opacity:${n(clamp(up * 3))}">
      <div class="d" style="font-size:17cqw">CTM™</div>
      <div class="d" style="font-size:9cqw;margin-top:.6cqw">Masterclass</div>
      <div class="m" style="font-size:6cqw;margin-top:1.2cqw;font-weight:700;${fade(t, W('s6', 7), 0.25)}">60 minutes</div>
      <div class="stamp" style="opacity:${n(clamp(prog(t, W('s6', 10), 0.15)))};transform:rotate(-12deg) scale(${n(t < stampAt ? 0.9 : lerp(1.7, 1, st))})"><span style="font-size:4.6cqw">worth</span><span style="font-size:10cqw;font-variant-numeric:tabular-nums">₹${count}</span></div>
    </div>
  </div>
  <div style="position:absolute;left:0;right:0;top:57%;text-align:center;${rise(t, stampAt + 0.3, 3)}"><span class="pill-lime">FREE with the test · limited period</span></div>
  <div class="layer" style="background:linear-gradient(90deg,transparent calc(${n(sw * 100, 1)}% - 9%),#c8f23a calc(${n(sw * 100, 1)}% - 9%),#c8f23a ${n(sw * 100, 1)}%,transparent ${n(sw * 100, 1)}%);opacity:${sw < 1 ? 1 : 0}"></div>`;
}

/* ---------- 6b · C8 visible: EXPERIENCE CTM™, then See → Process → Answer in motion (rev 2) ---------- */
export function s6b(t: number) {
  const a = S('s6b')[0];
  const tS = W('s6', 14), tP = W('s6', 16), tA = W('s6', 19);
  const Z = WE('s6', 20) + 0.2;
  const zoom = easeInOut(prog(t, Z, 0.7));
  const pulse = 1 + 0.07 * Math.sin((t - tS) * 9) * (t >= tS && t < tP ? 1 : 0);
  // magnifier: on the sum during SEE, slides down to the working during PROCESS, then away
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
    <div class="sumline" style="top:39%;${fade(t, a + 0.1, 0.3)}">48 + 37${t >= tA ? ` <span class="c-lime" style="display:inline-block;${pop(t, tA, 0.4)}">= 85</span>` : ''}</div>
  </div>
  <div class="cstack" style="justify-content:flex-start;padding-top:8cqw;opacity:${n(zoom)};transform:scale(${n(lerp(1.5, 1, zoom))})">
    <div class="d c-lime" style="font-size:36cqw">CTM™</div>
    <div class="hand c-white" style="font-size:8.6cqw">Calculation Thinking Method</div>
  </div>
  <div style="position:absolute;left:0;right:0;top:61%"><div class="seq">${chip('SEE', tS)}<i>→</i>${chip('PROCESS', tP)}<i>→</i>${chip('ANSWER', tA)}</div></div>`;
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
  <div style="position:absolute;left:12%;right:12%;top:17.5%;text-align:center;${rise(t, a + 0.05)}">
    <div class="m c-white" style="font-size:7cqw">Book your</div>
    <div class="d c-lime" style="font-size:9cqw;white-space:nowrap">Calculation Efficiency Test</div>
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
    s.split('').map((ch, i) => `<span class="ib" style="${drop(t, start + i * 0.05, 0)}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  const glow = t > a + 1.2 ? 0.5 + 0.5 * Math.sin((t - a - 1.2) * 3.2) : 0;
  return `
  <div class="cstack" style="gap:1.4cqw">
    <div style="display:flex;align-items:center;gap:2.4cqw;${rise(t, a + 0.05)}"><svg viewBox="0 0 48 48" style="width:10cqw;height:10cqw"><use href="#wa" width="48" height="48"/></svg><span class="d c-white" style="font-size:10cqw">WhatsApp</span></div>
    <div class="numblock" style="box-shadow:0 0 ${n(3 + 5 * glow, 2)}cqw rgba(200,242,58,${n(0.15 + 0.3 * glow)});transform:scale(${n(1 + 0.02 * glow)})"><span class="d c-lime" style="font-size:16.5cqw;white-space:nowrap">${digits('80623 65298', a + 0.15)}</span></div>
    <div class="m c-white" style="font-size:5.6cqw;margin-top:2cqw;${rise(t, a + 0.85, 3)}">Send</div>
    <div class="d c-white" style="font-size:7.6cqw;${rise(t, a + 0.95, 3)}">CALCULATION EFFICIENCY TEST</div>
    <div class="m c-lime" style="font-size:5.4cqw;margin-top:1.4cqw;font-weight:700;line-height:1.25;${rise(t, a + 1.1, 3)}">Class 3 onwards<br>Ahmedabad &amp; Vadodara</div>
    <div class="logo-card" style="margin-top:3cqw;${pop(t, a + 1.3, 0.85)}"><img src="${staticFile('gfg-logo.png')}" alt="Giane Future Gurukull"><div>www.gianefuturegurukull.com</div></div>
  </div>`;
}

export const OVERLAYS: Record<string, (t: number) => string> = { s1a, s1b, s2, s3a, s3b, s4a, s4b, s5, s6a, s6b, s7a, s7b };
export { clamp };
