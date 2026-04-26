import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CourseProvider, useCourse } from './CourseContext';
import { modules } from '../content/registry';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CourseProvider>{children}</CourseProvider>
);

const STORAGE_KEY = 'svg-anim-course/progress/v1';

const firstModule = modules[0];
const firstLesson = firstModule.lessons[0];
const firstExercise = firstLesson.exercises[0];

describe('CourseProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts with no progress', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });
    expect(result.current.state.completedLessons).toEqual({});
    expect(result.current.state.completedExercises).toEqual({});
    expect(result.current.state.currentModule).toBeNull();
    expect(result.current.state.currentLesson).toBeNull();
  });

  it('exposes a module view for every registry module with derived progress', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });
    expect(result.current.modules).toHaveLength(modules.length);
    for (const m of result.current.modules) {
      expect(m.completed).toBe(false);
      expect(m.progress).toBe(0);
      expect(m.completedLessonCount).toBe(0);
    }
  });

  it('throws when useCourse is used outside the provider', () => {
    expect(() => renderHook(() => useCourse())).toThrow(/CourseProvider/);
  });
});

describe('progress dispatching', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('SET_CURRENT_MODULE / SET_CURRENT_LESSON update state', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'SET_CURRENT_MODULE', payload: firstModule.id });
      result.current.dispatch({ type: 'SET_CURRENT_LESSON', payload: firstLesson.id });
    });
    expect(result.current.state.currentModule).toBe(firstModule.id);
    expect(result.current.state.currentLesson).toBe(firstLesson.id);
  });

  it('COMPLETE_LESSON marks a lesson complete and bumps module progress', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'COMPLETE_LESSON',
        payload: { moduleId: firstModule.id, lessonId: firstLesson.id },
      });
    });

    expect(result.current.isLessonComplete(firstModule.id, firstLesson.id)).toBe(true);
    const moduleView = result.current.getModule(firstModule.id);
    expect(moduleView?.completedLessonCount).toBe(1);
    expect(moduleView?.progress).toBeCloseTo((1 / firstModule.lessons.length) * 100);
  });

  it('a module is marked completed only after every lesson is completed', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });

    act(() => {
      for (const lesson of firstModule.lessons) {
        result.current.dispatch({
          type: 'COMPLETE_LESSON',
          payload: { moduleId: firstModule.id, lessonId: lesson.id },
        });
      }
    });

    const moduleView = result.current.getModule(firstModule.id);
    expect(moduleView?.completed).toBe(true);
    expect(moduleView?.progress).toBe(100);
    expect(result.current.progressSummary.completedModules).toBeGreaterThanOrEqual(1);
  });

  it('COMPLETE_EXERCISE flips that exercise to complete', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'COMPLETE_EXERCISE',
        payload: {
          moduleId: firstModule.id,
          lessonId: firstLesson.id,
          exerciseId: firstExercise.id,
        },
      });
    });

    expect(
      result.current.isExerciseComplete(firstModule.id, firstLesson.id, firstExercise.id)
    ).toBe(true);

    const lessonView = result.current.getLesson(firstModule.id, firstLesson.id);
    const ex = lessonView?.exercises.find((e) => e.id === firstExercise.id);
    expect(ex?.completed).toBe(true);
  });

  it('RESET_PROGRESS clears completion but keeps current navigation state', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'SET_CURRENT_MODULE', payload: firstModule.id });
      result.current.dispatch({ type: 'SET_CURRENT_LESSON', payload: firstLesson.id });
      result.current.dispatch({
        type: 'COMPLETE_LESSON',
        payload: { moduleId: firstModule.id, lessonId: firstLesson.id },
      });
      result.current.dispatch({
        type: 'COMPLETE_EXERCISE',
        payload: {
          moduleId: firstModule.id,
          lessonId: firstLesson.id,
          exerciseId: firstExercise.id,
        },
      });
    });

    act(() => {
      result.current.dispatch({ type: 'RESET_PROGRESS' });
    });

    expect(result.current.state.completedLessons).toEqual({});
    expect(result.current.state.completedExercises).toEqual({});
    expect(result.current.state.currentModule).toBe(firstModule.id);
    expect(result.current.state.currentLesson).toBe(firstLesson.id);
  });
});

describe('progressSummary', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('counts every lesson and exercise across the registry', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });
    const expectedLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
    const expectedExercises = modules.reduce(
      (n, m) => n + m.lessons.reduce((nn, l) => nn + l.exercises.length, 0),
      0
    );
    expect(result.current.progressSummary.totalLessons).toBe(expectedLessons);
    expect(result.current.progressSummary.totalExercises).toBe(expectedExercises);
    expect(result.current.progressSummary.completedLessons).toBe(0);
    expect(result.current.progressSummary.completedExercises).toBe(0);
  });
});

describe('persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('writes state to localStorage on change', () => {
    const { result } = renderHook(() => useCourse(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'COMPLETE_LESSON',
        payload: { moduleId: firstModule.id, lessonId: firstLesson.id },
      });
    });

    const raw = window.localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.completedLessons[`${firstModule.id}/${firstLesson.id}`]).toBe(true);
  });

  it('rehydrates from localStorage on mount', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completedLessons: { [`${firstModule.id}/${firstLesson.id}`]: true },
        completedExercises: {},
        currentModule: firstModule.id,
        currentLesson: firstLesson.id,
      })
    );

    const { result } = renderHook(() => useCourse(), { wrapper });
    expect(result.current.isLessonComplete(firstModule.id, firstLesson.id)).toBe(true);
    expect(result.current.state.currentModule).toBe(firstModule.id);
  });

  it('survives corrupt localStorage by falling back to initial state', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not valid json');
    const { result } = renderHook(() => useCourse(), { wrapper });
    expect(result.current.state.completedLessons).toEqual({});
    expect(result.current.state.completedExercises).toEqual({});
  });
});
