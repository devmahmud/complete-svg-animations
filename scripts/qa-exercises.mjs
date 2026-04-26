// One-shot QA: for every exercise in the registry, verify
//   1. the starter (initialCode) FAILS the structural check
//   2. the solution PASSES the structural check
// Usage: node scripts/qa-exercises.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { DOMParser as Linkedom } from 'linkedom';

// Mirror the runtime checker exactly.
const IGNORED_ATTRS = new Set(['style']);

function parseSvg(source) {
  const m = source.match(/<svg[\s\S]*?<\/svg>/i);
  if (!m) return null;
  const wrapped = `<root xmlns="http://www.w3.org/2000/svg">${m[0]}</root>`;
  const doc = new Linkedom().parseFromString(wrapped, 'image/svg+xml');
  if (doc.querySelector('parsererror')) return null;
  return doc.querySelector('svg');
}

function normalizeNumeric(v) {
  return v
    .replace(/\s+/g, ' ')
    .replace(/(\d)\.0+(?=\D|$)/g, '$1')
    .trim();
}

function normalizeNode(node) {
  const attrs = {};
  for (const a of Array.from(node.attributes)) {
    if (IGNORED_ATTRS.has(a.name)) continue;
    attrs[a.name] = normalizeNumeric(a.value);
  }
  const children = [];
  for (const c of Array.from(node.children)) children.push(normalizeNode(c));
  return { tag: node.tagName.toLowerCase(), attrs, children };
}

function nodesMatch(target, candidate) {
  if (target.tag !== candidate.tag) {
    return { ok: false, reason: `tag: <${target.tag}> vs <${candidate.tag}>` };
  }
  for (const k of Object.keys(target.attrs)) {
    if (candidate.attrs[k] === undefined) {
      return { ok: false, reason: `<${target.tag}> missing "${k}"` };
    }
    if (k === 'class') {
      const exp = new Set(target.attrs[k].split(/\s+/).filter(Boolean));
      const act = new Set(candidate.attrs[k].split(/\s+/).filter(Boolean));
      for (const c of exp) {
        if (!act.has(c)) return { ok: false, reason: `<${target.tag}> missing class "${c}"` };
      }
      continue;
    }
    if (candidate.attrs[k] !== target.attrs[k]) {
      return { ok: false, reason: `<${target.tag}> ${k}: "${candidate.attrs[k]}" vs "${target.attrs[k]}"` };
    }
  }
  if (target.children.length > candidate.children.length) {
    return { ok: false, reason: `<${target.tag}> child count` };
  }
  let ci = 0;
  for (const t of target.children) {
    let matched = false;
    while (ci < candidate.children.length) {
      const c = candidate.children[ci];
      ci += 1;
      if (c.tag === t.tag) {
        const r = nodesMatch(t, c);
        if (r.ok) { matched = true; break; }
        return r;
      }
    }
    if (!matched) return { ok: false, reason: `<${target.tag}> missing <${t.tag}>` };
  }
  return { ok: true };
}

function check(user, sol) {
  const e = parseSvg(sol);
  const a = parseSvg(user);
  if (!e) return { ok: false, reason: 'unparsable solution' };
  if (!a) return { ok: false, reason: 'unparsable user' };
  return nodesMatch(normalizeNode(e), normalizeNode(a));
}

// Extract exercises from registry.ts via lightweight parser. The file's exercise
// objects are simple: { id, title, description, initialCode, solution }.
const __dirname = dirname(fileURLToPath(import.meta.url));
const registrySrc = readFileSync(resolve(__dirname, '../src/content/registry.ts'), 'utf8');

// Match each exercise object literal as a span containing id/title/initialCode/solution.
function extractExercises(src) {
  const out = [];
  // Find every `id: 'ex-...'` and walk the surrounding object.
  const re = /\{\s*id:\s*'(ex-[\w-]+)',\s*title:\s*'([^']*)',\s*description:\s*'([^']*)',\s*initialCode:\s*`([\s\S]*?)`,\s*solution:\s*`([\s\S]*?)`,\s*\}/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    out.push({
      id: m[1],
      title: m[2],
      initialCode: m[4],
      solution: m[5],
    });
  }
  return out;
}

const exercises = extractExercises(registrySrc);
console.log(`Found ${exercises.length} exercises\n`);

let passed = 0;
let starterAutoPass = 0;
let solutionFails = 0;
const issues = [];

for (const ex of exercises) {
  const starterCheck = check(ex.initialCode, ex.solution);
  const solutionCheck = check(ex.solution, ex.solution);

  const starterOK = !starterCheck.ok;     // we WANT starter to fail
  const solutionOK = solutionCheck.ok;     // we WANT solution to pass

  if (starterOK && solutionOK) {
    passed += 1;
  } else {
    if (!starterOK) starterAutoPass += 1;
    if (!solutionOK) solutionFails += 1;
    issues.push({
      id: ex.id,
      title: ex.title,
      starter: starterOK ? 'ok' : `AUTO-PASS (${starterCheck.reason || 'starter passes the checker'})`,
      solution: solutionOK ? 'ok' : `FAIL (${solutionCheck.reason || 'solution rejected'})`,
    });
  }
}

console.log(`PASS: ${passed}/${exercises.length}`);
console.log(`Starter auto-passes: ${starterAutoPass}`);
console.log(`Solution rejected: ${solutionFails}\n`);

if (issues.length) {
  console.log('Issues:');
  for (const i of issues) {
    console.log(`\n  ${i.id} — ${i.title}`);
    console.log(`    starter:  ${i.starter}`);
    console.log(`    solution: ${i.solution}`);
  }
}

process.exit(issues.length ? 1 : 0);
