# Grow My Social Content Engine Ad

**For:** growmysocial.app (Dylan, Alberto, Sam)
**Format:** 30s, 9:16, 1080x1920. Selfie talking head on top, animated product dashboard below.
**Built with:** Remotion (video from code). Every scene is ours. No footage, face, logo or words from the reference ad.
**Reference:** a School of Hard Knocks "Content Engine" ad (Oct 18). We matched the *layout, beats and timing* only.

## The beats (1:1 with the reference)

Layout, timing and motion are the reference ad's, measured frame by frame and scaled from 720x1280 to 1080x1920. Only the colors and the brand changed.

| What matches | Detail |
|---|---|
| Selfie card | 380x503 at top-left, 2px accent border, outer glow, blue audio dot, name tag bottom-left |
| Captions | 1-3 words, 52px heavy, white, pop in on each phrase |
| Checklist card | 465x503 at top-right, logo + small-caps brand + "AUTOMATION ON", 5 steps, active step boxed, done steps get a filled check |
| Dashboard band | sits between y=772 and y=1330, bottom third of the frame stays empty with the glow |
| Scene 1 | window chrome (three dots, mono path, IDLE/RUNNING pill), three buttons, cursor moves and clicks Analyze with a ripple |
| Scene 2 | radar with rings, crosshair, sweeping wedge, YOU dot, white and red dots popping, count to 46, three competitor rows with mono counts |
| Scene 3 | WORKING RIGHT NOW pill, three phone cards at staggered heights, counts rolling up, +% in accent |
| Scene 4 | left phone with corner brackets and "ANALYZING… 94%" progress, right cards fill from skeleton bars to text, Hook/Problem/Proof/CTA chips, 71% / x4.2 / +380% |
| Scene 5 | "Guessing what to post?" with floating question marks and a post box that types then deletes |
| Scene 6 | "Already proven to work" rows with score + SCORE label, third row dimmed and blurred |
| Scene 7 | trend chart with gridlines, line draws in, YOU pill, Day 1/7/14/21 |
| Scene 8 | "What to record" rows with MON/WED/FRI chips and red REC, then "What to say" with HOOK/BODY lines typing |
| Scene 9 | Auto-Edit window, task list ticking, V1/TXT/SFX timeline with clips lighting up under a playhead |
| Scene 10 | "Your video" phone fanning out to TikTok / Instagram / YouTube / LinkedIn / Facebook, then the CTA |

Dylan confirmed (Oct 18) the product does competitor scanning, auto-edit and posting, so every beat stays. All stats on screen are example numbers. Competitor handles are made up.

**Landing page check before paid spend:** growmysocial.app today only talks about ideas, drafts and scheduling through Zernio. Meta reads the ad against the landing page. If the ad shows competitor scanning and auto-edit, the page should mention them too, or the ad can get flagged for a mismatch. One section on the site fixes that.

Brand pulled from the live site: accent `#6030ec`, purple leaf logo, Inter. Dark palette is the reference's near-black with the warm glow swapped to purple.

## Two versions

| File | Look | Test it as |
|---|---|---|
| `out/engine-ad-dark.mp4` | Reference look, in purple (default) | A. Proven look, run this first |
| `out/engine-ad-light.mp4` | Same layout on the site's white | B. Matches the landing page |

Run both as separate ad sets for a week. Keep the one with the better 3-second hold and click rate.

## 1. Record the selfie (about 30 seconds, phone)

Vertical. Face in the top half. Window light in front of you. Point down at "the screen" a couple of times. One take is fine.

**Script (his, word for word, with our CTA):**

```
Yeah so okay, this thing right here, it's basically an automation
that goes out and finds every top account in your space.
It pulls whatever's actually working for them right now.
And then it breaks it down for you. Like here's the hook, here's the pattern, here's why it worked.
So you're not sitting guessing what to post anymore. You're literally just looking at it.
And so you basically always know what's working before anyone else.
And then it'll even plan out what you need to record, what you need to say,
and post the finished video for you.
If you check this out, it can even edit your videos for you. I mean it's absolutely insane.
And it even posts everywhere.
Five posts free. Link in bio.
```

It runs 31 seconds at his pace. Captions and checklist ticks are timed to it, phrase by phrase, in `src/brand.ts`.

Three faces? Record the same script three times, one each for Dylan, Alberto and Sam. Render three ads. Same dashboard, different face. That is three creatives for the price of one build, and Meta likes fresh faces in the same campaign.

Captions and checklist ticks are timed to this script. If a take runs long or short, change the frame numbers in `src/brand.ts` (30 frames = 1 second).

## 2. Render

```
npm install
node render.mjs --face dylan.mp4                  # dark (default), Dylan
node render.mjs --face alberto.mp4 --theme light  # light, Alberto
node render.mjs --still 300                       # one frame, for QA
```

Your selfie audio is the ad audio. Add music after, from IG's own library so it stays licensed.

## 3. QA before it runs

Pull frames and check: captions not cut off, spelling right, face not covered, nothing important in the top 220px or bottom 340px (IG UI sits there).

## 4. Claims to keep straight

- Every number on screen is example data and says so. Never swap in real client numbers unless they are real and you can back them up.
- "5 posts free, no card" is on the site today. If pricing changes, change `brand.ts` and the script.
- Match the landing page to the ad (see "The beats" above).

## 5. SEO pack

**Main keyword:** AI social media manager
**Support:** what to post on social media, social media content plan, content ideas for small business, AI content planner

### YouTube Shorts
- **Titles (test 2):**
  1. AI Social Media Manager: 30 Days of Content Without 30 Days of Work
  2. Stop Guessing What to Post (AI Plans Your Week)
  3. What to Post on Social Media When You Run a Business
- **Description:**
  ```
  Grow My Social is an AI social media manager for small businesses, coaches,
  creators and service brands. Tell it about your business, get 30 days of
  content ideas, edit the drafts in your own voice, and schedule what you approve.

  5 posts free. No card. growmysocial.app

  #aisocialmediamanager #socialmediacontent #contentplan #smallbusinessmarketing #whattopost
  ```

### Instagram / Facebook caption
```
Guessing what to post this week? 👇

Tell it about your business.
It builds your ideas, writes the drafts, and plans your week.
You edit. You approve. Your voice.

5 posts free. No card. Link in bio.

#aisocialmediamanager #whattopost #contentplan #smallbusinessowner #coachlife
```

### On-site embed (growmysocial.app)
Put the video on its own page with the transcript under it. Add this in the page `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "AI Social Media Manager: 30 Days of Content Without 30 Days of Work",
  "description": "Grow My Social turns your business into a content plan. Tell it your offer and audience, get ideas, edit drafts in your voice, and schedule what you approve.",
  "thumbnailUrl": "https://growmysocial.app/media/engine-ad-thumb.jpg",
  "uploadDate": "2026-10-18",
  "duration": "PT30S",
  "contentUrl": "https://growmysocial.app/media/engine-ad.mp4"
}
</script>
```
Swap the two URLs for where the video and thumbnail live, and set `uploadDate` to the real publish date.

## 6. Where the code should live

The growmysocial.app code is not in `growfaster` (that repo is GrowFaster, a different brand). It is not in any repo I could see. This folder lives in `freedom-code-hub/ad-creations/` for now. Move the folder into the Grow My Social repo when you point me at it.
