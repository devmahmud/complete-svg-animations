import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles, Award, Zap, Target, BookMarked } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import ModuleThumb from '../components/module-thumb';

const HeroCanvas: React.FC = () => (
  <div
    className="relative w-full h-72 lg:h-96 rounded-2xl overflow-hidden"
    style={{
      background:
        'radial-gradient(80% 80% at 30% 20%, rgba(124,92,255,0.28), transparent 60%), radial-gradient(80% 80% at 80% 80%, rgba(255,212,59,0.18), transparent 55%), #0b0d12',
      border: '1px solid var(--hairline)',
    }}
  >
    <svg viewBox="0 0 800 360" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hero-stroke" x1="0" y1="0" x2="800" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ffd43b" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#7c5cff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* concentric path drawing */}
      <g opacity="0.9">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M 80 ${300 - i * 14} C 220 ${100 + i * 10}, 580 ${100 + i * 10}, 720 ${300 - i * 14}`}
            stroke="url(#hero-stroke)"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset="900"
            opacity={0.2 + i * 0.18}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="900"
              to="0"
              dur={`${2.4 + i * 0.4}s`}
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </g>

      {/* orbiting nodes */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} r={4} fill="#ffd43b">
            <animateMotion
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
              path={`M 80 ${300 - i * 14} C 220 ${100 + i * 10}, 580 ${100 + i * 10}, 720 ${300 - i * 14}`}
            />
          </circle>
        ))}
      </g>

      {/* hero glow */}
      <circle cx="400" cy="180" r="120" fill="url(#hero-glow)" opacity="0.5" />
    </svg>

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center px-6">
        <div className="text-2xs uppercase tracking-[0.4em] text-accent-200/80 mb-3">
          Interactive Course
        </div>
        <h1
          className="text-display text-balance text-4xl lg:text-6xl text-ink-50 leading-[0.95]"
          style={{ textShadow: '0 0 40px rgba(124,92,255,0.4)' }}
        >
          Animate the <em className="not-italic" style={{ color: '#ffd43b' }}>SVG</em><br />
          web, end to end.
        </h1>
        <p className="mt-4 text-ink-200 max-w-xl mx-auto text-sm lg:text-base">
          Foundations, CSS, SMIL, and path animations — taught with a live editor and
          sandboxed previews.
        </p>
      </div>
    </div>
  </div>
);

const Stat: React.FC<{ label: string; value: number | string; icon: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="plate p-4 lg:p-5">
    <div className="flex items-center justify-between">
      <div className="text-2xs uppercase tracking-widest text-ink-400">{label}</div>
      <div className="text-ink-400">{icon}</div>
    </div>
    <div className="font-display text-3xl text-ink-50 mt-2 tabular-nums">{value}</div>
  </div>
);

const Dashboard: React.FC = () => {
  const { modules, progressSummary, isLessonComplete } = useCourse();
  const overall =
    progressSummary.totalLessons > 0
      ? (progressSummary.completedLessons / progressSummary.totalLessons) * 100
      : 0;

  // First lesson the user hasn't completed yet — across all modules.
  // Falls back to the very first lesson when nothing's started, or to lesson 1
  // when everything is done.
  const nextLesson = useMemo(() => {
    for (const m of modules) {
      for (const l of m.lessons) {
        if (!isLessonComplete(m.id, l.id)) return { module: m, lesson: l };
      }
    }
    return { module: modules[0], lesson: modules[0]?.lessons[0] };
  }, [modules, isLessonComplete]);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-12 space-y-10 lg:space-y-14">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroCanvas />
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {nextLesson.lesson && (
            <Link
              to={`/module/${nextLesson.module.id}?lesson=${nextLesson.lesson.id}`}
              className="btn btn-primary h-11 px-5"
            >
              <Play className="w-4 h-4" />
              <span>{overall > 0 ? 'Continue' : 'Start'} learning</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
          )}
          <Link to="/playground" className="btn btn-secondary h-11 px-5">
            <Sparkles className="w-4 h-4" />
            <span>Open the playground</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-2xs uppercase tracking-widest text-ink-400">Progress</span>
            <div className="w-40 progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${overall}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="font-mono text-sm text-ink-100 tabular-nums w-10">
              {Math.round(overall)}%
            </span>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Stat
          label="Lessons"
          value={`${progressSummary.completedLessons}/${progressSummary.totalLessons}`}
          icon={<Target className="w-4 h-4" />}
        />
        <Stat
          label="Exercises"
          value={`${progressSummary.completedExercises}/${progressSummary.totalExercises}`}
          icon={<Zap className="w-4 h-4" />}
        />
        <Stat
          label="Modules"
          value={`${progressSummary.completedModules}/${modules.length}`}
          icon={<Award className="w-4 h-4" />}
        />
        <Stat label="Overall" value={`${Math.round(overall)}%`} icon={<Sparkles className="w-4 h-4" />} />
      </section>

      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-2xs uppercase tracking-widest text-ink-400">Curriculum</div>
            <h2 className="text-display text-2xl lg:text-3xl text-ink-50 mt-1">Course Modules</h2>
          </div>
          <div className="text-2xs uppercase tracking-widest text-ink-500 hidden sm:block">
            4 modules · ~28 lessons
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Link to={`/module/${module.id}`} className="module-card block h-full">
                <ModuleThumb moduleId={module.id} />

                <div className="flex items-start justify-between gap-3 mt-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-2xs uppercase tracking-widest text-ink-400">
                      <span className="font-mono">M{index + 1}</span>
                      {module.completed && (
                        <span className="chip-success !py-0.5">Completed</span>
                      )}
                    </div>
                    <h3 className="font-display text-xl text-ink-50 mt-1.5 truncate">
                      {module.title}
                    </h3>
                    <p className="text-sm text-ink-300 mt-1 line-clamp-2">
                      {module.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-sm text-ink-100 tabular-nums">
                      {Math.round(module.progress)}%
                    </div>
                    <div className="text-2xs text-ink-400 mt-0.5 tabular-nums">
                      {module.completedLessonCount}/{module.lessons.length}
                    </div>
                  </div>
                </div>

                <div className="progress-bar mt-4">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-ink-300">
                    {module.completed ? 'Review module' : 'Open module'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-accent-300 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {[
          {
            title: 'Sandboxed playground',
            body: 'Every preview runs in an isolated iframe so animations behave exactly like production.',
            icon: <Zap className="w-4 h-4" />,
          },
          {
            title: 'Structural solution checks',
            body: 'Submissions are compared as DOM trees, not text — same shape, same answer.',
            icon: <Target className="w-4 h-4" />,
          },
          {
            title: 'Progress that sticks',
            body: 'Your completion lives in localStorage so refreshes never lose work.',
            icon: <Award className="w-4 h-4" />,
          },
        ].map((c) => (
          <div key={c.title} className="plate p-5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center mb-3 text-accent-300"
                 style={{ background: 'rgba(124,92,255,0.12)', border: '1px solid rgba(124,92,255,0.18)' }}>
              {c.icon}
            </div>
            <h3 className="font-display text-base text-ink-50">{c.title}</h3>
            <p className="text-sm text-ink-300 mt-1.5 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="text-2xs uppercase tracking-widest text-ink-400 mb-4">Reference</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/glossary"
            className="plate p-5 flex items-start gap-4 group hover:border-accent-500/30 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 text-accent-300"
              style={{ background: 'rgba(124,92,255,0.12)', border: '1px solid rgba(124,92,255,0.20)' }}
            >
              <BookMarked className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base text-ink-50">Glossary</h3>
              <p className="text-sm text-ink-300 mt-1">
                A–Z reference of every term, attribute, and concept in the course.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-accent-300 mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/cheatsheet"
            className="plate p-5 flex items-start gap-4 group hover:border-accent-500/30 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 text-signal-500"
              style={{ background: 'rgba(255,212,59,0.10)', border: '1px solid rgba(255,212,59,0.24)' }}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base text-ink-50">Cheat Sheet</h3>
              <p className="text-sm text-ink-300 mt-1">
                Path commands, SMIL attributes, easing recipes, and animation costs in one printable page.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-accent-300 mt-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
