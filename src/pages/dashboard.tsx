import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, Target, Award, ArrowRight, Sparkles } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

const Dashboard: React.FC = () => {
  const { state, getProgress } = useCourse();
  const progress = getProgress();
  const overallProgress =
    progress.totalLessons > 0 ? (progress.completedLessons / progress.totalLessons) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="text-center mb-8 lg:mb-12" variants={itemVariants}>
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-4 lg:mb-6">
          <Sparkles className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">Interactive Learning</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-dark-900 mb-4">Master SVG Animations</h1>
        <p className="text-lg lg:text-xl text-dark-600 mb-6 lg:mb-8 max-w-3xl mx-auto">
          Learn to create stunning, interactive SVG animations from foundations to advanced
          techniques. Practice with live code playgrounds and build real-world projects.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/module/module-1"
            className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <Play className="w-5 h-5" />
            <span>Start Learning</span>
          </Link>
          <Link
            to="/playground"
            className="btn-secondary flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <BookOpen className="w-5 h-5" />
            <span>Try Playground</span>
          </Link>
        </div>
      </motion.div>

      {/* Progress Section */}
      <motion.div className="card mb-6 lg:mb-8" variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <h2 className="text-xl lg:text-2xl font-semibold text-dark-900">Your Progress</h2>
          <span className="text-xl lg:text-2xl font-bold text-primary-600">
            {Math.round(overallProgress)}%
          </span>
        </div>

        <div className="progress-bar mb-4">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl lg:text-2xl font-bold text-primary-600">
              {progress.completedLessons}
            </div>
            <div className="text-sm text-dark-600">Lessons Completed</div>
          </div>
          <div>
            <div className="text-xl lg:text-2xl font-bold text-secondary-600">
              {progress.completedExercises}
            </div>
            <div className="text-sm text-dark-600">Exercises Done</div>
          </div>
          <div>
            <div className="text-xl lg:text-2xl font-bold text-green-600">
              {state.modules.filter((m) => m.completed).length}
            </div>
            <div className="text-sm text-dark-600">Modules Finished</div>
          </div>
        </div>
      </motion.div>

      {/* Course Modules */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl lg:text-2xl font-semibold text-dark-900 mb-4 lg:mb-6">
          Course Modules
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mobile-grid">
          {state.modules.map((module, index) => (
            <motion.div
              key={module.id}
              className="module-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      module.completed
                        ? 'bg-green-100 text-green-600'
                        : 'bg-primary-100 text-primary-600'
                    }`}
                  >
                    {module.completed ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-dark-900 truncate">{module.title}</h3>
                    <p className="text-sm text-dark-600 line-clamp-2">{module.description}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-sm font-medium text-dark-700">
                    {Math.round(module.progress)}%
                  </div>
                  <div className="text-xs text-dark-500">
                    {module.lessons.filter((l) => l.completed).length}/{module.lessons.length}{' '}
                    lessons
                  </div>
                </div>
              </div>

              <div className="progress-bar mb-4">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>

              <Link
                to={`/module/${module.id}`}
                className="flex items-center justify-between text-primary-600 hover:text-primary-700 transition-colors"
              >
                <span className="font-medium">
                  {module.completed ? 'Review Module' : 'Continue Learning'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div className="mt-12 lg:mt-16" variants={itemVariants}>
        <h2 className="text-xl lg:text-2xl font-semibold text-dark-900 mb-6 lg:mb-8 text-center">
          Why Learn SVG Animations?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-dark-900 mb-2">Interactive Learning</h3>
            <p className="text-dark-600">
              Practice with live code playgrounds and see your animations come to life instantly.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="font-semibold text-dark-900 mb-2">Real Projects</h3>
            <p className="text-dark-600">
              Build practical animations you can use in real-world applications and websites.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-dark-900 mb-2">Comprehensive</h3>
            <p className="text-dark-600">
              From basic shapes to advanced path animations, master every aspect of SVG.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
