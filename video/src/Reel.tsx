import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import './styles.css';
import { DEFS } from './defs';
import { SCENES, TAIL } from './scenes';
import { TL } from './anim';
import faces from '../public/fonts/faces.json';

type Face = { family: string; file: string; weight: string; stretch: string; unicodeRange: string };

function useFonts() {
  const [handle] = useState(() => delayRender('Loading fonts'));
  useEffect(() => {
    Promise.all(
      (faces as Face[]).map((f) => {
        const ff = new FontFace(f.family, `url(${staticFile(`fonts/${f.file}`)}) format('woff2')`, {
          weight: f.weight,
          stretch: f.stretch,
          unicodeRange: f.unicodeRange,
          display: 'block',
        });
        (document.fonts as unknown as { add: (f: FontFace) => void }).add(ff);
        return ff.load();
      })
    )
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
}

export const Reel: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const html = SCENES.filter(([key]) => {
    const [a, b] = TL.scenes[key];
    return t >= a && t < b + (TAIL[key] ?? 0);
  })
    .map(([, fn]) => fn(t))
    .join('');
  return (
    <AbsoluteFill style={{ backgroundColor: '#16142b' }}>
      <div className="frame" dangerouslySetInnerHTML={{ __html: DEFS + html }} />
      <Audio src={staticFile('audio/mix.wav')} />
    </AbsoluteFill>
  );
};
