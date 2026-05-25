'use client';

import dynamic from 'next/dynamic';

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dynamic(() => import('polpo/styles'), { ssr: false });
}

export default function ProdOnlyCSS() {
  return null;
}
