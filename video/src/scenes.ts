// Scene builders: each returns the HTML for one scene at global time t (seconds).
// Layout mirrors storyboard-illustrated/index.html; animation follows its Motion notes.
import { staticFile } from 'remotion';
import { TL, W, clamp, draw, easeOut, fadeIn, lerp, pop, prog, rise, show, slam, write, backOut } from './anim';

const GWR = () => staticFile('gwr-logo.png');
const tick = (style = '') => `<svg class="mark ok" viewBox="0 0 40 40" style="${style}"><use href="#sc-tick"/></svg>`;
const n = (x: number, d = 2) => x.toFixed(d);

/* ---------------- S1 ---------------- */
export function s1a(t: number) {
  const cam = 1 + 0.035 * prog(t, 0, 1.3);
  const cA = prog(t, W('s1', 0), 0.42);
  const cB = prog(t, W('s1', 1), 0.38);
  const armP = easeOut(prog(t, 0.72, 0.22));
  const ang = lerp(160, 0, armP);
  const bob = (i: number) => n(Math.sin(t * 3 + i) * 1.6);
  const kid = (href: string, x: number, y: number, s: number, i: number, hair = '') =>
    `<g ${hair ? `style="--hair:${hair}"` : ''} transform="translate(${x} ${y + Number(bob(i))}) scale(${s})"><use href="#${href}"/></g>`;
  return `
  <svg class="ill pal-n" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="transform:scale(${n(cam, 4)});transform-origin:50% 40%">
    <defs>
      <clipPath id="c1a"><rect x="40" y="96" width="${n(260 * cA)}" height="70"/></clipPath>
      <clipPath id="c1b"><rect x="40" y="180" width="${n(250 * cB)}" height="110"/></clipPath>
    </defs>
    <rect width="360" height="640" fill="#ebe6f7"/>
    <rect x="0" y="60" width="360" height="8" fill="#ddd5f0"/>
    <rect x="22" y="78" width="316" height="240" rx="12" fill="#8a5a3c"/>
    <rect x="31" y="87" width="298" height="222" rx="6" fill="#22324a"/>
    <path d="M60 280q60-10 120 4M210 120q40-6 90 2" stroke="#fff" stroke-opacity=".06" stroke-width="18" stroke-linecap="round"/>
    <text clip-path="url(#c1a)" x="52" y="150" font-family="Kalam" font-weight="700" font-size="40" fill="#fff" fill-opacity=".92">Concepts?</text>
    <text clip-path="url(#c1b)" x="48" y="266" font-family="Kalam" font-weight="700" font-size="90" fill="#c8f23a">Clear.</text>
    <path pathLength="1" d="M286 226l12 14 26-38" fill="none" stroke="#c8f23a" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" style="${draw(t, W('s1', 2) + 0.12, 0.18)}"/>
    <rect x="44" y="309" width="272" height="9" rx="2" fill="#6e4630"/><rect x="250" y="303" width="22" height="6" rx="2" fill="#fff"/>
    <rect y="430" width="360" height="210" fill="#d6cdee"/>
    ${kid('kid-back', 60, 392, 0.6, 0, '#2b2238')}${kid('kid-back-girl', 140, 392, 0.6, 1)}${kid('kid-back', 222, 392, 0.6, 2, '#3a2a24')}${kid('kid-back-girl', 306, 392, 0.6, 3)}
    ${kid('kid-back-girl', 30, 478, 0.85, 4)}
    <g transform="translate(140 ${478 + Number(bob(5))}) scale(.85)">
      <g transform="rotate(${n(ang)} 34 60)"><path d="M34 60 46 2" stroke="var(--shirt)" stroke-width="17" stroke-linecap="round"/></g>
      <use href="#kid-back"/>
      <g transform="rotate(${n(ang)} 34 60)"><path d="M46 2 50-46" stroke="var(--skin)" stroke-width="12" stroke-linecap="round"/><circle cx="50" cy="-52" r="10" fill="var(--skin)"/></g>
    </g>
    ${kid('kid-back', 250, 478, 0.85, 6, '#2b2238')}${kid('kid-back', 350, 478, 0.85, 7)}
    ${kid('kid-back', 84, 590, 1.15, 8, '#3a2a24')}${kid('kid-back-girl', 280, 590, 1.15, 9)}
  </svg>`;
}

