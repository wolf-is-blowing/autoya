'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import { NavHome, NavParque, NavTaller, NavCaravana, NavPerfil } from '@/components/icons/MoutoIcons';
import { DNA } from '@/lib/design/dna';

const NAV_ITEMS = [
  { id: 'home',     label: 'Inicio',    href: '/',         Icon: NavHome,     protected: false },
  { id: 'parque',   label: 'Mi Parque', href: '/parque',   Icon: NavParque,   protected: true  },
  { id: 'taller',   label: 'Taller',    href: '/taller',   Icon: NavTaller,   protected: false },
  { id: 'caravana', label: 'Caravana',  href: '/caravana', Icon: NavCaravana, protected: false },
  { id: 'perfil',   label: 'Perfil',    href: '/perfil',   Icon: NavPerfil,   protected: true  },
] as const;

const AUTH_ROUTES = ['/acceso', '/onboarding'];

export function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
  }, []);

  const isAuthRoute = AUTH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
  if (isAuthRoute) return null;

  const handleNav = (item: (typeof NAV_ITEMS)[number], e: React.MouseEvent) => {
    if (item.protected && !loggedIn) {
      e.preventDefault();
      router.push('/acceso');
    }
  };

  return (
    <nav
      className="fixed z-50 glass-nav"
      style={{
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        minWidth: 320,
        maxWidth: 'calc(100vw - 48px)',
        borderRadius: DNA.radius.nav,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: DNA.shadow.float,
        padding: '10px 24px',
      }}
    >
      <div className="flex items-center" style={{ gap: 32 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNav(item, e)}
              className="nav-item-tap flex flex-col items-center"
              style={{ gap: 3 }}
            >
              <item.Icon
                size={24}
                style={{ color: isActive ? '#0A84FF' : '#8E8E93', transition: 'color 150ms' }}
              />
              <span
                style={{
                  display: 'block',
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: '#C8F135',
                  boxShadow: isActive ? DNA.shadow.volt : 'none',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 200ms',
                }}
              />
              <span
                style={{
                  fontFamily: "'Cabinet Grotesk', system-ui",
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: isActive ? '#0A84FF' : '#8E8E93',
                  transition: 'color 150ms',
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
