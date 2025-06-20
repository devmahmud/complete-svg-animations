import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import Module1Index from '../content/module-1/index.mdx';
import Module1Intro from '../content/module-1/01-introduction.mdx';
import Module1Shapes from '../content/module-1/02-primitive-shapes.mdx';
import Module1HowShapes from '../content/module-1/03-how-shapes-are-made.mdx';
import Module1Coords from '../content/module-1/04-coordinate-system.mdx';
import Module1Styling from '../content/module-1/05-styling-attributes.mdx';
import Module1Grouping from '../content/module-1/06-grouping-elements.mdx';
import Module1Exercises from '../content/module-1/07-practice-exercises.mdx';

import Module2Index from '../content/module-2/index.mdx';
import Module2Intro from '../content/module-2/01-introduction.mdx';
import Module2Transitions from '../content/module-2/02-css-transitions.mdx';
import Module2Transforms from '../content/module-2/03-css-transforms.mdx';
import Module2Sequencing from '../content/module-2/04-sequencing-animations.mdx';
import Module2Timing from '../content/module-2/05-timing-functions.mdx';
import Module2Projects from '../content/module-2/06-practice-projects.mdx';

import Module3Index from '../content/module-3/index.mdx';
import Module3Problem from '../content/module-3/01-the-problem-with-css.mdx';
import Module3Intro from '../content/module-3/02-introduction-to-smil.mdx';
import Module3DeepDive from '../content/module-3/03-deep-dive-into-smil.mdx';
import Module3Timing from '../content/module-3/04-smil-timing-functions.mdx';
import Module3Orchestrating from '../content/module-3/05-orchestrating-smil.mdx';
import Module3React from '../content/module-3/06-smil-and-react.mdx';
import Module3Projects from '../content/module-3/07-advanced-smil-projects.mdx';

import Module4Index from '../content/module-4/index.mdx';
import Module4PathElement from '../content/module-4/01-the-path-element.mdx';
import Module4Commands from '../content/module-4/02-path-commands.mdx';
import Module4Drawing from '../content/module-4/03-drawing-animations.mdx';
import Module4Motion from '../content/module-4/04-motion-along-paths.mdx';
import Module4Morphing from '../content/module-4/05-path-morphing.mdx';
import Module4Advanced from '../content/module-4/06-advanced-path-techniques.mdx';
import Module4Projects from '../content/module-4/07-real-world-projects.mdx';

// Types
export interface Module {
  id: string;
  title: string;
  description: string;
  moduleOverview: ReactNode;
  lessons: Lesson[];
  completed: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: ReactNode;
  completed: boolean;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  completed: boolean;
}

interface CourseState {
  modules: Module[];
  currentModule: string | null;
  currentLesson: string | null;
  progress: {
    totalLessons: number;
    completedLessons: number;
    totalExercises: number;
    completedExercises: number;
  };
}

type CourseAction =
  | { type: 'SET_CURRENT_MODULE'; payload: string }
  | { type: 'SET_CURRENT_LESSON'; payload: string }
  | { type: 'COMPLETE_LESSON'; payload: { moduleId: string; lessonId: string } }
  | {
      type: 'COMPLETE_EXERCISE';
      payload: { moduleId: string; lessonId: string; exerciseId: string };
    }
  | { type: 'COMPLETE_MODULE'; payload: string };

