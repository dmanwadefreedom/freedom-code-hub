# Grow My Social Content Engine Ad

**For:** growmysocial.app (Dylan, Alberto, Sam)
**Format:** 30s, 9:16, 1080x1920. Selfie talking head on top, animated product dashboard below.
**Built with:** Remotion (video from code). Every scene is ours. No footage, face, logo or words from the reference ad.
**Reference:** a School of Hard Knocks "Content Engine" ad (Oct 18). We matched the *layout, beats and timing* only.

## The beats

Same 10 beats as the reference, in Grow My Social branding. Dylan confirmed (Oct 18) the product does competitor scanning, auto-edit and posting, so all of his beats stay in.

1. Competitor Intelligence (Scout → Analyze → Publish)
2. Radar finds the top accounts in your space (counter to 48)
3. "Working right now" videos with view counts
4. Hook / pattern / why it worked
5. Guessing what to post?
6. Already proven to work (scored hooks)
7. Trend radar, know what works first
8. What to record / what to say
9. Auto-edit timeline (cuts, captions, b-roll, sound)
10. Posts everywhere → Build My Content Plan, 5 posts free

All stats on screen are example numbers and are labeled "example data". Competitor handles are made up.

**Landing page check before paid spend:** growmysocial.app today only talks about ideas, drafts and scheduling through Zernio. Meta reads the ad against the landing page. If the ad shows competitor scanning and auto-edit, the page should mention them too, or the ad can get flagged for a mismatch. One section on the site fixes that.

Brand pulled from the live site: accent `#6030ec`, text `#13112a`, white panels, purple leaf logo, Inter.

## Two versions

| File | Look | Test it as |
|---|---|---|
| `out/engine-ad-light.mp4` | White and purple, same as the site | A. Lands people on a page that looks the same |
| `out/engine-ad-dark.mp4` | Dark purple, like the reference | B. Reads more "tech product" in the feed |

Run both as separate ad sets for a week. Keep the one with the better 3-second hold and click rate.

## 1. Record the selfie (about 30 seconds, phone)

Vertical. Face in the top half. Window light in front of you. Point down at "the screen" a couple of times. One take is fine.

**Script (6th grade, one thought per line):**

```
Okay so this thing right here is an automation.
It goes out and finds the top accounts in your space.
It pulls what's actually working for them right now.
Then it breaks it down. Here's the hook. Here's the pattern. Here's why it worked.
So you're not guessing what to post anymore. You're just looking at it.
You know what works before anyone else.
Then it plans what to record and what to say.
It even edits the video for you. Cuts, captions, b-roll.
Then it posts it everywhere.
Five posts free. Link in bio.
```

Three faces? Record the same script three times, one each for Dylan, Alberto and Sam. Render three ads. Same dashboard, different face. That is three creatives for the price of one build, and Meta likes fresh faces in the same campaign.

Captions and checklist ticks are timed to this script. If a take runs long or short, change the frame numbers in `src/brand.ts` (30 frames = 1 second).

## 2. Render

```
npm install
node render.mjs --face dylan.mp4                  # light, Dylan
node render.mjs --face alberto.mp4 --theme dark   # dark, Alberto
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
