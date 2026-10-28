import React from 'react';
import {Composition} from 'remotion';
import {MotionStudio} from './Video';
import {ProEditorial} from './ProEditorial';
import {Eleicao2026Investigativa} from './Eleicao2026Investigativa';

export const Root: React.FC = () => (
  <>
    <Composition
      id="Eleicao2026Investigativa"
      component={Eleicao2026Investigativa}
      durationInFrames={2400}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="ProEditorial"
      component={ProEditorial}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="MotionStudio"
      component={MotionStudio}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
