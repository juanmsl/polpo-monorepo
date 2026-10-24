import { useMemo } from 'react';

/** Builds a className string from a `{ className: condition }` map. */
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
