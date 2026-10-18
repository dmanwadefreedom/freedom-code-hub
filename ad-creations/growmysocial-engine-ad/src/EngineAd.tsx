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
  useVideoConfig,
} from 'remotion';
import {brand, captions, demo, palettes, steps, Theme} from './brand';

const font = 'Inter, "Inter Display", system-ui, sans-serif';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const ThemeCtx = createContext<Theme>('light');
const usePal = () => palettes[useContext(ThemeCtx)];

const Panel: React.FC<{style?: React.CSSProperties; children: React.ReactNode}> = ({style, children}) => {
  const b = usePal();
  return (
    <div
      style={{
        background: b.panel,
        border: `2px solid ${b.panelEdge}`,
        borderRadius: 28,
        boxShadow: `0 24px 60px -30px rgba(96,48,236,.35)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => {
  const b = usePal();
  return <div style={{fontSize: 20, letterSpacing: 4, fontWeight: 800, color: color ?? b.accent, textTransform: 'uppercase'}}>{children}</div>;
};

const Tag: React.FC<{children: React.ReactNode}> = ({children}) => {
  const b = usePal();
  return (
    <span style={{display: 'inline-block', background: b.tagBg, color: b.accent, fontSize: 18, fontWeight: 700, letterSpacing: 1, padding: '6px 12px', borderRadius: 8}}>{children}</span>
  );
};

const Logo: React.FC<{size: number}> = ({size}) => {
  const b = usePal();
  return (
    <div style={{width: size, height: size, borderRadius: size * 0.26, background: b.accentDeep === '#4e28bf' ? '#6030ec' : b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg viewBox="0 0 32 32" width={size * 0.72} height={size * 0.72} fill="none">
        <path d="M16 26C8 26 4 20 5 12c8 0 13 5 11 14Z" fill="#c7d5ff" />
        <path d="M17 25C14 13 20 5 28 4c1 10-3 18-11 21Z" fill="white" />
      </svg>
    </div>
  );
};

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
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '15px 18px',
                borderRadius: 16,
                background: isActive ? b.tagBg : 'transparent',
                border: `2px solid ${isActive ? b.accent : 'transparent'}`,
              }}
            >
              <div style={{fontSize: 18, color: b.accent, fontWeight: 700, width: 30}}>0{i + 1}</div>
              <div style={{flex: 1, fontSize: 24, fontWeight: 650, color: isActive || done > 0.5 ? b.text : b.muted, letterSpacing: -0.5}}>{label}</div>
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

// 1. Tell it about your business (form fills in)
const SceneProfile: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const rows = [['Business', demo.business], ['Audience', demo.audience], ['Offer', demo.offer], ['Goal', demo.goal]];
  return (
    <Panel style={{padding: 44, borderLeft: `8px solid ${b.accent}`}}>
      <Tag>The starting point</Tag>
      <div style={{fontSize: 50, fontWeight: 800, color: b.text, marginTop: 16, letterSpacing: -1.5}}>Tell it what you do.</div>
      <div style={{marginTop: 26, display: 'flex', flexDirection: 'column', gap: 18}}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{opacity: interpolate(f, [8 + i * 16, 16 + i * 16], [0, 1], clamp)}}>
            <div style={{fontSize: 18, color: b.muted, fontWeight: 600, letterSpacing: 1}}>{k}</div>
            <div style={{fontSize: 34, color: b.text, fontWeight: 650, borderBottom: `2px solid ${b.panelEdge}`, paddingBottom: 8, minHeight: 50}}>
              <Typed text={v} start={10 + i * 16} cps={1.5} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

// 2. AI builds the ideas (radar + counter + tags)
const SceneIdeas: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const angle = f * 5;
  const n = Math.round(countUp(f, 5, 60, 30));
  const dots = [[0.3, 40], [0.55, 110], [0.75, 200], [0.45, 250], [0.85, 300], [0.65, 330], [0.35, 160], [0.9, 70]];
  const tags = ['Teach', 'Help', 'Connect', 'Invite'];
  return (
    <div style={{display: 'flex', gap: 30}}>
      <div style={{width: 440, height: 440, borderRadius: 440, position: 'relative', border: `2px solid ${b.panelEdge}`, background: `radial-gradient(circle, ${b.tagBg}, transparent 70%)`, overflow: 'hidden', flexShrink: 0}}>
        {[0.33, 0.66].map((r) => (
          <div key={r} style={{position: 'absolute', inset: `${(1 - r) * 50}%`, borderRadius: 999, border: `2px solid ${b.panelEdge}`}} />
        ))}
        <div style={{position: 'absolute', inset: 0, background: `conic-gradient(from ${angle}deg, rgba(96,48,236,.4), transparent 60deg)`, borderRadius: 999}} />
        {dots.map(([r, a], i) => {
          const rad = (a * Math.PI) / 180;
          const vis = f > 6 + i * 7;
          return (
            <div key={i} style={{position: 'absolute', width: 18, height: 18, borderRadius: 18, left: 220 + Math.cos(rad) * r * 205 - 9, top: 220 + Math.sin(rad) * r * 205 - 9, background: i % 3 === 0 ? b.hot : b.accent, opacity: vis ? 1 : 0, boxShadow: `0 0 16px ${b.accent}`}} />
          );
        })}
        <div style={{position: 'absolute', left: 188, top: 188}}>
          <Logo size={64} />
        </div>
      </div>
      <Panel style={{flex: 1, padding: 34}}>
        <Label>AI builds the ideas</Label>
        <div style={{fontSize: 130, fontWeight: 900, color: b.accent, lineHeight: 1.05, letterSpacing: -4}}>{n}</div>
        <div style={{fontSize: 24, color: b.muted, fontWeight: 600}}>days of content, planned</div>
        <div style={{marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12}}>
          {tags.map((t, i) => (
            <div key={t} style={{opacity: interpolate(f, [28 + i * 9, 38 + i * 9], [0, 1], clamp), transform: `scale(${spring({frame: f - 28 - i * 9, fps: 30, config: {damping: 12}})})`}}>
              <span style={{display: 'inline-block', background: b.tagBg, color: b.accent, fontSize: 26, fontWeight: 800, padding: '12px 20px', borderRadius: 12}}>{t}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop: 22, fontSize: 20, color: b.muted}}>Topics, hooks and angles from your own offer.</div>
      </Panel>
    </div>
  );
};

// 3. Hook / topic / why it fits
const SceneBreakdown: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const segs = [['HOOK', 0.2, b.accent], ['TEACH', 0.35, b.accentDeep], ['PROOF', 0.25, '#9a7bff'], ['INVITE', 0.2, b.hot]] as const;
  const row = (title: string, at: number, child: React.ReactNode) => (
    <Panel style={{padding: '24px 30px', opacity: interpolate(f, [at, at + 10], [0.35, 1], clamp), borderColor: f > at ? b.accent : b.panelEdge}}>
      <Label>{title}</Label>
      <div style={{marginTop: 14}}>{child}</div>
    </Panel>
  );
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
      {row('01 The hook', 0, <Typed text={'"Working harder won\'t fix a broken system."'} start={6} style={{fontSize: 38, fontWeight: 800, color: b.text, letterSpacing: -1}} />)}
      {row(
        '02 The pattern',
        50,
        <div style={{display: 'flex', gap: 8, height: 54}}>
          {segs.map(([t, w, c], i) => (
            <div key={t} style={{flex: w, borderRadius: 10, background: c, opacity: interpolate(f, [55 + i * 6, 65 + i * 6], [0, 1], clamp), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff'}}>
              {t}
            </div>
          ))}
        </div>,
      )}
      {row(
        '03 Why it fits your offer',
        80,
        <div style={{display: 'flex', gap: 16}}>
          {[['Teach', 'Shows the way you think'], ['Offer', 'Points to systems coaching'], ['Goal', 'Earns the booked call']].map(([k, v], i) => (
            <div key={k} style={{flex: 1, padding: '18px 20px', borderRadius: 16, background: b.soft, opacity: interpolate(f, [85 + i * 8, 95 + i * 8], [0, 1], clamp)}}>
              <div style={{fontSize: 22, fontWeight: 900, color: b.accent}}>{k}</div>
              <div style={{fontSize: 20, color: b.muted, marginTop: 4}}>{v}</div>
            </div>
          ))}
        </div>,
      )}
    </div>
  );
};

// 4. Guessing what to post?
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

// 5. Your week, taking shape (the site's own calendar)
const SceneWeek: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  return (
    <Panel style={{padding: 36}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <Label color={b.muted}>Content calendar</Label>
          <div style={{fontSize: 46, fontWeight: 800, color: b.text, marginTop: 6, letterSpacing: -1.5}}>Your week, taking shape.</div>
        </div>
        <Logo size={56} />
      </div>
      <div style={{marginTop: 22}}>
        {demo.week.map(([day, tag, topic], i) => {
          const o = spring({frame: f - 8 - i * 7, fps: 30, config: {damping: 15}});
          return (
            <div key={day} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '16px 4px', borderTop: `2px solid ${b.panelEdge}`, opacity: o, transform: `translateX(${(1 - o) * 60}px)`}}>
              <div style={{width: 70}}>
                <div style={{fontSize: 16, color: b.muted, fontWeight: 700}}>{day}</div>
                <div style={{fontSize: 30, color: b.muted, fontWeight: 400}}>0{i + 1}</div>
              </div>
              <div style={{flex: 1}}>
                <Tag>{tag}</Tag>
                <div style={{fontSize: 24, color: b.text, fontWeight: 600, marginTop: 6}}>{topic}</div>
              </div>
              <div style={{fontSize: 16, color: b.muted, border: `2px solid ${b.panelEdge}`, borderRadius: 8, padding: '6px 12px', opacity: interpolate(f, [30 + i * 7, 38 + i * 7], [0, 1], clamp)}}>Draft</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

// 6. Draft you can edit
const SceneDraft: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const editAt = 40;
  return (
    <Panel style={{padding: 40, background: b.soft}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, color: b.muted, fontSize: 20, fontWeight: 600}}>
        <span style={{color: b.accent}}>✎</span> Example draft <span style={{marginLeft: 'auto', color: b.green, fontSize: 18}}>Ready to edit</span>
      </div>
      <div style={{fontSize: 40, fontWeight: 800, color: b.text, marginTop: 18, letterSpacing: -1}}>{demo.week[0][2]}</div>
      <div style={{marginTop: 22, padding: 24, background: b.panel, border: `2px solid ${f > editAt ? b.accent : b.panelEdge}`, borderRadius: 16, fontSize: 28, lineHeight: 1.5, color: b.text, minHeight: 200}}>
        {f < editAt ? demo.draft : <Typed text={demo.draft.replace('one task', 'one task your team')} start={editAt} cps={3} />}
      </div>
      <div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700, color: b.accent}}>
        <span>🛡</span> Your voice. Your review. Your final say.
      </div>
    </Panel>
  );
};

// 7. Short-video script
const SceneScript: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  return (
    <Panel style={{padding: 40, height: 560}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Label color={b.muted}>Short-video script</Label>
        <div style={{display: 'flex', gap: 8}}>
          {['Instagram', 'TikTok', 'YouTube'].map((p) => (
            <Tag key={p}>{p}</Tag>
          ))}
        </div>
      </div>
      <div style={{fontSize: 46, fontWeight: 800, color: b.text, marginTop: 10, marginBottom: 24, letterSpacing: -1.5}}>What to say on camera</div>
      <div style={{fontSize: 34, lineHeight: 1.45, color: b.text}}>
        <Typed text={demo.script} start={10} cps={1.6} />
      </div>
      <div style={{marginTop: 30, display: 'flex', gap: 14, opacity: interpolate(f, [62, 72], [0, 1], clamp)}}>
        {['Hook', 'Point', 'Ask'].map((s, i) => (
          <div key={s} style={{flex: [1, 2, 1][i], height: 16, borderRadius: 8, background: [b.accent, b.accentDeep, b.hot][i]}} />
        ))}
      </div>
    </Panel>
  );
};

// 8. Approve and schedule everywhere
const ScenePost: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const nets: [string, number, number][] = [['LinkedIn', 120, 330], ['Facebook', 490, 330], ['Instagram', 860, 330], ['TikTok', 280, 520], ['YouTube', 700, 520]];
  const approved = spring({frame: f - 4, fps: 30, config: {damping: 12}});
  return (
    <div style={{position: 'relative', height: 820}}>
      <svg width="980" height="600" style={{position: 'absolute', inset: 0}}>
        {nets.map(([, x, y], i) => {
          const p = interpolate(f, [14 + i * 5, 30 + i * 5], [0, 1], clamp);
          return <line key={i} x1="490" y1="180" x2={490 + (x - 490) * p} y2={180 + (y - 180) * p} stroke={b.accent} strokeWidth="4" opacity=".7" />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 330, top: 60, width: 320, transform: `scale(${approved})`}}>
        <Panel style={{padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 16, borderColor: b.accent, background: b.panel}}>
          <Check on={1} size={44} />
          <div style={{fontSize: 30, fontWeight: 800, color: b.text}}>Approved</div>
        </Panel>
      </div>
      {nets.map(([n, x, y], i) => {
        const s = spring({frame: f - 22 - i * 5, fps: 30, config: {damping: 13}});
        return (
          <div key={n} style={{position: 'absolute', left: x - 115, top: y - 34, width: 230, transform: `scale(${s})`}}>
            <Panel style={{padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 40}}>
              <div style={{fontSize: 26, color: b.text, fontWeight: 700}}>{n}</div>
              <Check on={interpolate(f, [36 + i * 5, 42 + i * 5], [0, 1], clamp)} size={30} />
            </Panel>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontSize: 22, color: b.muted, fontWeight: 600}}>Scheduled through Zernio when you ask.</div>
    </div>
  );
};

// 9. CTA
const SceneCta: React.FC = () => {
  const b = usePal();
  const f = useCurrentFrame();
  const s = spring({frame: f, fps: 30, config: {damping: 12}});
  return (
    <div style={{position: 'relative', height: 820, textAlign: 'center'}}>
      <div style={{fontSize: 150, fontWeight: 900, color: b.accent, letterSpacing: -6, lineHeight: 1, transform: `scale(${s})`}}>5</div>
      <div style={{fontSize: 56, fontWeight: 800, color: b.text, letterSpacing: -2, marginTop: 10}}>posts to start. Free.</div>
      <div style={{fontSize: 28, color: b.muted, marginTop: 10, fontWeight: 600}}>No card. No trial deadline.</div>
      <div style={{marginTop: 50, transform: `scale(${spring({frame: f - 14, fps: 30, config: {damping: 12}})})`}}>
        <span style={{display: 'inline-block', fontSize: 42, fontWeight: 800, color: '#fff', background: b.accent, padding: '26px 56px', borderRadius: 16, boxShadow: `0 20px 50px -14px rgba(96,48,236,.6)`}}>{brand.cta} →</span>
        <div style={{marginTop: 24, fontSize: 26, color: b.muted, letterSpacing: 4, fontWeight: 800}}>{brand.site}</div>
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
      <div style={{marginTop: 30, fontSize: 30, letterSpacing: 8, color: b.accent, fontWeight: 800}}>{brand.tagline}</div>
    </AbsoluteFill>
  );
};

// [from, duration, scene]
const scenes: [number, number, React.FC][] = [
  [30, 80, SceneProfile],
  [110, 90, SceneIdeas],
  [200, 110, SceneBreakdown],
  [310, 90, SceneGuessing],
  [400, 160, SceneWeek],
  [560, 90, SceneDraft],
  [650, 90, SceneScript],
  [740, 90, ScenePost],
  [830, 70, SceneCta],
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
