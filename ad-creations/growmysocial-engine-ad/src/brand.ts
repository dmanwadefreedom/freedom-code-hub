// Grow My Social brand. Pulled from growmysocial.app on 2026-10-18.
// Layout and motion match the reference ad 1:1. Only the colors change.

export type Theme = 'light' | 'dark';

export const palettes = {
  // Reference look (near-black with a warm glow), in Grow My Social purple.
  dark: {
    bg: '#0c0912',
    panel: '#16121f',
    panel2: '#1c1727',
    panelEdge: '#2a2338',
    text: '#f4f1ff',
    muted: '#8d86a3',
    dim: '#4d4760',
    accent: '#9d7bff',
    accentDeep: '#6030ec',
    hot: '#e0457a',
    glowTop: 'rgba(224,69,122,.22)',
    glowBottom: 'rgba(96,48,236,.42)',
    skeleton: '#2a2438',
  },
  // Same layout on the site's white.
  light: {
    bg: '#f3eefc',
    panel: '#ffffff',
    panel2: '#f7f3ff',
    panelEdge: '#e3e2ed',
    text: '#13112a',
    muted: '#6b6584',
    dim: '#b9b3cc',
    accent: '#6030ec',
    accentDeep: '#4e28bf',
    hot: '#e0457a',
    glowTop: 'rgba(224,69,122,.10)',
    glowBottom: 'rgba(96,48,236,.18)',
    skeleton: '#ebe7f5',
  },
} as const;

export const brand = {
  name: 'GROW MY SOCIAL',
  product: 'Content Engine',
  status: 'AUTOMATION ON',
  site: 'growmysocial.app',
  cta: 'Build My Content Plan',
  ctaSub: '5 posts free. No card.',
  speaker: 'Dylan Ewing',
};

export const FPS = 30;
export const DURATION = 930; // 31s

// Example data shown in the dashboard. All made up, labeled on screen.
export const demo = {
  competitors: [
    ['@growthwithmia', '1.2M'],
    ['@thecreatorlab', '864K'],
    ['@scalesmart', '2.1M'],
  ] as const,
  working: [
    ['#2 TOP', 1.1e6, '+288%'],
    ['#1 TOP', 2.3e6, '+524%'],
    ['#3 TOP', 730e3, '+167%'],
  ] as const,
  hook: ['"Nobody tells you ', 'this', '..."'] as const,
  proven: [
    ['"Nobody tells you this..."', 'Hook copied from #1 post', 96],
    ['3 mistakes killing your reach', 'Pattern: list + proof', 93],
    ['How I got my first 10 clients', 'Story format · trending', 91],
  ] as const,
  record: [
    ['MON', 'The 3-second hook', 'Talking head · 45s'],
    ['WED', 'Client result breakdown', 'Story · 60s'],
    ['FRI', 'Mistake #1 explained', 'List · 30s'],
  ] as const,
  script: [
    ['HOOK', 'Stop posting blind.'],
    ['BODY', "Here's what the top 1% in your space did this week..."],
  ] as const,
};

// Spoken script, chunked for on-screen captions. [startFrame, words]
export const captions: [number, string][] = [
  [0, 'Yeah so okay'],
  [30, 'this thing right here'],
  [60, "it's basically"],
  [80, 'an automation'],
  [100, 'that goes out'],
  [120, 'and finds'],
  [135, 'every top'],
  [150, 'account'],
  [165, 'in your space'],
  [190, 'It pulls'],
  [210, "whatever's"],
  [225, 'actually'],
  [240, 'working for them'],
  [255, 'right now'],
  [275, 'And then'],
  [290, 'it breaks it'],
  [305, 'down for you'],
  [320, "like here's"],
  [335, "the hook here's"],
  [360, 'the pattern'],
  [375, "here's"],
  [385, 'why it worked'],
  [405, "So you're"],
  [415, 'not sitting'],
  [430, 'guessing what'],
  [445, 'to post anymore'],
  [470, "you're literally"],
  [490, 'just'],
  [500, 'looking at it'],
  [520, 'And so'],
  [530, 'you basically'],
  [545, 'always know'],
  [560, "what's working"],
  [575, 'before'],
  [585, 'anyone else'],
  [605, "And then it'll"],
  [620, 'even plan out'],
  [640, 'what you need'],
  [655, 'to record'],
  [675, 'what you need'],
  [690, 'to say'],
  [705, 'and post'],
  [725, 'the finished'],
  [740, 'video for you'],
  [760, 'If you check'],
  [772, 'this out'],
  [780, 'it can'],
  [795, 'even edit'],
  [810, 'your videos'],
  [825, 'for you'],
  [840, "I mean it's"],
  [855, 'absolutely'],
  [865, 'insane'],
  [875, 'And it'],
  [885, 'even posts'],
  [900, 'everywhere'],
  [915, '5 posts free'],
];

// Checklist steps tick off at these frames.
export const steps: [string, number][] = [
  ['Find top accounts', 180],
  ['Break down what works', 400],
  ['Plan what to record', 700],
  ['Edit your videos', 840],
  ['Post everywhere', 905],
];