export function s1b(t: number) {
  const a = TL.scenes.s1b[0];
  const pin = easeOut(prog(t, a, 0.28));
  const zoom = lerp(1.18, 1, pin);
  const m1 = a + 0.2, m2 = a + 0.35, m3 = a + 0.5, m4 = a + 0.66;
  const ans = (atT: number, wrong: string, right: string) =>
    t >= atT ? `<s>${wrong}</s> <em style="${pop(t, atT, 0.25, 0.5)};display:inline-block">${right}</em>` : wrong;
  const x = (atT: number) => `<span class="x" style="${pop(t, atT, 0.25, 0.2)}">✗</span>`;
  return `
  <div class="layer" style="transform:scale(${n(zoom, 4)});opacity:${n(clamp(pin * 3), 3)}">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="#7a4e2e"/>
      <path d="M0 120h360M0 260h360M0 400h360M0 540h360" stroke="#6a4226" stroke-width="3"/>
      <path d="M40 60q80 10 160-4M120 200q90 8 200-6M30 330q100 12 180 0M150 470q80 8 190-4" stroke="#8a5a36" stroke-width="2" fill="none"/>
      <g transform="translate(262 556) rotate(-32)"><rect x="-80" y="-7" width="140" height="14" fill="#f5c518"/><rect x="-80" y="-7" width="140" height="4" fill="#ffe066"/><path d="M60-7 84 0 60 7z" fill="#e9c9a0"/><path d="M76-2.5 84 0 76 2.5z" fill="#16142b"/><rect x="-98" y="-7" width="18" height="14" rx="3" fill="#f19aa6"/><rect x="-84" y="-7" width="6" height="14" fill="#c0c4cc"/></g>
      <g transform="translate(70 600) rotate(12)"><rect x="-26" y="-12" width="52" height="24" rx="4" fill="#fff"/><rect x="-26" y="-12" width="22" height="24" rx="4" fill="#3a8be0"/></g>
      <rect width="360" height="640" fill="url(#deskfade)"/>
    </svg>
    <div class="exam" style="transform:translateY(${n((1 - pin) * 60)}cqw) rotate(-2.5deg)">
      <div class="ex-h"><div><div class="ex-t">MATHS · UNIT TEST</div><div class="ex-n">Name: <span class="hand c-ball">Aarav</span> &nbsp; Class: <span class="hand c-ball">4-B</span></div></div>
        <div class="ex-s rel" style="${fadeIn(t, m4, 0.15)}">12<span style="font-size:.6em">/20</span><svg class="mark c-pen" viewBox="0 0 200 100" style="left:-30%;top:-25%;width:160%;height:150%;${draw(t, m4, 0.25)}"><use href="#sc-circle"/></svg></div></div>
      <div class="ex-q"><span class="qn">1.</span><span class="qa">48 + 37 = 85</span>${tick(draw(t, m1, 0.15))}</div>
      <div class="ex-q"><span class="qn">2.</span><span class="qa">7 × 8 = ${ans(m2, '54', '56')}</span>${x(m2)}</div>
      <div class="ex-q"><span class="qn">3.</span><span class="qa">125 − 68 = ${ans(m3, '67', '57')}</span>${x(m3)}</div>
      <div class="ex-q"><span class="qn">4.</span><span class="qa">36 ÷ 4 = ${ans(m4, '8', '9')}</span>${x(m4)}</div>
      <div class="hand c-pen" style="font-size:6.4cqw;transform:rotate(-4deg);margin-top:1.6cqw;${write(t, m4 + 0.12, 0.3)}">Careless mistakes!</div>
    </div>
    <div style="position:absolute;left:9%;right:12%;top:58%;display:grid;gap:.6cqw">
      <div class="m c-white" style="font-size:7.5cqw;${rise(t, W('s1', 4) - 0.05, 0.25)}">Still making</div>
      <div class="d c-pen" style="font-size:21cqw;transform-origin:left bottom;${slam(t, W('s1', 5), 0.2)}">silly</div>
      <div class="d c-white" style="font-size:15cqw;${rise(t, W('s1', 6), 0.25)}">mistakes?</div>
    </div>
  </div>`;
}

