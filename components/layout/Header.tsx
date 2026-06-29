'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconSearch, IconMenu, IconUser } from '@/components/icons';
import { authUtils } from '@/lib/auth';

const NAV_LINKS = [
  { label: 'Encontrar mi auto', href: '/taller?tab=busqueda' },
  { label: 'Agendar servicio',  href: '/taller' },
  { label: 'Caravanas',         href: '/caravana' },
];

export function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [loggedIn, setLoggedIn]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggleAuth = () => {
    const next = authUtils.toggle();
    setLoggedIn(next);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm text-ghost hover:text-snow transition-colors rounded-lg hover:bg-elevated"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search conductor (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs ml-auto">
            <div className="relative w-full">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ghost" size={16} />
              <input
                type="text"
                placeholder="Código de conductor"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-elevated border border-rim text-snow text-sm pl-9 pr-4 py-2 rounded-xl placeholder:text-ghost focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-2 ml-3">
            {loggedIn ? (
              <button
                onClick={handleToggleAuth}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-elevated border border-rim hover:border-accent transition-colors"
              >
                <IconUser size={16} className="text-accent" />
                <span className="text-sm text-snow">Ivan M.</span>
              </button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleToggleAuth}>
                  Iniciar sesión
                </Button>
                <Button variant="primary" size="sm" onClick={handleToggleAuth}>
                  Crear cuenta
                </Button>
              </>
            )}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden ml-auto p-2 text-ghost hover:text-snow rounded-lg hover:bg-elevated transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <IconMenu size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass border-t border-rim">
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-snow hover:bg-elevated rounded-xl transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-rim my-2" />
              {loggedIn ? (
                <Button variant="ghost" size="md" fullWidth onClick={handleToggleAuth}>
                  Cerrar sesión
                </Button>
              ) : (
                <>
                  <Button variant="secondary" size="md" fullWidth onClick={handleToggleAuth}>
                    Iniciar sesión
                  </Button>
                  <Button variant="primary" size="md" fullWidth onClick={handleToggleAuth}>
                    Crear cuenta
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* DEV toggle - remove in production */}
      <button
        onClick={handleToggleAuth}
        className="fixed bottom-24 right-4 z-50 text-xs bg-elevated border border-rim text-ghost px-2 py-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
        title="Toggle auth (dev)"
      >
        {loggedIn ? '🔓 logout' : '🔐 login'}
      </button>
    </>
  );
}
