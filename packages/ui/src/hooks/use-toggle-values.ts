import { useCallback, useState } from 'react';

export const useToggleValues = <T>(values: Array<T>, defaultIndex: number = 0): [T, (index?: number) => void] => {
  const [index, setIndex] = useState(defaultIndex);

  const toggle = useCallback(
    (index?: number) => {
      setIndex(index !== undefined ? index : prev => (prev + 1) % values.length);
    },
    [values.length],
  );

  return [values[index], toggle];
};
