'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo }   from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconSearch, IconBell } from '@/components/icons/MoutoIcons';
import { authUtils } from '@/lib/auth';
import type { User } from '@/types';

const AUTH_ROUTES = ['/acceso', '/onboarding'];

const NAV_LINKS = [
  { label: 'Encuentra tu auto', href: '/taller?tab=busqueda' },
  { label: 'Servicios',         href: '/taller'               },
  { label: 'Caravanas',         href: '/caravana'             },
];

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser]         = useState<User | null>(null);

  useEffect(() => {
    const refresh = () => {
      setLoggedIn(authUtils.isLoggedIn());
      setUser(authUtils.getUser());
    };
    refresh();
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide on auth/onboarding routes
  const isAuthRoute = AUTH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
  if (isAuthRoute) return null;

  const handleLogout = () => {
    authUtils.logout();
    setLoggedIn(false);
    setUser(null);
  };

  const initials = user ? getInitials(user.name) : '';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(17,17,17,0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[60px] flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="hidden sm:block"><Logo variant="full" size="sm" /></span>
          <span className="sm:hidden"><Logo variant="icon" size="sm" /></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted hover:text-ivory transition-colors px-3 py-2"
              style={{ fontFamily: cabinet, fontSize: 13, fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link href="/taller?tab=busqueda" className="text-muted hover:text-ivory transition-colors p-2">
            <IconSearch size={20} />
          </Link>

          {loggedIn && (
            <button className="text-muted hover:text-ivory transition-colors p-2">
              <IconBell size={20} />
            </button>
          )}

          {/* Desktop auth */}
          <div className="hidden sm:flex items-center gap-3 ml-1">
            {loggedIn ? (
              <>
                {/* Avatar */}
                <Link href="/perfil">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(10,132,255,0.15)',
                      border: '1.5px solid rgba(10,132,255,0.35)',
                    }}
                  >
                    <span style={{ fontFamily: cabinet, fontSize: 12, fontWeight: 600, color: '#0A84FF' }}>
                      {initials}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-muted hover:text-ivory transition-colors"
                  style={{ fontFamily: cabinet, fontSize: 13 }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/acceso">
                  <Button variant="ghost" size="sm">Entrar</Button>
                </Link>
                <Link href="/acceso">
                  <Button variant="volt" size="sm">Únete</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile auth */}
          <div className="sm:hidden">
            {loggedIn ? (
              <Link href="/perfil">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(10,132,255,0.15)',
                    border: '1.5px solid rgba(10,132,255,0.35)',
                  }}
                >
                  <span style={{ fontFamily: cabinet, fontSize: 12, fontWeight: 600, color: '#0A84FF' }}>
                    {initials}
                  </span>
                </div>
              </Link>
            ) : (
              <Link href="/acceso">
                <Button variant="volt" size="sm">Únete</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
