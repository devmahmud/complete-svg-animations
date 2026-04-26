import React, { useMemo } from 'react';

interface PreviewFrameProps {
  code: string;
  className?: string;
  height?: number | string;
}

const buildSrcDoc = (code: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0; height: 100%;
    color: #ede9de;
    font: 14px/1.4 'Inter', system-ui, sans-serif;
  }
  body {
    background-color: #13171f;
    background-image:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 24px 24px, 24px 24px;
    background-position: center center, center center;
    display: flex; align-items: center; justify-content: center;
    padding: 12px;
    overflow: hidden;
  }
  /* The SVG fills the available area; viewBox + default preserveAspectRatio
     keeps its content fully visible without distortion. overflow: visible
     allows easing overshoot (bounce/elastic) to render past viewBox edges. */
  body > svg {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: block;
    overflow: visible;
  }
</style>
</head><body>
${code}
</body></html>`;

const PreviewFrame: React.FC<PreviewFrameProps> = ({ code, className, height = 320 }) => {
  const srcDoc = useMemo(() => buildSrcDoc(code), [code]);

  return (
    <iframe
      title="SVG Preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className={`block w-full border-0 rounded-lg ${className ?? ''}`}
      style={{ height, background: '#13171f' }}
    />
  );
};

export default PreviewFrame;
