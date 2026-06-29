import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';
import { Header }    from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AutoYa – La plataforma del conductor peruano',
  description: 'Descubre, evalúa y compra tu auto ideal. Agenda servicios y conéctate con la comunidad más grande del Perú.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
