import React, {createContext, useContext} from 'react';
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {brand, captions, demo, palettes, steps, Theme} from './brand';

const font = 'Inter, "Inter Display", system-ui, sans-serif';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const ThemeCtx = createContext<Theme>('light');
const usePal = () => palettes[useContext(ThemeCtx)];

const Panel: React.FC<{style?: React.CSSProperties; children: React.ReactNode}> = ({style, children}) => {
  const b = usePal();
  return (
    <div style={{background: b.panel, border: `2px solid ${b.panelEdge}`, borderRadius: 28, boxShadow: `0 24px 60px -30px rgba(96,48,236,.35)`, ...style}}>
      {children}
    </div>
  );
};

const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => {
  const b = usePal();
  return <div style={{fontSize: 20, letterSpacing: 4, fontWeight: 800, color: color ?? b.accent, textTransform: 'uppercase'}}>{children}</div>;
};

const ExampleTag: React.FC = () => {
  const b = usePal();
  return <div style={{position: 'absolute', right: 28, top: 26, fontSize: 18, color: b.muted, letterSpacing: 2, fontWeight: 600}}>EXAMPLE DATA</div>;
};

const Logo: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.26, background: '#6030ec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg viewBox="0 0 32 32" width={size * 0.72} height={size * 0.72} fill="none">
      <path d="M16 26C8 26 4 20 5 12c8 0 13 5 11 14Z" fill="#c7d5ff" />
      <path d="M17 25C14 13 20 5 28 4c1 10-3 18-11 21Z" fill="white" />
    </svg>
  </div>
);

const Check: React.FC<{on: number; size?: number}> = ({on, size = 34}) => {
  const b = usePal();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        flexShrink: 0,
        border: `3px solid ${on > 0.5 ? b.accent : b.panelEdge}`,
        background: on > 0.5 ? b.accent : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${1 + 0.25 * Math.sin(Math.min(on, 1) * Math.PI)})`,
      }}
    >
      {on > 0.5 && (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24">
          <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

const Typed: React.FC<{text: string; start: number; cps?: number; style?: React.CSSProperties}> = ({text, start, cps = 1.2, style}) => {
  const b = usePal();
  const f = useCurrentFrame();
  const n = Math.max(0, Math.floor((f - start) * cps));
  const caret = Math.floor(f / 8) % 2 === 0 && n < text.length + 6;
  return (
    <span style={style}>
      {text.slice(0, n)}
      <span style={{opacity: caret ? 1 : 0, color: b.accent}}>|</span>
    </span>
  );
};

const countUp = (f: number, start: number, end: number, to: number) =>
  interpolate(f, [start, end], [0, to], {...clamp, easing: Easing.out(Easing.cubic)});
const fmt = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : `${Math.round(n)}`);

// ---------- top: face card + checklist ----------

const FaceCard: React.FC<{faceSrc: string}> = ({faceSrc}) => {
  const b = usePal();
  const f = useCurrentFrame();
  const cap = [...captions].reverse().find(([s]) => f >= s);
  const capStart = cap ? cap[0] : 0;
  const pop = spring({frame: f - capStart, fps: 30, config: {damping: 12, mass: 0.5}});
  return (
    <div style={{position: 'absolute', left: 50, top: 220, width: 500, height: 640, borderRadius: 36, overflow: 'hidden', border: `6px solid ${b.frame}`, boxShadow: `0 30px 60px -20px rgba(19,17,42,.45)`}}>
      {faceSrc ? (
        <OffthreadVideo src={staticFile(faceSrc)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        <div style={{width: '100%', height: '100%', background: `linear-gradient(180deg, #d9cdfa, #b9a6f2)`, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 90, boxSizing: 'border-box', flexDirection: 'column', gap: 18}}>
          <svg width="220" height="260" viewBox="0 0 100 120">
            <circle cx="50" cy="40" r="24" fill="#8f78d8" />
            <path d="M8 120c0-26 19-42 42-42s42 16 42 42z" fill="#8f78d8" />
          </svg>
          <div style={{color: '#4e28bf', fontSize: 26, fontWeight: 800, letterSpacing: 3}}>YOUR SELFIE VIDEO</div>
        </div>
      )}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', padding: '0 20px'}}>
        <span
          style={{
            display: 'inline-block',
            fontSize: 54,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: -1,
            WebkitTextStroke: '2px rgba(19,17,42,.6)',
            textShadow: '0 4px 18px rgba(19,17,42,.6)',
            transform: `scale(${0.85 + 0.15 * pop})`,
          }}
        >
          {cap ? cap[1] : ''}
        </span>
      </div>
    </div>
  );
};

