import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {videoConfig as c} from './config';

const PAPER = '#F5F5F0';
const INK = '#192129';
const GREEN = '#167B73';
const GOLD = '#BF8E4E';
const MUTED = '#6E797D';
const FPS = 30;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const reveal = (frame: number, delay = 0) =>
  spring({frame: Math.max(0, frame - delay), fps: FPS, config: {damping: 21, stiffness: 110, mass: 0.9}});

const rise = (frame: number, delay = 0, offset = 60): React.CSSProperties => {
  const p = reveal(frame, delay);
  return {opacity: p, transform: 'translateY(' + (offset * (1 - p)) + 'px)'};
};

const format = (num: number) => new Intl.NumberFormat('pt-BR').format(num);

const GridBackground: React.FC = () => (
  <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'linear-gradient(rgba(22,123,115,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(22,123,115,0.055) 1px, transparent 1px)',
      backgroundSize: '86px 86px', opacity: 0.62,
    }} />
    <div style={{
      position: 'absolute', width: 980, height: 980, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(191,142,78,0.13), transparent 68%)',
      right: -400, top: -340,
    }} />
    <div style={{
      position: 'absolute', width: 990, height: 990, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(22,123,115,0.08), transparent 68%)',
      left: -470, bottom: -370,
    }} />
  </AbsoluteFill>
);

const Frame: React.FC<{children: React.ReactNode; duration: number; section: string}> = ({
  children, duration, section,
}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 12, duration - 14, duration], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{fontFamily: 'Arial, Helvetica, sans-serif', color: INK, opacity: fade}}>
      <GridBackground />
      <div style={{position: 'absolute', top: 96, left: 84, right: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{fontSize: 25, letterSpacing: 5, fontWeight: 800, color: GREEN}}>{c.brand}</span>
        <span style={{fontSize: 20, letterSpacing: 3, color: MUTED}}>{section}</span>
      </div>
      <div style={{position: 'absolute', bottom: 100, left: 84, width: 90, height: 6, background: GOLD, borderRadius: 30}} />
      <div style={{position: 'absolute', bottom: 90, right: 86, color: MUTED, letterSpacing: 3, fontSize: 19}}>
        DEMONSTRAÇÃO • VALORES FICTÍCIOS
      </div>
      {children}
    </AbsoluteFill>
  );
};

const Chip: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = GREEN}) => (
  <div style={{display: 'inline-flex', padding: '14px 22px', background: color, color: 'white', borderRadius: 100, fontSize: 24, fontWeight: 700, letterSpacing: 2}}>
    {children}
  </div>
);

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const number = interpolate(frame, [25, 110], [0, 100], clamp);
  return (
    <Frame duration={210} section="01 / ABERTURA">
      <div style={{position: 'absolute', left: 84, top: 445}} >
        <div style={rise(frame, 6)}><Chip>{c.eyebrow}</Chip></div>
        <div style={{marginTop: 55, fontWeight: 900, fontSize: 108, letterSpacing: -5, lineHeight: 1.07}}>
          <div style={rise(frame, 17)}>{c.titleLine1}</div>
          <div style={{...rise(frame, 27), color: GREEN}}>{c.titleLine2}</div>
          <div style={rise(frame, 37)}>{c.titleLine3}</div>
        </div>
        <div style={{...rise(frame, 52), marginTop: 55, fontSize: 32, lineHeight: 1.35, maxWidth: 780, color: MUTED}}>
          {c.subtitle}
        </div>
        <div style={{...rise(frame, 69), display: 'flex', alignItems: 'center', gap: 22, marginTop: 100}}>
          <div style={{height: 4, width: 180, background: GOLD}} />
          <span style={{fontSize: 28, letterSpacing: 2, fontWeight: 700}}>{Math.floor(number)}%</span>
          <span style={{fontSize: 23, color: MUTED}}>visualização em movimento</span>
        </div>
      </div>
    </Frame>
  );
};

