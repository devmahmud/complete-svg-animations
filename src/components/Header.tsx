import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Play, Menu } from 'lucide-react';
import { useCourse } from '../context/CourseContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { getProgress } = useCourse();
  const progress = getProgress();
  const overallProgress =
    progress.totalLessons > 0 ? (progress.completedLessons / progress.totalLessons) * 100 : 0;

  return (
    <motion.header
      className="bg-white shadow-sm border-b border-dark-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-dark-100 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-dark-600" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-dark-900 truncate">
              SVG Animations
            </h1>
          </Link>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-6">
          {/* Progress info - hidden on small mobile */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-xs sm:text-sm text-dark-600">
              <span className="font-medium">{progress.completedLessons}</span>
              <span className="mx-1">/</span>
              <span>{progress.totalLessons}</span>
              <span className="ml-1">lessons</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-24 sm:w-32 bg-dark-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-dark-700 w-10 sm:w-12">
                {Math.round(overallProgress)}%
              </span>
            </div>
          </div>

          {/* Extra small mobile progress indicator */}
          <div className="sm:hidden flex items-center space-x-1.5">
            <div className="w-12 bg-dark-200 rounded-full h-1.5">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs font-medium text-dark-700 min-w-[2rem]">
              {Math.round(overallProgress)}%
            </span>
          </div>

          <nav className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            <Link
              to="/playground"
              className="flex items-center space-x-1 lg:space-x-2 text-dark-600 hover:text-primary-600 transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-dark-100 touch-manipulation"
              aria-label="Playground"
            >
              <Play className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Playground</span>
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
