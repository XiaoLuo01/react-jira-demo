import { useMountedRef } from './index';
import { useCallback, useReducer, useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle',
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef]);
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState,
  });
  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    safeDispatch({
      data: data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    safeDispatch({
      data: null,
      stat: 'error',
      error,
    });

  // run 用来触发用户请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 的数据类型');
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ stat: 'loading' });
      return promise
        .then(data => {
          setData(data);
          return data;
        })
        .catch(error => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, state]
  );

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    ...state,
    setData,
    setError,
    run,
    retry,
  };
};
