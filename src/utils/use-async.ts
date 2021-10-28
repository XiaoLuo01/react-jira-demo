import { useMountedRef } from './index';
import { useState } from 'react';

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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data: data,
      stat: 'success',
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      stat: 'error',
      error,
    });

  // run 用来触发用户请求
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 的数据类型');
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({ ...state, stat: 'loading' });
    return promise
      .then(data => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch(error => {
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

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
