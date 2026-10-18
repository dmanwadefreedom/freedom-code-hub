import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {brand, captions, demo, palettes, steps, Theme} from './brand';

// Geometry is the reference ad's, scaled from 720x1280 to 1080x1920 (x1.5).
const font = 'Inter, "Inter Display", system-ui, sans-serif';
const mono = '"DejaVu Sans Mono", "Liberation Mono", ui-monospace, monospace';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = {...clamp, easing: Easing.out(Easing.cubic)};

const ThemeCtx = createContext<Theme>('dark');
const usePal = () => palettes[useContext(ThemeCtx)];
const sp = (f: number, delay = 0, damping = 16) => spring({frame: f - delay, fps: 30, config: {damping, mass: 0.6}});

// ---------- atoms ----------

const Card: React.FC<{style?: React.CSSProperties; children?: React.ReactNode; active?: boolean}> = ({style, children, active}) => {
  const b = usePal();
  return (
    <div style={{background: b.panel, border: `1.5px solid ${active ? b.accent : b.panelEdge}`, borderRadius: 24, boxSizing: 'border-box', position: 'relative', ...style}}>{children}</div>
  );
};

const Mono: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties}> = ({children, color, size = 15, style}) => {
  const b = usePal();
  return <div style={{fontFamily: mono, fontSize: size, letterSpacing: 3, color: color ?? b.muted, textTransform: 'uppercase', ...style}}>{children}</div>;
};

const Title: React.FC<{children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({children, size = 42, style}) => {
  const b = usePal();
  return <div style={{fontSize: size, fontWeight: 700, color: b.text, letterSpacing: -1.2, lineHeight: 1.15, ...style}}>{children}</div>;
};

const Pill: React.FC<{children: React.ReactNode; dot?: string; style?: React.CSSProperties}> = ({children, dot, style}) => {
  const b = usePal();
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 30, border: `1.5px solid ${b.panelEdge}`, background: b.panel2, fontFamily: mono, fontSize: 13, letterSpacing: 2, color: b.text, textTransform: 'uppercase', ...style}}>
      {dot && <span style={{width: 8, height: 8, borderRadius: 8, background: dot}} />}
      {children}
    </div>
  );
};

