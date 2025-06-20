import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, EyeOff, CheckCircle, RotateCcw, Copy, Loader } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface CodePlaygroundProps {
  initialCode: string;
  solution: string;
  onComplete: () => void;
  completed: boolean;
  showSolution?: boolean;
  showControls?: boolean;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  solution,
  onComplete,
  completed,
  showSolution = true,
  showControls = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [showPreview, setShowPreview] = useState(true);
  const [showSolutionCode, setShowSolutionCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkingSolution, setCheckingSolution] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setShowSolutionCode(false);
  };

  const handleShowSolution = () => {
    setShowSolutionCode(!showSolutionCode);
  };

  const checkSolution = async () => {
    setCheckingSolution(true);

    // Simple solution checking - in a real app, you'd want more sophisticated comparison
    if (!solution || solution.trim() === '') {
      console.warn('No solution provided for this exercise');
      setCheckingSolution(false);
      return;
    }

    // Normalize both code and solution for comparison
    const normalizeCode = (code: string) => {
      return code
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/['"]/g, '"') // Normalize quotes
        .replace(/>\s+</g, '><') // Remove whitespace between tags
        .trim()
        .toLowerCase(); // Case insensitive
    };

    const normalizedCode = normalizeCode(code);
    const normalizedSolution = normalizeCode(solution);

    console.log('Checking solution:', {
      normalizedCode,
      normalizedSolution,
      codeLength: normalizedCode.length,
      solutionLength: normalizedSolution.length,
    });

    // Extract key elements from solution (SVG elements, attributes, etc.)
    const extractKeyElements = (code: string) => {
      const elements = [];

      // Extract element names
      const elementMatches = code.match(/<(\w+)/g);
      if (elementMatches) {
        elements.push(...elementMatches.map((el) => el.slice(1)));
      }

      // Extract attribute names and values
      const attrMatches = code.match(/(\w+)=["'][^"']*["']/g);
      if (attrMatches) {
        elements.push(...attrMatches);
      }

      // Extract text content (for things like comments)
      const textMatches = code.match(/>([^<]+)</g);
      if (textMatches) {
        elements.push(...textMatches.map((text) => text.slice(1, -1).trim()));
      }

      return elements.filter((el) => el.length > 0);
    };

    const solutionElements = extractKeyElements(normalizedSolution);
    console.log('Solution elements to check:', solutionElements);

    // Check if code contains all key elements from solution
    const hasAllElements = solutionElements.every((element) => normalizedCode.includes(element));

    // Also check the original strict comparison
    const strictMatch =
      normalizedCode.includes(normalizedSolution) ||
      normalizedSolution.includes(normalizedCode) ||
      normalizedCode === normalizedSolution;

    // Check for partial matches (at least 80% of elements)
    const partialMatch =
      solutionElements.length > 0 &&
      solutionElements.filter((element) => normalizedCode.includes(element)).length /
        solutionElements.length >=
        0.8;

    console.log('Match results:', { hasAllElements, strictMatch, partialMatch });

    // Add a small delay to show the loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (hasAllElements || strictMatch || partialMatch) {
      console.log('Solution matched! Calling onComplete...');
      onComplete();
    } else {
      console.log('Solution does not match');
      // Show a helpful message to the user
      alert(
        'Your solution doesn\'t match the expected result. Check the console for details or try the "Show Solution" button to see the expected code.'
      );
    }

    setCheckingSolution(false);
  };

  // Extract SVG content from the code
  const extractSVG = (code: string) => {
    const svgMatch = code.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
    return svgMatch ? svgMatch[0] : '';
  };

  // Extract CSS content from the code
  const extractCSS = (code: string) => {
    const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return styleMatch ? styleMatch[1] : '';
  };

  const svgContent = extractSVG(code);
  const cssContent = extractCSS(code);

  return (
    <div className="space-y-4">
      {/* Controls */}
      {showControls && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors text-sm"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {showSolution && solution && solution.trim() !== '' && (
              <button
                onClick={handleShowSolution}
                className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>{showSolutionCode ? 'Hide' : 'Show'} Solution</span>
              </button>
            )}

            {solution && solution.trim() !== '' && (
              <button
                onClick={checkSolution}
                disabled={completed || checkingSolution}
                className="flex items-center space-x-2 px-3 py-2 bg-primary-100 hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-sm"
              >
                {checkingSolution ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span>
                  {checkingSolution ? 'Checking...' : completed ? 'Completed' : 'Check Solution'}
                </span>
              </button>
            )}

            {(!solution || solution.trim() === '') && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">No solution available</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mobile-grid">
        {/* Code Editor */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-dark-900">Code Editor</h3>
          </div>

          <div className="border border-dark-200 rounded-lg overflow-hidden code-container">
            <Editor
              height="300px"
              defaultLanguage="html"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingStrategy: 'advanced',
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                },
              }}
            />
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-secondary-600" />
            <h3 className="font-semibold text-dark-900">Live Preview</h3>
          </div>

          {showPreview ? (
            <div className="border border-dark-200 rounded-lg overflow-hidden bg-white p-4 min-h-[300px] code-container">
              <style>{cssContent}</style>
              <div className="svg-preview" dangerouslySetInnerHTML={{ __html: svgContent }} />
            </div>
          ) : (
            <div className="border-2 border-dashed border-dark-300 rounded-lg h-[300px] flex items-center justify-center">
              <p className="text-dark-500">Preview hidden</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Solution */}
      {showSolution && showSolutionCode && solution && solution.trim() !== '' && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <h3 className="font-semibold text-dark-900">Solution</h3>
          </div>

          <div className="border border-dark-200 rounded-lg overflow-hidden code-container">
            <Editor
              height="200px"
              defaultLanguage="html"
              value={solution}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                wrappingStrategy: 'advanced',
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                },
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CodePlayground;
