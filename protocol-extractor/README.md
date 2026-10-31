# protocol-extractor

Pull everything a creator has posted for free (YouTube transcripts, blog posts,
podcast show notes, sales pages) and distill it into one buyer's dossier:

- the protocol, reconstructed step by step, with the source each step came from
- products, supplements and doses, and whether the creator sells them
- every claim, with a short verbatim quote and timestamp
- the evidence they cite, and whether it is specific enough to check
- what they say is "in the program" but never give away
- offers, prices, red flags, contradictions
- gaps: what you still would not know after all the free content
- bottom line: does the free stuff already contain the protocol, and what would buying add

Use it before you buy. If the dossier shows the protocol is already public, you saved money.
If it shows real gaps, you know exactly what you are paying for.

## Setup

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...   # or run `ant auth login`
```

## Run

```bash
# whole channel + their site
python3 extract.py --channel "https://www.youtube.com/@creator" \
                   --url "https://creator.com/the-protocol" --max-videos 40 --name creator

# don't know the channel yet: search YouTube
python3 extract.py --search "creator name 40 day fast teeth" --max-videos 25 --name creator

# one specific video or podcast page
python3 extract.py --video "https://youtu.be/XXXX" --url "https://podcast.com/ep-12"

# no API key yet: dump transcripts only, paste into Claude later
python3 extract.py --search "creator name" --no-llm --name creator
python3 extract.py --distill-only --name creator      # distill later when you have a key
```

Output in `out/<name>/`: `raw/` (one markdown per source), `per_source/` (JSON per
source), `dossier.md` (the report), `dossier.json`. Runs are resumable: already
distilled sources are skipped.

## How it works

1. Collect: yt-dlp lists the videos, the YouTube captions API pulls transcripts
   (auto-captions included), trafilatura pulls article text. No video downloads.
2. Distill: one Claude call per source with a strict JSON schema (claims, steps,
   products, evidence, paywall hints, offers, red flags). Transcripts are treated as
   untrusted data.
3. Merge: one final call turns all the per-source JSON into `dossier.md`.

Default model is `claude-opus-5-5` with server-side refusal fallback. Pass `--model`
to change it. Cost is roughly a few cents per hour of video.

## No-code alternative

If you would rather not run Python, the Apify actor `johnvc/YoutubeTranscripts`
takes a channel URL plus `max_videos` and returns every transcript in one run
(about a quarter of a cent per video). Paste the output into Claude with the
prompts in `extract.py` (`SYSTEM` and `MERGE_SYSTEM`).

## Notes

- Only pulls content that is already public. It does not touch paid courses.
- The red-flags section always records any fast length claimed and whether the
  creator mentions medical supervision, electrolytes, refeeding, or who should not fast.
