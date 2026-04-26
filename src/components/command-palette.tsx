import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, BookOpen, Code, Sparkles, X, BookMarked, Zap } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

interface Item {
  id: string;
  title: string;
  hint: string;
  to: string;
  group: 'Lesson' | 'Module' | 'Action';
  icon: React.ComponentType<{ className?: string }>;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const { modules } = useCourse();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const list: Item[] = [];
    list.push({
      id: 'home',
      title: 'Home — Course Dashboard',
      hint: 'Overview',
      to: '/',
      group: 'Action',
      icon: BookOpen,
    });
    list.push({
      id: 'playground',
      title: 'Open Playground',
      hint: 'Sandbox',
      to: '/playground',
      group: 'Action',
      icon: Code,
    });
    list.push({
      id: 'glossary',
      title: 'Glossary',
      hint: 'A–Z reference of every term',
      to: '/glossary',
      group: 'Action',
      icon: BookMarked,
    });
    list.push({
      id: 'cheatsheet',
      title: 'Cheat Sheet',
      hint: 'Path commands · SMIL · easing · animatable matrix',
      to: '/cheatsheet',
      group: 'Action',
      icon: Zap,
    });
    modules.forEach((m) => {
      list.push({
        id: m.id,
        title: m.title,
        hint: m.tagline,
        to: `/module/${m.id}`,
        group: 'Module',
        icon: BookOpen,
      });
      m.lessons.forEach((l) => {
        list.push({
          id: `${m.id}/${l.id}`,
          title: l.title,
          hint: m.title,
          to: `/module/${m.id}?lesson=${l.id}`,
          group: 'Lesson',
          icon: Sparkles,
        });
      });
    });
    return list;
  }, [modules]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items
      .map((item) => {
        const haystack = `${item.title} ${item.hint} ${item.group}`.toLowerCase();
        let score = 0;
        if (haystack.startsWith(q)) score += 100;
        if (haystack.includes(q)) score += 30;
        // Subsequence match
        let i = 0;
        for (const ch of haystack) {
          if (ch === q[i]) i += 1;
          if (i === q.length) break;
        }
        if (i === q.length) score += 10;
        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  }, [items, query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIdx(0);
      return;
    }
    // focus input on open
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        const item = filtered[activeIdx];
        if (item) {
          e.preventDefault();
          navigate(item.to);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, activeIdx, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            className="relative w-full max-w-xl plate-elevated overflow-hidden"
            initial={{ y: -8, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05]">
              <Search className="w-4 h-4 text-ink-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a lesson, module, or action…"
                className="flex-1 bg-transparent outline-none text-ink-50 placeholder:text-ink-500 text-sm"
              />
              <button
                onClick={onClose}
                aria-label="Close"
                className="toolbar-btn !w-7 !h-7"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-ink-400">
                  No matches. Try a different keyword.
                </div>
              ) : (
                <ul className="py-1">
                  {filtered.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = idx === activeIdx;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => {
                            navigate(item.to);
                            onClose();
                          }}
                          className={`group w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            isActive ? 'bg-accent-500/15 text-ink-50' : 'text-ink-200 hover:text-ink-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0 text-ink-400 group-hover:text-accent-300" />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm truncate">{item.title}</div>
                            <div className="text-2xs text-ink-400 truncate">{item.hint}</div>
                          </div>
                          <span className="text-2xs uppercase tracking-widest text-ink-500 shrink-0">
                            {item.group}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-ink-500 group-hover:text-accent-300 shrink-0" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05] text-2xs text-ink-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="kbd">↑↓</span> navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="kbd">↵</span> open
                </span>
                <span className="flex items-center gap-1">
                  <span className="kbd">esc</span> close
                </span>
              </div>
              <span className="font-mono">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
