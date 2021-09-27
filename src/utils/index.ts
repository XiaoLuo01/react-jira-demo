import { useEffect, useState } from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// eslint-disable-next-line @typescript-eslint/ban-types
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: unknown, delay: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