const Checklist: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const active = steps.findIndex(([, at]) => f < at);
  return (
    <Panel style={{position: 'absolute', left: 575, top: 220, width: 455, height: 640, padding: 34, boxSizing: 'border-box'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <Logo size={74} />
        <div>
          <div style={{fontSize: 14, letterSpacing: 3, color: b.accent, fontWeight: 800}}>{brand.tagline}</div>
          <div style={{fontSize: 34, fontWeight: 800, color: b.text, marginTop: 4, letterSpacing: -1}}>{brand.name}</div>
        </div>
      </div>
      <div style={{marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14}}>
        {steps.map(([label, at], i) => {
          const done = interpolate(f, [at, at + 10], [0, 1], clamp);
          const isActive = i === active;
          return (
            <div key={label} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '15px 18px', borderRadius: 16, background: isActive ? b.tagBg : 'transparent', border: `2px solid ${isActive ? b.accent : 'transparent'}`}}>
              <div style={{fontSize: 18, color: b.accent, fontWeight: 700, width: 30}}>0{i + 1}</div>
              <div style={{flex: 1, fontSize: 25, fontWeight: 650, color: isActive || done > 0.5 ? b.text : b.muted, letterSpacing: -0.5}}>{label}</div>
              <Check on={done} />
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

// ---------- bottom scenes ----------

const Stage: React.FC<{children: React.ReactNode; dur: number}> = ({children, dur}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 10, dur - 8, dur], [0, 1, 1, 0], clamp);
  const y = interpolate(f, [0, 12], [40, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{top: 920, left: 50, width: 980, height: 900, opacity: o, transform: `translateY(${y}px)`}}>
      {children}
    </AbsoluteFill>
  );
};

const SceneScout: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const nodes = ['Scout', 'Analyze', 'Publish'];
  return (
    <Panel style={{height: 520, padding: 50, position: 'relative'}}>
      <Label>Automation</Label>
      <div style={{fontSize: 52, fontWeight: 800, color: b.text, marginTop: 14, letterSpacing: -1.5}}>Competitor Intelligence</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 70}}>
        {nodes.map((n, i) => {
          const s = spring({frame: f - 12 - i * 14, fps: 30, config: {damping: 14}});
          const lit = f > 30 + i * 18;
          return (
            <React.Fragment key={n}>
              <div style={{transform: `scale(${s})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                <div style={{width: 150, height: 150, borderRadius: 34, border: `3px solid ${lit ? b.accent : b.panelEdge}`, background: lit ? b.tagBg : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: lit ? `0 0 40px rgba(96,48,236,.35)` : 'none'}}>
                  <div style={{width: 46, height: 46, borderRadius: 12, border: `4px solid ${lit ? b.accent : b.muted}`}} />
                </div>
                <div style={{fontSize: 28, fontWeight: 700, color: lit ? b.text : b.muted}}>{n}</div>
              </div>
              {i < 2 && (
                <div style={{flex: 1, height: 4, margin: '0 18px 46px', background: `linear-gradient(90deg, ${b.accent} ${interpolate(f, [24 + i * 18, 40 + i * 18], [0, 100], clamp)}%, ${b.panelEdge} 0)`}} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Panel>
  );
};

const SceneRadar: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const angle = f * 5;
  const n = Math.round(countUp(f, 5, 70, 48));
  const dots = [[0.3, 40], [0.55, 110], [0.75, 200], [0.45, 250], [0.85, 300], [0.65, 330], [0.35, 160], [0.9, 70]];
  return (
    <div style={{display: 'flex', gap: 30}}>
      <div style={{width: 470, height: 470, borderRadius: 470, position: 'relative', border: `2px solid ${b.panelEdge}`, background: `radial-gradient(circle, ${b.tagBg}, transparent 70%)`, overflow: 'hidden', flexShrink: 0}}>
        {[0.33, 0.66].map((r) => (
          <div key={r} style={{position: 'absolute', inset: `${(1 - r) * 50}%`, borderRadius: 999, border: `2px solid ${b.panelEdge}`}} />
        ))}
        <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${angle}deg, rgba(96,48,236,.4), transparent 60deg)`, borderRadius: 999}} />
        {dots.map(([r, a], i) => {
          const rad = (a * Math.PI) / 180;
          const vis = f > 6 + i * 7;
          return (
            <div key={i} style={{position: 'absolute', width: 18, height: 18, borderRadius: 18, left: 235 + Math.cos(rad) * r * 220 - 9, top: 235 + Math.sin(rad) * r * 220 - 9, background: i % 3 === 0 ? b.hot : b.accent, opacity: vis ? 1 : 0, boxShadow: `0 0 16px ${b.accent}`}} />
          );
        })}
        <div style={{position: 'absolute', left: 203, top: 203}}>
          <Logo size={64} />
        </div>
      </div>
      <Panel style={{flex: 1, padding: 34, position: 'relative'}}>
        <Label>Top accounts found</Label>
        <div style={{fontSize: 130, fontWeight: 900, color: b.accent, lineHeight: 1.05, letterSpacing: -4}}>{n}</div>
        <div style={{fontSize: 22, color: b.muted}}>in your space</div>
        <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14}}>
          {demo.competitors.map((h, i) => (
            <div key={h} style={{opacity: interpolate(f, [30 + i * 10, 40 + i * 10], [0, 1], clamp), display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: b.soft}}>
              <div style={{width: 34, height: 34, borderRadius: 34, background: i === 1 ? b.hot : b.accent}} />
              <div style={{fontSize: 22, color: b.text, fontWeight: 600}}>{h}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
};

const SceneWorking: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const cards = [[2.4e6, '+278%'], [1.2e6, '+152%'], [864e3, '+155%']] as const;
  return (
    <div style={{position: 'relative'}}>
      <div style={{textAlign: 'center', marginBottom: 26}}>
        <span style={{fontSize: 22, fontWeight: 800, letterSpacing: 4, color: '#fff', background: b.accent, padding: '10px 22px', borderRadius: 40}}>● WORKING RIGHT NOW</span>
      </div>
      <div style={{display: 'flex', gap: 26}}>
        {cards.map(([v, pct], i) => {
          const s = spring({frame: f - i * 8, fps: 30, config: {damping: 14}});
          return (
            <Panel key={i} style={{flex: 1, height: 560, position: 'relative', overflow: 'hidden', transform: `translateY(${(1 - s) * 80}px)`, opacity: s}}>
              <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(96,48,236,.55), ${b.panel} 85%)`}} />
              <div style={{position: 'absolute', top: 22, left: 22, fontSize: 18, fontWeight: 800, color: '#fff', background: b.accentDeep, padding: '6px 12px', borderRadius: 10}}>#{i + 1} TOP</div>
              <div style={{position: 'absolute', top: 210, left: '50%', marginLeft: -40, width: 80, height: 80, borderRadius: 80, background: 'rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: '28px solid #fff', marginLeft: 8}} />
              </div>
              <div style={{position: 'absolute', bottom: 34, left: 24}}>
                <div style={{fontSize: 52, fontWeight: 900, color: b.text, letterSpacing: -2}}>{fmt(countUp(f, 6, 70, v))}</div>
                <div style={{fontSize: 22, color: b.accent, fontWeight: 700}}>views {pct}</div>
              </div>
            </Panel>
          );
        })}
      </div>
      <div style={{textAlign: 'center', marginTop: 18, fontSize: 18, color: b.muted, letterSpacing: 2}}>EXAMPLE DATA</div>
    </div>
  );
};

const SceneBreakdown: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const segs = [['HOOK', 0.18, b.accent], ['PROBLEM', 0.3, b.accentDeep], ['PROOF', 0.32, '#9a7bff'], ['CTA', 0.2, b.hot]] as const;
  const row = (title: string, at: number, child: React.ReactNode) => (
    <Panel style={{padding: '24px 30px', opacity: interpolate(f, [at, at + 10], [0.35, 1], clamp), borderColor: f > at ? b.accent : b.panelEdge}}>
      <Label>{title}</Label>
      <div style={{marginTop: 14}}>{child}</div>
    </Panel>
  );
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 22, position: 'relative'}}>
      {row('01 The hook', 0, <Typed text={demo.hook} start={8} style={{fontSize: 36, fontWeight: 800, color: b.text, letterSpacing: -1}} />)}
      {row(
        '02 The pattern',
        55,
        <div style={{display: 'flex', gap: 8, height: 54}}>
          {segs.map(([t, w, c], i) => (
            <div key={t} style={{flex: w, borderRadius: 10, background: c, opacity: interpolate(f, [60 + i * 6, 70 + i * 6], [0, 1], clamp), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff'}}>
              {t}
            </div>
          ))}
        </div>,
      )}
      {row(
        '03 Why it worked',
        85,
        <div style={{display: 'flex', gap: 20}}>
          {[['71%', 'watched to end'], ['x4.2', 'shares vs avg'], ['+380%', 'comments']].map(([v, l], i) => (
            <div key={l} style={{flex: 1, padding: '18px 20px', borderRadius: 16, background: b.soft, opacity: interpolate(f, [90 + i * 8, 100 + i * 8], [0, 1], clamp)}}>
              <div style={{fontSize: 46, fontWeight: 900, color: b.accent, letterSpacing: -1}}>{v}</div>
              <div style={{fontSize: 20, color: b.muted}}>{l}</div>
            </div>
          ))}
        </div>,
      )}
      <div style={{textAlign: 'right', fontSize: 18, color: b.muted, letterSpacing: 2}}>EXAMPLE DATA</div>
    </div>
  );
};

const SceneGuessing: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const typed = 'What do I post today... maybe a tre';
  const n = f < 40 ? Math.floor(f * 1.1) : Math.max(0, typed.length - Math.floor((f - 40) * 2));
  const qs = [[80, 120, 90], [820, 90, 70], [150, 520, 60], [860, 470, 80], [460, 600, 50]];
  return (
    <div style={{position: 'relative', height: 760}}>
      <div style={{textAlign: 'center', fontSize: 88, fontWeight: 900, color: b.text, lineHeight: 1.05, letterSpacing: -3}}>Guessing what<br />to post?</div>
      {qs.map(([x, y, s], i) => (
        <div key={i} style={{position: 'absolute', left: x, top: y + 140 + Math.sin((f + i * 20) / 9) * 14, fontSize: s, fontWeight: 900, color: i % 2 ? b.hot : b.accent, transform: `rotate(${(i % 2 ? -1 : 1) * 14}deg)`}}>?</div>
      ))}
      <Panel style={{position: 'absolute', left: 170, right: 170, top: 330, padding: 30}}>
        <div style={{fontSize: 22, color: b.muted, fontWeight: 700}}>New post</div>
        <div style={{fontSize: 32, color: b.text, marginTop: 14, minHeight: 44}}>
          {typed.slice(0, n)}
          <span style={{color: b.accent, opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>|</span>
        </div>
      </Panel>
    </div>
  );
};

const SceneProven: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  return (
    <Panel style={{padding: 40, position: 'relative'}}>
      <Label color={b.muted}>Your next posts</Label>
      <div style={{fontSize: 50, fontWeight: 800, color: b.text, marginTop: 8, marginBottom: 26, letterSpacing: -1.5}}>Already proven to work</div>
      {demo.proven.map(([t, s], i) => {
        const o = spring({frame: f - i * 7, fps: 30, config: {damping: 15}});
        return (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '20px 4px', borderTop: i ? `2px solid ${b.panelEdge}` : 'none', opacity: o, transform: `translateX(${(1 - o) * 60}px)`}}>
            <div style={{width: 74, height: 74, borderRadius: 16, background: `linear-gradient(135deg, ${b.accentDeep}, ${b.accent})`}} />
            <div style={{flex: 1, fontSize: 30, color: b.text, fontWeight: 650}}>{t}</div>
            <div style={{fontSize: 46, fontWeight: 900, color: b.accent}}>{Math.round(countUp(f, i * 7, i * 7 + 25, s))}</div>
            <Check on={interpolate(f, [i * 7 + 22, i * 7 + 30], [0, 1], clamp)} size={40} />
          </div>
        );
      })}
      <ExampleTag />
    </Panel>
  );
};

const SceneCurve: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 55], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const path = 'M 0 300 C 200 290, 380 230, 520 160 S 780 40, 880 20';
  const len = 1100;
  return (
    <Panel style={{padding: 40}}>
      <Label color={b.muted}>Trend radar</Label>
      <div style={{fontSize: 52, fontWeight: 800, color: b.text, marginTop: 8, letterSpacing: -1.5}}>
        Know what works <span style={{color: b.accent}}>first</span>
      </div>
      <svg width="880" height="340" viewBox="-10 -10 900 340" style={{marginTop: 30}}>
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={b.accent} stopOpacity=".35" />
            <stop offset="1" stopColor={b.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L 880 320 L 0 320 Z`} fill="url(#g)" opacity={p} />
        <path d={path} fill="none" stroke={b.accent} strokeWidth="7" strokeDasharray={len} strokeDashoffset={len * (1 - p)} strokeLinecap="round" />
        <circle cx="140" cy="290" r={14 * p} fill={b.panel} stroke={b.accent} strokeWidth="6" />
        <g opacity={p}>
          <rect x="100" y="210" width="80" height="44" rx="22" fill={b.accent} />
          <text x="140" y="240" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff" fontFamily={font}>YOU</text>
        </g>
      </svg>
    </Panel>
  );
};

const ScenePlan: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const showScript = f > 50;
  return (
    <Panel style={{padding: 40, height: 560, position: 'relative'}}>
      {!showScript ? (
        <>
          <Label color={b.muted}>This week</Label>
          <div style={{fontSize: 50, fontWeight: 800, color: b.text, marginTop: 8, marginBottom: 24, letterSpacing: -1.5}}>What to record</div>
          {demo.record.map((t, i) => (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '18px 0', opacity: interpolate(f, [i * 8, i * 8 + 10], [0, 1], clamp)}}>
              <div style={{fontSize: 20, fontWeight: 800, color: '#fff', background: b.accent, borderRadius: 10, padding: '6px 12px'}}>{['MON', 'WED', 'FRI'][i]}</div>
              <div style={{fontSize: 32, color: b.text, fontWeight: 650}}>{t}</div>
            </div>
          ))}
        </>
      ) : (
        <>
          <Label color={b.muted}>Script</Label>
          <div style={{fontSize: 50, fontWeight: 800, color: b.text, marginTop: 8, marginBottom: 24, letterSpacing: -1.5}}>What to say</div>
          <Typed text={demo.script} start={55} cps={1.6} style={{fontSize: 36, lineHeight: 1.4, color: b.text}} />
        </>
      )}
    </Panel>
  );
};

const SceneEdit: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const head = interpolate(f, [0, 95], [0, 100], clamp);
  const tasks = ['Cuts and pacing', 'Captions', 'Zooms and b-roll', 'Sound design'];
  const clips = [[0, 14], [16, 12], [30, 20], [52, 10], [64, 18], [84, 14]];
  return (
    <Panel style={{padding: 40}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{fontSize: 40, fontWeight: 800, color: b.text, letterSpacing: -1}}>Auto-Edit</div>
        <div style={{fontSize: 22, color: b.accent, fontWeight: 800}}>{Math.round(head)}%</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24}}>
        {tasks.map((t, i) => (
          <div key={t} style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <Check on={interpolate(head, [18 + i * 20, 22 + i * 20], [0, 1], clamp)} />
            <div style={{fontSize: 28, color: b.text, fontWeight: 600}}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{position: 'relative', marginTop: 36, height: 150}}>
        {[0, 1].map((r) => (
          <div key={r} style={{position: 'absolute', top: r * 76, left: 0, right: 0, height: 56}}>
            {clips.map(([x, w], i) => (
              <div key={i} style={{position: 'absolute', left: `${x}%`, width: `${w}%`, height: '100%', borderRadius: 10, background: r ? b.accentDeep : b.accent, opacity: head > x ? 1 : 0.25}} />
            ))}
          </div>
        ))}
        <div style={{position: 'absolute', top: -14, bottom: -14, left: `${head}%`, width: 5, background: b.text, boxShadow: `0 0 18px ${b.text}`}} />
      </div>
      <div style={{marginTop: 26, fontSize: 24, color: head >= 100 ? b.accent : b.muted, fontWeight: 800, letterSpacing: 2}}>
        {head >= 100 ? 'FINAL CUT EXPORTED ✓' : 'EDITING...'}
      </div>
    </Panel>
  );
};

const ScenePost: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const nets: [string, number, number][] = [['TikTok', 120, 330], ['Instagram', 490, 330], ['YouTube', 860, 330], ['LinkedIn', 280, 520], ['Facebook', 700, 520]];
  const cta = spring({frame: f - 50, fps: 30, config: {damping: 12}});
  return (
    <div style={{position: 'relative', height: 820}}>
      <svg width="980" height="600" style={{position: 'absolute', inset: 0}}>
        {nets.map(([, x, y], i) => {
          const p = interpolate(f, [6 + i * 5, 22 + i * 5], [0, 1], clamp);
          return <line key={i} x1="490" y1="200" x2={490 + (x - 490) * p} y2={200 + (y - 200) * p} stroke={b.accent} strokeWidth="4" opacity=".7" />;
        })}
      </svg>
      <Panel style={{position: 'absolute', left: 420, top: 30, width: 140, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: b.accentDeep, borderColor: b.accentDeep}}>
        <div style={{width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderLeft: '34px solid #fff', marginLeft: 8}} />
      </Panel>
      {nets.map(([n, x, y], i) => {
        const s = spring({frame: f - 18 - i * 5, fps: 30, config: {damping: 13}});
        return (
          <div key={n} style={{position: 'absolute', left: x - 115, top: y - 34, width: 230, transform: `scale(${s})`}}>
            <Panel style={{padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 40}}>
              <div style={{fontSize: 26, color: b.text, fontWeight: 700}}>{n}</div>
              <Check on={interpolate(f, [30 + i * 5, 36 + i * 5], [0, 1], clamp)} size={30} />
            </Panel>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center', transform: `scale(${cta})`}}>
        <span style={{display: 'inline-block', fontSize: 40, fontWeight: 800, color: '#fff', background: b.accent, padding: '24px 50px', borderRadius: 16, boxShadow: `0 20px 50px -14px rgba(96,48,236,.6)`}}>{brand.cta} →</span>
        <div style={{marginTop: 18, fontSize: 24, color: b.text, fontWeight: 700}}>{brand.ctaSub}</div>
        <div style={{marginTop: 8, fontSize: 22, color: b.muted, letterSpacing: 4, fontWeight: 800}}>{brand.site}</div>
      </div>
    </div>
  );
};

const Intro: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 12}});
  const o = interpolate(f, [22, 30], [1, 0], clamp);
  return (
    <AbsoluteFill style={{top: 970, height: 520, alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <div style={{transform: `scale(${s}) rotate(${(1 - s) * -90}deg)`}}>
        <Logo size={240} />
      </div>
      <div style={{marginTop: 30, fontSize: 30, letterSpacing: 8, color: b.accent, fontWeight: 800}}>CONTENT ENGINE</div>
    </AbsoluteFill>
  );
};

// [from, duration, scene]
const scenes: [number, number, React.FC][] = [
  [30, 62, SceneScout],
  [92, 92, SceneRadar],
  [184, 88, SceneWorking],
  [272, 128, SceneBreakdown],
  [400, 70, SceneGuessing],
  [470, 50, SceneProven],
  [520, 80, SceneCurve],
  [600, 100, ScenePlan],
  [700, 110, SceneEdit],
  [810, 90, ScenePost],
];

export const EngineAd: React.FC<{faceSrc: string; theme: Theme}> = ({faceSrc, theme}) => {
  const b = palettes[theme];
  const f = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(f / 40);
  return (
    <ThemeCtx.Provider value={theme}>
      <AbsoluteFill style={{background: b.bg, fontFamily: font}}>
        <AbsoluteFill style={{background: `radial-gradient(900px 700px at 50% 0%, rgba(96,48,236,${0.10 + 0.06 * glow}), transparent 70%), radial-gradient(800px 600px at 50% 100%, rgba(96,48,236,.14), transparent 70%)`}} />
        <AbsoluteFill style={{backgroundImage: `linear-gradient(rgba(96,48,236,.05) 2px, transparent 2px), linear-gradient(90deg, rgba(96,48,236,.05) 2px, transparent 2px)`, backgroundSize: '60px 60px'}} />
        <FaceCard faceSrc={faceSrc} />
        <Checklist />
        <Sequence durationInFrames={30}>
          <Intro />
        </Sequence>
        {scenes.map(([from, dur, Scene]) => (
          <Sequence key={from} from={from} durationInFrames={dur}>
            <Stage dur={dur}>
              <Scene />
            </Stage>
          </Sequence>
        ))}
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};