const Check: React.FC<{on: number; size?: number}> = ({on, size = 26}) => {
  const b = usePal();
  if (on <= 0) return <div style={{width: size, height: size}} />;
  return (
    <div style={{width: size, height: size, borderRadius: size, background: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${Math.min(1, on) * (1 + 0.3 * Math.sin(Math.min(on, 1) * Math.PI))})`}}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
        <path d="M4 12.5l5 5L20 6.5" fill="none" stroke={b.bg} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const Skeleton: React.FC<{w: string; h?: number; style?: React.CSSProperties}> = ({w, h = 12, style}) => {
  const b = usePal();
  return <div style={{width: w, height: h, borderRadius: h, background: b.skeleton, ...style}} />;
};

const Typed: React.FC<{text: string; start: number; cps?: number; style?: React.CSSProperties; caret?: boolean}> = ({text, start, cps = 1.4, style, caret = true}) => {
  const b = usePal();
  const f = useCurrentFrame();
  const n = Math.max(0, Math.floor((f - start) * cps));
  const show = caret && Math.floor(f / 8) % 2 === 0 && n < text.length + 8;
  return (
    <span style={style}>
      {text.slice(0, n)}
      <span style={{opacity: show ? 1 : 0, color: b.text, fontWeight: 300}}>|</span>
    </span>
  );
};

const Logo: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size, background: '#6030ec', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 30px rgba(96,48,236,.45)'}}>
    <svg viewBox="0 0 32 32" width={size * 0.66} height={size * 0.66} fill="none">
      <path d="M16 26C8 26 4 20 5 12c8 0 13 5 11 14Z" fill="#c7d5ff" />
      <path d="M17 25C14 13 20 5 28 4c1 10-3 18-11 21Z" fill="white" />
    </svg>
  </div>
);

const Silhouette: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 120, style}) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 100 110" style={style}>
    <circle cx="50" cy="36" r="24" fill="rgba(0,0,0,.45)" />
    <path d="M6 110c0-26 20-42 44-42s44 16 44 42z" fill="rgba(0,0,0,.45)" />
  </svg>
);

const PhoneThumb: React.FC<{w: number; h: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({w, h, children, style}) => {
  const b = usePal();
  void b;
  return (
    <div style={{width: w, height: h, borderRadius: 22, overflow: 'hidden', position: 'relative', border: `1.5px solid ${b.panelEdge}`, background: `linear-gradient(180deg, ${b.accentDeep}99 0%, ${b.hot}55 35%, ${b.panel} 80%)`, ...style}}>
      <Silhouette size={w * 0.55} style={{position: 'absolute', left: w * 0.22, top: h * 0.42}} />
      <div style={{position: 'absolute', left: w / 2 - 20, top: h * 0.3, width: 40, height: 40, borderRadius: 40, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '13px solid #fff', marginLeft: 4}} />
      </div>
      {children}
    </div>
  );
};

const countUp = (f: number, start: number, end: number, to: number) => interpolate(f, [start, end], [0, to], ease);
const fmt = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : `${Math.round(n)}`);

// ---------- top row ----------

const FaceCard: React.FC<{faceSrc: string}> = ({faceSrc}) => {
  const b = usePal();
  const f = useCurrentFrame();
  const cap = [...captions].reverse().find(([s]) => f >= s);
  const capStart = cap ? cap[0] : 0;
  const pop = sp(f, capStart, 11);
  return (
    <div style={{position: 'absolute', left: 63, top: 210, width: 380, height: 503, borderRadius: 24, overflow: 'hidden', border: `2px solid ${b.accent}`, boxShadow: `0 0 70px ${b.glowTop}, 0 0 28px rgba(157,123,255,.35)`, background: '#1a1626'}}>
      {faceSrc ? (
        <OffthreadVideo src={staticFile(faceSrc)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : (
        <div style={{width: '100%', height: '100%', background: 'linear-gradient(180deg, #2a2340, #15111f)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Silhouette size={220} style={{opacity: 0.9}} />
        </div>
      )}
      <div style={{position: 'absolute', right: 14, top: 14, width: 28, height: 28, borderRadius: 28, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
        {[8, 14, 8].map((h, i) => (
          <div key={i} style={{width: 3, height: h, borderRadius: 3, background: '#fff'}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 44, textAlign: 'center', padding: '0 10px'}}>
        <span style={{display: 'inline-block', fontFamily: '"Inter Display", Inter, sans-serif', fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: -2.5, textShadow: '0 2px 14px rgba(0,0,0,.8), 0 0 2px rgba(0,0,0,.9)', transform: `scale(${0.9 + 0.1 * pop})`, maxWidth: 360}}>
          {cap ? cap[1] : ''}
        </span>
      </div>
      <div style={{position: 'absolute', left: 14, bottom: 14, fontSize: 14, fontWeight: 600, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.8)'}}>{brand.speaker}</div>
    </div>
  );
};

const Checklist: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const active = steps.findIndex(([, at]) => f < at);
  const panelIn = interpolate(f, [2, 10], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 465, top: 210, width: 465, height: 503, borderRadius: 24, background: b.panel, border: `1.5px solid ${b.panelEdge}`, padding: '26px 26px', boxSizing: 'border-box', opacity: panelIn}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <Logo size={88} />
        <div>
          <Mono color={b.accent} size={13}>{brand.name}</Mono>
          <div style={{fontSize: 31, fontWeight: 700, color: b.text, letterSpacing: -1, marginTop: 2}}>{brand.product}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 6, marginTop: 2}}>
            <span style={{width: 7, height: 7, borderRadius: 7, background: b.accent}} />
            <Mono color={b.accent} size={11} style={{letterSpacing: 1.5}}>{brand.status}</Mono>
          </div>
        </div>
      </div>
      <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', gap: 4}}>
        {steps.map(([label, at], i) => {
          const done = interpolate(f, [at, at + 10], [0, 1], clamp);
          const isActive = i === active;
          const rowIn = interpolate(f, [12 + i * 4, 20 + i * 4], [0, 1], clamp);
          const lit = isActive || done > 0.5;
          return (
            <div key={label} style={{display: 'flex', alignItems: 'center', gap: 14, height: 60, padding: '0 14px', borderRadius: 12, opacity: rowIn, background: isActive ? 'rgba(157,123,255,.08)' : 'transparent', border: `1.5px solid ${isActive ? b.accent : 'transparent'}`, boxSizing: 'border-box'}}>
              <div style={{fontFamily: mono, fontSize: 13, color: isActive ? b.accent : b.dim, width: 26}}>0{i + 1}</div>
              <div style={{flex: 1, fontSize: 21, fontWeight: lit ? 600 : 500, color: lit ? b.text : b.muted}}>{label}</div>
              <Check on={done} size={24} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------- stage ----------

const Stage: React.FC<{children: React.ReactNode; dur: number; x?: number; w?: number}> = ({children, dur, x = 60, w = 960}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8, dur - 6, dur], [0, 1, 1, 0], clamp);
  const s = interpolate(f, [0, 12], [0.97, 1], ease);
  return (
    <AbsoluteFill style={{top: 772, left: x, width: w, height: 560, opacity: o, transform: `scale(${s})`, transformOrigin: '50% 0%'}}>{children}</AbsoluteFill>
  );
};

const Chrome: React.FC<{path: string; pill: React.ReactNode}> = ({path, pill}) => {
  const b = usePal();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '14px 22px', borderBottom: `1.5px solid ${b.panelEdge}`}}>
      {['#ff5f57', '#febc2e', b.dim].map((c, i) => (
        <span key={i} style={{width: 11, height: 11, borderRadius: 11, background: c}} />
      ))}
      <div style={{fontFamily: mono, fontSize: 14, color: b.muted, marginLeft: 12, letterSpacing: 0.5}}>{path}</div>
      <div style={{marginLeft: 'auto'}}>{pill}</div>
    </div>
  );
};

// 1. Competitor Intelligence
const SceneScout: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const click = 36;
  const nodes = [['Scout', 'M10 2a8 8 0 1 0 5.3 14l5 5 1.4-1.4-5-5A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z'], ['Analyze', 'M3 20h18v2H3zM5 10h3v8H5zm5-6h3v14h-3zm5 3h3v11h-3z'], ['Publish', 'M12 3l6 6-1.4 1.4L13 6.8V20h-2V6.8L7.4 10.4 6 9z']];
  const cx = interpolate(f, [8, click], [760, 480], ease);
  const cy = interpolate(f, [8, click], [420, 300], ease);
  const ring = interpolate(f, [click, click + 16], [0, 1], clamp);
  return (
    <Card style={{height: 500, overflow: 'hidden'}}>
      <Chrome path="content-engine / automation" pill={<Pill dot={f > click ? b.accent : b.dim}>{f > click ? 'Running' : 'Idle'}</Pill>} />
      <div style={{padding: '30px 40px'}}>
        <Mono>Automation</Mono>
        <Title size={46} style={{marginTop: 8}}>Competitor Intelligence</Title>
        <div style={{display: 'flex', gap: 40, marginTop: 60}}>
          {nodes.map(([n, d], i) => {
            const s = sp(f, 6 + i * 6, 14);
            const lit = i === 1 && f > click;
            return (
              <div key={n} style={{width: 215, height: 170, borderRadius: 18, border: `1.5px solid ${lit ? b.accent : b.panelEdge}`, background: lit ? 'rgba(157,123,255,.08)' : b.panel2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${s})`}}>
                <svg width="34" height="34" viewBox="0 0 24 24"><path d={d} fill={lit ? b.accent : b.text} /></svg>
                <div style={{fontSize: 22, fontWeight: 600, color: b.text}}>{n}</div>
              </div>
            );
          })}
        </div>
      </div>
      {f > 8 && (
        <div style={{position: 'absolute', left: cx, top: cy}}>
          <div style={{position: 'absolute', left: -30 + 30 * ring, top: -30 + 30 * ring, width: 60 - 60 * ring + 60 * ring, height: 60, borderRadius: 60, border: `2px solid ${b.accent}`, opacity: ring > 0 ? 1 - ring : 0, transform: `scale(${0.4 + ring * 1.4})`, marginLeft: -30, marginTop: -30, left: 0, top: 0, position: 'absolute' as const}} />
          <svg width="30" height="34" viewBox="0 0 20 24"><path d="M2 1l15 12-6.5.8L14 21l-3 1.3-3.4-7.2L2 19z" fill="#fff" stroke="#000" strokeWidth="1.2" /></svg>
        </div>
      )}
    </Card>
  );
};

