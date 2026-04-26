import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Loader,
  BookOpen,
  Code,
  Sparkles,
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import CodePlayground from '../components/code-playground';
import MarkdownContent from '../components/markdown-content';
import ModuleThumb from '../components/module-thumb';
import { LessonShortcutsBinder } from '../lib/useLessonShortcuts';

const PLAYGROUND_INITIAL = `<svg viewBox="0 0 100 100">
  <!-- Try it out — your changes render live in the sandbox -->
  <circle cx="50" cy="50" r="30" fill="#7c5cff"/>
</svg>`;

const ModuleHeader: React.FC<{
  moduleId: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
}> = ({ moduleId, title, description, progress, completed }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <ModuleThumb moduleId={moduleId} className="!aspect-[16/5]" />
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xs uppercase tracking-widest text-ink-400 font-mono">
          {moduleId.replace('module-', 'Module ')}
        </span>
        {completed && <span className="chip-success">Completed</span>}
      </div>
      <h1 className="text-display text-3xl lg:text-4xl text-ink-50 text-balance">{title}</h1>
      <p className="text-ink-300 text-base max-w-2xl">{description}</p>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex-1 max-w-md progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <span className="font-mono text-sm text-ink-200 tabular-nums">{Math.round(progress)}%</span>
      </div>
    </div>
  </motion.div>
);

