import { useEffect, useState } from 'react';

import { useEventListener } from './use-event-listener';

enum ScreenOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

type UseViewportData = {
  width: number;
  height: number;
  orientation: ScreenOrientation;
};

export const useViewport = (): UseViewportData => {
  const getData = (): UseViewportData => {
    const { innerWidth, innerHeight } = window;

    return {
      width: innerWidth,
      height: innerHeight,
      orientation: innerWidth > innerHeight ? ScreenOrientation.LANDSCAPE : ScreenOrientation.PORTRAIT,
    };
  };

  const [data, setData] = useState<UseViewportData>(getData);

  useEventListener('resize', () => {
    setData(getData());
  });

  useEffect(() => {
    setData(getData());
  }, []);

  return data;
};
