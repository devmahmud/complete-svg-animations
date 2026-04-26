import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, X, Sparkles, RotateCcw, AlertTriangle } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

interface SidebarProps {
  onClose?: () => void;
}

const ProgressRing: React.FC<{ value: number; size?: number }> = ({ value, size = 22 }) => {
  const r = (size - 4) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="url(#ring-grad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * value) / 100}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 600ms ease' }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2={size} y2={size} gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ffd43b" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { modules, progressSummary, dispatch } = useCourse();
  const location = useLocation();
  const [confirmingReset, setConfirmingReset] = useState(false);

  const hasProgress = progressSummary.completedLessons > 0 || progressSummary.completedExercises > 0;
  const handleReset = () => {
    dispatch({ type: 'RESET_PROGRESS' });
    setConfirmingReset(false);
  };

  const overallProgress =
    progressSummary.totalLessons > 0
      ? (progressSummary.completedLessons / progressSummary.totalLessons) * 100
      : 0;

  return (
    <motion.aside
      className="w-72 lg:w-72 h-full overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, #0b0d12, #0f1218)',
        borderRight: '1px solid var(--hairline)',
      }}
      initial={{ x: -8, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 pt-5 pb-6 flex items-center justify-between">
        <div>
          <div className="text-2xs uppercase tracking-widest text-ink-400">Curriculum</div>
          <div className="text-display text-base text-ink-50 mt-0.5">Modules</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden toolbar-btn"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="px-3 space-y-1.5">
        {modules.map((module, moduleIndex) => {
          const isActiveModule = location.pathname.includes(module.id);
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: moduleIndex * 0.04 }}
            >
              <Link
                to={`/module/${module.id}`}
                onClick={onClose}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                  isActiveModule
                    ? 'bg-accent-500/10 text-ink-50'
                    : 'text-ink-200 hover:text-ink-50 hover:bg-white/[0.04]'
                }`}
              >
                {isActiveModule && (
                  <motion.span
                    layoutId="active-module-bar"
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
                    style={{ background: 'linear-gradient(180deg, #7c5cff, #ffd43b)' }}
                  />
                )}
                <ProgressRing value={module.progress} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm truncate">{module.title}</div>
                    {module.completed && (
                      <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                    )}
                  </div>
                  <div className="text-2xs text-ink-400 truncate mt-0.5">{module.tagline}</div>
                </div>
                <span className="font-mono text-2xs text-ink-300 tabular-nums">
                  {Math.round(module.progress)}%
                </span>
              </Link>

              {isActiveModule && (
                <motion.div
                  className="ml-7 mt-1 mb-2 space-y-0.5 border-l border-white/[0.06] pl-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  {module.lessons.map((lesson, lessonIdx) => {
                    const lessonComplete = !!Object.keys({}).length;
                    const isCurrent = location.search.includes(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        to={`/module/${module.id}?lesson=${lesson.id}`}
                        onClick={onClose}
                        className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                          isCurrent
                            ? 'bg-white/[0.06] text-ink-50'
                            : 'text-ink-300 hover:text-ink-50 hover:bg-white/[0.03]'
                        }`}
                      >
                        <LessonStatusDot moduleId={module.id} lessonId={lesson.id} />
                        <span className="flex-1 truncate">{lesson.title}</span>
                        <span className="font-mono text-2xs text-ink-500 tabular-nums">
                          {String(lessonIdx + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 mt-4">
        <div
          className="rounded-xl p-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,92,255,0.14), rgba(255,212,59,0.06))',
            border: '1px solid rgba(124,92,255,0.18)',
          }}
        >
          <div className="absolute -top-6 -right-6 opacity-30">
            <Sparkles className="w-20 h-20 text-accent-400" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xs uppercase tracking-widest text-ink-300">Overall</div>
            {hasProgress && (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="toolbar-btn !w-7 !h-7 relative"
                aria-label="Reset progress"
                title="Reset progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="font-display text-2xl text-ink-50 mt-1 tabular-nums">
            {Math.round(overallProgress)}%
          </div>
          <div className="mt-3 progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-2xs text-ink-300">
            <span>
              <span className="font-mono text-ink-100">{progressSummary.completedLessons}</span>
              /{progressSummary.totalLessons} lessons
            </span>
            <span>
              <span className="font-mono text-ink-100">{progressSummary.completedModules}</span>
              /{modules.length} modules
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {confirmingReset && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setConfirmingReset(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />
            <motion.div
              className="relative w-full max-w-sm plate-elevated p-5"
              initial={{ y: 8, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 8, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-label="Confirm reset"
            >
              <div className="flex gap-3">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,93,115,0.12)', border: '1px solid rgba(255,93,115,0.28)' }}
                >
                  <AlertTriangle className="w-4 h-4 text-danger" />
                </div>
                <div>
                  <div className="text-display text-base text-ink-50">Reset all progress?</div>
                  <p className="text-sm text-ink-300 mt-1">
                    This clears all completed lessons and exercises. Your code in the
                    playground is unaffected. This can't be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="button"
                  className="btn btn-ghost h-9"
                  onClick={() => setConfirmingReset(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn h-9 text-white"
                  style={{
                    background: 'linear-gradient(180deg, #ff6b80, #ff5d73)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 24px -12px rgba(255,93,115,0.6)',
                  }}
                >
                  Reset progress
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

const LessonStatusDot: React.FC<{ moduleId: string; lessonId: string }> = ({ moduleId, lessonId }) => {
  const { isLessonComplete } = useCourse();
  const done = isLessonComplete(moduleId, lessonId);
  return done ? (
    <CheckCircle className="w-3.5 h-3.5 text-success" />
  ) : (
    <Circle className="w-3.5 h-3.5 text-ink-500" />
  );
};

export default Sidebar;