/* ---------------- S2 ---------------- */
export function s2a(t: number) {
  const a = TL.scenes.s2a[0];
  const items = [
    ['rush through sums?', W('s2', 0)],
    ['lose focus?', W('s2', 1)],
    ['forget formulas?', W('s2', 3)],
    ['slip while solving?', W('s2', 5) + 0.55],
  ] as const;
  const ang = (t - a) * 520;
  const speed = t > W('s2', 0) && t < W('s2', 1) ? 1 : 0;
  const bubble = pop(t, W('s2', 1) + 0.05, 0.35, 0.1);
  const q = t >= W('s2', 3) ? `<text x="200" y="${n(360 - 18 * easeOut(prog(t, W('s2', 3), 0.6)))}" font-family="Kalam" font-weight="700" font-size="44" fill="#c8f23a" opacity="${n(clamp((t - W('s2', 3)) * 4), 2)}">?</text>` : '';
  const xmark = t >= items[3][1] ? `<text x="168" y="586" font-family="Kalam" font-weight="700" font-size="34" fill="#ef4136" opacity="${n(clamp((t - items[3][1]) * 5), 2)}">✗</text>` : '';
  const bob = n(Math.sin(t * 9) * (speed ? 1.6 : 0.5));
  return `
  <div class="layer">
    <svg class="ill pal-n" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="#2b2752"/>
      <g fill="#fff" opacity=".05"><circle cx="40" cy="40" r="3"/><circle cx="120" cy="80" r="3"/><circle cx="220" cy="40" r="3"/><circle cx="310" cy="90" r="3"/><circle cx="70" cy="160" r="3"/><circle cx="270" cy="170" r="3"/></g>
      <path d="M40 640 70 360h44l30 280z" fill="#fff7c2" opacity=".08"/>
      <g transform="translate(286 360)"><circle r="28" fill="#f7f5ef" stroke="#16142b" stroke-width="4"/>
        <path d="M0 0V-18" stroke="#16142b" stroke-width="4" stroke-linecap="round" transform="rotate(${n(ang / 12)})"/>
        <path d="M0 0V-22" stroke="#ef4136" stroke-width="3" stroke-linecap="round" transform="rotate(${n(ang)})"/>
        <path d="M-38-10a40 40 0 0 1 20-28M38 10a40 40 0 0 1-20 28" fill="none" stroke="#c8f23a" stroke-width="4" stroke-linecap="round" opacity="${speed ? 1 : 0.35}"/></g>
      <g transform="translate(92 372)"><g style="${bubble};transform-box:fill-box;transform-origin:30px 40px"><circle cx="34" cy="44" r="5" fill="#fff" opacity=".7"/><circle cx="24" cy="30" r="8" fill="#fff" opacity=".8"/><circle r="24" fill="#fff"/><g transform="rotate(${n((t - a) * 200)})"><circle r="13" fill="#fff" stroke="#16142b" stroke-width="3"/><path d="M0-5 5-1 3 5h-6l-2-6z" fill="#16142b"/></g></g></g>
      <g transform="translate(180 ${440 + Number(bob)})"><use href="#aarav-write"/></g>
      ${q}
      <rect x="0" y="546" width="360" height="94" fill="#8a5a3c"/><rect x="0" y="546" width="360" height="10" fill="#a8703f"/>
      <path d="M120 556h90l-6 30h-90z" fill="#fff"/>
      ${xmark}
      <path d="M222 520l14-6M226 534l16-4M220 506l12-8" stroke="#c8f23a" stroke-width="3.5" stroke-linecap="round" opacity="${speed ? (Math.floor(t * 12) % 2 ? 1 : 0.4) : 0}"/>
      <g transform="translate(64 504)"><path d="M0 42h36" stroke="#16142b" stroke-width="6" stroke-linecap="round"/><path d="M18 42 6 6" stroke="#16142b" stroke-width="4"/><path d="M-10 10 22-2 30 18z" fill="#c8f23a"/></g>
    </svg>
    <div class="stack" style="bottom:52%;gap:3cqw">
      <div class="hand c-white" style="font-size:8.5cqw;${write(t, a + 0.05, 0.35)}">Does your child…</div>
      ${items
        .map(
          ([label, at], i) => `
      <div class="check" style="${rise(t, at - 0.18, 0.25, 4)}"><span class="box"><svg viewBox="0 0 40 40" style="stroke:#fff"><use href="#sc-box"/></svg><svg viewBox="0 0 40 40" style="stroke:var(--lime);inset:-25% -10% 10% 10%;${draw(t, at + 0.12, 0.18)}"><use href="#sc-tick"/></svg></span><span class="d c-white" style="font-size:10cqw">${label}</span></div>`
        )
        .join('')}
    </div>
  </div>`;
}

export function s2b(t: number) {
  const a = TL.scenes.s2b[0];
  const push = easeOut(prog(t, a, 0.35));
  const shake = t > a + 0.15 && t < a + 0.8 ? Math.sin(t * 40) * 2.2 * (1 - prog(t, a + 0.15, 0.65)) : 0;
  const hlP = easeOut(prog(t, W('s2', 9) - 0.02, 0.25));
  return `
  <div class="layer" style="opacity:${n(clamp(push * 3), 3)}">
    <svg class="ill pal-n" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="transform:scale(${n(lerp(1.12, 1, push), 4)})">
      <rect width="360" height="640" fill="#2b2752"/>
      <g transform="rotate(${n((t - a) * 25)} 168 104)"><path pathLength="1" d="M128 92c10-30 66-36 76-8 8 24-48 30-42 6 6-20 62-24 70 6 6 22-38 34-54 16-14-18 18-38 42-26" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9" style="${draw(t, a + 0.2, 0.55)}"/></g>
      <g transform="translate(180 205) rotate(${n(shake)}) scale(1.4)"><use href="#aarav-stressed"/></g>
      <rect x="0" y="350" width="360" height="290" fill="#3b2f5c"/><rect x="0" y="350" width="360" height="10" fill="#4b3d72"/>
      <g transform="translate(58 604)"><circle r="20" fill="#f7f5ef"/><path d="M-12-6 4 2-6 10M6-12l2 14 8-6" fill="none" stroke="#c9c4d8" stroke-width="2.5"/></g>
      <g transform="translate(304 610)"><circle r="16" fill="#f7f5ef"/><path d="M-8-6 6 0-4 8" fill="none" stroke="#c9c4d8" stroke-width="2.5"/></g>
    </svg>
    <div class="stack end" style="gap:1.4cqw">
      <div class="m c-white" style="font-size:8cqw;${rise(t, W('s2', 6), 0.3)}">These are just</div>
      <div class="d c-white" style="font-size:24cqw;${rise(t, W('s2', 8), 0.3)}">the <span class="hl c-ink" style="background-size:${n(hlP * 100, 1)}% 46%">signs.</span></div>
      <div class="hand c-lime" style="font-size:7.6cqw;margin-top:1.6cqw;${write(t, W('s2', 10) + 0.15, 0.4)}">not the real reason ↓</div>
    </div>
  </div>`;
}