const initialState: CourseState = {
  modules: [
    {
      id: 'module-1',
      title: 'SVG Foundations',
      description: 'Master the fundamental concepts and building blocks of SVG graphics',
      moduleOverview: <Module1Index />,
      completed: false,
      progress: 0,
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Introduction to SVGs',
          content: <Module1Intro />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-1-2',
          title: 'The Seven Primitive Shapes',
          content: <Module1Shapes />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-1-3',
          title: 'How Shapes Are Made',
          content: <Module1HowShapes />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-1-4',
          title: 'Coordinate System',
          content: <Module1Coords />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-1-5',
          title: 'Styling Attributes',
          content: <Module1Styling />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-1-6',
          title: 'Grouping Elements',
          content: <Module1Grouping />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-1-7',
          title: 'Practice Exercises',
          content: <Module1Exercises />,
          completed: false,
          exercises: [
            {
              id: 'ex-1-7-1',
              title: 'Create a Basic Rectangle',
              description: 'Create an SVG rectangle with custom styling',
              initialCode: `<svg viewBox="0 0 100 100">
  <!-- Create a rectangle here -->
</svg>`,
              solution: `<svg viewBox="0 0 100 100">
  <rect x="20" y="20" width="60" height="60" fill="crimson"/>
</svg>`,
              completed: false,
            },
            {
              id: 'ex-1-7-2',
              title: 'Create a Circle',
              description: 'Create an SVG circle with stroke and fill',
              initialCode: `<svg viewBox="0 0 100 100">
  <!-- Create a circle here -->
</svg>`,
              solution: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="30" fill="darkorchid" stroke="currentColor" stroke-width="3"/>
</svg>`,
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: 'module-2',
      title: 'Your First Animation',
      description: 'Bring your SVG shapes to life with CSS animations and transforms',
      moduleOverview: <Module2Index />,
      completed: false,
      progress: 0,
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Introduction to SVG Animations',
          content: <Module2Intro />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-2-2',
          title: 'CSS Transitions',
          content: <Module2Transitions />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-2-3',
          title: 'CSS Transforms',
          content: <Module2Transforms />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-2-4',
          title: 'Sequencing Animations',
          content: <Module2Sequencing />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-2-5',
          title: 'Timing Functions',
          content: <Module2Timing />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-2-6',
          title: 'Practice Projects',
          content: <Module2Projects />,
          completed: false,
          exercises: [
            {
              id: 'ex-2-6-1',
              title: 'Basic Hover Effect',
              description: 'Create a simple hover animation',
              initialCode: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="30" fill="blue" class="hover-circle"/>
</svg>

<style>
.hover-circle {
  transition: fill 0.3s ease;
}
.hover-circle:hover {
  fill: red;
}
</style>`,
              solution: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="30" fill="blue" class="hover-circle"/>
</svg>

<style>
.hover-circle {
  transition: fill 0.3s ease;
}
.hover-circle:hover {
  fill: red;
}
</style>`,
              completed: false,
            },
            {
              id: 'ex-2-6-2',
              title: 'Transform Animation',
              description: 'Add scale and rotation transforms',
              initialCode: `<svg viewBox="0 0 100 100">
  <rect x="20" y="20" width="60" height="60" fill="green" class="transform-rect"/>
</svg>

<style>
.transform-rect {
  transition: transform 0.3s ease;
}
.transform-rect:hover {
  /* Add transform effects here */
}
</style>`,
              solution: `<svg viewBox="0 0 100 100">
  <rect x="20" y="20" width="60" height="60" fill="green" class="transform-rect"/>
</svg>

<style>
.transform-rect {
  transition: transform 0.3s ease;
}
.transform-rect:hover {
  transform: scale(1.2) rotate(45deg);
}
</style>`,
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: 'module-3',
      title: 'Animating the Unanimatable',
      description: 'Master SMIL animations and animate properties that CSS cannot handle',
      moduleOverview: <Module3Index />,
      completed: false,
      progress: 0,
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'The Problem with CSS',
          content: <Module3Problem />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-3-2',
          title: 'Introduction to SMIL',
          content: <Module3Intro />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-3-3',
          title: 'Deep Dive into SMIL',
          content: <Module3DeepDive />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-3-4',
          title: 'SMIL Timing Functions',
          content: <Module3Timing />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-3-5',
          title: 'Orchestrating SMIL',
          content: <Module3Orchestrating />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-3-6',
          title: 'SMIL and React',
          content: <Module3React />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-3-7',
          title: 'Advanced SMIL Projects',
          content: <Module3Projects />,
          completed: false,
          exercises: [
            {
              id: 'ex-3-7-1',
              title: 'Basic SMIL Animation',
              description: 'Create your first SMIL animation',
              initialCode: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="20" fill="blue">
    <!-- Add SMIL animation here -->
  </circle>
</svg>`,
              solution: `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="20" fill="blue">
    <animate 
      attributeName="r"
      values="20;40;20"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
</svg>`,
              completed: false,
            },
          ],
        },
      ],
    },
    {
      id: 'module-4',
      title: 'Path and Path Animations',
      description: 'Master the most powerful SVG element and create stunning path-based animations',
      moduleOverview: <Module4Index />,
      completed: false,
      progress: 0,
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'The Path Element',
          content: <Module4PathElement />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-4-2',
          title: 'Path Commands',
          content: <Module4Commands />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-4-3',
          title: 'Drawing Animations',
          content: <Module4Drawing />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-4-4',
          title: 'Motion Along Paths',
          content: <Module4Motion />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-4-5',
          title: 'Path Morphing',
          content: <Module4Morphing />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-4-6',
          title: 'Advanced Path Techniques',
          content: <Module4Advanced />,
          completed: false,
          exercises: [],
        },
        {
          id: 'lesson-4-7',
          title: 'Real-World Projects',
          content: <Module4Projects />,
          completed: false,
          exercises: [
            {
              id: 'ex-4-7-1',
              title: 'Drawing Animation',
              description: 'Create a path drawing animation',
              initialCode: `<svg viewBox="0 0 100 100">
  <path 
    d="M 10 50 Q 50 10 90 50"
    fill="none"
    stroke="blue"
    stroke-width="3"
    stroke-linecap="round"
    stroke-dasharray="100"
    stroke-dashoffset="100"
  >
    <!-- Add animation here -->
  </path>
</svg>`,
              solution: `<svg viewBox="0 0 100 100">
  <path 
    d="M 10 50 Q 50 10 90 50"
    fill="none"
    stroke="blue"
    stroke-width="3"
    stroke-linecap="round"
    stroke-dasharray="100"
    stroke-dashoffset="100"
  >
    <animate 
      attributeName="stroke-dashoffset"
      values="100;0"
      dur="2s"
      fill="freeze"
    />
  </path>
</svg>`,
              completed: false,
            },
          ],
        },
      ],
    },
  ],
  currentModule: null,
  currentLesson: null,
  progress: {
    totalLessons: 0,
    completedLessons: 0,
    totalExercises: 0,
    completedExercises: 0,
  },
};

