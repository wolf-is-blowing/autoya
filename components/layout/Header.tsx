'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo }   from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { authUtils } from '@/lib/auth';

const NAV_LINKS = [
  { label: 'Encuentra tu auto', href: '/taller?tab=busqueda' },
  { label: 'Servicios',         href: '/taller' },
  { label: 'Caravanas',         href: '/caravana' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleAuth = () => setLoggedIn(authUtils.toggle());

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[60px] flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {/* Desktop: full logo | Mobile: icon only */}
          <span className="hidden sm:block"><Logo variant="full" size="sm" /></span>
          <span className="sm:hidden"><Logo variant="icon" size="sm" /></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="type-label text-muted hover:text-ivory transition-colors px-3 py-2 normal-case tracking-normal"
              style={{
                fontFamily: "'Cabinet Grotesk', system-ui",
                fontSize: 13,
                fontWeight: 500,
                textTransform: 'none',
                letterSpacing: 0,
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Auth — desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {loggedIn ? (
            <button
              onClick={toggleAuth}
              className="text-muted hover:text-ivory transition-colors"
              style={{ fontFamily: "'Cabinet Grotesk', system-ui", fontSize: 13 }}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={toggleAuth}>
                Entrar
              </Button>
              <Button variant="primary" size="sm" onClick={toggleAuth}>
                Únete
              </Button>
            </>
          )}
        </div>

        {/* Auth — mobile */}
        <div className="sm:hidden">
          {loggedIn ? (
            <button
              onClick={toggleAuth}
              className="text-muted hover:text-ivory transition-colors text-xs"
              style={{ fontFamily: "'Cabinet Grotesk', system-ui" }}
            >
              Salir
            </button>
          ) : (
            <Button variant="volt" size="sm" onClick={toggleAuth}>
              Únete
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
