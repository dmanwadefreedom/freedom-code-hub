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

// Example data shown in the dashboard. Labeled "example" on screen.
export const demo = {
  competitors: ['@top.coach.austin', '@systems.studio', '@scale.with.sam'],
  hook: '"Nobody tells you this about your first 10 clients..."',
  proven: [['"Nobody tells you this..."', 96], ['3 mistakes killing your reach', 93], ['How I got my first 10 clients', 91]] as const,
  record: ['The 3-second hook', 'Mistake #1 breakdown', 'Client win story'],
  script: "Stop posting blind. Here's what the top 1% in your space did this week...",
};

// Spoken script, chunked for on-screen captions. [startFrame, words]
export const captions: [number, string][] = [
  [0, 'Okay so'],
  [18, 'this thing right here'],
  [50, 'is an automation'],
  [90, 'that goes out'],
  [110, 'and finds the top accounts'],
  [145, 'in your space'],
  [180, 'It pulls'],
  [200, "what's actually working"],
  [235, 'for them right now'],
  [270, 'Then it breaks it down'],
  [305, "here's the hook"],
  [330, "here's the pattern"],
  [355, "here's why it worked"],
  [400, "So you're not guessing"],
  [435, 'what to post anymore'],
  [470, "You're just looking at it"],
  [520, 'You know what works'],
  [555, 'before anyone else'],
  [600, 'Then it plans'],
  [625, 'what to record'],
  [655, 'and what to say'],
  [700, 'It even edits'],
  [730, 'the video for you'],
  [770, 'cuts, captions, b-roll'],
  [810, 'Then it posts it'],
  [840, 'everywhere'],
  [865, '5 posts free. Link in bio.'],
];

// Checklist steps tick off at these frames.
export const steps: [string, number][] = [
  ['Find top accounts', 180],
  ['Break down what works', 400],
  ['Plan what to record', 690],
  ['Edit your videos', 805],
  ['Post everywhere', 870],
];
