import { useState } from 'react';

/** Returns a value computed once on the first render. */
export const useConstant = <T>(initializer: T | (() => T)): T => useState(initializer)[0];
