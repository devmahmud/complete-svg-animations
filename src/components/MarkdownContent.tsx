import React from 'react';

interface MarkdownContentProps {
  content: React.ReactNode;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-dark-900 prose-p:text-dark-700 prose-strong:text-dark-900 prose-code:text-primary-600 prose-pre:bg-dark-100 prose-pre:text-dark-800 overflow-hidden">
      <div className="overflow-x-auto">{content}</div>
    </div>
  );
};

export default MarkdownContent;
