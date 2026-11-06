import React from 'react';
import { Composition } from 'remotion';
import { Reel } from './Reel';
import { ReelV2 } from './v2/ReelV2';
import timelineV1 from './timeline-v1.json';
import timeline from './timeline.json';

export const RemotionRoot: React.FC = () => (
  <>
    {/* v2 (current): 1080x1920, timing from timeline.json */}
    <Composition
      id="CETReelV2"
      component={ReelV2}
      durationInFrames={Math.round(timeline.duration * timeline.fps)}
      fps={timeline.fps}
      width={1080}
      height={1920}
    />
    {/* v1 (archived, 32 s) */}
    <Composition
      id="CETReel"
      component={Reel}
      durationInFrames={Math.round(timelineV1.duration * timelineV1.fps)}
      fps={timelineV1.fps}
      width={1080}
      height={1920}
    />
  </>
);
