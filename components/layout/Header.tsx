'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo }   from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconSearch, IconMenu } from '@/components/icons';
import { authUtils } from '@/lib/auth';

const NAV_LINKS = [
  { label: 'Encontrar mi auto', href: '/taller?tab=busqueda' },
  { label: 'Agendar servicio',  href: '/taller' },
  { label: 'Caravanas',         href: '/caravana' },
];

export function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleAuth = () => setLoggedIn(authUtils.toggle());

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300
        ${scrolled
          ? 'glass border-surface'
          : 'bg-transparent border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 ml-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-xs font-medium uppercase tracking-[0.06em] text-muted hover:text-volt transition-colors"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search conductor (desktop) */}
        <div className="hidden lg:flex items-center relative">
          <IconSearch className="absolute left-3 text-muted" size={14} />
          <input
            type="text"
            placeholder="Código de conductor"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="bg-surface border border-rim text-snow text-xs pl-8 pr-4 py-2 w-44 placeholder:text-muted focus:outline-none focus:border-volt transition-colors"
            style={{ fontFamily: 'var(--font-dm-sans)', borderRadius: 0 }}
          />
        </div>

        {/* Auth — desktop */}
        <div className="hidden md:flex items-center gap-2">
          {loggedIn ? (
            <button
              onClick={toggleAuth}
              className="text-xs font-medium uppercase tracking-[0.06em] text-muted hover:text-volt transition-colors px-3 py-2"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={toggleAuth}>
                Iniciar sesión
              </Button>
              <Button variant="primary" size="sm" onClick={toggleAuth}>
                Crear cuenta
              </Button>
            </>
          )}
        </div>

        {/* Mobile: crear cuenta + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {!loggedIn && (
            <Button variant="primary" size="sm" onClick={toggleAuth}>
              Crear cuenta
            </Button>
          )}
          {loggedIn && (
            <button
              onClick={toggleAuth}
              className="text-xs text-volt font-medium uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Salir
            </button>
          )}
          <button
            className="p-2 text-muted hover:text-snow transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <IconMenu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-surface">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-muted hover:text-volt hover:bg-surface transition-colors"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
