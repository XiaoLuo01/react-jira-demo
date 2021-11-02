import { useCallback, useReducer } from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

type State<T> = {
  past: T[];
  present: T;
  futrue: T[];
};

type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET };

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, futrue } = state;
  const { newPresent } = action;

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        futrue: [present, ...futrue],
      };
    }

    case REDO: {
      if (futrue.length === 0) return state;

      const next = futrue[0];
      const newFutrue = futrue.slice(1);

      return {
        past: [...past, present],
        present: next,
        futrue: newFutrue,
      };
    }

    case SET: {
      if (newPresent === present) return state;

      return {
        past: [...past, present],
        present: newPresent,
        futrue: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        futrue: [],
      };
    }
  }
  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    futrue: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.futrue.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback((newPresent: T) => dispatch({ newPresent, type: SET }), []);

  const reset = useCallback((newPresent: T) => dispatch({ newPresent, type: RESET }), []);

  return [state, { set, undo, redo, reset }] as const;
};
