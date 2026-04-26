import { lazy, ComponentType } from 'react';

export interface ExerciseDef {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
}

export interface LessonDef {
  id: string;
  title: string;
  Component: ComponentType;
  exercises: ExerciseDef[];
}

export interface ModuleDef {
  id: string;
  title: string;
  description: string;
  tagline: string;
  Overview: ComponentType;
  lessons: LessonDef[];
}

const m1Index = lazy(() => import('./module-1/index.mdx'));
const m1L1 = lazy(() => import('./module-1/01-introduction.mdx'));
const m1L2 = lazy(() => import('./module-1/02-primitive-shapes.mdx'));
const m1L3 = lazy(() => import('./module-1/03-how-shapes-are-made.mdx'));
const m1L4 = lazy(() => import('./module-1/04-coordinate-system.mdx'));
const m1L5 = lazy(() => import('./module-1/05-styling-attributes.mdx'));
const m1L6 = lazy(() => import('./module-1/06-grouping-elements.mdx'));
const m1L7 = lazy(() => import('./module-1/07-practice-exercises.mdx'));
const m1L8 = lazy(() => import('./module-1/08-embedding-svg.mdx'));

const m2Index = lazy(() => import('./module-2/index.mdx'));
const m2L1 = lazy(() => import('./module-2/01-introduction.mdx'));
const m2L2 = lazy(() => import('./module-2/02-css-transitions.mdx'));
const m2L3 = lazy(() => import('./module-2/03-css-transforms.mdx'));
const m2L4 = lazy(() => import('./module-2/04-sequencing-animations.mdx'));
const m2L5 = lazy(() => import('./module-2/05-timing-functions.mdx'));
const m2L6 = lazy(() => import('./module-2/06-practice-projects.mdx'));
const m2L7 = lazy(() => import('./module-2/07-accessibility-performance.mdx'));

const m3Index = lazy(() => import('./module-3/index.mdx'));
const m3L1 = lazy(() => import('./module-3/01-the-problem-with-css.mdx'));
const m3L2 = lazy(() => import('./module-3/02-introduction-to-smil.mdx'));
const m3L3 = lazy(() => import('./module-3/03-deep-dive-into-smil.mdx'));
const m3L4 = lazy(() => import('./module-3/04-smil-timing-functions.mdx'));
const m3L5 = lazy(() => import('./module-3/05-orchestrating-smil.mdx'));
const m3L6 = lazy(() => import('./module-3/06-smil-and-react.mdx'));
const m3L7 = lazy(() => import('./module-3/07-advanced-smil-projects.mdx'));

const m4Index = lazy(() => import('./module-4/index.mdx'));
const m4L1 = lazy(() => import('./module-4/01-the-path-element.mdx'));
const m4L2 = lazy(() => import('./module-4/02-path-commands.mdx'));
const m4L3 = lazy(() => import('./module-4/03-drawing-animations.mdx'));
const m4L4 = lazy(() => import('./module-4/04-motion-along-paths.mdx'));
const m4L5 = lazy(() => import('./module-4/05-path-morphing.mdx'));
const m4L6 = lazy(() => import('./module-4/06-advanced-path-techniques.mdx'));
const m4L7 = lazy(() => import('./module-4/07-real-world-projects.mdx'));
const m4L8 = lazy(() => import('./module-4/08-javascript-animation.mdx'));

