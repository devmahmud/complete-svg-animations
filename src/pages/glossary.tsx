import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';

interface Term {
  id: string;
  term: string;
  body: string;
}

const TERMS: Term[] = [
  {
    id: 'animate',
    term: '<animate>',
    body: 'A SMIL element that interpolates an SVG attribute over time. Lives inside the shape it animates.',
  },
  {
    id: 'animatemotion',
    term: '<animateMotion>',
    body: 'A SMIL element that moves any SVG element along an arbitrary path. Pair with <mpath> to reference a path by id.',
  },
  {
    id: 'animatetransform',
    term: '<animateTransform>',
    body: 'A SMIL element that animates the transform attribute. Use with type="rotate"/"scale"/"translate"/"skewX"/"skewY".',
  },
  {
    id: 'aria',
    term: 'ARIA',
    body: 'Accessible Rich Internet Applications. The set of attributes (aria-label, aria-hidden, role) that make non-text content perceivable to assistive tech.',
  },
  {
    id: 'attributeName',
    term: 'attributeName',
    body: 'The SMIL attribute that names which SVG attribute to animate (cx, fill, d, stroke-dashoffset, etc.).',
  },
  {
    id: 'begin',
    term: 'begin',
    body: 'When a SMIL animation starts. Accepts time offsets ("2s"), event triggers ("button.click"), animation references ("anim.end+0.2s"), or "indefinite" to defer until JS triggers it.',
  },
  {
    id: 'calcmode',
    term: 'calcMode',
    body: 'How SMIL interpolates between values. linear (default), paced (constant geometric speed), discrete (snap), or spline (cubic bezier per segment).',
  },
  {
    id: 'clippath',
    term: '<clipPath>',
    body: 'A reusable shape that constrains visibility — anything outside the clip is invisible. Reference with clip-path="url(#id)".',
  },
  {
    id: 'currentColor',
    term: 'currentColor',
    body: 'A CSS keyword that resolves to the current value of the color property. Use as fill or stroke to make SVG icons inherit color from their parent CSS context.',
  },
  {
    id: 'cubic-bezier',
    term: 'cubic-bezier',
    body: 'A CSS easing function defined by two control points (x1, y1, x2, y2) of a cubic Bézier curve from (0,0) to (1,1). Values outside [0, 1] produce overshoot.',
  },
  {
    id: 'd',
    term: 'd (path data)',
    body: 'The string of commands and coordinates that define a <path>. Letters are commands (M, L, Q, C, A, Z); numbers are coordinates. Capital = absolute, lowercase = relative.',
  },
  {
    id: 'defs',
    term: '<defs>',
    body: 'A container for reusable elements (gradients, filters, patterns, clip paths, masks). Definitions inside <defs> don\'t render directly — reference them via url(#id).',
  },
  {
    id: 'fill',
    term: 'fill (paint)',
    body: 'The interior color of an SVG shape. Default is black. fill="none" makes a shape outline-only.',
  },
  {
    id: 'fill-freeze',
    term: 'fill="freeze"',
    body: 'A SMIL attribute (different from the paint fill!) that keeps the final animated value after the animation ends. Default is "remove" which snaps back to the starting state.',
  },
  {
    id: 'g',
    term: '<g>',
    body: 'The SVG group element. Has no shape but can share attributes with its children, transform a whole subtree, and organize the document.',
  },
  {
    id: 'gradient',
    term: '<linearGradient> / <radialGradient>',
    body: 'Reusable color gradients defined in <defs>. Reference as fill or stroke via url(#id). Animatable stop-color and offset open up effects CSS can\'t do.',
  },
  {
    id: 'intersectionobserver',
    term: 'IntersectionObserver',
    body: 'A browser API that fires when an element enters or leaves the viewport. The right tool for scroll-triggered animations — much cheaper than scroll event listeners.',
  },
  {
    id: 'keysplines',
    term: 'keySplines',
    body: 'SMIL\'s per-segment cubic-bezier easing. Format: "x1 y1 x2 y2; …" with one set per segment between values. Both control points must stay in [0, 1].',
  },
  {
    id: 'keytimes',
    term: 'keyTimes',
    body: 'SMIL\'s timing attribute. A list of numbers in [0, 1] that say WHEN each entry in values happens. Use to pace keyframes asymmetrically.',
  },
  {
    id: 'mask',
    term: '<mask>',
    body: 'Like a clipPath, but uses luminance — white pixels are visible, black hidden, gray partially transparent. Combined with stroke animation = reveal effects.',
  },
  {
    id: 'mpath',
    term: '<mpath>',
    body: 'Inside <animateMotion>, references a path by id (href="#name") so multiple animations can share one path definition.',
  },
  {
    id: 'pathlength',
    term: 'pathLength',
    body: 'A normalization attribute on <path>. Setting pathLength="100" makes stroke-dasharray and stroke-dashoffset behave as if the path is 100 units long, no matter its actual length.',
  },
  {
    id: 'preserveaspectratio',
    term: 'preserveAspectRatio',
    body: 'Controls how the viewBox is fitted into the rendered SVG box. Default "xMidYMid meet" centers and scales until the entire viewBox is visible.',
  },
  {
    id: 'reduced-motion',
    term: 'prefers-reduced-motion',
    body: 'A CSS media query that detects an OS-level preference for reduced motion. Always honor it for accessibility.',
  },
  {
    id: 'requestanimationframe',
    term: 'requestAnimationFrame',
    body: 'A browser API that schedules a callback for the next frame. The right tool for per-frame physics or imperative scrubbing.',
  },
  {
    id: 'set',
    term: '<set>',
    body: 'A SMIL element that snaps an attribute to a value at a specific time. Like <animate> but discrete — no interpolation.',
  },
  {
    id: 'smil',
    term: 'SMIL',
    body: 'Synchronized Multimedia Integration Language. SVG\'s native animation system. Four elements: <animate>, <animateTransform>, <animateMotion>, <set>.',
  },
  {
    id: 'stroke',
    term: 'stroke',
    body: 'The outline of an SVG shape. Modifiers: stroke-width, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset, stroke-opacity.',
  },
  {
    id: 'stroke-dasharray',
    term: 'stroke-dasharray',
    body: 'A list defining alternating dash and gap lengths along a stroke. Combined with stroke-dashoffset, the foundation of drawing animations.',
  },
  {
    id: 'stroke-dashoffset',
    term: 'stroke-dashoffset',
    body: 'How far the dash pattern is shifted along the stroke. Animating from path-length to 0 creates a "drawing itself" effect.',
  },
  {
    id: 'transform-box',
    term: 'transform-box',
    body: 'A CSS property that picks the reference box for transform-origin. Set to fill-box on SVG so transform-origin: center means "center of the shape", not "center of the SVG".',
  },
  {
    id: 'transform-origin',
    term: 'transform-origin',
    body: 'The pivot point for CSS transforms. Defaults to center. The same rotation looks completely different around different origins.',
  },
  {
    id: 'values',
    term: 'values',
    body: 'A semicolon-separated list of keyframe values for SMIL animations. The most flexible form — supports any number of keyframes.',
  },
  {
    id: 'viewbox',
    term: 'viewBox',
    body: 'The "camera" of an SVG. Format: "x y width height". The first two pan, the last two zoom. Lets one source render at any pixel size while preserving proportions.',
  },
  {
    id: 'waapi',
    term: 'WAAPI',
    body: 'Web Animations API. element.animate(keyframes, options) — CSS keyframes with imperative JS control: pause(), reverse(), playbackRate, currentTime.',
  },
];

