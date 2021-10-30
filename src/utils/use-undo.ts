import { useState } from 'react';

export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [futrue, setFutrue] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = futrue.length !== 0;

  const undo = () => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setPresent(previous);
    setFutrue([present, ...futrue]);
  };

  const redo = () => {
    if (!canRedo) return;

    const next = futrue[0];
    const newFutrue = futrue.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFutrue(newFutrue);
  };

  const set = (newPresent: T) => {
    if (newPresent === present) return;

    setPast([...past, present]);
    setPresent(newPresent);
    setFutrue([]);
  };

  const reset = (newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFutrue([]);
  };

  return [
    { past, present, futrue },
    { set, undo, redo, reset },
  ] as const;
};
