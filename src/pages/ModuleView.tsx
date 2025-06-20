import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Code,
  Eye,
  Loader,
  BookOpen,
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import CodePlayground from '../components/CodePlayground';
import MarkdownContent from '../components/MarkdownContent';
import { Link } from 'react-router-dom';

const ModuleView: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lessonId = searchParams.get('lesson');

  const { state, dispatch, getCurrentModule, getCurrentLesson } = useCourse();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showPlayground, setShowPlayground] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const module = getCurrentModule();
  const currentLesson = getCurrentLesson();

  useEffect(() => {
    const initializeModule = async () => {
      setIsLoading(true);
      try {
        if (module && moduleId) {
          dispatch({ type: 'SET_CURRENT_MODULE', payload: moduleId });

          if (lessonId) {
            const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
            if (lessonIndex !== -1) {
              setCurrentLessonIndex(lessonIndex);
              dispatch({ type: 'SET_CURRENT_LESSON', payload: lessonId });
            } else {
              // If lesson not found, go to first lesson
              const firstLesson = module.lessons[0];
              if (firstLesson) {
                setCurrentLessonIndex(0);
                dispatch({ type: 'SET_CURRENT_LESSON', payload: firstLesson.id });
                navigate(`/module/${moduleId}?lesson=${firstLesson.id}`);
              }
            }
          } else {
            // If no lesson specified, go to first lesson
            const firstLesson = module.lessons[0];
            if (firstLesson) {
              setCurrentLessonIndex(0);
              dispatch({ type: 'SET_CURRENT_LESSON', payload: firstLesson.id });
              navigate(`/module/${moduleId}?lesson=${firstLesson.id}`);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing module:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeModule();
  }, [module, moduleId, lessonId, dispatch, navigate]);

  const handleLessonComplete = async () => {
    if (module && currentLesson) {
      setMarkingComplete(true);

      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 800));

      dispatch({
        type: 'COMPLETE_LESSON',
        payload: { moduleId: module.id, lessonId: currentLesson.id },
      });

      setMarkingComplete(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleExerciseComplete = (exerciseId: string) => {
    if (module && currentLesson) {
      dispatch({
        type: 'COMPLETE_EXERCISE',
        payload: { moduleId: module.id, lessonId: currentLesson.id, exerciseId },
      });
    }
  };

  const goToNextLesson = () => {
    if (module && currentLessonIndex < module.lessons.length - 1) {
      const nextLesson = module.lessons[currentLessonIndex + 1];
      dispatch({ type: 'SET_CURRENT_LESSON', payload: nextLesson.id });
      setCurrentLessonIndex(currentLessonIndex + 1);
      navigate(`/module/${module.id}?lesson=${nextLesson.id}`);
    }
  };

  const goToPreviousLesson = () => {
    if (module && currentLessonIndex > 0) {
      const prevLesson = module.lessons[currentLessonIndex - 1];
      dispatch({ type: 'SET_CURRENT_LESSON', payload: prevLesson.id });
      setCurrentLessonIndex(currentLessonIndex - 1);
      navigate(`/module/${module.id}?lesson=${prevLesson.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-dark-900 mb-2">Module Not Found</h2>
          <p className="text-dark-600">The requested module could not be found.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Module Header */}
        <motion.div
          className="mb-6 lg:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-dark-900">{module.title}</h1>
            {module.completed && (
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full self-start">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Completed</span>
              </div>
            )}
          </div>
          <p className="text-base lg:text-lg text-dark-600 mb-4">{module.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="progress-bar flex-1">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-sm font-medium text-dark-700">
              {Math.round(module.progress)}% Complete
            </span>
          </div>
        </motion.div>

        {/* Module Overview */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-dark-200 p-4 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-4 lg:mb-6">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg lg:text-xl font-semibold text-dark-900">Module Overview</h3>
          </div>
          <div className="prose prose-sm lg:prose-lg max-w-none">
            <MarkdownContent content={module.moduleOverview} />
          </div>
        </motion.div>

        {/* Lesson List */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-dark-200 p-4 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-lg lg:text-xl font-semibold text-dark-900 mb-4 lg:mb-6">Lessons</h3>
          <div className="space-y-3">
            {module.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/module/${module.id}?lesson=${lesson.id}`}
                className="flex items-center space-x-3 p-3 rounded-lg border border-dark-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-dark-300 flex items-center justify-center">
                      <span className="text-xs font-medium text-dark-500">{index + 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-dark-900">{lesson.title}</h4>
                  {lesson.exercises.length > 0 && (
                    <p className="text-sm text-dark-600">
                      {lesson.exercises.filter((e) => e.completed).length}/{lesson.exercises.length}{' '}
                      exercises completed
                    </p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-dark-400" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-4 right-4 left-4 lg:left-auto bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">Lesson completed successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Header */}
      <motion.div
        className="mb-6 lg:mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-dark-900">{module.title}</h1>
          {module.completed && (
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full self-start">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Completed</span>
            </div>
          )}
        </div>
        <p className="text-base lg:text-lg text-dark-600 mb-4">{module.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="progress-bar flex-1">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${module.progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-sm font-medium text-dark-700">
            {Math.round(module.progress)}% Complete
          </span>
        </div>
      </motion.div>

      {/* Lesson Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-dark-900">{currentLesson.title}</h2>
          <span className="text-sm text-dark-500">
            Lesson {currentLessonIndex + 1} of {module.lessons.length}
          </span>
          {currentLesson.completed && (
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full self-start">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6 lg:space-y-8">
        {/* Lesson Content */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-dark-200 p-4 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-4 lg:mb-6">
            <Play className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg lg:text-xl font-semibold text-dark-900">Lesson Content</h3>
          </div>
          <div className="prose prose-sm lg:prose-lg max-w-none">
            <MarkdownContent content={currentLesson.content} />
          </div>
        </motion.div>

        {/* Playground - Moved to top for better UX */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-dark-200 p-4 lg:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg lg:text-xl font-semibold text-dark-900">Code Playground</h3>
            </div>
            <button
              onClick={() => setShowPlayground(!showPlayground)}
              className="flex items-center space-x-2 px-3 py-2 bg-dark-100 hover:bg-dark-200 rounded-lg transition-colors self-start"
            >
              {showPlayground ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
              <span className="text-sm font-medium">{showPlayground ? 'Hide' : 'Show'} Editor</span>
            </button>
          </div>

          <AnimatePresence>
            {showPlayground && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CodePlayground
                  initialCode={`<svg viewBox="0 0 100 100">
  <!-- Start coding here -->
</svg>`}
                  solution={`<svg viewBox="0 0 100 100">
  <!-- This is a playground - no specific solution -->
  <circle cx="50" cy="50" r="30" fill="blue"/>
</svg>`}
                  onComplete={() => {}}
                  completed={false}
                  showSolution={false}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!showPlayground && (
            <div className="text-center py-8">
              <Code className="w-12 h-12 text-dark-300 mx-auto mb-4" />
              <p className="text-dark-600 mb-4">
                Ready to practice? Open the code editor to start coding!
              </p>
              <button
                onClick={() => setShowPlayground(true)}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Open Code Editor
              </button>
            </div>
          )}
        </motion.div>

        {/* Exercises */}
        {currentLesson.exercises.length > 0 && (
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-dark-200 p-4 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg lg:text-xl font-semibold text-dark-900 mb-4 lg:mb-6">
              Exercises
            </h3>
            <div className="space-y-4 lg:space-y-6">
              {currentLesson.exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  className="border border-dark-200 rounded-lg p-4 lg:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-dark-900 mb-2">{exercise.title}</h4>
                      <p className="text-dark-600">{exercise.description}</p>
                    </div>
                    {exercise.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-4 flex-shrink-0" />
                    )}
                  </div>
                  <CodePlayground
                    initialCode={exercise.initialCode}
                    solution={exercise.solution}
                    onComplete={() => handleExerciseComplete(exercise.id)}
                    completed={exercise.completed}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Lesson Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-dark-200 space-y-4 sm:space-y-0">
          <button
            onClick={goToPreviousLesson}
            disabled={currentLessonIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Lesson</span>
          </button>

          <button
            onClick={handleLessonComplete}
            disabled={currentLesson?.completed || markingComplete}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center ${
              currentLesson?.completed
                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                : markingComplete
                ? 'bg-primary-400 text-white cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105'
            }`}
          >
            {markingComplete ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : currentLesson?.completed ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>
              {markingComplete
                ? 'Marking Complete...'
                : currentLesson?.completed
                ? 'Completed'
                : 'Mark Complete'}
            </span>
          </button>

          <button
            onClick={goToNextLesson}
            disabled={currentLessonIndex === module.lessons.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <span>Next Lesson</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleView;
