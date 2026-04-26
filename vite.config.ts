import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'github-dark-default',
              keepBackground: false,
              defaultLang: 'html',
            },
          ],
        ],
      }),
    } as any,
    react(),
  ],
  server: {
    open: true,
  },
});
