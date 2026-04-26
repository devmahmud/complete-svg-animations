import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Row {
  keys: string[];
  label: string;
}

const ROWS: { group: string; rows: Row[] }[] = [
  {
    group: 'Navigation',
    rows: [
      { keys: ['⌘', 'K'], label: 'Open command palette' },
      { keys: ['J'], label: 'Next lesson' },
      { keys: ['K'], label: 'Previous lesson' },
      { keys: ['M'], label: 'Mark current lesson complete' },
    ],
  },
  {
    group: 'General',
    rows: [
      { keys: ['?'], label: 'Show this shortcut sheet' },
      { keys: ['Esc'], label: 'Close any open dialog' },
    ],
  },
];

interface ShortcutSheetProps {
  open: boolean;
  onClose: () => void;
}

const ShortcutSheet: React.FC<ShortcutSheetProps> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />
          <motion.div
            className="relative w-full max-w-md plate-elevated overflow-hidden"
            initial={{ y: 8, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Keyboard shortcuts"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
              <div>
                <div className="text-2xs uppercase tracking-widest text-ink-400">Keyboard</div>
                <div className="text-display text-base text-ink-50">Shortcuts</div>
              </div>
              <button onClick={onClose} aria-label="Close" className="toolbar-btn">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-3 space-y-5">
              {ROWS.map((section) => (
                <div key={section.group}>
                  <div className="text-2xs uppercase tracking-widest text-ink-400 mb-2">
                    {section.group}
                  </div>
                  <ul className="space-y-1.5">
                    {section.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between text-sm text-ink-200"
                      >
                        <span>{row.label}</span>
                        <span className="flex items-center gap-1">
                          {row.keys.map((k) => (
                            <span key={k} className="kbd">{k}</span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShortcutSheet;
