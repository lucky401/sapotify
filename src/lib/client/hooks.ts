import {useMemo, useCallback, useState} from 'react';

export type Status = 'idle' | 'fetching' | 'resolved' | 'rejected';

export const useAsync = <T, P>(
  asyncFunction: (arg?: P) => Promise<T>,
): {
  execute: (arg?: P) => Promise<void>;
  status: Status;
  value: T | null;
  errorMessage: string;
} => {
  const [status, setStatus] = useState<Status>('idle');
  const [value, setValue] = useState<T | null>(null);
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
        .then((response: any) => {
          setValue(response);
          setStatus('resolved');
        })
        .catch((err: any) => {
          setError(err);
          setStatus('rejected');
        });
    },
    [asyncFunction],
  );

  return {execute, status, value, errorMessage};
};
