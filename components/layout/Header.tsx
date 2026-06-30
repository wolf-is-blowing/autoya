'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo }   from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconSearch, IconBell } from '@/components/icons/MoutoIcons';
import { authUtils } from '@/lib/auth';

const NAV_LINKS = [
  { label: 'Encuentra tu auto', href: '/taller?tab=busqueda' },
  { label: 'Servicios',         href: '/taller'               },
  { label: 'Caravanas',         href: '/caravana'             },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[60px] flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="hidden sm:block"><Logo variant="full" size="sm" /></span>
          <span className="sm:hidden"><Logo variant="icon" size="sm" /></span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted hover:text-ivory transition-colors px-3 py-2"
              style={{ fontFamily: "'Cabinet Grotesk', system-ui", fontSize: 13, fontWeight: 500 }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right icons + auth */}
        <div className="flex items-center gap-2">
          <Link
            href="/taller?tab=busqueda"
            className="text-muted hover:text-ivory transition-colors p-2"
          >
            <IconSearch size={20} />
          </Link>

          {loggedIn && (
            <button className="text-muted hover:text-ivory transition-colors p-2">
              <IconBell size={20} />
            </button>
          )}

          {/* Desktop auth */}
          <div className="hidden sm:flex items-center gap-2 ml-1">
            {loggedIn ? (
              <button
                onClick={toggleAuth}
                className="text-muted hover:text-ivory transition-colors"
                style={{ fontFamily: "'Cabinet Grotesk', system-ui", fontSize: 13 }}
              >
                Salir
              </button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={toggleAuth}>Entrar</Button>
                <Button variant="volt"  size="sm" onClick={toggleAuth}>Únete</Button>
              </>
            )}
          </div>

          {/* Mobile auth */}
          <div className="sm:hidden">
            {!loggedIn && (
              <Button variant="volt" size="sm" onClick={toggleAuth}>Únete</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
