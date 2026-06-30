'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MoutoIsotipo } from '@/components/ui/Logo';
import { NavHome, NavTaller, NavCaravana, NavPerfil, NavParque } from '@/components/icons/MoutoIcons';
import { authUtils } from '@/lib/auth';
import { DNA } from '@/lib/design/dna';
import type { User } from '@/types';

const AUTH_ROUTES = ['/acceso', '/onboarding'];

const NAV_ITEMS_LOGGED_OUT = [
  { id: 'home',     label: 'Inicio',   href: '/',         Icon: NavHome,     protected: false },
  { id: 'taller',   label: 'Taller',   href: '/taller',   Icon: NavTaller,   protected: false },
  { id: 'caravana', label: 'Caravana', href: '/caravana', Icon: NavCaravana, protected: false },
] as const;

const NAV_ITEMS_LOGGED_IN = [
  { id: 'home',     label: 'Inicio',    href: '/',         Icon: NavHome,     protected: false },
  { id: 'parque',   label: 'Mi Parque', href: '/parque',   Icon: NavParque,   protected: true  },
  { id: 'taller',   label: 'Taller',    href: '/taller',   Icon: NavTaller,   protected: false },
  { id: 'caravana', label: 'Caravana',  href: '/caravana', Icon: NavCaravana, protected: false },
  { id: 'perfil',   label: 'Perfil',    href: '/perfil',   Icon: NavPerfil,   protected: true  },
] as const;

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

export function Navigation() {
  const pathname = usePathname();
  const router   = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user,     setUser]     = useState<User | null>(null);

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
    setUser(authUtils.getUser());
  }, []);

  const isAuthRoute = AUTH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
  if (isAuthRoute) return null;

  const handleNav = (item: { href: string; protected: boolean }, e: React.MouseEvent) => {
    if (item.protected && !loggedIn) {
      e.preventDefault();
      router.push('/acceso');
    }
  };

  const navItems = loggedIn ? NAV_ITEMS_LOGGED_IN : NAV_ITEMS_LOGGED_OUT;
  const initials = user ? getInitials(user.name) : '';

  return (
    /* Floating capsule — two materials: carbon logo slot + glass nav items */
    <nav
      className="fixed z-50"
      style={{
        bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: DNA.radius.nav,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: DNA.shadow.float,
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      {/* Logo slot — solid carbon, actúa como botón Home */}
      <Link
        href="/"
        style={{
          background: '#111111',
          padding: '7px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-label="Inicio"
      >
        <MoutoIsotipo size={26} transparent />
      </Link>

      {/* Divider */}
      <div style={{ width: 1, background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />

      {/* Glass portion — nav items */}
      <div
        style={{
          background: 'rgba(28,28,30,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          padding: '7px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNav(item, e)}
              className="nav-item-tap flex flex-col items-center"
              style={{ gap: 2 }}
            >
              <item.Icon
                size={24}
                style={{ color: isActive ? '#0A84FF' : '#8E8E93', transition: 'color 150ms' }}
              />
              <span
                style={{
                  display: 'block',
                  width: 3, height: 3,
                  borderRadius: '50%',
                  background: '#C8F135',
                  boxShadow: isActive ? DNA.shadow.volt : 'none',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 200ms',
                }}
              />
              <span
                style={{
                  fontFamily: cabinet,
                  fontSize: 9, fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: isActive ? '#0A84FF' : '#8E8E93',
                  transition: 'color 150ms',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Únete pill — solo cuando no está logueado */}
        {!loggedIn && (
          <>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
            <Link href="/acceso">
              <div
                style={{
                  background: '#C8F135',
                  color: '#111111',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontFamily: cabinet,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
                Únete
              </div>
            </Link>
          </>
        )}

        {/* Avatar cuando está logueado */}
        {loggedIn && (
          <>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
            <div
              className="flex items-center justify-center"
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(10,132,255,0.15)',
                border: '1.5px solid rgba(10,132,255,0.35)',
              }}
            >
              <span style={{ fontFamily: cabinet, fontSize: 10, fontWeight: 600, color: '#0A84FF' }}>
                {initials}
              </span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
