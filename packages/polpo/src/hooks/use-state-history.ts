import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useStateHistory<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>, Array<T>];

function useStateHistory<T = undefined>(): [T | undefined, Dispatch<SetStateAction<T | undefined>>, Array<T>];

function useStateHistory<T = undefined>(
  initialState?: T | (() => T) | undefined,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, Array<T>] {
  const [state, setState] = useState<T | undefined>(initialState);
  const [history, setHistory] = useState<Array<T>>([]);

  useEffect(() => {
    if (state !== undefined) {
      setHistory(prevHistory => [...prevHistory, state]);
    }
  }, [state]);

  return [state, setState, history];
}

export { useStateHistory };
