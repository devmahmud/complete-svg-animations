import React, { useEffect, useRef, useState } from 'react';
import { Code2, Eye, RotateCcw } from 'lucide-react';
import Editor, { OnMount } from '@monaco-editor/react';
import PreviewFrame from './preview-frame';
import { installMonacoTheme, SVG_ANIM_DARK } from '../lib/monacoTheme';

interface LiveSVGProps {
  code: string;
  height?: number;
  caption?: string;
  defaultView?: 'preview' | 'code' | 'split';
}

const LiveSVG: React.FC<LiveSVGProps> = ({
  code,
  height = 360,
  caption,
  defaultView = 'split',
}) => {
  const initial = code.replace(/^\n+/, '').replace(/\s+$/, '');
  const [source, setSource] = useState(initial);
  const [view, setView] = useState<'preview' | 'code' | 'split'>(defaultView);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  // Push the initial value back into Monaco verbatim once it mounts. This
  // bypasses any provider-level auto-format that runs during initial value sync.
  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.setValue(initial);
  };

  const handleReset = () => {
    setSource(initial);
    if (editorRef.current) editorRef.current.setValue(initial);
  };

  // Keep state in sync when the user edits.
  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.getValue() !== source) {
      editorRef.current.setValue(source);
    }
  }, [source]);

  return (
    <figure className="my-6 not-prose">
      <div className="plate overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.05]">
          <div className="flex items-center gap-2 text-2xs uppercase tracking-widest text-ink-300">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, #7c5cff, #ffd43b)' }}
            />
            Live example
          </div>
          <div className="flex items-center gap-1">
            <div className="segmented !p-0.5">
              <button
                type="button"
                onClick={() => setView('preview')}
                className={view === 'preview' ? 'is-active' : ''}
                aria-label="Preview only"
                title="Preview"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setView('split')}
                className={view === 'split' ? 'is-active' : ''}
                aria-label="Split view"
                title="Split"
              >
                <span className="text-2xs font-mono">⇆</span>
              </button>
              <button
                type="button"
                onClick={() => setView('code')}
                className={view === 'code' ? 'is-active' : ''}
                aria-label="Code only"
                title="Code"
              >
                <Code2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="toolbar-btn"
              aria-label="Reset"
              title="Reset to original"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div
          className={`grid ${view === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-px`}
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {(view === 'split' || view === 'code') && (
            <div style={{ height, background: '#13171f' }}>
              <Editor
                height={height}
                defaultLanguage="html"
                defaultValue={initial}
                onChange={(value) => setSource(value || '')}
                beforeMount={(monaco) => installMonacoTheme(monaco)}
                onMount={handleMount}
                theme={SVG_ANIM_DARK}
                options={{
                  minimap: { enabled: false },
                  fontSize: 12.5,
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontLigatures: true,
                  lineNumbers: 'off',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'off',
                  folding: false,
                  glyphMargin: false,
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  overviewRulerBorder: false,
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  renderLineHighlight: 'none',
                  padding: { top: 10, bottom: 10 },
                  scrollbar: { vertical: 'auto', horizontal: 'auto' },
                  // Critical: do not let Monaco rewrite whitespace on load.
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
            <PreviewFrame code={source} height={height} />
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-2xs text-ink-400 text-center font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default LiveSVG;
