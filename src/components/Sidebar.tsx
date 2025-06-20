import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Circle, PlayCircle, X } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { state, dispatch } = useCourse();
  const location = useLocation();

  const handleModuleClick = (moduleId: string) => {
    dispatch({ type: 'SET_CURRENT_MODULE', payload: moduleId });
    // Close sidebar on mobile when module is clicked
    if (onClose) onClose();
  };

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    dispatch({ type: 'SET_CURRENT_MODULE', payload: moduleId });
    dispatch({ type: 'SET_CURRENT_LESSON', payload: lessonId });
    // Close sidebar on mobile when lesson is clicked
    if (onClose) onClose();
  };

  return (
    <motion.aside
      className="w-80 lg:w-72 bg-white shadow-lg border-r border-dark-200 overflow-y-auto h-full max-h-screen"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="p-4">
        {/* Mobile close button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-dark-900">Course Modules</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
            >
              <X className="w-5 h-5 text-dark-600" />
            </button>
          )}
        </div>

        <nav className="space-y-3">
          {state.modules.map((module, moduleIndex) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: moduleIndex * 0.1 }}
            >
              <div className="space-y-1">
                <Link
                  to={`/module/${module.id}`}
                  onClick={() => handleModuleClick(module.id)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    location.pathname.includes(module.id)
                      ? 'bg-primary-50 border border-primary-200 text-primary-700'
                      : 'hover:bg-dark-50 text-dark-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="relative flex-shrink-0">
                      {module.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-dark-400" />
                      )}
                      {module.progress > 0 && !module.completed && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm truncate">{module.title}</h3>
                      <p className="text-xs text-dark-500 mt-1 line-clamp-2">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="text-xs text-dark-500">{Math.round(module.progress)}%</div>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>

                {location.pathname.includes(module.id) && (
                  <motion.div
                    className="ml-6 space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {module.lessons.map((lesson, lessonIndex) => (
                      <Link
                        key={lesson.id}
                        to={`/module/${module.id}?lesson=${lesson.id}`}
                        onClick={() => handleLessonClick(module.id, lesson.id)}
                        className={`flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${
                          location.search.includes(lesson.id)
                            ? 'bg-secondary-50 text-secondary-700'
                            : 'hover:bg-dark-50 text-dark-600'
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        ) : (
                          <PlayCircle className="w-3 h-3 text-dark-400 flex-shrink-0" />
                        )}
                        <span className="truncate flex-1">{lesson.title}</span>
                        {lesson.exercises.length > 0 && (
                          <span className="text-xs text-dark-500 flex-shrink-0">
                            {lesson.exercises.filter((e) => e.completed).length}/
                            {lesson.exercises.length}
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-dark-200">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-3">
            <h3 className="font-medium text-dark-900 mb-2 text-sm">Quick Stats</h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-dark-600">Modules Completed:</span>
                <span className="font-medium text-dark-900">
                  {state.modules.filter((m) => m.completed).length}/{state.modules.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-600">Total Progress:</span>
                <span className="font-medium text-dark-900">
                  {Math.round(
                    state.modules.reduce((acc, m) => acc + m.progress, 0) / state.modules.length
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
