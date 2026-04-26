import { describe, it, expect } from 'vitest';
import { modules, findModule, findLesson } from './registry';
import { checkSolution } from '../lib/checkSolution';

describe('content registry', () => {
  it('has at least one module', () => {
    expect(modules.length).toBeGreaterThan(0);
  });

  it('every module has a unique id', () => {
    const ids = modules.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every module has at least one lesson', () => {
    for (const m of modules) {
      expect(m.lessons.length, `module ${m.id} should have lessons`).toBeGreaterThan(0);
    }
  });

  it('lesson ids are unique within each module', () => {
    for (const m of modules) {
      const ids = m.lessons.map((l) => l.id);
      expect(new Set(ids).size, `duplicate lesson id in ${m.id}`).toBe(ids.length);
    }
  });

  it('exercise ids are unique within each lesson', () => {
    for (const m of modules) {
      for (const l of m.lessons) {
        const ids = l.exercises.map((e) => e.id);
        expect(
          new Set(ids).size,
          `duplicate exercise id in ${m.id}/${l.id}`
        ).toBe(ids.length);
      }
    }
  });

  it('every module has the metadata the UI relies on', () => {
    for (const m of modules) {
      expect(m.id).toBeTruthy();
      expect(m.title).toBeTruthy();
      expect(m.tagline).toBeTruthy();
      expect(m.description).toBeTruthy();
      expect(m.Overview).toBeTruthy();
    }
  });
});

describe('exercise validity', () => {
  for (const m of modules) {
    for (const l of m.lessons) {
      for (const ex of l.exercises) {
        describe(`${m.id} / ${l.id} / ${ex.id}`, () => {
          it('has the metadata the playground needs', () => {
            expect(ex.id).toBeTruthy();
            expect(ex.title).toBeTruthy();
            expect(ex.description).toBeTruthy();
            expect(ex.initialCode).toContain('<svg');
            expect(ex.solution).toContain('<svg');
          });

          it('the solution passes its own checker (round-trip)', () => {
            const r = checkSolution(ex.solution, ex.solution);
            expect(r.ok, !r.ok ? r.reason : undefined).toBe(true);
          });

          it('the starter does NOT auto-pass the checker', () => {
            const r = checkSolution(ex.initialCode, ex.solution);
            expect(
              r.ok,
              `starter for ${ex.id} accidentally passes the checker — exercise has nothing to learn`
            ).toBe(false);
          });
        });
      }
    }
  }
});

describe('findModule / findLesson lookups', () => {
  const firstModule = modules[0];
  const firstLesson = firstModule.lessons[0];

  it('finds a known module', () => {
    expect(findModule(firstModule.id)?.id).toBe(firstModule.id);
  });

  it('returns undefined for an unknown module', () => {
    expect(findModule('does-not-exist')).toBeUndefined();
  });

  it('returns undefined for null/undefined module ids', () => {
    expect(findModule(null)).toBeUndefined();
    expect(findModule(undefined)).toBeUndefined();
  });

  it('finds a known lesson', () => {
    expect(findLesson(firstModule.id, firstLesson.id)?.id).toBe(firstLesson.id);
  });

  it('returns undefined when the module is wrong', () => {
    expect(findLesson('nope', firstLesson.id)).toBeUndefined();
  });

  it('returns undefined when the lesson is wrong', () => {
    expect(findLesson(firstModule.id, 'nope')).toBeUndefined();
  });
});
