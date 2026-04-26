import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Download, Share2, Sparkles, Check } from 'lucide-react';
import CodePlayground from '../components/code-playground';

const TEMPLATES = {
  basic: {
    name: 'Basic Shapes',
    description: 'Primitives anchored in a 100×100 viewBox.',
    code: `<svg viewBox="0 0 100 100">
  <rect x="10" y="10" width="30" height="30" fill="#7c5cff"/>
  <circle cx="70" cy="30" r="15" fill="#ffd43b"/>
  <line x1="10" y1="70" x2="90" y2="70" stroke="#3ddc97" stroke-width="3"/>
</svg>`,
  },
  css: {
    name: 'CSS Animation',
    description: 'Keyframes + transform on an SVG node.',
    code: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="20" fill="#7c5cff" class="pulse"/>
</svg>

<style>
.pulse {
  transform-origin: 50% 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}
</style>`,
  },
  smil: {
    name: 'SMIL Animation',
    description: 'SVG-native <animate> on multiple attrs.',
    code: `<svg viewBox="0 0 100 100">
  <rect x="10" y="10" width="20" height="20" fill="#ffd43b">
    <animate attributeName="x" values="10;70;10" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="y" values="10;70;10" dur="3s" repeatCount="indefinite"/>
  </rect>
</svg>`,
  },
  path: {
    name: 'Path Drawing',
    description: 'stroke-dasharray for hand-drawn lines.',
    code: `<svg viewBox="0 0 100 100">
  <path d="M 20 50 Q 50 20 80 50 T 80 80"
        stroke="#7c5cff" stroke-width="3"
        fill="none" stroke-linecap="round"
        stroke-dasharray="200" stroke-dashoffset="200">
    <animate attributeName="stroke-dashoffset"
             values="200;0;200" dur="3s" repeatCount="indefinite"/>
  </path>
</svg>`,
  },
  motion: {
    name: 'Motion Path',
    description: 'animateMotion follows an arbitrary path.',
    code: `<svg viewBox="0 0 100 100">
  <path id="track" d="M 10 80 C 30 10, 70 10, 90 80"
        fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <circle r="4" fill="#ffd43b">
    <animateMotion dur="3s" repeatCount="indefinite">
      <mpath href="#track"/>
    </animateMotion>
  </circle>
</svg>`,
  },
  complex: {
    name: 'Complex Composition',
    description: 'Layered CSS + SMIL with delays.',
    code: `<svg viewBox="0 0 100 100">
  <g class="rotating-group">
    <rect x="35" y="35" width="30" height="30" fill="none" stroke="#7c5cff" stroke-width="2"/>
    <circle cx="50" cy="50" r="5" fill="#ffd43b"/>
  </g>

  <circle cx="20" cy="20" r="3" fill="#3ddc97" class="bounce"/>
  <circle cx="80" cy="20" r="3" fill="#3ddc97" class="bounce" style="animation-delay: 0.5s"/>
  <circle cx="20" cy="80" r="3" fill="#3ddc97" class="bounce" style="animation-delay: 1s"/>
  <circle cx="80" cy="80" r="3" fill="#3ddc97" class="bounce" style="animation-delay: 1.5s"/>
</svg>

<style>
.rotating-group {
  animation: rotate 3s linear infinite;
  transform-origin: 50% 50%;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.bounce {
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>`,
  },
} as const;

type TemplateKey = keyof typeof TEMPLATES;

const Playground: React.FC = () => {
  const [selected, setSelected] = useState<TemplateKey>('basic');
  const [copied, setCopied] = useState(false);

  const template = TEMPLATES[selected];

  const handleDownload = () => {
    const blob = new Blob(
      [`<!doctype html><html><head><meta charset="utf-8"/></head><body>\n${template.code}\n</body></html>`],
      { type: 'text/html' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svg-${selected}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-2xs uppercase tracking-[0.4em] text-accent-300/80 mb-2">
          Sandbox
        </div>
        <h1 className="text-display text-3xl lg:text-5xl text-ink-50 text-balance">
          Playground
        </h1>
        <p className="text-ink-300 mt-3 max-w-2xl">
          Edit, render, and iterate. The preview runs in a sandboxed iframe so styles and
          animations behave exactly like a real page.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
        <aside className="space-y-3">
          <div className="plate p-3">
            <div className="text-2xs uppercase tracking-widest text-ink-400 px-2 py-1.5">
              Templates
            </div>
            <div className="space-y-1">
              {(Object.keys(TEMPLATES) as TemplateKey[]).map((key) => {
                const t = TEMPLATES[key];
                const active = selected === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`relative w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                      active
                        ? 'bg-accent-500/10 text-ink-50'
                        : 'text-ink-200 hover:text-ink-50 hover:bg-white/[0.03]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="pg-active"
                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
                        style={{ background: 'linear-gradient(180deg, #7c5cff, #ffd43b)' }}
                      />
                    )}
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-2xs text-ink-400 mt-0.5">{t.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="plate p-3 space-y-1">
            <div className="text-2xs uppercase tracking-widest text-ink-400 px-2 py-1.5">
              Actions
            </div>
            <button
              onClick={handleDownload}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-200 hover:text-ink-50 hover:bg-white/[0.04] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download HTML
            </button>
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-200 hover:text-ink-50 hover:bg-white/[0.04] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-accent-300" />
              <h2 className="text-display text-lg text-ink-50">{template.name}</h2>
            </div>
            <div className="text-2xs uppercase tracking-widest text-ink-500 font-mono">
              {selected}
            </div>
          </div>
          <CodePlayground
            key={selected}
            initialCode={template.code}
            solution=""
            onComplete={() => {}}
            completed={false}
            showSolution={false}
          />

          <div className="plate p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-signal-500" />
              <h3 className="text-2xs uppercase tracking-widest text-ink-300 font-medium">
                Tips
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-ink-300">
              <ul className="space-y-1.5">
                <li>Use <code className="code-inline">transform</code> for performant motion.</li>
                <li>Stagger via <code className="code-inline">animation-delay</code>.</li>
                <li>Prefer <code className="code-inline">ease-in-out</code> for organic curves.</li>
              </ul>
              <ul className="space-y-1.5">
                <li>Animate any attribute with <code className="code-inline">&lt;animate&gt;</code>.</li>
                <li>Pass <code className="code-inline">values</code> for keyframe-like control.</li>
                <li><code className="code-inline">repeatCount="indefinite"</code> loops forever.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
