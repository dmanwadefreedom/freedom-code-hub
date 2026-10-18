# Grow My Social Content Engine Ad

**For:** growmysocial.app (Dylan, Alberto, Sam)
**Format:** 30s, 9:16, 1080x1920. Selfie talking head on top, animated product dashboard below.
**Built with:** Remotion (video from code). Every scene is ours. No footage, face, logo or words from the reference ad.
**Reference:** a School of Hard Knocks "Content Engine" ad (Oct 18). We matched the *layout, beats and timing* only.

## Why the beats changed

The reference ad promises competitor scraping, auto video editing and auto posting. Grow My Social does not do those. Running his claims on our product is a false ad, and Meta pulls those. So every beat was swapped for what the site actually says it does:

| His beat | Ours |
|---|---|
| Finds every top competitor | Tell it about your business (offer, audience, goal) |
| Pulls what's working for them | AI builds the ideas (30 days, Teach / Help / Connect / Invite) |
| Hook, pattern, why it worked | Hook, pattern, why it fits your offer |
| Guessing what to post? | Same. The site uses this exact line. |
| Already proven to work | Your week, taking shape (the site's own calendar) |
| Trend radar | Draft you can edit. Your voice. Your final say. |
| What to record / what to say | Short-video script for IG, TikTok, YouTube |
| Auto-edit | (cut, product does not edit video) |
| Posts everywhere | Approve, then schedule through Zernio |
| Follow your boy | 5 posts free. No card. |

Brand pulled from the live site: accent `#6030ec`, text `#13112a`, white panels, purple leaf logo, Inter. Demo business and week are the site's own example.

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
Okay so this thing right here is an AI social media manager.
You tell it about your business. Your offer, your people, how you talk.
Then it builds your ideas. Topics, hooks, angles.
Here's the hook. Here's the topic. Here's why it fits.
So you're not guessing what to post anymore.
You're looking at your week, already planned.
Every post is a draft you can edit. Your voice. Your final say.
It even writes your short video scripts.
Then you approve it and schedule it out.
Five posts free. No card. Link in bio.
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

- "Schedule it out" is the $300 plan through Zernio. The ad says "approve it and schedule it out" and the final scene says "Scheduled through Zernio when you ask." Keep that line.
- "5 posts free, no card" is on the site today. If pricing changes, change `brand.ts` and the script.
- No numbers in the ad are performance claims. The "30" is 30 days of content, which is the site's headline.

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
