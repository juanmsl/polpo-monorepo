import { useMemo } from 'react';

export const useClassNames = (classes: Record<string, boolean>): string =>
  useMemo<string>(
    () =>
      Object.entries(classes)
        .reduce<Array<string>>(
          (compiledClassNames, [classname, value]) => (value ? [...compiledClassNames, classname] : compiledClassNames),
          [],
        )
        .join(' '),
    [classes],
  );