const Person: React.FC<{active: boolean; newPerson: boolean; opacity?: number}> = ({
  active, newPerson, opacity = 1,
}) => (
  <svg viewBox="0 0 42 58" width="42" height="58" style={{opacity, overflow: 'visible'}}>
    <circle cx="21" cy="9" r="8.5" fill={active ? (newPerson ? GOLD : GREEN) : '#D8DFDD'} />
    <path d="M13 20 Q21 16 29 20 L34 39 L29 42 L26 32 L26 57 L16 57 L16 32 L13 42 L8 39 Z"
      fill={active ? (newPerson ? GOLD : GREEN) : '#D8DFDD'} />
  </svg>
);

const Crowd: React.FC = () => {
  const frame = useCurrentFrame();
  const first = c.firstValue;
  const second = c.secondValue;
  const display = Math.round(interpolate(frame, [112, 255], [first, second], clamp));
  const max = Math.max(c.maxValue, c.firstValue, c.secondValue);
  const items = Array.from({length: max}, (_, i) => i);
  const gridCols = 10;
  const rows = Math.ceil(max / gridCols);
  return (
    <Frame duration={480} section="02 / PICTOGRAMAS">
      <div style={{position: 'absolute', top: 263, left: 84, right: 84}}>
        <div style={{...rise(frame, 10), color: GREEN, fontSize: 24, fontWeight: 800, letterSpacing: 4}}>INFOGRAFIA ANIMADA</div>
        <h1 style={{...rise(frame, 21), fontSize: 80, lineHeight: 1.08, letterSpacing: -3, margin: '28px 0 10px'}}>{c.chapterTitle}</h1>
        <p style={{...rise(frame, 32), fontSize: 30, lineHeight: 1.4, color: MUTED}}>{c.chapterSubtitle}</p>
      </div>
      <div style={{position: 'absolute', top: 595, left: 85, right: 85, background: 'white', borderRadius: 34, padding: '60px 65px', boxShadow: '0 30px 90px rgba(19,35,37,0.10)', minHeight: 700}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '20px 22px', minHeight: rows * 79, justifyItems: 'center', alignItems: 'center'}}>
          {items.map((i) => {
            const show = reveal(frame, 8 + i * 0.9);
            const active = i < display;
            return <div key={i} style={{transform: 'scale(' + (0.60 + 0.4 * show) + ')'}}>
              <Person active={active} newPerson={i >= first} opacity={active ? show : 0.48} />
            </div>;
          })}
        </div>
        <div style={{marginTop: 30, borderTop: '2px solid #E8EEEA', paddingTop: 35, display: 'flex', alignItems: 'baseline', gap: 25}}>
          <span style={{fontSize: 112, color: GREEN, fontWeight: 900, letterSpacing: -5}}>{format(display)}</span>
          <span style={{fontSize: 28, color: MUTED, fontWeight: 700}}>{frame < 112 ? c.firstLabel : c.secondLabel}</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 100, right: 100, top: 1550, fontSize: 24, color: MUTED}}>
        Cada pictograma representa uma unidade nesta demonstração.
      </div>
    </Frame>
  );
};

const Bar: React.FC<{label: string; value: number; max: number; frame: number; delay: number; color: string}> = ({
  label, value, max, frame, delay, color,
}) => {
  const progress = reveal(frame, delay);
  const w = Math.min(100, Math.max(0, value / Math.max(max, 1) * 100));
  const num = Math.round(value * progress);
  return (
    <div style={{marginTop: 80}}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <span style={{fontSize: 34, color: MUTED, fontWeight: 800, letterSpacing: 4}}>{label}</span>
        <span style={{fontSize: 82, color, fontWeight: 900}}>{format(num)}</span>
      </div>
      <div style={{marginTop: 24, height: 42, background: '#E8EBE7', borderRadius: 100, overflow: 'hidden'}}>
        <div style={{height: '100%', background: color, borderRadius: 100, width: (w * progress) + '%'}} />
      </div>
    </div>
  );
};

const Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const difference = c.secondValue - c.firstValue;
  const sign = difference > 0 ? '+' : '';
  const deltaProgress = reveal(frame, 115);
  return (
    <Frame duration={450} section="03 / COMPARATIVO">
      <div style={{position: 'absolute', left: 84, right: 84, top: 315}}>
        <div style={rise(frame, 8)}><Chip>COMPARAÇÃO</Chip></div>
        <h1 style={{...rise(frame, 24), marginTop: 48, fontSize: 92, letterSpacing: -4, lineHeight: 1.1}}>{c.comparisonTitle}</h1>
        <div style={{...rise(frame, 35), marginTop: 65, background: 'white', borderRadius: 34, padding: '70px 58px 95px', boxShadow: '0 30px 90px rgba(19,35,37,0.09)'}}>
          <Bar label={c.firstLabel} value={c.firstValue} max={c.maxValue} color={INK} frame={frame} delay={40} />
          <Bar label={c.secondLabel} value={c.secondValue} max={c.maxValue} color={GREEN} frame={frame} delay={80} />
        </div>
        <div style={{...rise(frame, 125), marginTop: 80, display: 'flex', alignItems: 'center', gap: 28}}>
          <div style={{fontSize: 122, letterSpacing: -6, fontWeight: 900, color: GOLD}}>{sign + format(Math.round(Math.abs(difference) * deltaProgress))}</div>
          <span style={{color: MUTED, fontSize: 27, maxWidth: 450}}>diferença demonstrativa entre as duas etapas</span>
        </div>
      </div>
    </Frame>
  );
};

const MediaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.025 * Math.sin(frame * 0.055);
  const hasClip = Boolean(c.clipFile);
  return (
    <Frame duration={390} section="04 / MÍDIA">
      <div style={{position: 'absolute', left: 84, right: 84, top: 270}}>
        <div style={rise(frame, 7)}><Chip>SEU VÍDEO</Chip></div>
        <h1 style={{...rise(frame, 24), fontSize: 85, lineHeight: 1.1, letterSpacing: -3, marginTop: 45}}>{c.mediaTitle}</h1>
        <p style={{...rise(frame, 36), color: MUTED, fontSize: 30}}>{c.mediaSubtitle}</p>
      </div>
      <div style={{position: 'absolute', top: 740, bottom: 300, left: 85, right: 85, background: INK, borderRadius: 36, overflow: 'hidden'}}>
        {hasClip ? (
          <OffthreadVideo src={staticFile(c.clipFile)} style={{width: '100%', height: '100%', objectFit: 'cover'}} muted />
        ) : (
          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{transform: 'scale(' + pulse + ')', width: 260, height: 260, border: '3px solid rgba(255,255,255,0.2)', borderRadius: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="110" height="110" viewBox="0 0 110 110"><path d="M22 16 L95 55 L22 94 Z" fill={GOLD}/></svg>
            </div>
            <div style={{color: 'white', marginTop: 75, letterSpacing: 4, fontSize: 27, fontWeight: 800}}>INSIRA UM CLIPE EM /PUBLIC</div>
            <div style={{color: '#A9C0BC', marginTop: 18, fontSize: 23}}>Configure clipFile em src/config.ts</div>
          </div>
        )}
      </div>
    </Frame>
  );
};

const End: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Frame duration={270} section="05 / ENCERRAMENTO">
      <div style={{position: 'absolute', top: 575, left: 84, right: 84, textAlign: 'center'}}>
        <div style={{...rise(frame, 9), color: GREEN, fontSize: 27, fontWeight: 800, letterSpacing: 4}}>PRODUÇÃO AUDIOVISUAL</div>
        <h1 style={{...rise(frame, 27), marginTop: 45, color: INK, fontSize: 100, whiteSpace: 'pre-line', lineHeight: 1.1, letterSpacing: -4}}>{c.closingTitle}</h1>
        <div style={{...rise(frame, 49), margin: '60px auto', background: GOLD, width: 120, height: 7, borderRadius: 30}} />
        <p style={{...rise(frame, 60), color: MUTED, fontSize: 30, lineHeight: 1.45}}>{c.closingSubtitle}</p>
      </div>
    </Frame>
  );
};

export const MotionStudio: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Sequence from={0} durationInFrames={210}><Intro /></Sequence>
    <Sequence from={210} durationInFrames={480}><Crowd /></Sequence>
    <Sequence from={690} durationInFrames={450}><Comparison /></Sequence>
    <Sequence from={1140} durationInFrames={390}><MediaScene /></Sequence>
    <Sequence from={1530} durationInFrames={270}><End /></Sequence>
    {c.voiceFile ? <Audio src={staticFile(c.voiceFile)} /> : null}
  </AbsoluteFill>
);