/* ---------------- S3 ---------------- */
export function s3a(t: number) {
  const ats = [W('s3', 0), W('s3', 1) + 0.05, W('s3', 2) + 0.05, W('s3', 3)];
  const op = [1, 0.72, 0.46, 0.24];
  const sheets = [0, 1, 2, 3, 4]
    .map((i) => {
      const at = (ats[Math.min(i, 3)] ?? ats[3]) + (i === 4 ? 0.3 : 0);
      if (t < at) return '';
      const p = easeOut(prog(t, at, 0.22));
      const fill = i % 2 ? '#fff' : '#ffe4e0';
      const wob = Math.sin(t * 7 + i) * 2 * (1 - prog(t, W('s3', 6), 0.3));
      return `<rect x="${-56 + (i % 2) * 4}" y="${-14 - i * 16}" width="112" height="16" fill="${fill}" transform="translate(0 ${n((1 - p) * -60)}) rotate(${n(wob)})" opacity="${n(p, 3)}"/>`;
    })
    .join('');
  return `
  <div class="layer f-pen">
    <div class="grain"></div>
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice"><g transform="translate(270 590) rotate(-6)">${sheets}</g></svg>
    <div class="stack" style="gap:.6cqw">
      ${ats.map((at, i) => `<div class="d c-white" style="font-size:15cqw;${rise(t, at, 0.22, 4)};${t >= at ? `opacity:${op[i]}` : ''}">more practice</div>`).join('')}
      <div class="d c-ink" style="font-size:19cqw;margin-top:3cqw;transform-origin:left;${slam(t, W('s3', 6), 0.2)}">≠ fewer</div>
      <div class="d c-ink" style="font-size:19cqw;transform-origin:left;${slam(t, W('s3', 7), 0.2)}">mistakes</div>
    </div>
  </div>`;
}

export function s3b(t: number) {
  const a = TL.scenes.s3b[0];
  const up = easeOut(prog(t, a, 0.28));
  return `
  <div class="layer" style="transform:translateY(${n((1 - up) * 100)}%)">
    <svg class="ill pal-r" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="#ef4136"/>
      <rect x="200" y="96" width="110" height="80" rx="6" fill="#f25a4f"/><path d="M255 96v80M200 136h110" stroke="#ef4136" stroke-width="6"/>
      <g transform="translate(262 236) scale(.85)"><use href="#aarav-write"/></g>
      <rect x="176" y="326" width="184" height="314" fill="#b51f16"/><rect x="176" y="326" width="184" height="10" fill="#c92a20"/>
      <g transform="translate(110 ${n(178 + Math.sin(t * 2) * 1.5)}) scale(1.15)"><use href="#mom-worried"/></g>
      <rect width="360" height="640" fill="url(#redfade)"/>
    </svg>
    <div class="stack end">
      <div class="hand c-white" style="font-size:10cqw;transform:rotate(-4deg);transform-origin:left;${write(t, a + 0.08, 0.3)}">Parents,</div>
      <div class="d c-white" style="font-size:28cqw;transform-origin:left bottom;${slam(t, a + 0.35, 0.2)}">don't</div>
      <div><span class="d c-white rel" style="font-size:22cqw;transform-origin:left bottom;${slam(t, a + 0.55, 0.2)}">assume.<svg class="mark c-lime" viewBox="0 0 200 20" preserveAspectRatio="none" style="left:0;bottom:-3.5cqw;width:100%;height:5cqw;${draw(t, a + 0.7, 0.25)}"><use href="#sc-under"/></svg></span></div>
    </div>
  </div>`;
}

/* ---------------- S4 ---------------- */
export function s4a(t: number) {
  const a = TL.scenes.s4a[0];
  const rev = easeOut(prog(t, a, 0.38));
  const gx = lerp(-60, 30, easeOut(prog(t, a, 2.4)));
  const gy = Math.sin((t - a) * 2.4) * 8;
  return `
  <div class="layer" style="clip-path:circle(${n(rev * 120, 1)}% at 50% 40%)">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="url(#vio)"/>
      <g transform="translate(160 176) rotate(-8)"><rect x="-86" y="-60" width="172" height="120" rx="8" fill="#efeaff"/><rect x="-66" y="-36" width="70" height="8" rx="4" fill="#a797ff"/><rect x="-66" y="-14" width="110" height="8" rx="4" fill="#c9bfff"/><rect x="-66" y="8" width="96" height="8" rx="4" fill="#c9bfff"/><rect x="-66" y="30" width="120" height="8" rx="4" fill="#c9bfff"/><path d="M44-40l6 6 12-14" fill="none" stroke="#ef4136" stroke-width="4" stroke-linecap="round"/></g>
      <g transform="translate(${n(gx)} ${n(gy)})">
        <circle cx="222" cy="178" r="54" fill="#c8f23a" fill-opacity=".16" stroke="#c8f23a" stroke-width="10"/>
        <path d="M262 218 300 256" stroke="#c8f23a" stroke-width="18" stroke-linecap="round"/>
        <text x="204" y="200" font-family="Kalam" font-weight="700" font-size="60" fill="#fff">?</text>
      </g>
    </svg>
    <div class="stack end">
      <div class="hand c-white" style="font-size:9cqw;${write(t, W('s4', 0), 0.35)}">That's why…</div>
      <div><span class="d c-lime rel" style="font-size:40cqw;letter-spacing:-.04em;transform-origin:30% 70%;${pop(t, W('s4', 1), 0.45, 0.2)}">FREE<svg class="mark c-white" viewBox="0 0 40 40" style="right:-9cqw;top:-2cqw;width:9cqw;height:9cqw;transform:rotate(${n((t - a) * 90)}deg) scale(${n(clamp((t - W('s4', 1) - 0.15) * 4), 2)})"><use href="#sc-spark"/></svg></span></div>
      <div class="d c-white" style="font-size:12.5cqw;margin-top:1.5cqw;${rise(t, W('s4', 2), 0.3)}">Calculation</div>
      <div class="d c-white" style="font-size:12.5cqw;${rise(t, W('s4', 3), 0.3)}">Efficiency Test</div>
    </div>
  </div>`;
}

