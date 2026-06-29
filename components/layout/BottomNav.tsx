'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';

/* ──────────────────────────────────────────
   Mouto nav icons — formas geométricas puras
   ────────────────────────────────────────── */

function NavHorizon({ color }: { color: string }) {
  /* Home — horizonte de carretera: línea recta + curva suave encima */
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 17 Q12 7 22 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <line x1="2" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NavKey({ color }: { color: string }) {
  /* Mi Parque — llave de auto geométrica */
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7.5" cy="12" r="4" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="7.5" cy="12" r="1.8" fill={color} />
      <line x1="11.5" y1="12" x2="21.5" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17"   y1="12" x2="17"   y2="15"  stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="20.5" y1="12" x2="20.5" y2="15"  stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NavWrench({ color }: { color: string }) {
  /* Taller — llave inglesa simplificada */
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavConvoy({ color }: { color: string }) {
  /* Caravana — tres óvalos abstractos en fila */
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden>
      <rect x="0.9"  y="7.5" width="6"  height="5" rx="2.5" stroke={color} strokeWidth="1.7" />
      <rect x="10"   y="6.5" width="6"  height="7" rx="3"   stroke={color} strokeWidth="1.7" />
      <rect x="19.1" y="7.5" width="6"  height="5" rx="2.5" stroke={color} strokeWidth="1.7" />
    </svg>
  );
}

function NavHelmet({ color }: { color: string }) {
  /* Perfil — casco de piloto simplificado */
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 15 C4 9 7.5 4 12 4 C16.5 4 20 9 20 15"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"
      />
      <path
        d="M4 15 L4 17.5 C4 18.33 4.67 19 5.5 19 L18.5 19 C19.33 19 20 18.33 20 17.5 L20 15"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <path
        d="M7 14 L7 17.5 L15 17.5 L15 13"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'home',     label: 'Inicio',    href: '/',         Icon: NavHorizon,  protected: false },
  { id: 'parque',   label: 'Mi Parque', href: '/parque',   Icon: NavKey,      protected: true  },
  { id: 'taller',   label: 'Taller',    href: '/taller',   Icon: NavWrench,   protected: false },
  { id: 'caravana', label: 'Caravana',  href: '/caravana', Icon: NavConvoy,   protected: false },
  { id: 'perfil',   label: 'Perfil',    href: '/perfil',   Icon: NavHelmet,   protected: true  },
];

export function BottomNav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
  }, []);

  const handleNav = (item: (typeof NAV_ITEMS)[number], e: React.MouseEvent) => {
    if (item.protected && !loggedIn) {
      e.preventDefault();
      router.push('/acceso');
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-white/5"
      style={{ height: 72, paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-lg mx-auto h-full flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          const iconColor  = isActive ? '#0A84FF' : '#8E8E93';
          const labelColor = isActive ? '#0A84FF' : '#8E8E93';

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNav(item, e)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5"
            >
              <item.Icon color={iconColor} />

              {/* Volt dot — indicador de posición activa */}
              <span
                className="w-[3px] h-[3px] rounded-full transition-opacity duration-200"
                style={{
                  background: '#C8F135',
                  opacity: isActive ? 1 : 0,
                }}
              />

              <span
                className="text-[10px] font-medium tracking-wide"
                style={{
                  fontFamily: "'Cabinet Grotesk', system-ui",
                  color: labelColor,
                  marginTop: 1,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
