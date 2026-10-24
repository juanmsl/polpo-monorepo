import { useState } from 'react';

import { useEventListener } from './use-event-listener';

/** Returns whether the browser is online. */
export const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEventListener('online', () => setOnline(navigator.onLine));
  useEventListener('offline', () => setOnline(navigator.onLine));

  return online;
};
