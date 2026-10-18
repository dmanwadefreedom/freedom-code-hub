import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {EngineAd} from './EngineAd';
import {DURATION, FPS} from './brand';

const Root: React.FC = () => (
  <Composition
    id="EngineAd"
    component={EngineAd}
    durationInFrames={DURATION}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={{faceSrc: '', theme: 'dark' as const}}
  />
);

registerRoot(Root);
