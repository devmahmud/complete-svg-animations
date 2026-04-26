import { describe, it, expect } from 'vitest';
import { checkSolution } from './checkSolution';

const svg = (inner: string, attrs = 'viewBox="0 0 100 100"') =>
  `<svg ${attrs}>${inner}</svg>`;

describe('checkSolution', () => {
  describe('parsing', () => {
    it('rejects user input with no <svg>', () => {
      const r = checkSolution('not svg', svg('<circle cx="50" cy="50" r="10"/>'));
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/SVG could not be parsed/i);
    });

    it('rejects an unparsable reference solution', () => {
      const r = checkSolution(svg('<circle/>'), 'garbage');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/Reference solution/i);
    });

    it('extracts the <svg> from surrounding text', () => {
      const wrapped = `prelude\n${svg('<circle cx="50" cy="50" r="10" fill="red"/>')}\ntrailing`;
      const sol = svg('<circle cx="50" cy="50" r="10" fill="red"/>');
      expect(checkSolution(wrapped, sol).ok).toBe(true);
    });
  });

  describe('attribute matching', () => {
    it('passes when all required attributes match', () => {
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      expect(checkSolution(sol, sol).ok).toBe(true);
    });

    it('fails on a missing required attribute', () => {
      const user = svg('<circle cx="50" cy="50" r="30"/>');
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      const r = checkSolution(user, sol);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/missing the "fill"/);
    });

    it('fails on a wrong attribute value', () => {
      const user = svg('<circle cx="50" cy="50" r="30" fill="#000000"/>');
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      const r = checkSolution(user, sol);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/fill="#000000".*"#3ddc97"/);
    });

    it('ignores style attribute differences', () => {
      const user = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97" style="opacity:0.5"/>');
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });

    it('allows extra attributes on the user side', () => {
      const user = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97" data-test="ok"/>');
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });

    it('treats trailing zeros in numeric values as equivalent', () => {
      const user = svg('<circle cx="50.0" cy="50" r="30" fill="#3ddc97"/>');
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });

    it('collapses whitespace in attribute values', () => {
      const user = svg('<line x1="10" y1="15" x2="90" y2="15" stroke="#7c5cff" stroke-width="3" stroke-dasharray="6   3"/>');
      const sol = svg('<line x1="10" y1="15" x2="90" y2="15" stroke="#7c5cff" stroke-width="3" stroke-dasharray="6 3"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });
  });

  describe('class attribute', () => {
    it('passes when all expected classes are present (order-insensitive)', () => {
      const user = svg('<circle cx="50" cy="50" r="6" fill="#7c5cff" class="d2 dot"/>');
      const sol = svg('<circle cx="50" cy="50" r="6" fill="#7c5cff" class="dot d2"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });

    it('allows extra classes on the user side', () => {
      const user = svg('<circle cx="50" cy="50" r="6" fill="#7c5cff" class="dot d2 extra"/>');
      const sol = svg('<circle cx="50" cy="50" r="6" fill="#7c5cff" class="dot d2"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });

    it('fails when an expected class is missing', () => {
      const user = svg('<circle cx="50" cy="50" r="6" fill="#7c5cff" class="dot"/>');
      const sol = svg('<circle cx="50" cy="50" r="6" fill="#7c5cff" class="dot d2"/>');
      const r = checkSolution(user, sol);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/missing class "d2"/);
    });
  });

  describe('children', () => {
    it('matches nested elements in order', () => {
      const sol = svg(
        '<g fill="#ffd43b"><circle cx="30" cy="50" r="10"/><circle cx="50" cy="50" r="10"/><circle cx="70" cy="50" r="10"/></g>'
      );
      expect(checkSolution(sol, sol).ok).toBe(true);
    });

    it('fails when a required child element is missing', () => {
      const user = svg('<g fill="#ffd43b"><circle cx="30" cy="50" r="10"/></g>');
      const sol = svg(
        '<g fill="#ffd43b"><circle cx="30" cy="50" r="10"/><circle cx="50" cy="50" r="10"/></g>'
      );
      const r = checkSolution(user, sol);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/missing/);
    });

    it('allows extra child elements on the user side', () => {
      const user = svg(
        '<circle cx="50" cy="50" r="30" fill="#3ddc97"/><rect x="0" y="0" width="10" height="10"/>'
      );
      const sol = svg('<circle cx="50" cy="50" r="30" fill="#3ddc97"/>');
      expect(checkSolution(user, sol).ok).toBe(true);
    });

    it('fails when the user has a different element type than expected', () => {
      const user = svg('<circle cx="50" cy="50" r="30"/>');
      const sol = svg('<rect x="0" y="0" width="10" height="10"/>');
      const r = checkSolution(user, sol);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toMatch(/missing a <rect>/);
    });
  });

  describe('round-tripping known exercises', () => {
    it('a typical SMIL animation', () => {
      const code = svg(
        '<circle cx="50" cy="50" r="20" fill="#7c5cff"><animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite"/></circle>'
      );
      expect(checkSolution(code, code).ok).toBe(true);
    });

    it('animateMotion with mpath', () => {
      const code = svg(
        '<path id="track" d="M 20 50 Q 50 0 80 50" fill="none"/><circle r="5" fill="#7c5cff"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#track"/></animateMotion></circle>'
      );
      expect(checkSolution(code, code).ok).toBe(true);
    });
  });
});