// 2. Radar + top competitors
const SceneRadar: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const angle = f * 6;
  const n = Math.round(countUp(f, 4, 60, 46));
  const dots: [number, number, boolean][] = [[0.78, 262, false], [0.52, 215, false], [0.62, 335, false], [0.55, 160, false], [0.55, 20, false], [0.9, 150, false], [0.82, 75, true], [0.88, 115, true], [0.28, 350, true], [0.92, 200, true]];
  return (
    <div style={{display: 'flex', gap: 24, alignItems: 'flex-start'}}>
      <div style={{width: 490, height: 490, borderRadius: 490, position: 'relative', border: `1.5px solid ${b.panelEdge}`, background: `radial-gradient(circle, rgba(157,123,255,.06), transparent 70%)`, overflow: 'hidden', flexShrink: 0}}>
        {[0.25, 0.5, 0.75].map((r) => (
          <div key={r} style={{position: 'absolute', inset: `${(1 - r) * 50}%`, borderRadius: 999, border: `1px solid ${b.panelEdge}`}} />
        ))}
        <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: b.panelEdge}} />
        <div style={{position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: b.panelEdge}} />
        <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${angle}deg, rgba(157,123,255,.45), rgba(157,123,255,.08) 55deg, transparent 60deg)`, borderRadius: 999}} />
        {dots.map(([r, a, red], i) => {
          const rad = (a * Math.PI) / 180;
          const s = sp(f, 8 + i * 6, 12);
          return (
            <div key={i} style={{position: 'absolute', width: red ? 12 : 16, height: red ? 12 : 16, borderRadius: 16, left: 245 + Math.cos(rad) * r * 235 - 8, top: 245 + Math.sin(rad) * r * 235 - 8, background: red ? b.hot : '#fff', transform: `scale(${s})`, boxShadow: red ? `0 0 10px ${b.hot}` : '0 0 10px rgba(255,255,255,.7)'}} />
          );
        })}
        <div style={{position: 'absolute', left: 245 - 26, top: 245 - 26, width: 52, height: 52, borderRadius: 52, background: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700, color: b.bg, boxShadow: `0 0 24px ${b.accent}`}}>YOU</div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 12}}>
        <Card style={{padding: '26px 28px'}}>
          <Mono>Top competitors</Mono>
          <div style={{fontSize: 108, fontWeight: 800, color: b.accent, lineHeight: 1, letterSpacing: -4, marginTop: 6}}>{n}</div>
          <div style={{fontSize: 20, color: b.muted, marginTop: 6}}>found in your niche</div>
        </Card>
        {demo.competitors.map(([h, c], i) => {
          const s = sp(f, 52 + i * 7, 14);
          return (
            <Card key={h} style={{padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, opacity: s, transform: `translateY(${(1 - s) * 20}px)`}}>
              <div style={{width: 30, height: 30, borderRadius: 30, background: `radial-gradient(circle at 30% 30%, ${i === 1 ? '#f6b73c' : b.hot}, ${b.accentDeep})`}} />
              <div style={{flex: 1, fontSize: 18, color: b.text, fontWeight: 500}}>{h}</div>
              <div style={{fontFamily: mono, fontSize: 13, color: b.accent}}>{c}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// 3. Working right now
const SceneWorking: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const lift = [60, 0, 80];
  const hgt = [440, 460, 420];
  return (
    <div style={{position: 'relative', height: 560}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center', transform: `scale(${sp(f, 0, 12)})`}}>
        <Pill dot={b.accent}>Working right now</Pill>
      </div>
      {demo.working.map(([tag, v, pct], i) => {
        const s = sp(f, 6 + i * 8, 14);
        return (
          <div key={tag} style={{position: 'absolute', left: 20 + i * 300, top: 70 + lift[i], opacity: s, transform: `translateY(${(1 - s) * 60}px)`}}>
            <PhoneThumb w={255} h={hgt[i]}>
              <div style={{position: 'absolute', left: 16, top: 16, fontFamily: mono, fontSize: 11, color: '#fff', background: 'rgba(0,0,0,.45)', padding: '4px 8px', borderRadius: 6, letterSpacing: 1}}>{tag}</div>
              <div style={{position: 'absolute', left: 18, bottom: 26}}>
                <div style={{fontSize: 40, fontWeight: 800, color: b.text, letterSpacing: -1.5}}>
                  {fmt(countUp(f, 10 + i * 6, 70, v))} <span style={{fontSize: 16, fontWeight: 400, color: b.muted}}>views</span>
                </div>
                <div style={{fontSize: 17, color: b.accent, fontWeight: 600, marginTop: 4}}>↗ {pct}</div>
              </div>
            </PhoneThumb>
          </div>
        );
      })}
    </div>
  );
};

// 4. Breakdown
const SceneBreakdown: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const t1 = 28, t2 = 62, t3 = 90;
  const prog = Math.round(interpolate(f, [0, t3], [0, 100], clamp));
  const chips = [['Hook', b.accent, b.bg], ['Problem', b.hot, '#fff'], ['Proof', '#a0335a', '#fff'], ['CTA', 'transparent', b.accent]];
  const Bracket: React.FC<{style: React.CSSProperties}> = ({style}) => <div style={{position: 'absolute', width: 28, height: 28, borderColor: b.text, borderStyle: 'solid', borderWidth: 0, ...style}} />;
  return (
    <div style={{display: 'flex', gap: 20}}>
      <Card style={{width: 262, height: 500, overflow: 'hidden', flexShrink: 0}}>
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${b.accentDeep}88, ${b.hot}33 30%, ${b.panel} 70%)`}} />
        <Silhouette size={150} style={{position: 'absolute', left: 56, top: 190}} />
        <Bracket style={{left: 18, top: 24, borderTopWidth: 2, borderLeftWidth: 2}} />
        <Bracket style={{right: 18, top: 24, borderTopWidth: 2, borderRightWidth: 2}} />
        <Bracket style={{left: 18, top: 370, borderBottomWidth: 2, borderLeftWidth: 2}} />
        <Bracket style={{right: 18, top: 370, borderBottomWidth: 2, borderRightWidth: 2}} />
        <div style={{position: 'absolute', left: 18, right: 18, bottom: 26}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono, fontSize: 12, color: b.muted, letterSpacing: 1}}>
            <span style={{width: 7, height: 7, borderRadius: 7, background: b.accent}} />
            {prog < 100 ? `ANALYZING… ${prog}%` : 'BREAKDOWN READY'}
          </div>
          <div style={{height: 4, borderRadius: 4, background: b.skeleton, marginTop: 10}}>
            <div style={{width: `${prog}%`, height: '100%', borderRadius: 4, background: `linear-gradient(90deg, ${b.accent}, ${b.hot})`}} />
          </div>
        </div>
      </Card>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 16}}>
        <Card active={f > t1} style={{padding: '22px 26px', minHeight: 150}}>
          <Mono>01 The hook</Mono>
          {f < t1 ? (
            <Skeleton w="80%" h={18} style={{marginTop: 18}} />
          ) : (
            <>
              <div style={{fontSize: 30, fontWeight: 700, color: b.text, marginTop: 14, letterSpacing: -0.8, opacity: interpolate(f, [t1, t1 + 8], [0, 1], clamp)}}>
                {demo.hook[0]}<span style={{color: b.accent}}>{demo.hook[1]}</span>{demo.hook[2]}
              </div>
              <div style={{fontFamily: mono, fontSize: 12, color: b.dim, marginTop: 10, letterSpacing: 1}}>0:00 – 0:03 · pattern interrupt</div>
            </>
          )}
        </Card>
        <Card active={f > t2} style={{padding: '22px 26px', minHeight: 150}}>
          <Mono>02 The pattern</Mono>
          {f < t2 ? (
            <>
              <Skeleton w="88%" h={14} style={{marginTop: 18}} />
              <Skeleton w="60%" h={14} style={{marginTop: 10}} />
            </>
          ) : (
            <>
              <div style={{display: 'flex', gap: 8, marginTop: 16}}>
                {chips.map(([t, bg, c], i) => (
                  <div key={t} style={{flex: i === 2 ? 1.6 : i === 1 ? 1.3 : 1, padding: '10px 0', textAlign: 'center', borderRadius: 8, background: bg, color: c, fontSize: 16, fontWeight: 700, border: `1.5px solid ${i === 3 ? b.accent : 'transparent'}`, opacity: interpolate(f, [t2 + i * 4, t2 + 6 + i * 4], [0, 1], clamp)}}>{t}</div>
                ))}
              </div>
              <div style={{fontFamily: mono, fontSize: 12, color: b.dim, marginTop: 12, letterSpacing: 1}}>same structure · 9 of 10 top posts</div>
            </>
          )}
        </Card>
        <Card active={f > t3} style={{padding: '22px 26px', minHeight: 150}}>
          <Mono>03 Why it worked</Mono>
          {f < t3 ? (
            <>
              <Skeleton w="85%" h={14} style={{marginTop: 18}} />
              <Skeleton w="55%" h={14} style={{marginTop: 10}} />
            </>
          ) : (
            <div style={{display: 'flex', gap: 12, marginTop: 16}}>
              {[['71%', 'retention'], ['×4.2', 'shares'], ['+380%', 'comments']].map(([v, l], i) => (
                <div key={l} style={{flex: 1, padding: '14px 16px', borderRadius: 12, background: b.panel2, border: `1.5px solid ${b.panelEdge}`, opacity: interpolate(f, [t3 + i * 5, t3 + 6 + i * 5], [0, 1], clamp)}}>
                  <div style={{fontSize: 30, fontWeight: 800, color: b.accent, letterSpacing: -1}}>{v}</div>
                  <div style={{fontSize: 14, color: b.muted, marginTop: 2}}>{l}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// 5. Guessing what to post?
const SceneGuessing: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const typed = 'What do I post today... maybe a tre';
  const n = f < 36 ? Math.floor(f * 1.2) : Math.max(0, typed.length - Math.floor((f - 36) * 2.2));
  const qs: [number, number, number, string][] = [[70, 200, 80, b.accent], [820, 150, 64, b.hot], [120, 440, 56, b.hot], [850, 420, 72, b.accent], [470, 500, 44, b.accent]];
  return (
    <div style={{position: 'relative', height: 560}}>
      <div style={{textAlign: 'center', fontSize: 76, fontWeight: 800, color: b.text, lineHeight: 1.05, letterSpacing: -3, transform: `scale(${sp(f, 0, 12)})`}}>Guessing what<br />to post?</div>
      {qs.map(([x, y, s, c], i) => (
        <div key={i} style={{position: 'absolute', left: x, top: y + Math.sin((f + i * 20) / 9) * 12, fontSize: s, fontWeight: 900, color: c, transform: `rotate(${(i % 2 ? -1 : 1) * 14}deg) scale(${sp(f, 6 + i * 4, 10)})`}}>?</div>
      ))}
      <Card style={{position: 'absolute', left: 150, right: 150, top: 250, padding: '22px 26px'}}>
        <Mono size={12}>New post</Mono>
        <div style={{fontSize: 26, color: b.text, marginTop: 12, minHeight: 36}}>
          {typed.slice(0, n)}
          <span style={{opacity: Math.floor(f / 8) % 2 ? 0 : 1}}>|</span>
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 18}}>
          {['Photo', 'Caption', 'Hashtags'].map((t) => (
            <Pill key={t} style={{fontSize: 11}}>{t}</Pill>
          ))}
        </div>
      </Card>
    </div>
  );
};

// 6. Already proven to work
const SceneProven: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  return (
    <Card style={{padding: '28px 30px', margin: '0 75px'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div>
          <Mono>Your next posts</Mono>
          <Title size={38} style={{marginTop: 6}}>Already proven to work</Title>
        </div>
        <div style={{marginLeft: 'auto', width: 58, height: 58, borderRadius: 14, background: b.panel2, border: `1.5px solid ${b.panelEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={b.accent} strokeWidth="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
        </div>
      </div>
      <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10}}>
        {demo.proven.map(([t, sub, s], i) => {
          const o = sp(f, 6 + i * 8, 15);
          const dimmed = i === 2 ? 0.35 : 1;
          return (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 14, background: b.panel2, border: `1.5px solid ${b.panelEdge}`, opacity: o * dimmed, transform: `translateY(${(1 - o) * 24}px)`, filter: i === 2 ? 'blur(1.5px)' : 'none'}}>
              <div style={{width: 60, height: 60, borderRadius: 10, background: `linear-gradient(180deg, ${b.accentDeep}, ${b.panel})`, position: 'relative', overflow: 'hidden'}}>
                <Silhouette size={44} style={{position: 'absolute', left: 8, top: 18}} />
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 22, fontWeight: 700, color: b.text}}>{t}</div>
                <div style={{fontSize: 14, color: b.muted, marginTop: 3}}>{sub}</div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: 32, fontWeight: 800, color: b.accent, letterSpacing: -1}}>{Math.round(countUp(f, 6 + i * 8, 28 + i * 8, s))}</div>
                <Mono size={10} style={{letterSpacing: 2}}>score</Mono>
              </div>
              <Check on={i === 0 ? interpolate(f, [30, 38], [0, 1], clamp) : 0} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// 7. Trend radar
const SceneCurve: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const p = interpolate(f, [4, 60], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const path = 'M 0 250 C 60 248, 90 200, 130 180 S 300 120, 420 95 S 700 40, 860 0';
  const len = 1000;
  return (
    <Card style={{padding: '28px 30px', height: 520}}>
      <Mono>Trend radar</Mono>
      <Title size={38} style={{marginTop: 6}}>
        Know what works <span style={{color: b.accent}}>first</span>
      </Title>
      <svg width="870" height="330" viewBox="-5 -20 880 340" style={{marginTop: 30}}>
        <defs>
          <linearGradient id="gg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={b.accent} stopOpacity=".35" />
            <stop offset="1" stopColor={b.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 65, 130, 195, 260].map((y) => (
          <line key={y} x1="0" x2="860" y1={y} y2={y} stroke={b.panelEdge} strokeWidth="1" />
        ))}
        <path d={`${path} L ${860 * p} 260 L 0 260 Z`} fill="url(#gg)" opacity={p} style={{clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}} />
        <path d={path} fill="none" stroke={b.accent} strokeWidth="5" strokeDasharray={len} strokeDashoffset={len * (1 - p)} strokeLinecap="round" />
        <g opacity={interpolate(f, [16, 26], [0, 1], clamp)}>
          <circle cx="110" cy="195" r="11" fill={b.panel} stroke={b.accent} strokeWidth="4" />
          <rect x="74" y="135" width="72" height="38" rx="19" fill={b.accent} />
          <text x="110" y="161" textAnchor="middle" fontSize="18" fontWeight="800" fill={b.bg} fontFamily={font}>YOU</text>
        </g>
        {['Day 1', 'Day 7', 'Day 14', 'Day 21'].map((d, i) => (
          <text key={d} x={i * 280 + (i === 3 ? -10 : 0)} y="295" fontSize="14" fill={b.muted} fontFamily={font} textAnchor={i === 0 ? 'start' : i === 3 ? 'end' : 'middle'}>{d}</text>
        ))}
      </svg>
    </Card>
  );
};

// 8. What to record / what to say
const ScenePlan: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const flip = 52;
  return f < flip ? (
    <Card style={{padding: '28px 30px', height: 500}}>
      <div style={{display: 'flex', alignItems: 'flex-start'}}>
        <div>
          <Mono>This week</Mono>
          <Title size={38} style={{marginTop: 6}}>What to record</Title>
        </div>
        <div style={{marginLeft: 'auto'}}>
          <Pill>📅 3 videos</Pill>
        </div>
      </div>
      <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10}}>
        {demo.record.map(([d, t, sub], i) => {
          const o = sp(f, 6 + i * 9, 15);
          return (
            <div key={t} style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 14, background: b.panel2, border: `1.5px solid ${b.panelEdge}`, opacity: o * (i === 2 ? 0.45 : 1), transform: `translateX(${(1 - o) * -30}px)`}}>
              <div style={{width: 64, height: 56, borderRadius: 10, background: b.panel, border: `1.5px solid ${b.panelEdge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 13, color: b.accent}}>{d}</div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 22, fontWeight: 700, color: b.text}}>{t}</div>
                <div style={{fontSize: 14, color: b.muted, marginTop: 3}}>{sub}</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 6, fontFamily: mono, fontSize: 12, color: b.hot, letterSpacing: 1}}>
                <span style={{width: 7, height: 7, borderRadius: 7, background: b.hot}} /> REC
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  ) : (
    <Card style={{padding: '28px 30px', height: 500}}>
      <div style={{display: 'flex', alignItems: 'flex-start'}}>
        <div>
          <Mono>Script</Mono>
          <Title size={38} style={{marginTop: 6}}>What to say</Title>
        </div>
        <div style={{marginLeft: 'auto'}}>
          <Pill>0:45</Pill>
        </div>
      </div>
      <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 24}}>
        {demo.script.map(([k, t], i) => (
          <div key={k} style={{display: 'flex', gap: 24, alignItems: 'baseline'}}>
            <div style={{fontFamily: mono, fontSize: 12, color: b.accent, letterSpacing: 2, width: 60}}>{k}</div>
            <Typed text={t} start={flip + 4 + i * 22} cps={1.5} caret={i === 1} style={{fontSize: 30, fontWeight: 600, color: b.text, lineHeight: 1.35}} />
          </div>
        ))}
      </div>
    </Card>
  );
};

