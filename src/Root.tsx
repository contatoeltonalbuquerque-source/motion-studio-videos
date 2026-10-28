import React from 'react';
import {Composition} from 'remotion';
import {MotionStudio} from './Video';

export const Root: React.FC = () => {
  return (
    <Composition
      id="MotionStudio"
      component={MotionStudio}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
