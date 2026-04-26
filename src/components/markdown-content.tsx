import React, { Suspense } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Loader } from 'lucide-react';
import { mdxComponents } from './mdx-components';

interface MarkdownContentProps {
  Component: React.ComponentType;
}

const Skeleton: React.FC = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-7 w-2/3 bg-white/[0.05] rounded" />
    <div className="h-4 w-full bg-white/[0.04] rounded" />
    <div className="h-4 w-5/6 bg-white/[0.04] rounded" />
    <div className="h-4 w-4/6 bg-white/[0.04] rounded" />
    <div className="h-32 w-full bg-white/[0.03] rounded-lg mt-4" />
  </div>
);

const MarkdownContent: React.FC<MarkdownContentProps> = ({ Component }) => {
  return (
    <div className="markdown-content">
      <MDXProvider components={mdxComponents}>
        <Suspense
          fallback={
            <div className="py-8">
              <Skeleton />
              <div className="flex justify-center mt-6">
                <Loader className="w-5 h-5 animate-spin text-accent-400" />
              </div>
            </div>
          }
        >
          <Component />
        </Suspense>
      </MDXProvider>
    </div>
  );
};

export default MarkdownContent;