// 9. Auto-edit
const SceneEdit: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const head = interpolate(f, [4, 90], [0, 100], clamp);
  const tasks = ['Cuts & pacing', 'Captions', 'Zooms & b-roll', 'Sound design'];
  const tracks: [string, [number, number, string][]][] = [
    ['V1', [[0, 12, b.hot], [14, 10, b.accent], [26, 18, b.hot], [46, 9, b.accent], [57, 16, b.hot], [75, 12, b.accent], [89, 11, b.hot]]],
    ['TXT', [[3, 8, b.accent], [20, 10, b.accent], [40, 12, b.accent], [62, 10, b.accent], [84, 10, b.accent]]],
    ['SFX', [[0, 5, b.muted], [26, 4, b.muted], [57, 5, b.muted], [89, 4, b.muted]]],
  ];
  return (
    <Card style={{height: 540, overflow: 'hidden'}}>
      <Chrome path="✂  Auto-Edit" pill={<Pill dot={head >= 100 ? b.accent : b.hot}>{Math.round(head)}%</Pill>} />
      <div style={{display: 'flex', gap: 24, padding: '22px 26px 0'}}>
        <PhoneThumb w={160} h={230} />
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4}}>
          {tasks.map((t, i) => {
            const on = interpolate(head, [12 + i * 22, 18 + i * 22], [0, 1], clamp);
            return (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: b.panel2, border: `1.5px solid ${on > 0.5 ? b.accent : b.panelEdge}`}}>
                <div style={{fontSize: 19, fontWeight: 600, color: on > 0.5 ? b.text : b.muted, flex: 1}}>{t}</div>
                {on > 0.5 ? <Check on={on} size={22} /> : <Skeleton w="90px" h={8} />}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{margin: '20px 26px 0', padding: '14px 16px', borderRadius: 14, background: b.panel2, border: `1.5px solid ${b.panelEdge}`, position: 'relative'}}>
        {tracks.map(([name, clips]) => (
          <div key={name} style={{display: 'flex', alignItems: 'center', gap: 12, height: 44}}>
            <div style={{fontFamily: mono, fontSize: 11, color: b.dim, width: 32}}>{name}</div>
            <div style={{flex: 1, height: 30, position: 'relative'}}>
              {clips.map(([x, w, c], i) => (
                <div key={i} style={{position: 'absolute', left: `${x}%`, width: `${w}%`, height: '100%', borderRadius: 6, background: c, opacity: head > x ? 0.95 : 0.12}} />
              ))}
            </div>
          </div>
        ))}
        <div style={{position: 'absolute', top: 8, bottom: 8, left: `calc(60px + ${head}% * 0.92)`, width: 3, background: '#fff', boxShadow: '0 0 10px #fff'}}>
          <div style={{position: 'absolute', top: -6, left: -6, width: 15, height: 10, background: '#fff', borderRadius: 3}} />
        </div>
      </div>
    </Card>
  );
};

