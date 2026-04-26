import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Menu, Search } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import BrandMark from './brand-mark';

interface HeaderProps {
  onMenuClick: () => void;
  onPaletteOpen?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onPaletteOpen }) => {
  const { progressSummary } = useCourse();
  const overall =
    progressSummary.totalLessons > 0
      ? (progressSummary.completedLessons / progressSummary.totalLessons) * 100
      : 0;

  const location = useLocation();
  const inPlayground = location.pathname.startsWith('/playground');

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="shrink-0 z-40 backdrop-blur-md"
      style={{
        background: 'linear-gradient(180deg, rgba(11,13,18,0.92), rgba(11,13,18,0.7))',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <div className="flex items-center justify-between gap-3 px-3 sm:px-4 lg:px-6 h-14 lg:h-16">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden toolbar-btn"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <BrandMark size={32} />
            <div className="min-w-0">
              <div className="text-display text-sm sm:text-base text-ink-50 leading-none truncate">
                SVG Animations
              </div>
              <div className="text-2xs uppercase tracking-widest text-ink-400 leading-none mt-1 hidden sm:block">
                Interactive Course
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-2xs uppercase tracking-widest text-ink-400">
              Progress
            </div>
            <div className="w-32 lg:w-44 progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${overall}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <span className="font-mono text-xs text-ink-200 tabular-nums w-10 text-right">
              {Math.round(overall)}%
            </span>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="w-16 progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${overall}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <span className="font-mono text-2xs text-ink-300 tabular-nums w-8 text-right">
              {Math.round(overall)}%
            </span>
          </div>

          {onPaletteOpen && (
            <button
              type="button"
              onClick={onPaletteOpen}
              className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm transition-colors text-ink-300 hover:text-ink-50"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--hairline)',
              }}
              aria-label="Open command palette"
              title="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-2xs uppercase tracking-widest">Search</span>
              <span className="kbd ml-1">⌘K</span>
            </button>
          )}

          <Link
            to="/playground"
            className={`btn ${inPlayground ? 'btn-primary' : 'btn-secondary'} h-9 px-3`}
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Playground</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
