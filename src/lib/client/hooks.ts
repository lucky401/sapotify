import {useMemo, useCallback, useState} from 'react';

export type Status = 'idle' | 'fetching' | 'resolved' | 'rejected';

export const useAsync = <T, P>(
  asyncFunction: (arg?: P) => Promise<T>,
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (arg?: P) => Promise<any>;
  status: Status;
  value: T | null;
  errorMessage: string;
} => {
  const [status, setStatus] = useState<Status>('idle');
  const [value, setValue] = useState<T | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any | null>(null);

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response && error.response.data) {
        return error.response.data.message;
      }
      return 'Something error';
    }
    return null;
  }, [error]);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(
    arg => {
      setStatus('fetching');
      setValue(null);
      setError(null);
      return asyncFunction(arg)
        .then(response => {
          setValue(response);
          setStatus('resolved');
          return response;
        })
        .catch(err => {
          setError(err);
          setStatus('rejected');
          Promise.reject(err);
        });
    },
    [asyncFunction],
  );

  return {execute, status, value, errorMessage};
};