// 10. Post everywhere
const ScenePost: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const nets: [string, number, number][] = [['TikTok', 60, 300], ['Instagram', 345, 300], ['YouTube', 630, 300], ['LinkedIn', 200, 390], ['Facebook', 490, 390]];
  const cta = sp(f, 48, 12);
  return (
    <div style={{position: 'relative', height: 560}}>
      <div style={{position: 'absolute', left: 390, top: 0, transform: `scale(${sp(f, 0, 12)})`}}>
        <PhoneThumb w={180} h={260}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontSize: 14, fontWeight: 600, color: b.text}}>Your video</div>
        </PhoneThumb>
      </div>
      <svg width="960" height="460" style={{position: 'absolute', inset: 0}}>
        {nets.map(([, x, y], i) => {
          const p = interpolate(f, [8 + i * 5, 24 + i * 5], [0, 1], clamp);
          const ex = x + 120, ey = y + 30;
          const sx = 480, sy = 262;
          const cx = sx + (ex - sx) * 0.5, cy = sy + 40;
          const px = (t: number) => (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * ex;
          const py = (t: number) => (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ey;
          const pts = Array.from({length: 21}, (_, k) => `${px((k / 20) * p)},${py((k / 20) * p)}`).join(' ');
          return <polyline key={i} points={pts} fill="none" stroke={b.accent} strokeWidth="2.5" opacity=".8" />;
        })}
      </svg>
      {nets.map(([n, x, y], i) => {
        const s = sp(f, 20 + i * 5, 13);
        const done = interpolate(f, [30 + i * 5, 36 + i * 5], [0, 1], clamp);
        return (
          <div key={n} style={{position: 'absolute', left: x, top: y, width: 240, transform: `scale(${s})`}}>
            <Card active={done > 0.5} style={{padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 40}}>
              <div style={{fontSize: 22, color: b.text, fontWeight: 600}}>{n}</div>
              <Check on={done} size={24} />
            </Card>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', transform: `scale(${cta})`}}>
        <span style={{display: 'inline-block', fontSize: 30, fontWeight: 700, color: '#fff', background: b.accentDeep, padding: '18px 40px', borderRadius: 12, boxShadow: `0 16px 40px -10px rgba(96,48,236,.7)`}}>{brand.cta} →</span>
        <div style={{marginTop: 12, fontSize: 18, color: b.muted}}>{brand.ctaSub} · {brand.site}</div>
      </div>
    </div>
  );
};

const Intro: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const s = sp(f, 0, 11);
  const o = interpolate(f, [24, 30], [1, 0], clamp);
  return (
    <AbsoluteFill style={{top: 820, height: 420, alignItems: 'center', justifyContent: 'center', opacity: o}}>
      <div style={{transform: `scale(${s})`}}>
        <Logo size={250} />
      </div>
      <Mono color={b.accent} size={20} style={{marginTop: 26, letterSpacing: 8, opacity: interpolate(f, [8, 16], [0, 1], clamp)}}>Content Engine</Mono>
    </AbsoluteFill>
  );
};

// [from, duration, scene]
const scenes: [number, number, React.FC][] = [
  [30, 70, SceneScout],
  [100, 90, SceneRadar],
  [190, 85, SceneWorking],
  [275, 130, SceneBreakdown],
  [405, 65, SceneGuessing],
  [470, 50, SceneProven],
  [520, 85, SceneCurve],
  [605, 155, ScenePlan],
  [760, 100, SceneEdit],
  [860, 70, ScenePost],
];

export const EngineAd: React.FC<{faceSrc: string; theme: Theme}> = ({faceSrc, theme}) => {
  const b = palettes[theme];
  const f = useCurrentFrame();
  const breathe = 0.85 + 0.15 * Math.sin(f / 30);
  return (
    <ThemeCtx.Provider value={theme}>
      <AbsoluteFill style={{background: b.bg, fontFamily: font}}>
        <AbsoluteFill style={{background: `radial-gradient(700px 520px at 50% 108%, ${b.glowBottom}, transparent 70%)`, opacity: breathe}} />
        <AbsoluteFill style={{background: `radial-gradient(520px 420px at 22% 18%, ${b.glowTop}, transparent 70%), radial-gradient(420px 300px at 80% 6%, ${b.glowTop}, transparent 70%)`}} />
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
