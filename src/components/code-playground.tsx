import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Eye, Loader, RotateCcw, Check, X, Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import PreviewFrame from './preview-frame';
import { checkSolution } from '../lib/checkSolution';
import { installMonacoTheme, SVG_ANIM_DARK } from '../lib/monacoTheme';

interface CodePlaygroundProps {
  initialCode: string;
  solution: string;
  onComplete: () => void;
  completed: boolean;
  showSolution?: boolean;
  showControls?: boolean;
}

type View = 'split' | 'code' | 'preview';

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  solution,
  onComplete,
  completed,
  showSolution = true,
  showControls = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [view, setView] = useState<View>('split');
  const [showSolutionCode, setShowSolutionCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const feedbackTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setCode(initialCode);
    setFeedback(null);
    setShowSolutionCode(false);
  }, [initialCode]);

  useEffect(() => () => {
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
  }, []);

  const hasSolution = Boolean(solution && solution.trim());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setShowSolutionCode(false);
    setFeedback(null);
  };

  const handleCheck = async () => {
    if (!hasSolution) return;
    setChecking(true);
    await new Promise((r) => window.setTimeout(r, 350));
    const result = checkSolution(code, solution);
    setChecking(false);
    if (result.ok) {
      setFeedback({ ok: true, message: 'Looks right — nice work.' });
      onComplete();
    } else {
      setFeedback({ ok: false, message: result.reason });
    }
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), 6000);
  };

  return (
    <div className="space-y-3">
      {showControls && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="segmented" role="tablist" aria-label="Playground view">
            <button
              type="button"
              onClick={() => setView('split')}
              className={view === 'split' ? 'is-active' : ''}
              role="tab"
              aria-selected={view === 'split'}
            >
              Split
            </button>
            <button
              type="button"
              onClick={() => setView('code')}
              className={view === 'code' ? 'is-active' : ''}
              role="tab"
              aria-selected={view === 'code'}
            >
              Code
            </button>
            <button
              type="button"
              onClick={() => setView('preview')}
              className={view === 'preview' ? 'is-active' : ''}
              role="tab"
              aria-selected={view === 'preview'}
            >
              Preview
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="toolbar-btn"
              aria-label="Copy code"
              title={copied ? 'Copied' : 'Copy code'}
            >
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="toolbar-btn"
              aria-label="Reset"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            {showSolution && hasSolution && (
              <button
                type="button"
                onClick={() => setShowSolutionCode((v) => !v)}
                className="toolbar-btn"
                aria-label="Toggle solution"
                title={showSolutionCode ? 'Hide solution' : 'Show solution'}
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            {hasSolution && (
              <button
                type="button"
                onClick={handleCheck}
                disabled={completed || checking}
                className={`btn ml-1 ${
                  completed
                    ? 'text-success border border-success/30 bg-success/10'
                    : 'btn-primary'
                }`}
              >
                {checking ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span>{completed ? 'Completed' : checking ? 'Checking…' : 'Check'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="rounded-xl overflow-hidden plate">
        <div
          className={`grid gap-px ${
            view === 'split' ? 'lg:grid-cols-2 grid-cols-1' : 'grid-cols-1'
          }`}
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {(view === 'split' || view === 'code') && (
            <div style={{ background: '#13171f' }}>
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 text-2xs font-medium uppercase tracking-wider text-ink-300">
                  <Code2 className="w-3.5 h-3.5" />
                  Editor
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="w-2 h-2 rounded-full bg-white/10" />
                </div>
              </div>
              <Editor
                height="340px"
                defaultLanguage="html"
                value={code}
                onChange={(value) => setCode(value || '')}
                beforeMount={(monaco) => installMonacoTheme(monaco)}
                theme={SVG_ANIM_DARK}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontLigatures: true,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'off',
                  padding: { top: 12, bottom: 12 },
                  scrollbar: { vertical: 'auto', horizontal: 'auto' },
                  tabSize: 2,
                  insertSpaces: true,
                  detectIndentation: false,
                  formatOnPaste: false,
                  formatOnType: false,
                  autoIndent: 'none',
                  trimAutoWhitespace: false,
                }}
              />
            </div>
          )}

          {(view === 'split' || view === 'preview') && (
            <div style={{ background: '#13171f' }}>
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 text-2xs font-medium uppercase tracking-wider text-ink-300">
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </div>
                <span className="text-2xs font-mono text-ink-400">sandboxed</span>
              </div>
              <PreviewFrame code={code} height={340} />
            </div>
          )}
        </div>
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm border ${
            feedback.ok
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-danger/30 bg-danger/10 text-danger'
          }`}
        >
          {feedback.ok ? <Check className="w-4 h-4 mt-0.5 shrink-0" /> : <X className="w-4 h-4 mt-0.5 shrink-0" />}
          <span>{feedback.message}</span>
        </motion.div>
      )}

      {showSolution && showSolutionCode && hasSolution && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="plate overflow-hidden"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
            <div className="flex items-center gap-2 text-2xs font-medium uppercase tracking-wider text-ink-300">
              <CheckCircle className="w-3.5 h-3.5 text-success" />
              Reference Solution
            </div>
          </div>
          <Editor
            height="220px"
            defaultLanguage="html"
            value={solution}
            beforeMount={(monaco) => installMonacoTheme(monaco)}
            theme={SVG_ANIM_DARK}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: 'JetBrains Mono, ui-monospace, monospace',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 },
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CodePlayground;