export function s4b(t: number) {
  const a = TL.scenes.s4b[0];
  const leaves = [
    [-62, 30, -30], [-72, 4, -10], [-70, -24, 12], [-56, -48, 36], [62, 30, 30], [72, 4, 10], [70, -24, -12], [56, -48, -36],
  ]
    .map(([x, y, r], i) => {
      const s = backOut(prog(t, a + 0.05 + (i % 4) * 0.07, 0.25));
      return `<ellipse cx="${x}" cy="${y}" rx="9" ry="16" transform="rotate(${r} ${x} ${y}) translate(${x} ${y}) scale(${n(clamp(s, 0, 1.3), 3)}) translate(${-x} ${-y})"/>`;
    })
    .join('');
  const boltOn = t >= a + 0.45 && (t > a + 0.75 || Math.floor(t * 24) % 2 === 0);
  const brain = backOut(prog(t, a, 0.35));
  return `
  <div class="layer">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="url(#vio)"/>
      <g transform="translate(180 168)">
        <g fill="#c8f23a">${leaves}</g>
        <g transform="scale(${n(clamp(brain, 0, 1.3), 3)})">
          <path d="M-4-44c-14-12-40-6-42 12-16 4-18 26-6 34-4 18 14 30 28 22 8 10 20 8 20-2zM4-44c14-12 40-6 42 12 16 4 18 26 6 34 4 18-14 30-28 22-8 10-20 8-20-2z" fill="#efeaff"/>
          <path d="M-24-26q10 6 4 18M-34 4q12-2 16 10M24-26q-10 6-4 18M34 4q-12-2-16 10M0-44v66" fill="none" stroke="#a797ff" stroke-width="4" stroke-linecap="round"/>
          <path d="M6-30-8 0h12L-4 28" fill="none" stroke="#3a1fd0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="${boltOn ? 1 : 0.15}"/>
        </g>
      </g>
    </svg>
    <div class="stack end">
      <div class="hand c-lime" style="font-size:9cqw;${write(t, W('s4', 8) - 0.35, 0.3)}">designed by</div>
      <div class="d c-white" style="font-size:24cqw;${rise(t, W('s4', 8), 0.3)}">Deveshh</div>
      <div class="d c-white" style="font-size:24cqw;${rise(t, W('s4', 9), 0.3)}">Sir</div>
      <div class="gwr" style="${rise(t, W('s4', 5) + 0.05, 0.35, 4)}"><img src="${GWR()}" style="transform:rotate(${n(lerp(-200, 0, easeOut(prog(t, W('s4', 5) + 0.05, 0.5))))}deg)"><div><div class="m c-white" style="font-size:6.2cqw;font-weight:700">Guinness World<br>Record Holder</div><div class="hand c-lime" style="font-size:6cqw;margin-top:.8cqw">in Memory</div></div></div>
    </div>
  </div>`;
}

export function s4c(t: number) {
  const a = TL.scenes.s4c[0];
  const on = t >= W('s4', 14);
  const rays = easeOut(prog(t, W('s4', 14), 0.3));
  const up = easeOut(prog(t, a, 0.35));
  const blink = (t > a + 1.2 && t < a + 1.3) || (t > a + 2.6 && t < a + 2.7);
  const smile = prog(t, W('s4', 19), 0.3);
  return `
  <div class="layer">
    <svg class="ill pal-v" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="url(#vio)"/>
      <g transform="translate(262 112)">
        <path d="M-24 0a24 24 0 1 1 48 0c0 10-8 16-10 26h-28c-2-10-10-16-10-26z" fill="${on ? '#c8f23a' : '#6b5fd6'}"/>
        <rect x="-12" y="30" width="24" height="10" rx="3" fill="#efeaff"/>
        <g transform="scale(${n(rays, 3)})" opacity="${n(rays, 3)}"><path d="M-40-30-30-22M40-30 30-22M0-46v-12M-46 0h-12M46 0h12" stroke="#c8f23a" stroke-width="5" stroke-linecap="round"/></g>
      </g>
      <g transform="translate(170 ${n(168 + (1 - up) * 80)}) rotate(${n(Math.sin(t * 1.6) * 2.5)}) scale(1.05)">
        <use href="#aarav-think"/>
        ${blink ? '<path d="M-14 2h10M8 2h10" stroke="var(--feat)" stroke-width="2.6" stroke-linecap="round"/>' : '<circle cx="-9" cy="2" r="3.6" fill="var(--feat)"/><circle cx="13" cy="2" r="3.6" fill="var(--feat)"/>'}
        ${smile > 0 ? `<path d="M-9 15q8 ${n(4 + 4 * smile)} 16 0" fill="none" stroke="var(--feat)" stroke-width="2.6" stroke-linecap="round" opacity="${n(smile, 2)}"/>` : ''}
      </g>
      <rect width="360" height="640" fill="url(#viofade)"/>
    </svg>
    <div class="stack end" style="gap:1cqw">
      <div class="hand c-white" style="font-size:8.5cqw;${write(t, W('s4', 12), 0.3)}">Find out</div>
      <div class="d c-lime" style="font-size:22cqw;transform-origin:left;${pop(t, W('s4', 14), 0.4, 0.3)}">WHY</div>
      <div class="m c-white" style="font-size:5.8cqw;${rise(t, W('s4', 15), 0.3, 3)}">mistakes keep happening</div>
      <div class="d c-white" style="font-size:22cqw;margin-top:2cqw;transform-origin:left;${pop(t, W('s4', 19), 0.4, 0.3)}">WHAT</div>
      <div class="m c-lime" style="font-size:5.8cqw;${rise(t, W('s4', 20), 0.3, 3)}">to fix first</div>
    </div>
  </div>`;
}

