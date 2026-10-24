import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges class names with `clsx` and resolves Tailwind conflicts with `tailwind-merge`. */
export const cn = (...inputs: Array<ClassValue>) => {
  return twMerge(clsx(inputs));
};
