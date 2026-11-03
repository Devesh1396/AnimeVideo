import React from 'react';
import { Composition } from 'remotion';
import { Reel } from './Reel';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CETReel"
    component={Reel}
    durationInFrames={Math.round(timeline.duration * timeline.fps)}
    fps={timeline.fps}
    width={1080}
    height={1920}
  />
);