/* ---------------- S5 ---------------- */
export function s5a(t: number) {
  const a = TL.scenes.s5a[0];
  const sw = easeOut(prog(t, a, 0.3));
  const open = W('s5', 2);
  const shake = t < open && t > a + 0.1 ? Math.sin(t * 50) * 6 : 0;
  const lidP = easeOut(prog(t, open, 0.45));
  const lid = t < open ? 'translate(0 -6) rotate(0)' : `translate(${n(lerp(0, -40, lidP))} ${n(lerp(-6, -96, lidP))}) rotate(${n(lerp(0, -38, lidP))})`;
  const rays = easeOut(prog(t, open, 0.3));
  const conf = t >= open
    ? [[-80, -60, '#3a1fd0'], [80, -70, '#3a1fd0'], [70, -30, '#ef4136'], [-90, -20, '#ef4136'], [20, -110, '#16142b'], [-30, -120, '#ef4136']]
        .map(([dx, dy, c], i) => {
          const p = prog(t, open, 1.4);
          const x = (dx as number) * easeOut(p);
          const y = (dy as number) * easeOut(p) + 120 * p * p;
          return `<rect x="${n(x - 3)}" y="${n(y - 7)}" width="7" height="14" rx="2" fill="${c}" transform="rotate(${n(i * 40 + t * 200)} ${n(x)} ${n(y)})" opacity="${n(1 - p * 0.6, 2)}"/>`;
        })
        .join('')
    : '';
  const count = Math.round((easeOut(prog(t, W('s5', 3), 0.5)) * 500) / 10) * 10;
  return `
  <div class="layer" style="clip-path:inset(0 ${n((1 - sw) * 100, 1)}% 0 0)">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill="url(#limeg)"/>
      <g transform="translate(180 150) scale(.92) rotate(${n(shake)})">
        <g transform="scale(${n(rays, 3)})" opacity="${n(rays, 3)}"><path d="M0-70V-96M-50-56-66-74M50-56 66-74M-74-24h-24M74-24h24" stroke="#16142b" stroke-width="5" stroke-linecap="round"/></g>
        <rect x="-52" y="-6" width="104" height="70" rx="6" fill="#fff"/><rect x="12" y="-6" width="40" height="70" fill="#e6ebf3"/><rect x="-8" y="-6" width="16" height="70" fill="#ef4136"/>
        <g transform="${lid}"><rect x="-58" y="-10" width="116" height="20" rx="4" fill="#fff"/><rect x="-9" y="-10" width="18" height="20" fill="#d22f25"/><path d="M0-10c-8-16-30-20-30-6 0 8 16 8 30 6zM0-10c8-16 30-20 30-6 0 8-16 8-30 6z" fill="#ef4136"/></g>
        ${conf}
      </g>
    </svg>
    <div class="stack end" style="gap:1cqw">
      <div class="hand c-pen" style="font-size:7.4cqw;white-space:nowrap;${write(t, open, 0.35)}">+ a bonus for your child</div>
      <div class="d c-ink" style="font-size:13cqw;margin-top:1cqw;${rise(t, W('s5', 7), 0.3)}">CTM™ Masterclass</div>
      <div style="display:flex;align-items:flex-end;gap:2cqw;margin-top:1cqw;${rise(t, W('s5', 3) - 0.05, 0.25)}"><span class="hand c-ink" style="font-size:8cqw;padding-bottom:3cqw">worth</span><span class="d c-ink" style="font-size:26cqw;font-variant-numeric:tabular-nums">₹${count}</span></div>
      <span class="stampline" style="margin-top:2cqw;${slam(t, W('s5', 10) + 0.25, 0.18, 1.8)};transform:${t >= W('s5', 10) + 0.25 ? `scale(${n(lerp(1.8, 1, easeOut(prog(t, W('s5', 10) + 0.25, 0.18))), 3)}) rotate(-4deg)` : 'scale(1.8) rotate(-4deg)'}">Free with the test</span>
      <div class="m c-ink" style="font-size:6cqw;margin-top:1.5cqw;${rise(t, W('s5', 11), 0.3, 3)}">for a limited period only</div>
    </div>
  </div>`;
}

