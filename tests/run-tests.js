'use strict';
// Tests the review flags against the README's Testing section: clean
// exchanges stay quiet, each flag fires on its trigger, negatives stay quiet.
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const prefix = script.slice(0, script.indexOf('// ===PARSE-END==='));
const { wordCount, reviewExchange } = new Function(prefix + '; return { wordCount, reviewExchange };')();

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log('ok   ' + name); }
  else { fail++; console.log('FAIL ' + name); }
}
function titles(r) { return r.flags.map((f) => f.title); }

const clean = reviewExchange('Summarize this article in a few sentences.', 'The article describes a caching approach that halves lookup time for repeated queries.');
check('clean exchange produces zero flags', clean.flags.length === 0);

check('wordCount counts whitespace-separated tokens', wordCount('one two three') === 3);

check('bullets requested, prose answer: format flag', titles(reviewExchange('Give me a bulleted list of five project risks.', 'The main risks are schedule slips and scope creep.')).includes('Format: list requested'));
check('bullets requested, bulleted answer: no format flag', !titles(reviewExchange('Give me a bulleted list of five project risks.', '- Schedule slips\n- Scope creep\n- Budget overrun')).includes('Format: list requested'));
check('table requested, no table: format flag', titles(reviewExchange('Show the comparison in a table.', 'A is faster but B is cheaper.')).includes('Format: table requested'));
check('table requested, table given: no format flag', !titles(reviewExchange('Show the comparison in a table.', '| Tool | Price |\n| A | 10 |')).includes('Format: table requested'));
check('email requested, no greeting: format flag', titles(reviewExchange('Draft an email to my landlord about the water leak.', 'The leak started on Tuesday and has gotten worse since.')).includes('Format: email requested'));
check('email requested, greeting present: no format flag', !titles(reviewExchange('Draft an email to my landlord about the water leak.', 'Dear Mr Sharma,\nThe leak started on Tuesday.')).includes('Format: email requested'));
check('JSON requested, prose answer: format flag', titles(reviewExchange('Return the result as JSON.', 'The result is ready.')).includes('Format: JSON requested'));
check('JSON requested, JSON given: no format flag', !titles(reviewExchange('Return the result as JSON.', '{"status": "ready"}')).includes('Format: JSON requested'));

check('word count far off target: length flag', titles(reviewExchange('Write this in 100 words.', 'Too short.')).includes('Length: word count off'));
const onTarget = Array(95).fill('word').join(' ');
check('word count near target: no length flag', !titles(reviewExchange('Write this in 100 words.', onTarget)).includes('Length: word count off'));

check('unsourced percentage: numbers flag', titles(reviewExchange('Summarize remote work trends.', 'Remote work rose 40% in a decade.')).includes('Numbers without a source'));
check('sourced figure: no numbers flag', !titles(reviewExchange('Summarize remote work trends.', 'According to the annual report, remote work rose 40%.')).includes('Numbers without a source'));

check('piled-up absolutes: absolute-claims flag', titles(reviewExchange('Explain why this is better.', 'It is always faster and never fails. It is guaranteed to work and undoubtedly the best.')).includes('Absolute claims'));
check('single soft claim: no absolute-claims flag', !titles(reviewExchange('Explain why this is better.', 'It is often faster in practice.')).includes('Absolute claims'));

check('citation-shaped text: citation flag', titles(reviewExchange('Summarize the research.', 'Studies show this works [1]. Smith et al. agree (2020).')).includes('Citation-shaped text'));
check('first-person experience: flag', titles(reviewExchange('Describe caching.', 'In my experience, caching helps a lot.')).includes('First-person experience claims'));

check('three questions, tiny answer: coverage flag', titles(reviewExchange('What is it? How does it work? Who uses it?', 'It is a cache.')).includes('Coverage: multiple questions'));

check('medical topic, no caveat: advice flag', titles(reviewExchange('What medicine should I take for a headache?', 'Take two tablets of paracetamol with water.')).includes('Advice domain, no caveat'));
check('medical topic, caveat present: no advice flag', !titles(reviewExchange('What medicine should I take for a headache?', 'Consult a doctor first; they may suggest paracetamol.')).includes('Advice domain, no caveat'));

check('every flag carries a title and body', reviewExchange('Give me a list and a table and JSON in 100 words. What is it? Who uses it?', 'It always works, never fails, 90% guaranteed. In my experience.').flags.every((f) => f.title && f.body));

console.log('\n' + (pass + fail) + ' cases, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
