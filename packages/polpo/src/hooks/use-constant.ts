import { useState } from 'react';

export const useConstant = <T>(initializer: T | (() => T)): T => useState(initializer)[0];
