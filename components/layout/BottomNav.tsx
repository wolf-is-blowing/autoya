'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';

/* ── Automotive SVG icons ── */
function IconSteering({ active }: { active: boolean }) {
  const c = active ? '#00FFB2' : '#6B6B7A';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" fill={c} />
      <line x1="12" y1="9.8" x2="12" y2="3" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10.1" y1="10.9" x2="4.6" y2="19.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13.9" y1="10.9" x2="19.4" y2="19.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconKey({ active }: { active: boolean }) {
  const c = active ? '#00FFB2' : '#6B6B7A';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7.5" cy="12" r="4" stroke={c} strokeWidth="1.6" />
      <circle cx="7.5" cy="12" r="1.5" stroke={c} strokeWidth="1.2" />
      <line x1="11.5" y1="12" x2="21" y2="12" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="17"   y1="12" x2="17" y2="14.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20"   y1="12" x2="20" y2="14.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconWrench({ active }: { active: boolean }) {
  const c = active ? '#00FFB2' : '#6B6B7A';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke={c}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconConvoy({ active }: { active: boolean }) {
  const c = active ? '#00FFB2' : '#6B6B7A';
  return (
    <svg width="22" height="22" viewBox="0 0 26 18" fill="none" aria-hidden>
      {/* car 1 */}
      <rect x="14" y="5" width="11" height="6" rx="1" stroke={c} strokeWidth="1.4" />
      <path d="M15 5 L16.5 2.5 H22.5 L24 5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16.5" cy="11.5" r="1.4" stroke={c} strokeWidth="1.2" />
      <circle cx="23"   cy="11.5" r="1.4" stroke={c} strokeWidth="1.2" />
      {/* car 2 */}
      <rect x="2" y="6" width="9" height="5.5" rx="1" stroke={c} strokeWidth="1.4" />
      <path d="M3 6 L4.2 3.8 H9 L10.2 6" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4"  cy="12" r="1.3" stroke={c} strokeWidth="1.2" />
      <circle cx="9.5" cy="12" r="1.3" stroke={c} strokeWidth="1.2" />
      {/* motion lines */}
      <line x1="1" y1="8"  x2="-0.5" y2="8"  stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1" y1="10" x2="-0.5" y2="10" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconHelmet({ active }: { active: boolean }) {
  const c = active ? '#00FFB2' : '#6B6B7A';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* dome */}
      <path d="M4 14 C4 8.48 7.58 4 12 4 C16.42 4 20 8.48 20 14" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      {/* chin bar */}
      <path d="M4 14 L4 17 C4 17.55 4.45 18 5 18 L19 18 C19.55 18 20 17.55 20 17 L20 14" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* visor */}
      <path d="M6.5 12 L6.5 16 L15 16 L15 12" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* air vent */}
      <line x1="17" y1="10" x2="19" y2="10" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="17" y1="12" x2="19" y2="12" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: 'home',     label: 'Inicio',    href: '/',         Icon: IconSteering, protected: false },
  { id: 'parque',   label: 'Mi Parque', href: '/parque',   Icon: IconKey,      protected: true  },
  { id: 'taller',   label: 'Taller',    href: '/taller',   Icon: IconWrench,   protected: false },
  { id: 'caravana', label: 'Caravana',  href: '/caravana', Icon: IconConvoy,   protected: false },
  { id: 'perfil',   label: 'Perfil',    href: '/perfil',   Icon: IconHelmet,   protected: true  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();
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
      className="fixed bottom-0 left-0 right-0 z-40 bg-base border-t border-surface"
      style={{ height: 64, paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-lg mx-auto h-full flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNav(item, e)}
              className="flex-1 relative flex flex-col items-center justify-center gap-0.5 transition-opacity"
            >
              {/* Active top indicator */}
              {isActive && (
                <span className="absolute top-0 left-2 right-2 h-[2px] bg-volt" />
              )}

              <item.Icon active={isActive} />

              <span
                className="text-[10px] font-medium tracking-wide"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  color: isActive ? '#00FFB2' : '#6B6B7A',
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