export function s5b(t: number) {
  const a = TL.scenes.s5b[0];
  const drop = (at: number) => `transform:translateY(${n((1 - easeOut(prog(t, at, 0.3))) * -30)}cqw);opacity:${n(clamp((t - at) * 5), 2)}`;
  return `
  <div class="layer f-ink">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">
      <g style="${drop(a + 0.05)}"><g transform="translate(110 170)">
        <rect x="-56" y="-44" width="112" height="88" rx="6" fill="none" stroke="#c88a5a" stroke-width="8"/>
        <path d="M-50-22h100M-50 0h100M-50 22h100" stroke="#8a7f9e" stroke-width="3"/>
        <g fill="#c8f23a"><circle cx="-36" cy="-22" r="7"/><circle cx="-22" cy="-22" r="7"/><circle cx="20" cy="-22" r="7"/></g>
        <g fill="#5b3cf5"><circle cx="-30" cy="0" r="7"/><circle cx="14" cy="0" r="7"/><circle cx="28" cy="0" r="7"/></g>
        <g fill="#fff"><circle cx="-38" cy="22" r="7"/><circle cx="-24" cy="22" r="7"/><circle cx="-10" cy="22" r="7"/><circle cx="34" cy="22" r="7"/></g>
        <path pathLength="1" d="M-64-52 64 52" stroke="#ef4136" stroke-width="9" stroke-linecap="round" style="${draw(t, a + 0.3, 0.12)}"/>
        <path pathLength="1" d="M64-52-64 52" stroke="#ef4136" stroke-width="9" stroke-linecap="round" style="${draw(t, a + 0.42, 0.12)}"/>
      </g></g>
      <g style="${drop(a + 0.2)}"><g transform="translate(256 170)">
        <rect x="-40" y="-40" width="80" height="80" fill="#f3e6c4"/>
        <rect x="-48" y="-48" width="96" height="14" rx="7" fill="#e0cc98"/><rect x="-48" y="34" width="96" height="14" rx="7" fill="#e0cc98"/>
        <path d="M-26-18h52M-26-4h40M-26 10h48M-26 24h30" stroke="#b39a62" stroke-width="4" stroke-linecap="round"/>
        <path pathLength="1" d="M-56-56 56 56" stroke="#ef4136" stroke-width="9" stroke-linecap="round" style="${draw(t, a + 0.5, 0.12)}"/>
        <path pathLength="1" d="M56-56-56 56" stroke="#ef4136" stroke-width="9" stroke-linecap="round" style="${draw(t, a + 0.62, 0.12)}"/>
      </g></g>
    </svg>
    <div class="stack end" style="gap:1.2cqw">
      <div class="d c-white" style="font-size:13cqw;${rise(t, a + 0.1, 0.25)}">No abacus.</div>
      <div class="d c-white" style="font-size:13cqw;${rise(t, a + 0.3, 0.25)}">No Vedic sutras.</div>
      <div class="d c-lime" style="font-size:15.5cqw;margin-top:4cqw;${rise(t, a + 0.7, 0.3)}">A different</div>
      <div class="d c-lime" style="font-size:15.5cqw;${rise(t, a + 0.8, 0.3)}">way to think.</div>
      <div class="hand c-white" style="font-size:6.4cqw;margin-top:3cqw;white-space:nowrap;${write(t, a + 0.95, 0.4)}">See → Process → Answer</div>
    </div>
  </div>`;
}

/* ---------------- S6 ---------------- */
const MSG = 'CALCULATION EFFICIENCY TEST';
export function s6a(t: number) {
  const a = TL.scenes.s6a[0];
  const up = easeOut(prog(t, a, 0.35));
  const typeA = a + 0.35, typeB = a + 1.05, sent = a + 1.1;
  const typed = MSG.slice(0, Math.floor(MSG.length * prog(t, typeA, typeB - typeA)));
  const input = t < sent ? (typed ? `<span>${typed}<b style="opacity:${Math.floor(t * 4) % 2}">|</b></span>` : '<span class="ph">Message</span>') : '<span class="ph">Message</span>';
  const ticks = t >= sent + 0.2 ? '<b style="color:#53bdeb;font-weight:700">✓✓</b>' : '✓';
  const outB = t >= sent ? `<div class="bub out" style="${pop(t, sent, 0.25, 0.6)};transform-origin:right bottom">${MSG}<small>10:24 ${ticks}</small></div>` : '';
  const inB = t >= sent + 0.35 ? `<div class="bub in" style="${rise(t, sent + 0.35, 0.25, 3)}">Thank you! Here are the available test dates…<small style="text-align:left">10:24</small></div>` : '';
  const thumb = t > typeA && t < sent ? Math.sin(t * 40) * 4 : 0;
  return `
  <div class="layer f-ink">
    <div class="hand c-lime" style="position:absolute;left:9%;top:14%;font-size:8.5cqw;${write(t, a + 0.05, 0.35)}">Just send this ↓</div>
    <div style="position:absolute;inset:0;transform:translateY(${n((1 - up) * 60)}cqw)">
      <div class="phone">
        <div class="ph-top"><span class="av"><svg viewBox="0 0 60 60" style="width:80%;height:80%"><use href="#gfg-mark" width="60" height="60"/></svg></span><div>Giane Future Gurukull<small>online</small></div></div>
        <div class="ph-body">${outB}${inB}</div>
        <div class="ph-in">${input}<i style="${t >= sent && t < sent + 0.15 ? 'transform:scale(.85)' : ''}">➤</i></div>
      </div>
      <svg class="ill pal-n" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="z-index:2">
        <path d="M150 640 166 500h86l-6 140z" fill="var(--skin)"/>
        <path d="M162 548h90M160 566h92M158 584h94" stroke="#f2b632" stroke-width="7" stroke-linecap="round"/>
        <path d="M160 557h92" stroke="#ef4136" stroke-width="5" stroke-linecap="round"/>
        <g fill="var(--skin)"><rect x="40" y="420" width="24" height="18" rx="9"/><rect x="38" y="444" width="26" height="18" rx="9"/><rect x="40" y="468" width="24" height="18" rx="9"/></g>
        <rect x="286" y="${n(404 + thumb)}" width="22" height="46" rx="11" fill="var(--skin)" transform="rotate(-14 297 427)"/>
      </svg>
    </div>
  </div>`;
}