export const modules: ModuleDef[] = [
  {
    id: 'module-1',
    title: 'SVG Foundations',
    tagline: 'The path model and the seven primitive shapes.',
    description: 'Master the fundamental concepts and building blocks of SVG graphics',
    Overview: m1Index,
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Introduction to SVGs',
        Component: m1L1,
        exercises: [
          {
            id: 'ex-1-1-1',
            title: 'A green filled circle',
            description: 'Create a circle centered at (50, 50) with radius 30 and fill="#3ddc97".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Add a circle -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#3ddc97"/>\n</svg>`,
          },
          {
            id: 'ex-1-1-2',
            title: 'Outline-only square',
            description: 'Draw a 60×60 square with NO fill (use fill="none") and a 4-unit violet stroke.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Add an outlined square -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <rect x="20" y="20" width="60" height="60" fill="none" stroke="#7c5cff" stroke-width="4"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-2',
        title: 'The Seven Primitive Shapes',
        Component: m1L2,
        exercises: [
          {
            id: 'ex-1-2-1',
            title: 'A polyline checkmark',
            description: 'Draw a checkmark with three points: (20, 50), (45, 75), (85, 25). No fill, violet stroke 4 wide, rounded ends and joins.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Use <polyline> -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <polyline points="20,50 45,75 85,25" fill="none" stroke="#7c5cff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>`,
          },
          {
            id: 'ex-1-2-2',
            title: 'A triangle pointing up',
            description: 'Use <polygon> to draw a yellow triangle with vertices (50, 15), (90, 80), (10, 80).',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Use <polygon> -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <polygon points="50,15 90,80 10,80" fill="#ffd43b"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-3',
        title: 'How Shapes Are Made',
        Component: m1L3,
        exercises: [
          {
            id: 'ex-1-3-1',
            title: 'A bullseye target',
            description: 'Three concentric circles, all centered at (50, 50). Radii 40 / 28 / 16. Fill alternates violet / yellow / violet from outside in. Source order: largest first.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Three circles, largest first -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" fill="#7c5cff"/>\n  <circle cx="50" cy="50" r="28" fill="#ffd43b"/>\n  <circle cx="50" cy="50" r="16" fill="#7c5cff"/>\n</svg>`,
          },
          {
            id: 'ex-1-3-2',
            title: 'Outline over fill',
            description: 'Draw a violet square (10,10 → 70×70). On top of it, draw a yellow OUTLINE-only square at the same position with stroke-width=4.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Violet first, yellow outline second -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <rect x="10" y="10" width="70" height="70" fill="#7c5cff"/>\n  <rect x="10" y="10" width="70" height="70" fill="none" stroke="#ffd43b" stroke-width="4"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-4',
        title: 'Coordinate System',
        Component: m1L4,
        exercises: [
          {
            id: 'ex-1-4-1',
            title: 'Crop with viewBox',
            description: 'You have a 100×100 violet square. Change the viewBox so only the right half of the square is visible. (Hint: shift the camera 50 units right and shrink it.)',
            initialCode: `<svg viewBox="0 0 100 100">\n  <rect x="0" y="0" width="100" height="100" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="50 0 50 100">\n  <rect x="0" y="0" width="100" height="100" fill="#7c5cff"/>\n</svg>`,
          },
          {
            id: 'ex-1-4-2',
            title: 'Wide viewBox',
            description: 'Set the viewBox to "0 0 200 100" and place a yellow circle exactly in the center: cx=100, cy=50, r=30.',
            initialCode: `<svg viewBox="">\n  <!-- Set viewBox + add circle -->\n</svg>`,
            solution: `<svg viewBox="0 0 200 100">\n  <circle cx="100" cy="50" r="30" fill="#ffd43b"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-5',
        title: 'Styling Attributes',
        Component: m1L5,
        exercises: [
          {
            id: 'ex-1-5-1',
            title: 'Dashed line',
            description: 'Make this line dashed with a 6-unit dash and a 3-unit gap (stroke-dasharray="6 3"), and round the line caps.',
            initialCode: `<svg viewBox="0 0 100 30">\n  <line x1="10" y1="15" x2="90" y2="15" stroke="#7c5cff" stroke-width="3"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 30">\n  <line x1="10" y1="15" x2="90" y2="15" stroke="#7c5cff" stroke-width="3" stroke-dasharray="6 3" stroke-linecap="round"/>\n</svg>`,
          },
          {
            id: 'ex-1-5-2',
            title: 'currentColor',
            description: 'Set the rect\'s fill to "currentColor" so it inherits color from CSS, and set color="#3ddc97" on the parent <svg> as an attribute.',
            initialCode: `<svg viewBox="0 0 100 100" color="">\n  <rect x="20" y="20" width="60" height="60" fill=""/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100" color="#3ddc97">\n  <rect x="20" y="20" width="60" height="60" fill="currentColor"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-6',
        title: 'Grouping Elements',
        Component: m1L6,
        exercises: [
          {
            id: 'ex-1-6-1',
            title: 'Group inheritance',
            description: 'All three circles should be filled #ffd43b. Set the fill ONCE on the parent <g>, not on each child.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <g>\n    <circle cx="30" cy="50" r="10"/>\n    <circle cx="50" cy="50" r="10"/>\n    <circle cx="70" cy="50" r="10"/>\n  </g>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <g fill="#ffd43b">\n    <circle cx="30" cy="50" r="10"/>\n    <circle cx="50" cy="50" r="10"/>\n    <circle cx="70" cy="50" r="10"/>\n  </g>\n</svg>`,
          },
          {
            id: 'ex-1-6-2',
            title: 'Group rotation',
            description: 'Rotate the entire group 30 degrees around the center of the canvas (the pivot is 50, 50).',
            initialCode: `<svg viewBox="0 0 100 100">\n  <g fill="#7c5cff">\n    <rect x="20" y="40" width="60" height="20"/>\n    <circle cx="20" cy="50" r="6"/>\n    <circle cx="80" cy="50" r="6"/>\n  </g>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <g fill="#7c5cff" transform="rotate(30 50 50)">\n    <rect x="20" y="40" width="60" height="20"/>\n    <circle cx="20" cy="50" r="6"/>\n    <circle cx="80" cy="50" r="6"/>\n  </g>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-7',
        title: 'Capstone: Build an Icon Set',
        Component: m1L7,
        exercises: [
          {
            id: 'ex-1-7-1',
            title: 'Home icon',
            description: 'Build a "home" icon with a 24×24 viewBox: a polygon roof from (3,12) to (12,3) to (21,12), and a rect for the body from (5,12) size 14×9. fill="none", stroke="currentColor", stroke-width=2, rounded joins.',
            initialCode: `<svg viewBox="0 0 24 24" color="#7c5cff">\n  <!-- Roof + body -->\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" color="#7c5cff">\n  <polygon points="3,12 12,3 21,12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>\n  <rect x="5" y="12" width="14" height="9" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>\n</svg>`,
          },
          {
            id: 'ex-1-7-2',
            title: 'Bell icon',
            description: 'Use a 24×24 viewBox. Draw a bell as a polygon with these points: (6,18) (18,18) (16,8) (8,8). Add a clapper circle at (12,21) r=1.5. fill="currentColor".',
            initialCode: `<svg viewBox="0 0 24 24" color="#ffd43b">\n  <!-- Bell + clapper -->\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" color="#ffd43b">\n  <polygon points="6,18 18,18 16,8 8,8" fill="currentColor"/>\n  <circle cx="12" cy="21" r="1.5" fill="currentColor"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-1-8',
        title: 'Embedding SVG in the Wild',
        Component: m1L8,
        exercises: [
          {
            id: 'ex-1-8-1',
            title: 'Inline an SVG',
            description: 'Add a <circle> at (12,12) r=10 fill="currentColor" inside the SVG so it inherits color from a parent CSS rule.',
            initialCode: `<svg viewBox="0 0 24 24" color="#7c5cff">\n  <!-- Add the circle here -->\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" color="#7c5cff">\n  <circle cx="12" cy="12" r="10" fill="currentColor"/>\n</svg>`,
          },
        ],
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Your First Animation',
    tagline: 'CSS transitions, transforms, and timing.',
    description: 'Bring your SVG shapes to life with CSS animations and transforms',
    Overview: m2Index,
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Introduction to SVG Animations',
        Component: m2L1,
        exercises: [
          {
            id: 'ex-2-1-1',
            title: 'Pick the right tool',
            description: 'You need a button that pulses continuously. Add a class="pulse" attribute to the circle (you would then animate it via CSS keyframes — only the markup change is checked).',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff" class="pulse"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-2-2',
        title: 'CSS Transitions',
        Component: m2L2,
        exercises: [
          {
            id: 'ex-2-2-1',
            title: 'Hover color transition',
            description: 'Add class="dot" to the circle. The CSS uses .dot { transition: fill 0.3s ease } and .dot:hover { fill: #ff5d73 } — checker validates the markup change.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#7c5cff" class="dot"/>\n</svg>`,
          },
          {
            id: 'ex-2-2-2',
            title: 'Group transition',
            description: 'Wrap the two shapes in a <g class="row"> so they can be transitioned together.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <rect x="20" y="40" width="40" height="20" fill="#7c5cff"/>\n  <circle cx="80" cy="50" r="8" fill="#ffd43b"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <g class="row">\n    <rect x="20" y="40" width="40" height="20" fill="#7c5cff"/>\n    <circle cx="80" cy="50" r="8" fill="#ffd43b"/>\n  </g>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-2-3',
        title: 'CSS Transforms',
        Component: m2L3,
        exercises: [
          {
            id: 'ex-2-3-1',
            title: 'Mark for transform',
            description: 'Add class="spinner" to the rect so CSS can apply a rotate animation. The CSS itself sits in your stylesheet — checker validates the marker.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <rect x="35" y="35" width="30" height="30" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <rect x="35" y="35" width="30" height="30" fill="#7c5cff" class="spinner"/>\n</svg>`,
          },
          {
            id: 'ex-2-3-2',
            title: 'Set transform-origin via attribute',
            description: 'Set transform-origin="50 50" directly on the <g> wrapping these shapes so any rotation pivots in the middle.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <g>\n    <rect x="20" y="20" width="60" height="60" fill="#7c5cff"/>\n    <circle cx="50" cy="50" r="6" fill="#ffd43b"/>\n  </g>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <g transform-origin="50 50">\n    <rect x="20" y="20" width="60" height="60" fill="#7c5cff"/>\n    <circle cx="50" cy="50" r="6" fill="#ffd43b"/>\n  </g>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-2-4',
        title: 'Sequencing Animations',
        Component: m2L4,
        exercises: [
          {
            id: 'ex-2-4-1',
            title: 'Stagger setup',
            description: 'Add classes "dot d1", "dot d2", "dot d3" to these three circles so CSS :nth-child or per-class delays can stagger them.',
            initialCode: `<svg viewBox="0 0 200 60">\n  <circle cx="40"  cy="30" r="6" fill="#7c5cff"/>\n  <circle cx="100" cy="30" r="6" fill="#7c5cff"/>\n  <circle cx="160" cy="30" r="6" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 200 60">\n  <circle cx="40"  cy="30" r="6" fill="#7c5cff" class="dot d1"/>\n  <circle cx="100" cy="30" r="6" fill="#7c5cff" class="dot d2"/>\n  <circle cx="160" cy="30" r="6" fill="#7c5cff" class="dot d3"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-2-5',
        title: 'Timing Functions',
        Component: m2L5,
        exercises: [
          {
            id: 'ex-2-5-1',
            title: 'Tag for ease-out',
            description: 'Add class="enter" to the circle. The CSS in your stylesheet uses .enter { animation-timing-function: ease-out } — checker validates the marker.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#3ddc97"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#3ddc97" class="enter"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-2-6',
        title: 'Capstone: Animated Loader Library',
        Component: m2L6,
        exercises: [
          {
            id: 'ex-2-6-1',
            title: 'Loader 1: pulsing dot',
            description: 'Build a loader: a circle at (50, 50) r=20 fill="#7c5cff", with class="pulse". CSS makes it scale 1 → 1.4 → 1.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Add a circle with class="pulse" -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff" class="pulse"/>\n</svg>`,
          },
          {
            id: 'ex-2-6-2',
            title: 'Loader 2: three-dot cascade',
            description: 'Three small circles at cx=30/50/70, cy=50, r=6, fill="#ffd43b". Class each "dot" plus "d1", "d2", "d3" for staggered delays.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Three circles, each with class="dot d{n}" -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="30" cy="50" r="6" fill="#ffd43b" class="dot d1"/>\n  <circle cx="50" cy="50" r="6" fill="#ffd43b" class="dot d2"/>\n  <circle cx="70" cy="50" r="6" fill="#ffd43b" class="dot d3"/>\n</svg>`,
          },
          {
            id: 'ex-2-6-3',
            title: 'Loader 3: spinning ring',
            description: 'Build a spinning ring: a circle at (50, 50) r=36 fill="none" stroke="#7c5cff" stroke-width="6" stroke-dasharray="80 200" with class="spin".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Stroked circle with class="spin" -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="36" fill="none" stroke="#7c5cff" stroke-width="6" stroke-dasharray="80 200" class="spin"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-2-7',
        title: 'Accessibility & Performance',
        Component: m2L7,
        exercises: [
          {
            id: 'ex-2-7-1',
            title: 'Hide a decorative SVG from screen readers',
            description: 'Add aria-hidden="true" and focusable="false" to the SVG so assistive tech ignores it.',
            initialCode: `<svg viewBox="0 0 24 24">\n  <circle cx="12" cy="12" r="10" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">\n  <circle cx="12" cy="12" r="10" fill="#7c5cff"/>\n</svg>`,
          },
          {
            id: 'ex-2-7-2',
            title: 'Label a meaningful SVG',
            description: 'This SVG IS the content. Add role="img" and aria-label="Loading" so screen readers announce it.',
            initialCode: `<svg viewBox="0 0 24 24">\n  <circle cx="12" cy="12" r="10" fill="none" stroke="#7c5cff" stroke-width="2"/>\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" role="img" aria-label="Loading">\n  <circle cx="12" cy="12" r="10" fill="none" stroke="#7c5cff" stroke-width="2"/>\n</svg>`,
          },
        ],
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Animating the Unanimatable',
    tagline: 'SMIL — animate every SVG attribute.',
    description: 'Master SMIL animations and animate properties that CSS cannot handle',
    Overview: m3Index,
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'The Problem with CSS',
        Component: m3L1,
        exercises: [
          {
            id: 'ex-3-1-1',
            title: 'Identify the SMIL-only attribute',
            description: 'Add an <animate> child element targeting the d attribute (the only attribute CSS cannot animate). values="M 10 50 L 90 50;M 10 50 Q 50 10 90 50;M 10 50 L 90 50" dur="2s" repeatCount="indefinite".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 L 90 50" stroke="#7c5cff" stroke-width="3" fill="none">\n    <!-- Add the animate -->\n  </path>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 L 90 50" stroke="#7c5cff" stroke-width="3" fill="none">\n    <animate attributeName="d" values="M 10 50 L 90 50;M 10 50 Q 50 10 90 50;M 10 50 L 90 50" dur="2s" repeatCount="indefinite"/>\n  </path>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-3-2',
        title: 'Introduction to SMIL',
        Component: m3L2,
        exercises: [
          {
            id: 'ex-3-2-1',
            title: 'Pulsing radius',
            description: 'Animate r from 20 to 40 and back, dur=2s, infinite loop.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <!-- Add animate for r -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite"/>\n  </circle>\n</svg>`,
          },
          {
            id: 'ex-3-2-2',
            title: 'Rotate transform',
            description: 'Use <animateTransform type="rotate"> to spin the rect 360° around (50, 50). dur=3s, infinite.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <rect x="35" y="35" width="30" height="30" fill="#ffd43b">\n    <!-- Add animateTransform -->\n  </rect>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <rect x="35" y="35" width="30" height="30" fill="#ffd43b">\n    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite"/>\n  </rect>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-3-3',
        title: 'Deep Dive into SMIL',
        Component: m3L3,
        exercises: [
          {
            id: 'ex-3-3-1',
            title: 'Anticipation via keyTimes',
            description: 'Add an <animate> on r with values="20;20;50;20", keyTimes="0;0.8;0.9;1", dur="2s", infinite — holds small for 80% of the time, then snaps big and back.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <!-- Add animate with keyTimes -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <animate attributeName="r" values="20;20;50;20" keyTimes="0;0.8;0.9;1" dur="2s" repeatCount="indefinite"/>\n  </circle>\n</svg>`,
          },
          {
            id: 'ex-3-3-2',
            title: 'Freeze the final value',
            description: 'Make the circle fade out once and stay invisible. Animate opacity from 1 to 0, dur=1s, fill="freeze".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#7c5cff">\n    <!-- animate opacity to 0 and freeze -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#7c5cff">\n    <animate attributeName="opacity" from="1" to="0" dur="1s" fill="freeze"/>\n  </circle>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-3-4',
        title: 'SMIL Timing Functions',
        Component: m3L4,
        exercises: [
          {
            id: 'ex-3-4-1',
            title: 'Apply ease-in-out via keySplines',
            description: 'Animate cx 20→80→20 over 2s with calcMode="spline", keyTimes="0;0.5;1", keySplines="0.42 0 0.58 1; 0.42 0 0.58 1", infinite.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="20" cy="50" r="6" fill="#7c5cff">\n    <!-- animate cx with spline easing -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="20" cy="50" r="6" fill="#7c5cff">\n    <animate attributeName="cx" values="20;80;20" dur="2s" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" repeatCount="indefinite"/>\n  </circle>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-3-5',
        title: 'Orchestrating SMIL',
        Component: m3L5,
        exercises: [
          {
            id: 'ex-3-5-1',
            title: 'Chain two animations',
            description: 'Two animates on the same circle: id="grow" animates r 20→40 (dur 0.6s, fill freeze, begin 0s); a second animate animates fill #7c5cff→#3ddc97 (dur 0.4s, fill freeze, begin="grow.end").',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <!-- Add two chained animates -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <animate id="grow" attributeName="r" from="20" to="40" dur="0.6s" begin="0s" fill="freeze"/>\n    <animate attributeName="fill" from="#7c5cff" to="#3ddc97" dur="0.4s" begin="grow.end" fill="freeze"/>\n  </circle>\n</svg>`,
          },
          {
            id: 'ex-3-5-2',
            title: 'Click-triggered animation',
            description: 'Make the circle pulse on click: animate r values 22→30→22, dur=0.4s, begin="myDot.click". The circle has id="myDot".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle id="myDot" cx="50" cy="50" r="22" fill="#ffd43b">\n    <!-- Add click-triggered animate -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle id="myDot" cx="50" cy="50" r="22" fill="#ffd43b">\n    <animate attributeName="r" values="22;30;22" dur="0.4s" begin="myDot.click"/>\n  </circle>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-3-6',
        title: 'SMIL and React',
        Component: m3L6,
        exercises: [
          {
            id: 'ex-3-6-1',
            title: 'Toggle-friendly markup',
            description: 'When binding to React state, you set begin="indefinite" to keep an animation paused until JS triggers it. Add that begin attribute to the animate.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <animate attributeName="r" values="20;40;20" dur="1s" repeatCount="indefinite"/>\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="20" fill="#7c5cff">\n    <animate attributeName="r" values="20;40;20" dur="1s" repeatCount="indefinite" begin="indefinite"/>\n  </circle>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-3-7',
        title: 'Capstone: Interactive SMIL Menu',
        Component: m3L7,
        exercises: [
          {
            id: 'ex-3-7-1',
            title: 'Hamburger lines',
            description: 'Build the static hamburger icon: three horizontal lines via <line> elements at y=8, y=12, y=16 (in a 24x24 viewBox), all from x1=4 to x2=20, stroke="currentColor", stroke-width=2, stroke-linecap="round". Wrap them in <g class="lines">.',
            initialCode: `<svg viewBox="0 0 24 24" color="#7c5cff">\n  <!-- 3 lines wrapped in <g class="lines"> -->\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" color="#7c5cff">\n  <g class="lines">\n    <line x1="4" y1="8"  x2="20" y2="8"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>\n    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>\n    <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>\n  </g>\n</svg>`,
          },
          {
            id: 'ex-3-7-2',
            title: 'Animated checkmark',
            description: 'Path "M 5 12 L 11 18 L 19 8" stroked currentColor, width=3, rounded ends/joins, fill=none, pathLength=24, stroke-dasharray=24, stroke-dashoffset=24. Add <animate> on stroke-dashoffset from 24 to 0 over 0.5s, fill=freeze.',
            initialCode: `<svg viewBox="0 0 24 24" color="#3ddc97">\n  <path d="M 5 12 L 11 18 L 19 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="24" stroke-dasharray="24" stroke-dashoffset="24">\n    <!-- animate stroke-dashoffset -->\n  </path>\n</svg>`,
            solution: `<svg viewBox="0 0 24 24" color="#3ddc97">\n  <path d="M 5 12 L 11 18 L 19 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="24" stroke-dasharray="24" stroke-dashoffset="24">\n    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.5s" fill="freeze"/>\n  </path>\n</svg>`,
          },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Path and Path Animations',
    tagline: 'Drawing, motion, and morphing along paths.',
    description: 'Master the most powerful SVG element and create stunning path-based animations',
    Overview: m4Index,
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'The Path Element',
        Component: m4L1,
        exercises: [
          {
            id: 'ex-4-1-1',
            title: 'Square as a path',
            description: 'Replace this rect with a <path> drawing the same square. d="M 20 20 L 80 20 L 80 80 L 20 80 Z", fill="#7c5cff".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <rect x="20" y="20" width="60" height="60" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 20 20 L 80 20 L 80 80 L 20 80 Z" fill="#7c5cff"/>\n</svg>`,
          },
          {
            id: 'ex-4-1-2',
            title: 'Outline-only path',
            description: 'A path "M 20 50 Q 50 10 80 50 Q 50 90 20 50 Z". fill="none", stroke="#ffd43b", stroke-width=3, stroke-linejoin="round".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <!-- Outlined leaf-shape path -->\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 20 50 Q 50 10 80 50 Q 50 90 20 50 Z" fill="none" stroke="#ffd43b" stroke-width="3" stroke-linejoin="round"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-2',
        title: 'Path Commands',
        Component: m4L2,
        exercises: [
          {
            id: 'ex-4-2-1',
            title: 'Quadratic wave',
            description: 'Draw a wave: M 10 50 Q 30 10 50 50 Q 70 90 90 50. fill="none", stroke="#7c5cff", stroke-width=3.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path d="" fill="none" stroke="#7c5cff" stroke-width="3"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 Q 30 10 50 50 Q 70 90 90 50" fill="none" stroke="#7c5cff" stroke-width="3"/>\n</svg>`,
          },
          {
            id: 'ex-4-2-2',
            title: 'Half-circle arc',
            description: 'Draw a half-circle from (20, 50) to (80, 50) using one A command. d="M 20 50 A 30 30 0 0 1 80 50". fill="none", stroke="#3ddc97", stroke-width=3.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path d="" fill="none" stroke="#3ddc97" stroke-width="3"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" stroke="#3ddc97" stroke-width="3"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-3',
        title: 'Drawing Animations',
        Component: m4L3,
        exercises: [
          {
            id: 'ex-4-3-1',
            title: 'Self-drawing curve',
            description: 'Add an <animate> on stroke-dashoffset from 100 to 0, dur=2s, fill="freeze". The path already has pathLength=100 set.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="#7c5cff" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">\n    <!-- Add animate -->\n  </path>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="#7c5cff" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">\n    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" fill="freeze"/>\n  </path>\n</svg>`,
          },
          {
            id: 'ex-4-3-2',
            title: 'Loop draw + erase',
            description: 'Make the same path draw and erase forever. Animate stroke-dashoffset values="100;0;-100", dur=3s, repeatCount="indefinite".',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="#ffd43b" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">\n    <!-- looping animate -->\n  </path>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="#ffd43b" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">\n    <animate attributeName="stroke-dashoffset" values="100;0;-100" dur="3s" repeatCount="indefinite"/>\n  </path>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-4',
        title: 'Motion Along Paths',
        Component: m4L4,
        exercises: [
          {
            id: 'ex-4-4-1',
            title: 'Travel along a path',
            description: 'Add an <animateMotion> child to the circle that follows path "M 20 50 Q 50 0 80 50", dur=3s, infinite. Use mpath referencing #track.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path id="track" d="M 20 50 Q 50 0 80 50" fill="none" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3 3"/>\n  <circle r="5" fill="#7c5cff">\n    <!-- animateMotion + mpath -->\n  </circle>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path id="track" d="M 20 50 Q 50 0 80 50" fill="none" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3 3"/>\n  <circle r="5" fill="#7c5cff">\n    <animateMotion dur="3s" repeatCount="indefinite">\n      <mpath href="#track"/>\n    </animateMotion>\n  </circle>\n</svg>`,
          },
          {
            id: 'ex-4-4-2',
            title: 'Auto-rotate along path',
            description: 'Same setup, but make the arrow rotate to face the direction of travel by adding rotate="auto" on the animateMotion.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path id="track2" d="M 20 50 Q 50 0 80 50" fill="none" stroke="rgba(255,255,255,0.15)"/>\n  <polygon points="-6,-3 -6,3 6,0" fill="#ffd43b">\n    <animateMotion dur="3s" repeatCount="indefinite">\n      <mpath href="#track2"/>\n    </animateMotion>\n  </polygon>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path id="track2" d="M 20 50 Q 50 0 80 50" fill="none" stroke="rgba(255,255,255,0.15)"/>\n  <polygon points="-6,-3 -6,3 6,0" fill="#ffd43b">\n    <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">\n      <mpath href="#track2"/>\n    </animateMotion>\n  </polygon>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-5',
        title: 'Path Morphing',
        Component: m4L5,
        exercises: [
          {
            id: 'ex-4-5-1',
            title: 'Square ↔ diamond morph',
            description: 'Animate d cycling: M 20 20 L 80 20 L 80 80 L 20 80 Z; M 50 20 L 80 50 L 50 80 L 20 50 Z; M 20 20 L 80 20 L 80 80 L 20 80 Z. dur=3s, infinite. Each keyframe has 4 L plus Z.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <path fill="#7c5cff">\n    <!-- animate d, square ↔ diamond -->\n  </path>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <path fill="#7c5cff">\n    <animate attributeName="d" values="M 20 20 L 80 20 L 80 80 L 20 80 Z;M 50 20 L 80 50 L 50 80 L 20 50 Z;M 20 20 L 80 20 L 80 80 L 20 80 Z" dur="3s" repeatCount="indefinite"/>\n  </path>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-6',
        title: 'Advanced Path Techniques',
        Component: m4L6,
        exercises: [
          {
            id: 'ex-4-6-1',
            title: 'Use a clip-path',
            description: 'Add clip-path="url(#dot)" to the rect so it only shows inside the circle defined in <defs>.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <defs>\n    <clipPath id="dot"><circle cx="50" cy="50" r="40"/></clipPath>\n  </defs>\n  <rect x="0" y="0" width="100" height="100" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <defs>\n    <clipPath id="dot"><circle cx="50" cy="50" r="40"/></clipPath>\n  </defs>\n  <rect x="0" y="0" width="100" height="100" fill="#7c5cff" clip-path="url(#dot)"/>\n</svg>`,
          },
          {
            id: 'ex-4-6-2',
            title: 'Gradient fill',
            description: 'Set fill="url(#grad)" on the rect, where grad is a linearGradient defined in <defs> from #7c5cff at 0% to #ffd43b at 100%.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <defs>\n    <linearGradient id="grad" x1="0%" x2="100%">\n      <stop offset="0%" stop-color="#7c5cff"/>\n      <stop offset="100%" stop-color="#ffd43b"/>\n    </linearGradient>\n  </defs>\n  <rect x="20" y="20" width="60" height="60"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <defs>\n    <linearGradient id="grad" x1="0%" x2="100%">\n      <stop offset="0%" stop-color="#7c5cff"/>\n      <stop offset="100%" stop-color="#ffd43b"/>\n    </linearGradient>\n  </defs>\n  <rect x="20" y="20" width="60" height="60" fill="url(#grad)"/>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-7',
        title: 'Capstone: Animated Logo',
        Component: m4L7,
        exercises: [
          {
            id: 'ex-4-7-1',
            title: 'Self-drawing logo path',
            description: 'Path d="M 20 60 C 40 0, 80 0, 100 60 S 160 100, 180 40", fill=none, stroke="#7c5cff", stroke-width=3, stroke-linecap="round", pathLength=100, stroke-dasharray=100, stroke-dashoffset=100. Animate stroke-dashoffset 100→0 over 1.4s, fill=freeze.',
            initialCode: `<svg viewBox="0 0 200 80">\n  <!-- The logo path with self-drawing animation -->\n</svg>`,
            solution: `<svg viewBox="0 0 200 80">\n  <path d="M 20 60 C 40 0, 80 0, 100 60 S 160 100, 180 40" fill="none" stroke="#7c5cff" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">\n    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.4s" fill="freeze"/>\n  </path>\n</svg>`,
          },
          {
            id: 'ex-4-7-2',
            title: 'Traveler dot along the logo',
            description: 'Add a circle r=4 fill="#ffd43b". Give it animateMotion with dur=1.4s, fill=freeze, path matching the logo path.',
            initialCode: `<svg viewBox="0 0 200 80">\n  <path d="M 20 60 C 40 0, 80 0, 100 60 S 160 100, 180 40" fill="none" stroke="#7c5cff" stroke-width="3" stroke-linecap="round"/>\n  <!-- Add the traveler circle with animateMotion -->\n</svg>`,
            solution: `<svg viewBox="0 0 200 80">\n  <path d="M 20 60 C 40 0, 80 0, 100 60 S 160 100, 180 40" fill="none" stroke="#7c5cff" stroke-width="3" stroke-linecap="round"/>\n  <circle r="4" fill="#ffd43b">\n    <animateMotion dur="1.4s" fill="freeze" path="M 20 60 C 40 0, 80 0, 100 60 S 160 100, 180 40"/>\n  </circle>\n</svg>`,
          },
        ],
      },
      {
        id: 'lesson-4-8',
        title: 'Animating with JavaScript',
        Component: m4L8,
        exercises: [
          {
            id: 'ex-4-8-1',
            title: 'Mark for IntersectionObserver',
            description: 'Add class="reveal-target" so an IntersectionObserver in your JS can detect when the SVG enters the viewport.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#7c5cff"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100" class="reveal-target">\n  <circle cx="50" cy="50" r="30" fill="#7c5cff"/>\n</svg>`,
          },
          {
            id: 'ex-4-8-2',
            title: 'Add an id for WAAPI',
            description: 'Set id="hero-circle" so document.getElementById("hero-circle").animate(...) can target it.',
            initialCode: `<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#ffd43b"/>\n</svg>`,
            solution: `<svg viewBox="0 0 100 100">\n  <circle id="hero-circle" cx="50" cy="50" r="30" fill="#ffd43b"/>\n</svg>`,
          },
        ],
      },
    ],
  },
];

export const findModule = (id: string | null | undefined) =>
  modules.find((m) => m.id === id);

export const findLesson = (moduleId: string | null | undefined, lessonId: string | null | undefined) => {
  const mod = findModule(moduleId);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.id === lessonId);
};
