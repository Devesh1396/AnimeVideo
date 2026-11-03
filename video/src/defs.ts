// Shared SVG definitions: hand-drawn marks (pathLength=1 so they can be "drawn" with stroke-dashoffset),
// icons, gradients and the cast (Aarav, classmates, Mom). Same artwork as storyboard-illustrated/.
export const DEFS = `
<svg class="svgdefs" aria-hidden="true" focusable="false">
<defs>
  <symbol id="sc-circle" viewBox="0 0 200 100"><path pathLength="1" d="M150 14C92-2 20 14 11 47c-7 32 60 48 112 42 52-6 74-30 66-53-6-17-36-27-78-24" stroke-width="5"/></symbol>
  <symbol id="sc-under" viewBox="0 0 200 20"><path pathLength="1" d="M4 12C40 3 72 18 110 9s62-3 86 3" stroke-width="5"/></symbol>
  <symbol id="sc-tick" viewBox="0 0 40 40"><path pathLength="1" d="M5 22 15 33 36 5" stroke-width="5"/></symbol>
  <symbol id="sc-box" viewBox="0 0 40 40"><path pathLength="1" d="M5 6c10-2 22-1 30 0 1 9 0 21-1 29-10 1-21 0-29-1-1-10 0-20 0-28z" stroke-width="3.2"/></symbol>
  <symbol id="sc-spark" viewBox="0 0 40 40"><path d="M20 3v10M20 27v10M3 20h10M27 20h10M8 8l6 6M26 26l6 6M32 8l-6 6M14 26l-6 6" stroke-width="3.4"/></symbol>
  <symbol id="wa" viewBox="0 0 48 48"><path d="M24 3a21 21 0 0 0-18.2 31.5L3 45l10.8-2.8A21 21 0 1 0 24 3z" fill="#25d366"/><path transform="translate(12 12)" fill="#fff" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></symbol>
  <symbol id="gfg-mark" viewBox="0 0 60 60"><g fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a11 11 0 0 1 16 0"/><path d="M16.5 11.5a19 19 0 0 1 27 0"/><path d="M11 6a27 27 0 0 1 38 0"/><path d="M7 32q11-4 22 2v20q-11-6-22-2z"/><path d="M53 32q-11-4-22 2v20q11-6 22-2z"/></g><circle cx="30" cy="23" r="2.6" fill="currentColor"/></symbol>

  <radialGradient id="vio" cx=".8" cy="0" r="1.2"><stop offset="0" stop-color="#5b3cf5"/><stop offset=".55" stop-color="#3a1fd0"/><stop offset="1" stop-color="#2812a6"/></radialGradient>
  <radialGradient id="limeg" cx=".2" cy="0" r="1.2"><stop offset="0" stop-color="#dcff63"/><stop offset=".55" stop-color="#c8f23a"/><stop offset="1" stop-color="#b2dc22"/></radialGradient>
  <linearGradient id="deskfade" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity=".45"/></linearGradient>
  <linearGradient id="redfade" x1="0" y1="0" x2="0" y2="1"><stop offset=".42" stop-color="#7a0f0a" stop-opacity="0"/><stop offset=".62" stop-color="#7a0f0a" stop-opacity=".7"/></linearGradient>
  <linearGradient id="viofade" x1="0" y1="0" x2="0" y2="1"><stop offset=".38" stop-color="#2812a6" stop-opacity="0"/><stop offset=".5" stop-color="#2812a6" stop-opacity="1"/></linearGradient>

  <g id="k-body">
    <rect x="-8" y="24" width="16" height="20" fill="var(--skin-d)"/>
    <path d="M-46 125C-48 72-36 46 0 40 36 46 48 72 46 125z" fill="var(--shirt)"/>
    <path d="M-13 41 0 55 13 41" fill="none" stroke="var(--shirt-d)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-4 53h8l5 30-9 9-9-9z" fill="var(--tie)"/>
  </g>
  <g id="k-head">
    <circle cx="-32" cy="4" r="7" fill="var(--skin-d)"/><circle cx="32" cy="4" r="7" fill="var(--skin-d)"/>
    <circle r="32" fill="var(--skin)"/>
    <path d="M-34 4C-38-30-18-45 2-45 24-45 38-31 35-2 31-12 25-18 16-20 9-13-5-14-12-21-18-12-26-6-34 4z" fill="var(--hair)"/>
    <circle cx="-19" cy="14" r="5" fill="var(--cheek)" opacity=".18"/><circle cx="19" cy="14" r="5" fill="var(--cheek)" opacity=".18"/>
  </g>
  <g id="aarav-write">
    <use href="#k-body"/>
    <path d="M-38 62Q-48 96-24 110M38 62Q48 96 24 110" fill="none" stroke="var(--shirt)" stroke-width="18" stroke-linecap="round"/>
    <use href="#k-head"/>
    <path d="M-15 7q4 3 8 0M7 7q4 3 8 0M-17-5l11 1M6-4l11-1M-4 18h8" fill="none" stroke="var(--feat)" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="-22" cy="112" r="10" fill="var(--skin)"/><circle cx="24" cy="112" r="10" fill="var(--skin)"/>
    <path d="M26 110l16-22" stroke="#f5c518" stroke-width="5" stroke-linecap="round"/><path d="M42 88l3-5" stroke="var(--feat)" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g id="aarav-stressed">
    <use href="#k-body"/>
    <path d="M-38 62-54 16M38 62 54 16" stroke="var(--shirt)" stroke-width="18" stroke-linecap="round"/>
    <use href="#k-head"/>
    <path d="M-54 16-34-6M54 16 34-6" stroke="var(--skin)" stroke-width="13" stroke-linecap="round"/>
    <circle cx="-32" cy="-9" r="11" fill="var(--skin)"/><circle cx="32" cy="-9" r="11" fill="var(--skin)"/>
    <path d="M-16 3l6 3-6 3M16 3l-6 3 6 3M-18-9l10 4M18-9l-10 4M-9 19q3-3 6 0t6 0 6 0" fill="none" stroke="var(--feat)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24-30q6 9 0 12-6-3 0-12z" fill="#8fd3ff"/>
  </g>
  <g id="aarav-think">
    <use href="#k-body"/>
    <path d="M38 62 30 30" stroke="var(--shirt)" stroke-width="18" stroke-linecap="round"/>
    <use href="#k-head"/>
    <path d="M30 30 12 26" stroke="var(--skin)" stroke-width="13" stroke-linecap="round"/>
    <circle cx="9" cy="28" r="10" fill="var(--skin)"/>
    <path d="M-17-9q6-4 11 0M6-10q6-4 11 0M-7 16q6 5 12 0" fill="none" stroke="var(--feat)" stroke-width="2.6" stroke-linecap="round"/>
  </g>
  <g id="kid-back">
    <rect x="-8" y="20" width="16" height="22" fill="var(--skin-d)"/>
    <path d="M-44 125C-46 74-34 44 0 40 34 44 46 74 44 125z" fill="var(--shirt)"/>
    <circle cx="-29" cy="6" r="6" fill="var(--skin-d)"/><circle cx="29" cy="6" r="6" fill="var(--skin-d)"/>
    <circle r="30" fill="var(--hair)"/>
  </g>
  <g id="kid-back-girl">
    <use href="#kid-back"/>
    <path d="M-6 26q-4 30 6 40 10-10 6-40z" fill="var(--hair)"/>
    <path d="M-11 20 0 26-11 32zM11 20 0 26 11 32z" fill="#ef4136"/>
  </g>
  <g id="mom-worried">
    <path d="M-38 0C-42-44 42-44 38 0L42 50Q0 60-42 50z" fill="var(--hair)"/>
    <circle cx="0" cy="-38" r="14" fill="var(--hair)"/>
    <rect x="-9" y="26" width="18" height="26" fill="var(--skin-d)"/>
    <path d="M-58 170C-62 96-46 58 0 50 46 58 62 96 58 170z" fill="var(--kurta)"/>
    <path d="M-14 51q14 18 28 0z" fill="var(--skin-d)"/>
    <path d="M-52 72Q0 104 54 62L58 84Q0 128-56 96z" fill="var(--dupatta)"/>
    <path d="M-46 80Q-58 124-52 168" fill="none" stroke="var(--kurta)" stroke-width="20" stroke-linecap="round"/>
    <path d="M46 78Q40 122 20 124" fill="none" stroke="var(--kurta)" stroke-width="20" stroke-linecap="round"/>
    <circle cx="-31" cy="6" r="6" fill="var(--skin-d)"/><circle cx="31" cy="6" r="6" fill="var(--skin-d)"/>
    <circle r="31" fill="var(--skin)"/>
    <path d="M-33 2C-36-30-16-40 0-40 16-40 36-30 33 2 28-16 14-27 1-28-12-27-28-16-33 2z" fill="var(--hair)"/>
    <circle cx="-32" cy="16" r="3.6" fill="#f2b632"/><circle cx="32" cy="16" r="3.6" fill="#f2b632"/>
    <circle cx="0" cy="-12" r="2.8" fill="#ef4136"/>
    <circle cx="-11" cy="4" r="3.4" fill="var(--feat)"/><circle cx="11" cy="4" r="3.4" fill="var(--feat)"/>
    <path d="M-17-5-7-9M17-5 7-9M-7 19q7-5 14 0" fill="none" stroke="var(--feat)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M20 124Q10 82 6 42" fill="none" stroke="var(--skin)" stroke-width="13" stroke-linecap="round"/>
    <path d="M5 98l18-4M4 90l18-4" stroke="#f2b632" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="6" cy="38" r="10" fill="var(--skin)"/>
  </g>
</defs>
</svg>`;
