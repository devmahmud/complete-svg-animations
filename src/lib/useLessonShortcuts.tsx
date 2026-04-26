import React, { useEffect } from 'react';

interface Options {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => void;
}

const isTextField = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  // Monaco editor renders into a <textarea> wrapped in many divs — bail out
  // if any ancestor matches its container class.
  if (target.closest('.monaco-editor')) return true;
  return false;
};

export function useLessonShortcuts({ canPrev, canNext, onPrev, onNext, onComplete }: Options) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTextField(e.target)) return;
      switch (e.key) {
        case 'j':
        case 'ArrowRight': // arrow keys only when not in a text field
          if (canNext) {
            e.preventDefault();
            onNext();
          }
          break;
        case 'k':
        case 'ArrowLeft':
          if (canPrev) {
            e.preventDefault();
            onPrev();
          }
          break;
        case 'm':
          e.preventDefault();
          onComplete();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [canPrev, canNext, onPrev, onNext, onComplete]);
}

export const LessonShortcutsBinder: React.FC<Options> = (props) => {
  useLessonShortcuts(props);
  return null;
};
