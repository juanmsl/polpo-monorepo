import { useState, useCallback } from 'react';

export type CookieOptions = {
  days?: number;
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

const generateCookieAttributes = (options: CookieOptions): string => {
  const parts: Array<string> = [];

  if (options.expires instanceof Date) {
    parts.push(`expires=${options.expires.toUTCString()}`);
  } else if (typeof options.days === 'number') {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    parts.push(`expires=${date.toUTCString()}`);
  }

  if (typeof options.maxAge === 'number') {
    parts.push(`max-age=${options.maxAge}`);
  }

  parts.push(`path=${options.path ?? '/'}`);

  if (options.domain) {
    parts.push(`domain=${options.domain}`);
  }

  if (options.secure) {
    parts.push('secure');
  }

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  return parts.length > 0 ? `; ${parts.join('; ')}` : '';
};

const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const encodedValue = encodeURIComponent(value);
  const attributes = generateCookieAttributes(options);
  document.cookie = `${name}=${encodedValue}${attributes}`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const nameEq = `${name}=`;
  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (const cookie of cookies) {
    const cookieTrimmed = cookie.trim();

    if (cookieTrimmed.indexOf(nameEq) === 0) {
      return decodeURIComponent(cookieTrimmed.substring(nameEq.length));
    }
  }

  return null;
};

const deleteCookie = (name: string, options: CookieOptions = {}) => {
  if (typeof document === 'undefined') {
    return;
  }

  // Ensure the same path/domain so that the deletion matches the existing cookie.
  setCookie(name, '', {
    ...options,
    days: -1,
  });
};

type UpdateCookie<T> = (value: T, overrideOptions?: CookieOptions) => void;
type RemoveCookie = () => void;

export const useCookie = <T = unknown>(
  cookieName: string,
  defaultValue?: T,
  options: CookieOptions = {},
): [T, UpdateCookie<T>, RemoveCookie] => {
  const [cookieValue, setCookieValue] = useState<T>(() => {
    const rawCookie = getCookie(cookieName);

    if (rawCookie !== null) {
      try {
        return JSON.parse(rawCookie) as T;
      } catch {
        return defaultValue as T;
      }
    }

    return defaultValue as T;
  });

  const updateCookie = useCallback<UpdateCookie<T>>(
    (value: T, overrideOptions: CookieOptions = {}) => {
      const mergedOptions = { ...options, ...overrideOptions };
      const stringValue = JSON.stringify(value);
      setCookie(cookieName, stringValue, mergedOptions);
      setCookieValue(value);
    },
    [cookieName, options],
  );

  const removeCookie = useCallback<RemoveCookie>(() => {
    deleteCookie(cookieName, options);
    setCookieValue(defaultValue as T);
  }, [cookieName, defaultValue, options]);

  return [cookieValue, updateCookie, removeCookie];
};
