// Grow My Social brand. Pulled from growmysocial.app on 2026-10-18.
// Two palettes: "light" matches the site, "dark" matches the reference ad.

export type Theme = 'light' | 'dark';

export const palettes = {
  light: {
    bg: '#f5f0ff',
    bg2: '#ffffff',
    panel: '#ffffff',
    panelEdge: '#e3e2ed',
    soft: '#f7f3ff',
    text: '#13112a',
    muted: '#555d6c',
    accent: '#6030ec',
    accentDeep: '#4e28bf',
    tagBg: '#eee7ff',
    hot: '#e04c7a',
    green: '#417257',
    frame: '#34303e',
  },
  dark: {
    bg: '#13112a',
    bg2: '#1a1636',
    panel: '#1e1a3c',
    panelEdge: '#37325e',
    soft: '#26204a',
    text: '#f4f1ff',
    muted: '#a39bc2',
    accent: '#8f6bff',
    accentDeep: '#6030ec',
    tagBg: '#2e2660',
    hot: '#ff5c8a',
    green: '#6fd3a0',
    frame: '#0d0b1d',
  },
} as const;

export const brand = {
  name: 'Grow My Social',
  tagline: 'AI SOCIAL MEDIA MANAGER',
  product: 'Content Engine',
  site: 'GROWMYSOCIAL.APP',
  cta: 'Build My Content Plan',
  ctaSub: '5 posts free. No card.',
};

export const FPS = 30;
export const DURATION = 900; // 30s

// Demo business from the site's own example.
export const demo = {
  business: 'Business coach',
  audience: 'Service business owners',
  offer: 'Business systems coaching',
  goal: 'Get booked calls',
  week: [
    ['Mon', 'Teach', "Why working harder doesn't fix broken systems"],
    ['Tue', 'Help', '3 tasks business owners should stop doing'],
    ['Wed', 'Connect', 'The question I ask before changing a process'],
    ['Thu', 'Teach', "How to tell if you're the bottleneck"],
    ['Fri', 'Invite', 'What happens on a systems coaching call'],
  ] as const,
  draft: 'Start with one task you repeat every week. Write down the steps, the owner, and what done looks like.',
  script: "Stop working harder. Here's the one system I'd fix first if your week keeps running you...",
};

// Spoken script, chunked for on-screen captions. [startFrame, words]
export const captions: [number, string][] = [
  [0, 'Okay so'],
  [18, 'this thing right here'],
  [50, 'is an AI'],
  [68, 'social media manager'],
  [110, 'You tell it'],
  [130, 'about your business'],
  [160, 'your offer, your people'],
  [190, 'how you talk'],
  [215, 'Then it builds'],
  [235, 'your ideas'],
  [260, 'topics, hooks, angles'],
  [295, "here's the hook"],
  [320, "here's the topic"],
  [345, "here's why it fits"],
  [400, "So you're not guessing"],
  [435, 'what to post anymore'],
  [470, "You're looking at your week"],
  [510, 'already planned'],
  [560, 'Every post is a draft'],
  [590, 'you can edit'],
  [615, 'Your voice. Your final say.'],
  [650, 'It even writes'],
  [675, 'your short video scripts'],
  [740, 'Then you approve it'],
  [775, 'and schedule it out'],
  [830, '5 posts free'],
  [855, 'No card'],
  [875, 'Link in bio'],
];

// Checklist steps tick off at these frames.
export const steps: [string, number][] = [
  ['Tell it about your business', 200],
  ['AI builds the ideas', 400],
  ['Review your drafts', 650],
  ['Get your video scripts', 740],
  ['Approve and schedule', 830],
];
