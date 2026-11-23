# AI Answer Review

Paste the prompt you gave an AI and the answer it gave back. Get a checklist of things worth a human look, then record your own review. The tool points; you judge.

## Why this exists

AI answers often get reused after only a skim. This tool gives an answer a structured once-over before reuse: it points at things worth a human look, and turns the reviewer's own judgement into a record they can keep.

## What it does

- **Format checks.** If the prompt asks for bullets, a table, a word count, an email or JSON, the tool checks whether the answer actually has that shape, and flags the gap when it does not.
- **Numbers without a source.** Lines with percentages or money amounts are flagged when the answer names no source, so each number gets verified before it is reused.
- **Absolute claims.** Wording like "always", "never", "guaranteed" is flagged when it piles up, so each strong claim gets a second look.
- **Citation-shaped text.** "[1]", "according to studies", "et al." and similar patterns are flagged, so each reference gets confirmed before it is cited.
- **First-person phrasing.** "In my experience" is flagged: fine in your own draft voice or a quotation, worth rewording when it reads as the AI claiming real experience.
- **Coverage.** Several questions in one prompt with a brief answer gets a flag to check each question got its own answer. Short can still be complete.
- **Advice domains.** When a prompt touches a medical, legal or financial topic and the answer carries no professional caveat, the tool flags it, so the reviewer can consider whether a qualifier or professional review fits how the answer will be used.
- **Your review record.** Five dimensions (instructions followed, accuracy as far as you can verify, completeness, tone, safe to use), each marked Holds up / Needs a fix / Failed with your own notes, copied out as a clean record. The record never totals your marks and never says ship or revise.

## Privacy

Everything runs in the page on your device. Nothing you paste is sent anywhere, saved, or kept after you leave.

## What this tool does not do

- It does not check facts. Flags are places to look, and the accuracy call stays with the reviewer.
- Heuristics miss real problems and occasionally flag fine answers. An answer with zero flags is not a good answer by default.
- It makes no claim about which AI model wrote the answer or how any model scores quality internally.
- It never totals your marks and never says whether to ship or revise.

## Testing

The checks are tested against clean exchanges that should produce zero flags, format misses (bullets, table, word count, email, JSON), sourced and unsourced statistics, absolute-claim language, citation-shaped text, first-person experience claims, multi-question coverage gaps, and advice-domain answers with and without caveats, including the negative cases that must stay quiet.

## Status and roadmap

v1. Ideas under consideration: saving review sessions, comparing two answers to the same prompt, team review templates.

## Credits

Maintained by Shivangi Priya.
