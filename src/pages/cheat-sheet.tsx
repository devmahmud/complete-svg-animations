import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface Row {
  cmd: string;
  desc: string;
}

const PATH_COMMANDS: Row[] = [
  { cmd: 'M x y', desc: 'Move pen to (x, y). No line drawn.' },
  { cmd: 'L x y', desc: 'Draw a straight line to (x, y).' },
  { cmd: 'H x', desc: 'Horizontal line to x (y stays the same).' },
  { cmd: 'V y', desc: 'Vertical line to y (x stays the same).' },
  { cmd: 'Q cx cy x y', desc: 'Quadratic Bézier — one control point (cx, cy), end at (x, y).' },
  { cmd: 'T x y', desc: 'Smooth quadratic — auto-mirrors the previous control.' },
  { cmd: 'C c1x c1y c2x c2y x y', desc: 'Cubic Bézier — two controls, end at (x, y).' },
  { cmd: 'S c2x c2y x y', desc: 'Smooth cubic — auto-mirrors the previous c2.' },
  { cmd: 'A rx ry rot large sweep x y', desc: 'Elliptical arc to (x, y). Flags pick which arc.' },
  { cmd: 'Z', desc: 'Close path — straight line back to most recent M.' },
];

const KEYSPLINES: Row[] = [
  { cmd: '0 0 1 1', desc: 'linear (no easing)' },
  { cmd: '0.42 0 1 1', desc: 'ease-in (slow start, abrupt end)' },
  { cmd: '0 0 0.58 1', desc: 'ease-out (abrupt start, slow end)' },
  { cmd: '0.42 0 0.58 1', desc: 'ease-in-out (symmetric)' },
  { cmd: '0.9 0 0.1 1', desc: 'snap (steep S-curve)' },
  { cmd: '0.25 0.46 0.45 0.94', desc: 'smooth (gentle ease-out)' },
];

const SMIL_ATTRS: Row[] = [
  { cmd: 'attributeName', desc: 'Which SVG attribute to animate.' },
  { cmd: 'values', desc: 'Semicolon-separated keyframe values.' },
  { cmd: 'from / to', desc: 'Two-keyframe shorthand.' },
  { cmd: 'dur', desc: 'Animation duration ("2s", "500ms").' },
  { cmd: 'begin', desc: 'Start trigger: time, event, or animation reference.' },
  { cmd: 'repeatCount', desc: 'Integer or "indefinite" for infinite loop.' },
  { cmd: 'fill', desc: '"freeze" keeps final value, "remove" snaps back (default).' },
  { cmd: 'calcMode', desc: 'linear / paced / discrete / spline.' },
  { cmd: 'keyTimes', desc: 'When each value happens (numbers in [0, 1]).' },
  { cmd: 'keySplines', desc: 'Per-segment cubic-bezier easing (only with calcMode="spline").' },
];

const ANIMATABLE: Row[] = [
  { cmd: 'fill', desc: 'CSS ✓ · SMIL ✓ — composite/paint' },
  { cmd: 'stroke / stroke-width', desc: 'CSS ✓ · SMIL ✓ — paint' },
  { cmd: 'opacity', desc: 'CSS ✓ · SMIL ✓ — composite (cheap)' },
  { cmd: 'transform', desc: 'CSS ✓ · SMIL via animateTransform — composite (cheap)' },
  { cmd: 'r, cx, cy, x, y, width, height', desc: 'CSS ✓ · SMIL ✓ — layout (expensive)' },
  { cmd: 'stroke-dasharray, stroke-dashoffset', desc: 'CSS ✓ · SMIL ✓ — paint' },
  { cmd: 'd (path data)', desc: 'CSS ✗ · SMIL ✓ only — layout' },
  { cmd: 'points (polyline/polygon)', desc: 'CSS ✗ · SMIL ✓ only — layout' },
  { cmd: 'gradient stop-color, offset', desc: 'CSS ✗ · SMIL ✓ only — paint' },
];

const Section: React.FC<{ title: string; rows: Row[]; mono?: boolean }> = ({ title, rows, mono }) => (
  <section className="plate p-5">
    <h2 className="text-2xs uppercase tracking-widest text-accent-300 mb-3">{title}</h2>
    <dl className="divide-y divide-white/[0.05]">
      {rows.map((r) => (
        <div key={r.cmd} className="grid grid-cols-[180px_1fr] gap-4 py-2.5 text-sm">
          <dt className={`font-mono ${mono ? 'text-accent-200' : 'text-signal-500'}`}>{r.cmd}</dt>
          <dd className="text-ink-200">{r.desc}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const CheatSheet: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-8">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-2xs uppercase tracking-[0.4em] text-accent-300/80 mb-2">
          Reference
        </div>
        <h1 className="text-display text-3xl lg:text-5xl text-ink-50 text-balance flex items-center gap-3">
          <Zap className="w-8 h-8 text-signal-500" />
          Cheat Sheet
        </h1>
        <p className="text-ink-300 mt-3 max-w-2xl">
          Everything you'll forget. Path commands, SMIL attributes, easing recipes,
          and the cost of every animatable property — in one printable page.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section title="Path commands" rows={PATH_COMMANDS} mono />
        <Section title="keySplines recipes" rows={KEYSPLINES} mono />
        <Section title="SMIL animation attributes" rows={SMIL_ATTRS} />
        <Section title="What's animatable & cost" rows={ANIMATABLE} />
      </div>
    </div>
  );
};

export default CheatSheet;
