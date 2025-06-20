import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, RotateCcw, Download, Share2, Sparkles } from 'lucide-react';
import CodePlayground from '../components/CodePlayground';

const Playground: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('basic');

  const templates = {
    basic: {
      name: 'Basic Shapes',
      description: 'Start with simple SVG shapes',
      code: `<svg viewBox="0 0 100 100">
  <rect x="10" y="10" width="30" height="30" fill="red"/>
  <circle cx="70" cy="30" r="15" fill="blue"/>
  <line x1="10" y1="70" x2="90" y2="70" stroke="green" stroke-width="3"/>
</svg>`,
    },
    animation: {
      name: 'CSS Animation',
      description: 'Animated shapes with CSS',
      code: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="20" fill="purple" class="pulse"/>
</svg>

<style>
.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}
</style>`,
    },
    smil: {
      name: 'SMIL Animation',
      description: 'SVG native animations',
      code: `<svg viewBox="0 0 100 100">
  <rect x="10" y="10" width="20" height="20" fill="orange">
    <animate attributeName="x" values="10;70;10" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="y" values="10;70;10" dur="3s" repeatCount="indefinite"/>
  </rect>
</svg>`,
    },
    path: {
      name: 'Path Animation',
      description: 'Drawing animations with paths',
      code: `<svg viewBox="0 0 100 100">
  <path d="M 20 50 Q 50 20 80 50 T 80 80" 
        stroke="crimson" 
        stroke-width="3" 
        fill="none"
        stroke-dasharray="0,200"
        class="draw">
    <animate attributeName="stroke-dasharray" 
             values="0,200;200,0" 
             dur="2s" 
             repeatCount="indefinite"/>
  </path>
</svg>`,
    },
    complex: {
      name: 'Complex Animation',
      description: 'Multiple animated elements',
      code: `<svg viewBox="0 0 100 100">
  <g class="rotating-group">
    <rect x="35" y="35" width="30" height="30" fill="none" stroke="blue" stroke-width="2"/>
    <circle cx="50" cy="50" r="5" fill="red"/>
  </g>
  
  <circle cx="20" cy="20" r="3" fill="green" class="bounce"/>
  <circle cx="80" cy="20" r="3" fill="green" class="bounce" style="animation-delay: 0.5s"/>
  <circle cx="20" cy="80" r="3" fill="green" class="bounce" style="animation-delay: 1s"/>
  <circle cx="80" cy="80" r="3" fill="green" class="bounce" style="animation-delay: 1.5s"/>
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
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>`,
    },
  };

  const handleTemplateSelect = (templateKey: string) => {
    setSelectedTemplate(templateKey);
  };

  const handleDownload = () => {
    const code = templates[selectedTemplate as keyof typeof templates].code;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `svg-animation-${selectedTemplate}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const code = templates[selectedTemplate as keyof typeof templates].code;
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Header */}
      <motion.div
        className="text-center mb-6 lg:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-secondary-100 to-primary-100 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-secondary-600" />
          <span className="text-sm font-medium text-secondary-700">Interactive Playground</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 mb-4">
          SVG Animation Playground
        </h1>
        <p className="text-lg lg:text-xl text-dark-600 max-w-3xl mx-auto">
          Experiment with SVG animations in real-time. Try different templates, modify code, and see
          your creations come to life instantly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Templates Sidebar */}
        <motion.div
          className="xl:col-span-1 order-2 xl:order-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="card">
            <div className="flex items-center space-x-2 mb-4 lg:mb-6">
              <Code className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg lg:text-xl font-semibold text-dark-900">Templates</h2>
            </div>

            <div className="space-y-3">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => handleTemplateSelect(key)}
                  className={`w-full text-left p-3 lg:p-4 rounded-lg border transition-all duration-200 ${
                    selectedTemplate === key
                      ? 'border-primary-300 bg-primary-50 text-primary-700'
                      : 'border-dark-200 hover:border-primary-200 hover:bg-primary-50'
                  }`}
                >
                  <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                  <p className="text-xs text-dark-600">{template.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-dark-200">
              <h3 className="font-semibold text-dark-900 mb-3">Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download Code</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Copy to Clipboard</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Editor and Preview */}
        <motion.div
          className="xl:col-span-2 order-1 xl:order-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-secondary-600" />
                <h2 className="text-lg lg:text-xl font-semibold text-dark-900">
                  {templates[selectedTemplate as keyof typeof templates].name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTemplate(selectedTemplate)}
                className="flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors self-start"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
            </div>

            <CodePlayground
              initialCode={templates[selectedTemplate as keyof typeof templates].code}
              solution=""
              onComplete={() => {}}
              completed={false}
              showSolution={false}
              showControls={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div
        className="mt-8 lg:mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="card">
          <h2 className="text-lg lg:text-xl font-semibold text-dark-900 mb-4">Pro Tips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-dark-800 mb-2">CSS Animations</h3>
              <ul className="text-sm text-dark-600 space-y-1">
                <li>
                  • Use <code>transform</code> for better performance
                </li>
                <li>
                  • Combine multiple animations with <code>animation-delay</code>
                </li>
                <li>
                  • Use <code>ease-in-out</code> for smooth transitions
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-dark-800 mb-2">SMIL Animations</h3>
              <ul className="text-sm text-dark-600 space-y-1">
                <li>
                  • Animate any SVG attribute with <code>&lt;animate&gt;</code>
                </li>
                <li>
                  • Use <code>values</code> for complex animations
                </li>
                <li>
                  • Control timing with <code>dur</code> and <code>repeatCount</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Playground;
