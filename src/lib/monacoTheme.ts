import type { Monaco } from '@monaco-editor/react';

export const SVG_ANIM_DARK = 'svg-anim-dark';

let installed = false;

/**
 * Custom Monaco theme keyed to our ink palette so the editor reads as
 * the same surface as the live-preview iframe (#13171f).
 */
export function installMonacoTheme(monaco: Monaco) {
  if (installed) return;
  installed = true;

  monaco.editor.defineTheme(SVG_ANIM_DARK, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // HTML / XML
      { token: 'tag', foreground: 'a585ff' },           // accent-300 — element name
      { token: 'metatag', foreground: 'a585ff' },
      { token: 'attribute.name', foreground: 'ffe066' }, // signal-400 — attr name
      { token: 'attribute.value', foreground: '3ddc97' }, // success — attr value
      { token: 'delimiter', foreground: '5a6378' },      // ink-400 — < > = /
      { token: 'comment', foreground: '5a6378', fontStyle: 'italic' },
      { token: 'string', foreground: '3ddc97' },

      // CSS (inside <style>)
      { token: 'attribute.name.css', foreground: 'ffe066' },
      { token: 'attribute.value.css', foreground: '3ddc97' },
      { token: 'keyword.css', foreground: 'a585ff' },
      { token: 'tag.css', foreground: 'a585ff' },
      { token: 'value.unit.css', foreground: 'c8b3ff' },
      { token: 'value.numeric.css', foreground: 'c8b3ff' },
      { token: 'value.hex.css', foreground: 'c8b3ff' },
    ],
    colors: {
      'editor.background': '#13171f',           // matches PreviewFrame bg
      'editor.foreground': '#ede9de',
      'editorLineNumber.foreground': '#3a4254',
      'editorLineNumber.activeForeground': '#8a93a8',
      'editor.selectionBackground': '#7c5cff33',
      'editor.inactiveSelectionBackground': '#7c5cff22',
      'editor.lineHighlightBackground': '#ffffff05',
      'editor.lineHighlightBorder': '#00000000',
      'editorCursor.foreground': '#ffd43b',
      'editorBracketMatch.background': '#7c5cff20',
      'editorBracketMatch.border': '#7c5cff60',
      'editorIndentGuide.background': '#ffffff08',
      'editorIndentGuide.activeBackground': '#ffffff14',
      'editorWhitespace.foreground': '#ffffff10',
      'scrollbar.shadow': '#00000000',
      'scrollbarSlider.background': '#ffffff10',
      'scrollbarSlider.hoverBackground': '#ffffff20',
      'scrollbarSlider.activeBackground': '#7c5cff60',
    },
  });
}