const ModuleView: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lessonId = searchParams.get('lesson');

  const { dispatch, getModule, getLesson, isLessonComplete } = useCourse();
  const [marking, setMarking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const module = getModule(moduleId);
  const currentLesson = useMemo(
    () => getLesson(moduleId, lessonId),
    [getLesson, moduleId, lessonId]
  );

  useEffect(() => {
    if (moduleId) dispatch({ type: 'SET_CURRENT_MODULE', payload: moduleId });
    if (lessonId) dispatch({ type: 'SET_CURRENT_LESSON', payload: lessonId });
  }, [moduleId, lessonId, dispatch]);

  if (!module) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <div className="plate p-8">
          <h2 className="text-display text-2xl text-ink-50 mb-2">Module not found</h2>
          <p className="text-ink-300 text-sm mb-4">The requested module doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const handleComplete = async () => {
    if (!currentLesson) return;
    setMarking(true);
    await new Promise((r) => window.setTimeout(r, 400));
    dispatch({
      type: 'COMPLETE_LESSON',
      payload: { moduleId: module.id, lessonId: currentLesson.id },
    });
    setMarking(false);
    setShowSuccess(true);
    window.setTimeout(() => setShowSuccess(false), 2400);
  };

  const handleExerciseComplete = (exerciseId: string) => {
    if (!currentLesson) return;
    dispatch({
      type: 'COMPLETE_EXERCISE',
      payload: { moduleId: module.id, lessonId: currentLesson.id, exerciseId },
    });
  };

  const goPrev = () => {
    if (!currentLesson || currentLesson.index === 0) return;
    const prev = module.lessons[currentLesson.index - 1];
    navigate(`/module/${module.id}?lesson=${prev.id}`);
  };

  const goNext = () => {
    if (!currentLesson || currentLesson.index >= module.lessons.length - 1) return;
    const next = module.lessons[currentLesson.index + 1];
    navigate(`/module/${module.id}?lesson=${next.id}`);
  };

  // Module overview (no lesson selected)
  if (!currentLesson) {
    return (
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-10">
        <ModuleHeader
          moduleId={module.id}
          title={module.title}
          description={module.description}
          progress={module.progress}
          completed={module.completed}
        />

        <section className="plate p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-accent-300" />
            <h2 className="text-2xs uppercase tracking-widest text-ink-300 font-medium">
              Module overview
            </h2>
          </div>
          <MarkdownContent Component={module.Overview} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-display text-xl text-ink-50">Lessons</h2>
            <span className="text-2xs uppercase tracking-widest text-ink-500 font-mono">
              {module.lessons.length} total
            </span>
          </div>
          <div className="plate divide-y divide-white/[0.05]">
            {module.lessons.map((lesson, idx) => {
              const done = isLessonComplete(module.id, lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to={`/module/${module.id}?lesson=${lesson.id}`}
                  className="flex items-center gap-4 px-4 lg:px-5 py-4 transition-colors hover:bg-white/[0.03] group"
                >
                  <div className="font-mono text-sm tabular-nums text-ink-500 w-8">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  {done ? (
                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-ink-50 group-hover:text-ink-50 truncate">
                      {lesson.title}
                    </div>
                    {lesson.exercises.length > 0 && (
                      <div className="text-2xs text-ink-400 mt-0.5">
                        {lesson.exercises.length} exercise{lesson.exercises.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink-500 group-hover:text-accent-300 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      <LessonShortcutsBinder
        canPrev={currentLesson.index > 0}
        canNext={currentLesson.index < module.lessons.length - 1}
        onPrev={goPrev}
        onNext={goNext}
        onComplete={() => {
          if (!currentLesson.completed && !marking) handleComplete();
        }}
      />
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-20 right-4 left-4 sm:left-auto z-50 plate-elevated px-4 py-3 max-w-sm"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-ink-50">Lesson completed</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb + module quick info */}
      <div className="flex items-center gap-2 text-2xs text-ink-400 uppercase tracking-widest mb-3">
        <Link to="/" className="hover:text-ink-200">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/module/${module.id}`} className="hover:text-ink-200">{module.title}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink-300 normal-case tracking-normal font-mono">
          Lesson {currentLesson.index + 1}/{currentLesson.total}
        </span>
      </div>

      <motion.div
        key={currentLesson.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <header className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="chip">{module.title}</span>
            {currentLesson.completed && <span className="chip-success">Completed</span>}
          </div>
          <h1 className="text-display text-3xl lg:text-4xl text-ink-50 text-balance">
            {currentLesson.title}
          </h1>
        </header>

        {/* Lesson content */}
        <article className="plate p-5 lg:p-8">
          <MarkdownContent Component={currentLesson.Component} />
        </article>

        {/* Live playground */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-accent-300" />
            <h2 className="text-2xs uppercase tracking-widest text-ink-300 font-medium">
              Live Playground
            </h2>
          </div>
          <CodePlayground
            initialCode={PLAYGROUND_INITIAL}
            solution=""
            onComplete={() => {}}
            completed={false}
            showSolution={false}
          />
        </section>

        {/* Exercises */}
        {currentLesson.exercises.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-signal-500" />
              <h2 className="text-2xs uppercase tracking-widest text-ink-300 font-medium">
                Exercises
              </h2>
            </div>
            <div className="space-y-5">
              {currentLesson.exercises.map((exercise, idx) => (
                <div key={exercise.id} className="plate p-5 lg:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xs uppercase tracking-widest text-ink-400 font-mono">
                        Exercise {idx + 1}
                      </div>
                      <h3 className="text-display text-lg text-ink-50 mt-1">{exercise.title}</h3>
                      <p className="text-sm text-ink-300 mt-1.5">{exercise.description}</p>
                    </div>
                    {exercise.completed && (
                      <span className="chip-success shrink-0">
                        <CheckCircle className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>
                  <CodePlayground
                    initialCode={exercise.initialCode}
                    solution={exercise.solution}
                    onComplete={() => handleExerciseComplete(exercise.id)}
                    completed={exercise.completed}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </motion.div>
      </div>

      {/* Sticky lesson nav inside the main scroll container */}
      <motion.div
        className="sticky bottom-0 z-40 backdrop-blur-md"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        style={{
          background: 'linear-gradient(180deg, rgba(11,13,18,0.6), rgba(11,13,18,0.94))',
          borderTop: '1px solid var(--hairline)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={currentLesson.index === 0}
            className="btn btn-ghost h-10"
            aria-label="Previous lesson"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex-1 text-center">
            <div className="text-2xs uppercase tracking-widest text-ink-500">
              {currentLesson.index + 1} / {currentLesson.total}
            </div>
            <div className="text-xs text-ink-300 truncate max-w-[40ch] mx-auto">
              {currentLesson.title}
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={currentLesson.completed || marking}
            className={`btn h-10 ${
              currentLesson.completed
                ? 'border border-success/30 bg-success/10 text-success'
                : 'btn-primary'
            }`}
          >
            {marking ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {currentLesson.completed ? 'Done' : marking ? 'Marking…' : 'Mark complete'}
            </span>
          </button>

          <button
            onClick={goNext}
            disabled={currentLesson.index >= module.lessons.length - 1}
            className="btn btn-ghost h-10"
            aria-label="Next lesson"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModuleView;
