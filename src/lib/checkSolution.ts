export type CheckResult =
  | { ok: true }
  | { ok: false; reason: string };

const IGNORED_ATTRS = new Set(['style']);

interface NormalizedNode {
  tag: string;
  attrs: Record<string, string>;
  children: NormalizedNode[];
}

function parseSvg(source: string): SVGSVGElement | null {
  const svgMatch = source.match(/<svg[\s\S]*?<\/svg>/i);
  if (!svgMatch) return null;
  const wrapped = `<root xmlns="http://www.w3.org/2000/svg">${svgMatch[0]}</root>`;
  const doc = new DOMParser().parseFromString(wrapped, 'image/svg+xml');
  const err = doc.querySelector('parsererror');
  if (err) return null;
  return doc.querySelector('svg') as SVGSVGElement | null;
}

function normalizeNumeric(value: string): string {
  // Collapse runs of whitespace and remove trailing zeros from decimals.
  return value
    .replace(/\s+/g, ' ')
    .replace(/(\d)\.0+(?=\D|$)/g, '$1')
    .trim();
}

function normalizeNode(node: Element): NormalizedNode {
  const attrs: Record<string, string> = {};
  for (const a of Array.from(node.attributes)) {
    if (IGNORED_ATTRS.has(a.name)) continue;
    attrs[a.name] = normalizeNumeric(a.value);
  }
  const children: NormalizedNode[] = [];
  for (const child of Array.from(node.children)) {
    children.push(normalizeNode(child));
  }
  return { tag: node.tagName.toLowerCase(), attrs, children };
}

function nodesMatch(target: NormalizedNode, candidate: NormalizedNode): CheckResult {
  if (target.tag !== candidate.tag) {
    return { ok: false, reason: `Expected <${target.tag}> but found <${candidate.tag}>.` };
  }
  for (const key of Object.keys(target.attrs)) {
    const expected = target.attrs[key];
    const actual = candidate.attrs[key];
    if (actual === undefined) {
      return { ok: false, reason: `<${target.tag}> is missing the "${key}" attribute.` };
    }
    // For class, require every class in target to also appear in candidate;
    // candidate may have extras. Order-insensitive.
    if (key === 'class') {
      const expectedSet = new Set(expected.split(/\s+/).filter(Boolean));
      const actualSet = new Set(actual.split(/\s+/).filter(Boolean));
      for (const c of expectedSet) {
        if (!actualSet.has(c)) {
          return {
            ok: false,
            reason: `<${target.tag}> is missing class "${c}".`,
          };
        }
      }
      continue;
    }
    if (actual !== expected) {
      return {
        ok: false,
        reason: `<${target.tag}> has ${key}="${actual}" — expected "${expected}".`,
      };
    }
  }
  if (target.children.length > candidate.children.length) {
    return {
      ok: false,
      reason: `<${target.tag}> is missing ${target.children.length - candidate.children.length} child element(s).`,
    };
  }
  // Children must appear in order; allow extra siblings on the candidate side.
  let ci = 0;
  for (const tChild of target.children) {
    let matched = false;
    while (ci < candidate.children.length) {
      const cChild = candidate.children[ci];
      ci += 1;
      if (cChild.tag === tChild.tag) {
        const r = nodesMatch(tChild, cChild);
        if (r.ok) {
          matched = true;
          break;
        }
        return r;
      }
    }
    if (!matched) {
      return { ok: false, reason: `<${target.tag}> is missing a <${tChild.tag}> child.` };
    }
  }
  return { ok: true };
}

export function checkSolution(userCode: string, solutionCode: string): CheckResult {
  const expected = parseSvg(solutionCode);
  const actual = parseSvg(userCode);

  if (!expected) {
    return { ok: false, reason: 'Reference solution could not be parsed.' };
  }
  if (!actual) {
    return { ok: false, reason: 'Your SVG could not be parsed — check your tags.' };
  }

  const expectedNorm = normalizeNode(expected);
  const actualNorm = normalizeNode(actual);

  return nodesMatch(expectedNorm, actualNorm);
}
