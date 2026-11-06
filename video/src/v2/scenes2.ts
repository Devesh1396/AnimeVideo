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
      <div class="check" style="${rise(t, at - 0.15, 4)}"><span class="box"><svg viewBox="0 0 40 40" style="stroke:#fff"><use href="#sc-box"/></svg><svg viewBox="0 0 40 40" style="stroke:var(--lime);inset:-25% -10% 10% 10%;${draw(t, at + 0.12, 0.3)}"><use href="#sc-tick"/></svg></span><span class="m c-white" style="font-size:7.4cqw;font-weight:700">${label}</span></div>`
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
    <div class="d c-white" style="font-size:20cqw;${rise(t, W('s3', 6))}"><span class="hl c-ink" style="background-size:${n(hl * 100, 1)}% 46%">signs…</span></div>
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
  return `
  <div class="cstack" style="gap:1cqw;opacity:${n(1 - out)}">
    <div class="hand c-white" style="font-size:8.5cqw;${write(t, W('s4', 0), 0.45)}">That's why…</div>
    <div class="brand c-white" style="font-size:5.4cqw;opacity:.9;${rise(t, W('s4', 1), 3)}">Giane Future Gurukull brings you</div>
    <div style="margin:3.5cqw 0 2.5cqw"><span class="freepill" style="display:inline-block;${drop(t, W('s4', 7))}">FREE</span></div>
    <div class="d c-white" style="font-size:15cqw;${rise(t, W('s4', 8))}">CALCULATION</div>
    <div class="d c-white" style="font-size:15cqw;${rise(t, W('s4', 9))}">EFFICIENCY</div>
    <div class="d c-lime" style="font-size:15cqw;${pop(t, W('s4', 10), 0.6)}">TEST</div>
  </div>`;
}

/* ---------- 4b · why it exists + Deveshh Sir ---------- */
export function s4b(t: number) {
  const a = S('s4b')[0];
  const credit = W('s4', 15) + 0.35;
  return `
  <div class="cstack" style="gap:1.2cqw">
    <div class="m c-white" style="font-size:7.4cqw;${rise(t, a + 0.05)}">Understand your child's</div>
    <div class="d c-lime" style="font-size:16cqw;${rise(t, W('s4', 14))}">calculation</div>
    <div class="d c-white" style="font-size:16cqw;${rise(t, W('s4', 15))}">skills better</div>
    <div class="rule" style="margin:5cqw 0 4cqw;transform:scaleX(${n(easeOut(prog(t, credit - 0.2, 0.4)))})"></div>
    <img src="${staticFile('gwr-logo.png')}" style="width:20cqw;height:20cqw;border-radius:50%;background:#fff;padding:.6cqw;${pop(t, credit, 0.5)}">
    <div class="m c-white" style="font-size:5.6cqw;margin-top:2.4cqw;opacity:.85;${rise(t, credit + 0.2, 3)}">Specially designed by</div>
    <div class="d c-white" style="font-size:13cqw;${rise(t, credit + 0.3)}">Deveshh Sir</div>
    <div class="m c-lime" style="font-size:5.4cqw;font-weight:700;${rise(t, credit + 0.45, 3)}">Guinness World Record Holder in Memory</div>
  </div>`;
}

/* ---------- 5 · plain violet: MORE THAN JUST A SCORE! → WHERE / WHY / WHAT NEXT ---------- */
export function s5(t: number) {
  const a = S('s5')[0];
  const shrink = easeInOut(prog(t, W('s5', 2) - 0.6, 0.5));
  const row = (label: string, sub: string, at: number) => `
    <div style="${rise(t, at)}"><div class="d c-lime" style="font-size:14cqw">${label}</div><div class="m c-white" style="font-size:6.4cqw;margin-top:.6cqw">${sub}</div></div>`;
  return `
  <div class="safe-stack" style="gap:${n(lerp(0, 4.5, shrink), 2)}cqw">
    <div class="d c-white" style="font-size:${n(lerp(22, 9, shrink), 2)}cqw;line-height:.9;${pop(t, a, 0.7)}">${shrink < 0.5 ? 'More than<br>just a<br>score!' : 'More than just a score!'}</div>
    ${t >= W('s5', 2) - 0.2 ? row('WHERE', 'mistakes are happening', W('s5', 2)) : ''}
    ${t >= W('s5', 8) - 0.2 ? row('WHY', 'the possible reasons', W('s5', 8)) : ''}
    ${t >= W('s5', 12) - 0.2 ? row('WHAT NEXT', 'where improvement should start', W('s5', 12)) : ''}
  </div>`;
}

/* ---------- 6a · lime: the gift ---------- */
export function s6a(t: number) {
  const open = W('s6', 2);
  const lidP = sp(t, open, 90, 14);
  const lid = `translate(${n(lerp(0, -26, lidP), 1)} ${n(lerp(-6, -70, lidP), 1)}) rotate(${n(lerp(0, -24, lidP), 1)})`;
  const count = Math.round((easeOut(prog(t, W('s6', 11), WE('s6', 13) - W('s6', 11))) * 500) / 10) * 10;
  return `
  <div class="cstack" style="gap:1cqw">
    <svg viewBox="-80 -110 160 180" style="width:38cqw;height:auto;${pop(t, S('s6a')[0] + 0.3, 0.5)}">
      <g transform="scale(${n(easeOut(prog(t, open, 0.3)))})" opacity="${n(prog(t, open, 0.3))}"><path d="M0-80V-100M-46-64-58-78M46-64 58-78" stroke="#16142b" stroke-width="5" stroke-linecap="round"/></g>
      <rect x="-52" y="-6" width="104" height="70" rx="6" fill="#fff"/><rect x="12" y="-6" width="40" height="70" fill="#e6ebf3"/><rect x="-8" y="-6" width="16" height="70" fill="#ef4136"/>
      <g transform="${lid}"><rect x="-58" y="-10" width="116" height="20" rx="4" fill="#fff"/><rect x="-9" y="-10" width="18" height="20" fill="#d22f25"/><path d="M0-10c-8-16-30-20-30-6 0 8 16 8 30 6zM0-10c8-16 30-20 30-6 0 8-16 8-30 6z" fill="#ef4136"/></g>
    </svg>
    <div class="hand c-pen" style="font-size:9cqw;margin-top:2cqw;${write(t, open, 0.45)}">special bonus</div>
    <div class="d c-ink" style="font-size:16cqw;margin-top:3cqw;${rise(t, W('s6', 5))}">CTM™</div>
    <div class="d c-ink" style="font-size:10cqw;${rise(t, W('s6', 7))}">60-minute Masterclass</div>
    <div style="display:flex;align-items:baseline;gap:2.4cqw;margin-top:3cqw;${rise(t, W('s6', 10))}"><span class="hand c-ink" style="font-size:8cqw">worth</span><span class="d c-ink" style="font-size:20cqw;font-variant-numeric:tabular-nums">₹${count}</span></div>
    <div class="m c-ink" style="font-size:5.6cqw;margin-top:2cqw;font-weight:700;${rise(t, WE('s6', 13) + 0.2, 3)}">with the test · limited period</div>
  </div>`;
}

/* ---------- 6b · C8 (ink tint): EXPERIENCE CTM™ ---------- */
export function s6b(t: number) {
  const a = S('s6b')[0];
  return `
  <div class="cstack" style="gap:1.2cqw">
    <div class="m c-white" style="font-size:8cqw;letter-spacing:.06em;${rise(t, W('s6', 14))}">EXPERIENCE</div>
    <div class="d c-lime" style="font-size:34cqw;${pop(t, W('s6', 14) + 0.25, 0.5)}">CTM™</div>
    <div class="m c-white" style="font-size:7cqw;font-weight:700;${rise(t, a + 0.75)}">Calculation Thinking Method</div>
    <div class="hand c-lime" style="font-size:8.4cqw;margin-top:4cqw;white-space:nowrap;${write(t, W('s6', 19) - 0.3, 0.8)}">See → Process → Answer</div>
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
    <div class="d c-lime" style="font-size:22cqw;letter-spacing:-.01em;margin-top:1cqw">${digits('80623', a + 0.15)}</div>
    <div class="d c-lime" style="font-size:22cqw;letter-spacing:-.01em">${digits('65298', a + 0.45)}</div>
    <div class="m c-white" style="font-size:5.4cqw;margin-top:2.4cqw;${rise(t, a + 0.95, 3)}">send</div>
    <div class="d c-white" style="font-size:7.6cqw;${rise(t, a + 1.0, 3)}">CALCULATION EFFICIENCY TEST</div>
    <div class="m c-lime" style="font-size:5.2cqw;margin-top:1.6cqw;font-weight:700;${rise(t, a + 1.15, 3)}">Class 3 onwards · Ahmedabad · Vadodara</div>
    <div class="logo-card" style="margin-top:4cqw;${pop(t, a + 1.35, 0.85)}"><img src="${staticFile('gfg-logo.png')}" alt="Giane Future Gurukull"><div>www.gianefuturegurukull.com</div></div>
  </div>`;
}

export const OVERLAYS: Record<string, (t: number) => string> = { s1a, s1b, s2, s3a, s3b, s4a, s4b, s5, s6a, s6b, s7a, s7b };
export { clamp };
