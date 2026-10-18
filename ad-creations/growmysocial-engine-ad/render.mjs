// Render the Grow My Social Content Engine ad.
//   node render.mjs                              -> out/engine-ad-light.mp4 (placeholder face)
//   node render.mjs --theme dark                 -> out/engine-ad-dark.mp4
//   node render.mjs --face selfie.mp4            -> your clip on top
//   node render.mjs --still 300                  -> out/still-300.png (QA a single frame)
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const arg = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const shell = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = process.env.CHROME_PATH || (fs.existsSync(shell) ? shell : undefined);

fs.mkdirSync('out', {recursive: true});
const publicDir = path.resolve('public');
fs.mkdirSync(publicDir, {recursive: true});

const theme = arg('--theme') === 'light' ? 'light' : 'dark';
let faceSrc = '';
const face = arg('--face');
if (face) {
  fs.copyFileSync(face, path.join(publicDir, 'face.mp4'));
  faceSrc = 'face.mp4';
}

const serveUrl = await bundle({entryPoint: path.resolve('src/index.tsx'), publicDir});
const inputProps = {faceSrc, theme};
const composition = await selectComposition({serveUrl, id: 'EngineAd', inputProps, browserExecutable});
composition.props = inputProps;

if (args.includes('--still')) {
  const frame = Number(arg('--still') || 0);
  const output = `out/still-${theme}-${frame}.png`;
  await renderStill({composition, serveUrl, frame, output, inputProps, browserExecutable});
  console.log(output);
} else {
  const outputLocation = `out/engine-ad-${theme}${faceSrc ? '-face' : ''}.mp4`;
  await renderMedia({composition, serveUrl, codec: 'h264', outputLocation, inputProps, browserExecutable, concurrency: 4});
  console.log(outputLocation);
}