const Glossary: React.FC = () => {
  // Group by first letter for an A–Z index
  const groups = TERMS.reduce<Record<string, Term[]>>((acc, t) => {
    const letter = (t.term[0] === '<' ? t.term[1] : t.term[0]).toUpperCase();
    (acc[letter] ||= []).push(t);
    return acc;
  }, {});
  const letters = Object.keys(groups).sort();

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-8">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-2xs uppercase tracking-[0.4em] text-accent-300/80 mb-2">
          Reference
        </div>
        <h1 className="text-display text-3xl lg:text-5xl text-ink-50 text-balance flex items-center gap-3">
          <BookMarked className="w-8 h-8 text-accent-400" />
          Glossary
        </h1>
        <p className="text-ink-300 mt-3 max-w-2xl">
          Every term, attribute, and concept used across the course. Linked from
          callouts in the lessons. Use it as a fast lookup.
        </p>
      </motion.header>

      <nav className="flex flex-wrap gap-1.5">
        {letters.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="font-mono text-xs px-2.5 py-1 rounded border border-white/[0.08] text-ink-300 hover:text-ink-50 hover:border-accent-500/40 transition-colors"
          >
            {l}
          </a>
        ))}
      </nav>

      <div className="space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={letter.toLowerCase()}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-3xl text-accent-300">{letter}</span>
              <span className="flex-1 h-px bg-white/[0.06]" />
            </div>
            <dl className="space-y-4">
              {groups[letter].map((t) => (
                <div key={t.id} id={t.id} className="plate p-5">
                  <dt className="font-mono text-base text-accent-200 mb-1">{t.term}</dt>
                  <dd className="text-sm text-ink-200 leading-relaxed">{t.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Glossary;