function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case 'SET_CURRENT_MODULE':
      return { ...state, currentModule: action.payload };
    case 'SET_CURRENT_LESSON':
      return { ...state, currentLesson: action.payload };
    case 'COMPLETE_LESSON': {
      const { moduleId, lessonId } = action.payload;
      const updatedModules = state.modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed: true };
            }
            return lesson;
          });
          const completedLessons = updatedLessons.filter((l) => l.completed).length;
          const progress = (completedLessons / updatedLessons.length) * 100;
          const completed = completedLessons === updatedLessons.length;
          return { ...module, lessons: updatedLessons, progress, completed };
        }
        return module;
      });
      return { ...state, modules: updatedModules };
    }
    case 'COMPLETE_EXERCISE': {
      const { moduleId, lessonId, exerciseId } = action.payload;
      const updatedModules = state.modules.map((module) => {
        if (module.id === moduleId) {
          const updatedLessons = module.lessons.map((lesson) => {
            if (lesson.id === lessonId) {
              const updatedExercises = lesson.exercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                  return { ...exercise, completed: true };
                }
                return exercise;
              });
              return { ...lesson, exercises: updatedExercises };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        }
        return module;
      });
      return { ...state, modules: updatedModules };
    }
    case 'COMPLETE_MODULE': {
      const updatedModules = state.modules.map((module) => {
        if (module.id === action.payload) {
          return { ...module, completed: true, progress: 100 };
        }
        return module;
      });
      return { ...state, modules: updatedModules };
    }
    default:
      return state;
  }
}

interface CourseContextType {
  state: CourseState;
  dispatch: React.Dispatch<CourseAction>;
  getCurrentModule: () => Module | undefined;
  getCurrentLesson: () => Lesson | undefined;
  getProgress: () => {
    totalLessons: number;
    completedLessons: number;
    totalExercises: number;
    completedExercises: number;
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const getCurrentModule = () => {
    return state.modules.find((module) => module.id === state.currentModule);
  };

  const getCurrentLesson = () => {
    const currentModule = getCurrentModule();
    if (!currentModule) return undefined;
    return currentModule.lessons.find((lesson) => lesson.id === state.currentLesson);
  };

  const getProgress = () => {
    let totalLessons = 0;
    let completedLessons = 0;
    let totalExercises = 0;
    let completedExercises = 0;

    state.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        totalLessons++;
        if (lesson.completed) completedLessons++;
        lesson.exercises.forEach((exercise) => {
          totalExercises++;
          if (exercise.completed) completedExercises++;
        });
      });
    });

    return { totalLessons, completedLessons, totalExercises, completedExercises };
  };

  const value = {
    state,
    dispatch,
    getCurrentModule,
    getCurrentLesson,
    getProgress,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}
