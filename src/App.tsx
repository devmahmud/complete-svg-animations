import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/header';
import Sidebar from './components/sidebar';
import ErrorBoundary from './components/error-boundary';
import CommandPalette from './components/command-palette';
import ShortcutSheet from './components/shortcut-sheet';
import Dashboard from './pages/dashboard';
import ModuleView from './pages/module-view';
import Playground from './pages/playground';
import Glossary from './pages/glossary';
import CheatSheet from './pages/cheat-sheet';
import { CourseProvider } from './context/CourseContext';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/module/:moduleId" element={<ModuleView />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/cheatsheet" element={<CheatSheet />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const isTextField = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.closest('.monaco-editor')) return true;
  return false;
};

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Global shortcuts: ⌘/Ctrl+K opens palette, ? opens shortcut sheet.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        setShortcutsOpen(false);
        return;
      }
      // The ? key — accept both Shift+/ on US layouts and the literal '?' key.
      if (e.key === '?' && !isTextField(e.target)) {
        e.preventDefault();
        setShortcutsOpen((v) => !v);
        setPaletteOpen(false);
        return;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden text-ink-50">
      <Header
        onMenuClick={() => setSidebarOpen((v) => !v)}
        onPaletteOpen={() => setPaletteOpen(true)}
      />

      <div className="flex flex-1 min-h-0">
        {sidebarOpen && (
          <button
            aria-label="Close sidebar"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-out lg:transform-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        <main className="flex-1 min-h-0 overflow-y-auto">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ShortcutSheet open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CourseProvider>
      <Router>
        <AppShell />
      </Router>
    </CourseProvider>
  );
}

export default App;
