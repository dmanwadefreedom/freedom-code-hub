# Winner Tracker — Steal the Angle, Not the Ad

**Source reel:** https://www.facebook.com/share/r/1KAVsfAAq5/ (62s, saved Oct 17, 2026)
**Status:** Ready to run. Needs our competitor list filled in.

---

## The idea (from the reel)

Big creators split test their titles + thumbnails (YouTube "Test & Compare").
When the test ends, the title or thumbnail **quietly changes**. The version that stays = the one that won.

So we let AI watch them every hour. When something changes and sticks, we grab that angle and use it in our reels + ads. They paid for the test. We get the answer for free.

**The rule from the reel:** pick creators with the **same target market** as us. Not just the same topic.

**What we DON'T do:** the reel opens with Kalshi using AI to clone a real guy's video and swap his face. That's the line. We take the *angle* (the hook, the pain point, the framing). We never copy their thumbnail, their face, or their words.

---

## Freedom Code version

| Reel says | We do |
|---|---|
| YouTube titles + thumbnails | YouTube titles/thumbnails **+ Meta Ad Library** (see Upgrade below) |
| Same target market | Creators talking to people stuck in Fight/Flight/Freeze/Fawn: nervous system, trauma patterns, people-pleasing, self-sabotage |
| Adapt title → ad copy | Winning angle → Controller / Runner / Ghost / Chameleon hook → reel + ad → quiz link |

### Competitor watchlist (fill in, 8–12 max)
Pick channels whose audience = our quiz takers. Check each one:
- [ ] Same audience (not just same topic)
- [ ] Posts at least weekly
- [ ] Has real views (10K+ per video)

```
@__________   @__________   @__________
@__________   @__________   @__________
@__________   @__________   @__________
```

---

## The prompt (copy into Claude + Apify)

Rebuilt from the reel and adapted for us:

```
Build the monitor. For a nervous-system / trauma-pattern coach selling a $47 program.

1. Monitor these YouTube channels: [PASTE WATCHLIST].
2. Use Apify or the YouTube Data API. Resolve channel IDs. Baseline up to
   20 recent long-form videos per channel.
3. Check hourly. Optional 15-minute watchlist for brand-new uploads
   (first 48 hrs is when most tests run). Estimate cost before scheduling.
4. Save video ID, exact title, thumbnail image hash, UTC time and public
   views in a database. Keep each title + image together as one pair.
5. Append every change. Keep old versions. Log reversions. Ignore
   URL-only changes and failed fetches.
6. Shortlist changed pairs that stayed the same for 7+ days with no
   reversion and no gaps in checks. Label them "observed kept" — never
   call them confirmed winners.
7. For each one return: before/after images, source link, and one
   sentence on the concept that changed. Compare its views to
   similar-age videos from the same channel.
8. Then map each kept angle to one of our 4 patterns (Controller,
   Runner, Ghost, Chameleon) and write 3 hook options for a reel and
   1 Meta ad headline. Change the wording. Don't copy their title.
```

---

## Upgrade: track their ads too (better than the reel)

The reel only watches YouTube. For **Facebook/IG ads and Marketplace-style ads**, the Meta Ad Library is better. It's public and free:
- Shows every ad a page is running right now
- Shows **start date**. An ad running **30+ days** is almost always making money (nobody keeps paying for a loser)
- Apify has Facebook Ad Library scrapers, so the same monitor can check it daily

Add this to the prompt:
```
9. Also pull active ads from the Meta Ad Library for the same creators'
   Facebook pages. Flag any ad running 30+ days. Save copy, creative,
   start date. Treat long-running ads as "observed kept" too.
```

---

## 3 test versions (pick a winner, don't stop at one)

| Version | What it watches | Cost | Best for |
|---|---|---|---|
| **A — Reel exact** | YouTube titles + thumbnails, hourly | Low (Apify free tier may cover it) | Reel hooks + thumbnails |
| **B — Ads only** | Meta Ad Library, daily | Low | Paid ads + ad copy |
| **C — Both** (recommended) | A + B in one database, weekly summary | Low–med | Full system |

Run C for 2 weeks. Each week, make 2–3 reels from the top angles. Keep whichever one drives the most quiz starts.

---

## Where it plugs into the funnel

`Winner Tracker → angle → pattern hook → Reel / Ad → Quiz → Email gate → $47 Pattern Reset`

## AI can take over
- Claude + Apify runs the watching (hourly, hands off)
- Claude writes the weekly "kept angles" report + hook drafts
- Higgsfield / Canva can turn the top hook into a first-draft reel or ad image
- You only approve what goes live
