'use client';

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('polpo/styles');
}

export default function ProdOnlyCSS() {
  return null;
}
