import { Montserrat } from 'next/font/google';

import './globals.css';

import type { Metadata } from 'next';

const font = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  icons: '/credit.png',
  title: 'Calculadora de crédito',
  description:
    '¿Quieres saber cuanto debes pagar por un credito para vivienda? Con esta calculadora podras saber todo lo que involucra un crédito hipotecario.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
