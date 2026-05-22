import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle, setValue];
};
