import { useState } from 'react';

import { useResizeObserver } from './use-resize-observer';

export const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useResizeObserver(ref, ([entry]) => {
    if ((entry?.borderBoxSize ?? [])[0]) {
      const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
      setDimensions({ width, height });
    } else if (entry.contentRect) {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    }
  });

  return dimensions;
};
