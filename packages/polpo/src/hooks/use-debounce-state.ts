import { useState } from 'react';

import { useDebounce } from './use-debounce';

export const useDebounceState = <T>(
  defaultValue: T,
  delay: number = 500,
): [T, T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(defaultValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, debouncedValue, setValue];
};
