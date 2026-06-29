import type { Metadata } from 'next';
import './globals.css';
import { Header }      from '@/components/layout/Header';
import { BottomNav }   from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: 'Mouto – Everything a driver needs.',
  description: 'Tu vida como conductor, en un solo lugar. Encuentra tu auto, agenda servicios y conéctate con tu comunidad.',
  keywords: ['autos', 'conductores', 'servicios automotrices', 'mouto'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <head>
        {/* Fontshare — Clash Display + Cabinet Grotesk */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=cabinet-grotesk@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
