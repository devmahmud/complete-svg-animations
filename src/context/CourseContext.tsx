import React, { createContext, useContext, useReducer, useEffect, ReactNode, useMemo } from 'react';
import { modules, findModule, findLesson, ModuleDef, LessonDef, ExerciseDef } from '../content/registry';

const STORAGE_KEY = 'svg-anim-course/progress/v1';

type ProgressState = {
  completedLessons: Record<string, boolean>;
  completedExercises: Record<string, boolean>;
  currentModule: string | null;
  currentLesson: string | null;
};

type Action =
  | { type: 'SET_CURRENT_MODULE'; payload: string }
  | { type: 'SET_CURRENT_LESSON'; payload: string }
  | { type: 'COMPLETE_LESSON'; payload: { moduleId: string; lessonId: string } }
  | { type: 'COMPLETE_EXERCISE'; payload: { moduleId: string; lessonId: string; exerciseId: string } }
  | { type: 'RESET_PROGRESS' };

const lessonKey = (moduleId: string, lessonId: string) => `${moduleId}/${lessonId}`;
const exerciseKey = (moduleId: string, lessonId: string, exerciseId: string) =>
  `${moduleId}/${lessonId}/${exerciseId}`;

const initial: ProgressState = {
  completedLessons: {},
  completedExercises: {},
  currentModule: null,
  currentLesson: null,
};

function loadFromStorage(): ProgressState {
  if (typeof window === 'undefined') return initial;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return {
      ...initial,
      ...parsed,
      completedLessons: parsed.completedLessons || {},
      completedExercises: parsed.completedExercises || {},
    };
  } catch {
    return initial;
  }
}

function reducer(state: ProgressState, action: Action): ProgressState {
  switch (action.type) {
    case 'SET_CURRENT_MODULE':
      return { ...state, currentModule: action.payload };
    case 'SET_CURRENT_LESSON':
      return { ...state, currentLesson: action.payload };
    case 'COMPLETE_LESSON':
      return {
        ...state,
        completedLessons: {
          ...state.completedLessons,
          [lessonKey(action.payload.moduleId, action.payload.lessonId)]: true,
        },
      };
    case 'COMPLETE_EXERCISE':
      return {
        ...state,
        completedExercises: {
          ...state.completedExercises,
          [exerciseKey(
            action.payload.moduleId,
            action.payload.lessonId,
            action.payload.exerciseId
          )]: true,
        },
      };
    case 'RESET_PROGRESS':
      return {
        ...initial,
        currentModule: state.currentModule,
        currentLesson: state.currentLesson,
      };
    default:
      return state;
  }
}

export interface ModuleView extends ModuleDef {
  completed: boolean;
  progress: number;
  completedLessonCount: number;
}

export interface LessonView extends LessonDef {
  moduleId: string;
  completed: boolean;
  exercises: (ExerciseDef & { completed: boolean })[];
  index: number;
  total: number;
}

interface CourseContextType {
  state: ProgressState;
  dispatch: React.Dispatch<Action>;
  modules: ModuleView[];
  getModule: (moduleId: string | null | undefined) => ModuleView | undefined;
  getLesson: (moduleId: string | null | undefined, lessonId: string | null | undefined) => LessonView | undefined;
  isLessonComplete: (moduleId: string, lessonId: string) => boolean;
  isExerciseComplete: (moduleId: string, lessonId: string, exerciseId: string) => boolean;
  progressSummary: {
    totalLessons: number;
    completedLessons: number;
    totalExercises: number;
    completedExercises: number;
    completedModules: number;
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [state]);

  const value = useMemo<CourseContextType>(() => {
    const isLessonComplete = (moduleId: string, lessonId: string) =>
      Boolean(state.completedLessons[lessonKey(moduleId, lessonId)]);

    const isExerciseComplete = (moduleId: string, lessonId: string, exerciseId: string) =>
      Boolean(state.completedExercises[exerciseKey(moduleId, lessonId, exerciseId)]);

    const moduleViews: ModuleView[] = modules.map((m) => {
      const completedLessonCount = m.lessons.filter((l) => isLessonComplete(m.id, l.id)).length;
      const progress = m.lessons.length === 0 ? 0 : (completedLessonCount / m.lessons.length) * 100;
      return {
        ...m,
        completedLessonCount,
        progress,
        completed: completedLessonCount === m.lessons.length,
      };
    });

    const getModule = (moduleId: string | null | undefined) =>
      moduleViews.find((m) => m.id === moduleId);

    const getLesson = (
      moduleId: string | null | undefined,
      lessonId: string | null | undefined
    ): LessonView | undefined => {
      const mod = findModule(moduleId);
      if (!mod) return undefined;
      const idx = mod.lessons.findIndex((l) => l.id === lessonId);
      if (idx === -1) return undefined;
      const lesson = mod.lessons[idx];
      return {
        ...lesson,
        moduleId: mod.id,
        completed: isLessonComplete(mod.id, lesson.id),
        exercises: lesson.exercises.map((ex) => ({
          ...ex,
          completed: isExerciseComplete(mod.id, lesson.id, ex.id),
        })),
        index: idx,
        total: mod.lessons.length,
      };
    };

    let totalLessons = 0;
    let completedLessons = 0;
    let totalExercises = 0;
    let completedExercises = 0;
    let completedModules = 0;
    moduleViews.forEach((m) => {
      if (m.completed) completedModules += 1;
      m.lessons.forEach((l) => {
        totalLessons += 1;
        if (isLessonComplete(m.id, l.id)) completedLessons += 1;
        l.exercises.forEach((ex) => {
          totalExercises += 1;
          if (isExerciseComplete(m.id, l.id, ex.id)) completedExercises += 1;
        });
      });
    });

    return {
      state,
      dispatch,
      modules: moduleViews,
      getModule,
      getLesson,
      isLessonComplete,
      isExerciseComplete,
      progressSummary: {
        totalLessons,
        completedLessons,
        totalExercises,
        completedExercises,
        completedModules,
      },
    };
  }, [state]);

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourse must be used within a CourseProvider');
  return ctx;
}

// re-export for convenience
export { findLesson, findModule };