export function s6b(t: number) {
  const a = TL.scenes.s6b[0];
  const digits = (s: string, start: number) =>
    s
      .split('')
      .map((ch, i) => {
        const at = start + i * 0.05;
        const p = easeOut(prog(t, at, 0.22));
        return `<span class="ib" style="opacity:${n(clamp(p * 2), 2)};transform:translateY(${n((1 - p) * -8)}cqw)">${ch}</span>`;
      })
      .join('');
  const conf = [[300, 110, '#c8f23a', 25], [40, 96, '#c8f23a', -20], [320, 200, '#5b3cf5', 0], [26, 250, '#5b3cf5', 0], [290, 330, '#ef4136', 40]]
    .map(([x, y, c, r], i) => {
      const yy = (y as number) + Math.sin(t * 1.5 + i) * 6;
      return i === 2 || i === 3
        ? `<circle cx="${x}" cy="${n(yy)}" r="5" fill="${c}"/>`
        : `<rect x="${x}" y="${n(yy)}" width="8" height="16" rx="2" fill="${c}" transform="rotate(${n((r as number) + t * 30)} ${x} ${n(yy)})"/>`;
    })
    .join('');
  return `
  <div class="layer f-ink">
    <svg class="ill" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" style="opacity:${n(clamp((t - a - 0.4) * 3), 2)}">${conf}</svg>
    <div class="stack" style="gap:1cqw">
      <div style="display:flex;align-items:center;gap:2.4cqw;${rise(t, a, 0.3)}"><svg viewBox="0 0 48 48" style="width:10cqw;height:10cqw"><use href="#wa" width="48" height="48"/></svg><span class="d c-white" style="font-size:11cqw">WhatsApp</span></div>
      <div class="d c-lime" style="font-size:31cqw;margin-top:2cqw;letter-spacing:-.01em">${digits('80623', a + 0.08)}</div>
      <div class="d c-lime" style="font-size:31cqw;letter-spacing:-.01em">${digits('65298', a + 0.33)}</div>
      <div class="hand c-white" style="font-size:6.5cqw;margin-top:3cqw;${write(t, a + 0.6, 0.25)}">send</div>
      <div style="${rise(t, a + 0.7, 0.3, 3)}"><span class="d c-white rel" style="font-size:7.4cqw">CALCULATION EFFICIENCY TEST<svg class="mark c-lime" viewBox="0 0 200 20" preserveAspectRatio="none" style="left:0;bottom:-2.2cqw;width:100%;height:3cqw;${draw(t, a + 0.85, 0.3)}"><use href="#sc-under"/></svg></span></div>
      <div class="m c-white" style="font-size:5.4cqw;margin-top:3.4cqw;${rise(t, a + 0.95, 0.3, 3)};${t >= a + 0.95 ? 'opacity:.85' : ''}">→ get your <b>free</b> test date &amp; time</div>
      <div class="m c-lime" style="font-size:5cqw;${rise(t, a + 1.05, 0.3, 3)}">Class 3+ · Ahmedabad · Vadodara</div>
      <div class="gfg c-white" style="margin-top:4cqw;${rise(t, a + 1.2, 0.3, 3)}"><svg viewBox="0 0 60 60"><use href="#gfg-mark" width="60" height="60"/></svg><div><b>Giane Future Gurukull</b><span>www.gianefuturegurukull.com</span></div></div>
    </div>
  </div>`;
}

export const SCENES: [keyof typeof TL.scenes, (t: number) => string][] = [
  ['s1a', s1a], ['s1b', s1b], ['s2a', s2a], ['s2b', s2b], ['s3a', s3a], ['s3b', s3b],
  ['s4a', s4a], ['s4b', s4b], ['s4c', s4c], ['s5a', s5a], ['s5b', s5b], ['s6a', s6a], ['s6b', s6b],
];
/** How long a scene stays under the next one while the next one transitions in. */
export const TAIL: Partial<Record<keyof typeof TL.scenes, number>> = {
  s1a: 0.3, s2a: 0.35, s3a: 0.3, s3b: 0.4, s4c: 0.32,
};
export { show };
