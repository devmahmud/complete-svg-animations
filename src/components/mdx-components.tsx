import React, { useState, ReactNode } from 'react';
import {
  Check,
  Copy,
  Info,
  AlertTriangle,
  Lightbulb,
  Target,
  Sparkles,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveSVG from './live-svg';

const extractText = (node: ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return '';
};

const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  children,
  className,
  ...rest
}) => {
  const [copied, setCopied] = useState(false);
  const lang = (rest as Record<string, string>)['data-language'] || 'code';

  let code = '';
  if (React.isValidElement(children)) {
    const props = children.props as { children?: ReactNode };
    code = extractText(props.children).replace(/\n$/, '');
  } else {
    code = extractText(children);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="not-prose my-5 group/code">
      <div className="plate overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.05]">
          <span className="font-mono text-2xs uppercase tracking-widest text-ink-400">
            {lang}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="toolbar-btn !w-7 !h-7 opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100 transition-opacity"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <pre
          {...rest}
          className={`${className ?? ''} !bg-ink-950 !border-0 !rounded-none !my-0 overflow-x-auto`}
          style={{ padding: '14px 16px' }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
};

const InlineCode: React.FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  // MDX wraps fenced code in <pre><code>; only style "loose" inline code here.
  const isInline = !className || !/language-/.test(className);
  if (!isInline) return <code className={className}>{children}</code>;
  return <code className="code-inline">{children}</code>;
};

const Anchor: React.FC<{ href?: string; children?: ReactNode }> = ({ href, children }) => {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="text-accent-200 underline underline-offset-[3px] decoration-accent-500/40 hover:decoration-accent-300 transition-colors"
    >
      {children}
    </a>
  );
};

const Table: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <div className="not-prose my-5 plate overflow-x-auto">
    <table className="w-full text-sm">{children}</table>
  </div>
);

const Th: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <th className="text-left px-4 py-2.5 text-2xs uppercase tracking-widest text-ink-400 font-medium border-b border-white/[0.06]">
    {children}
  </th>
);

const Td: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <td className="px-4 py-2.5 text-ink-200 border-b border-white/[0.04] align-top">{children}</td>
);

const Blockquote: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <blockquote
    className="not-prose my-5 plate p-4 flex gap-3"
    style={{ borderLeft: '2px solid var(--accent)' }}
  >
    <Info className="w-4 h-4 text-accent-300 shrink-0 mt-0.5" />
    <div className="text-ink-200 text-sm [&>p]:m-0 [&>p+p]:mt-2">{children}</div>
  </blockquote>
);

const Hr: React.FC = () => (
  <hr
    className="my-8 border-0 h-px"
    style={{
      background:
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
    }}
  />
);

interface CalloutProps {
  type?: 'info' | 'tip' | 'warn';
  title?: string;
  children?: ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const map = {
    info: { Icon: Info, color: '#7c5cff', bg: 'rgba(124,92,255,0.10)', border: 'rgba(124,92,255,0.28)' },
    tip: { Icon: Lightbulb, color: '#3ddc97', bg: 'rgba(61,220,151,0.10)', border: 'rgba(61,220,151,0.28)' },
    warn: { Icon: AlertTriangle, color: '#ffd43b', bg: 'rgba(255,212,59,0.10)', border: 'rgba(255,212,59,0.28)' },
  } as const;
  const { Icon, color, bg, border } = map[type];
  return (
    <div
      className="not-prose my-5 rounded-xl p-4 flex gap-3"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
      <div className="text-sm text-ink-100 [&>p]:m-0 [&>p+p]:mt-2">
        {title && (
          <div className="font-medium mb-1" style={{ color }}>
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

interface ObjectiveProps {
  children: ReactNode;
}

const Objective: React.FC<ObjectiveProps> = ({ children }) => (
  <aside
    className="not-prose my-6 rounded-xl p-5"
    style={{
      background: 'linear-gradient(135deg, rgba(124,92,255,0.10), rgba(255,212,59,0.04))',
      border: '1px solid rgba(124,92,255,0.22)',
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <Target className="w-4 h-4 text-accent-300" />
      <span className="text-2xs uppercase tracking-widest text-accent-200">
        What you'll learn
      </span>
    </div>
    <div className="text-sm text-ink-100 [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-1.5 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['→'] [&_li]:before:text-accent-300 [&_li]:before:shrink-0 [&_li]:before:font-mono">
      {children}
    </div>
  </aside>
);

interface TryItProps {
  goal: string;
  children: ReactNode;
}

const TryIt: React.FC<TryItProps> = ({ goal, children }) => (
  <section
    className="not-prose my-7 rounded-xl overflow-hidden"
    style={{
      background:
        'linear-gradient(180deg, rgba(255,212,59,0.06), rgba(255,212,59,0.02))',
      border: '1px solid rgba(255,212,59,0.20)',
    }}
  >
    <div
      className="flex items-center gap-2 px-4 py-2.5"
      style={{ borderBottom: '1px solid rgba(255,212,59,0.18)' }}
    >
      <Sparkles className="w-4 h-4 text-signal-500" />
      <span className="text-2xs uppercase tracking-widest text-signal-500">
        Try it yourself
      </span>
    </div>
    <div className="px-4 pt-4">
      <p className="text-sm text-ink-100 mb-3">
        <span className="font-medium text-ink-50">Goal:</span> {goal}
      </p>
    </div>
    <div className="px-4 pb-4">{children}</div>
  </section>
);

interface RecapProps {
  takeaways: string[];
  next?: { to: string; label: string };
}

const Recap: React.FC<RecapProps> = ({ takeaways, next }) => (
  <aside
    className="not-prose mt-10 mb-2 rounded-xl p-5"
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--hairline)',
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <Compass className="w-4 h-4 text-success" />
      <span className="text-2xs uppercase tracking-widest text-ink-300">Recap</span>
    </div>
    <ul className="space-y-2 text-sm text-ink-200">
      {takeaways.map((t, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="font-mono text-2xs text-ink-500 pt-1 tabular-nums w-5 shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
    {next && (
      <Link
        to={next.to}
        className="mt-4 inline-flex items-center gap-2 text-sm text-accent-200 hover:text-accent-100"
      >
        <span>Up next: {next.label}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    )}
  </aside>
);

export const mdxComponents = {
  pre: Pre,
  code: InlineCode,
  a: Anchor,
  table: Table,
  th: Th,
  td: Td,
  blockquote: Blockquote,
  hr: Hr,
  // Components MDX authors can use directly:
  LiveSVG,
  Callout,
  Objective,
  TryIt,
  Recap,
};

export default mdxComponents;
