'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconSearch, IconBell, NavHome, NavParque, NavTaller, NavCaravana, NavPerfil } from '@/components/icons/MoutoIcons';
import { authUtils } from '@/lib/auth';
import { DNA } from '@/lib/design/dna';
import type { User } from '@/types';

const AUTH_ROUTES = ['/acceso', '/onboarding'];

const NAV_LINKS = [
  { label: 'Encuentra tu auto', href: '/taller?tab=busqueda' },
  { label: 'Servicios',         href: '/taller'               },
  { label: 'Caravanas',         href: '/caravana'             },
];

const NAV_ITEMS = [
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
  const [scrollY,   setScrollY]   = useState(0);
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [user,      setUser]      = useState<User | null>(null);

  useEffect(() => {
    const refresh = () => {
      setLoggedIn(authUtils.isLoggedIn());
      setUser(authUtils.getUser());
    };
    refresh();
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAuthRoute = AUTH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
  if (isAuthRoute) return null;

  const isHome     = pathname === '/';
  const isExpanded = isHome && scrollY < 100;

  const handleNav = (item: (typeof NAV_ITEMS)[number], e: React.MouseEvent) => {
    if (item.protected && !loggedIn) {
      e.preventDefault();
      router.push('/acceso');
    }
  };

  const handleLogout = () => {
    authUtils.logout();
    setLoggedIn(false);
    setUser(null);
  };

  const initials = user ? getInitials(user.name) : '';

  const transition = `opacity ${DNA.duration.base} ${DNA.easing.out}`;

  return (
    <>
      {/* ── EXPANDED — transparent header at top (Home only, scrollY < 100) ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          opacity: isExpanded ? 1 : 0,
          pointerEvents: isExpanded ? 'auto' : 'none',
          transition,
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[60px] flex items-center gap-4">

          <Link href="/" className="flex-shrink-0">
            <span className="hidden sm:block"><Logo variant="full" size="sm" /></span>
            <span className="sm:hidden"><Logo variant="icon" size="sm" /></span>
          </Link>

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

          <div className="flex items-center gap-2">
            <Link href="/taller?tab=busqueda" className="text-muted hover:text-ivory transition-colors p-2">
              <IconSearch size={24} />
            </Link>

            {loggedIn && (
              <button className="text-muted hover:text-ivory transition-colors p-2">
                <IconBell size={24} />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-3 ml-1">
              {loggedIn ? (
                <>
                  <Link href="/perfil">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
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
                  <Link href="/acceso"><Button variant="ghost" size="sm">Entrar</Button></Link>
                  <Link href="/acceso"><Button variant="volt" size="sm">Únete</Button></Link>
                </>
              )}
            </div>

            <div className="sm:hidden">
              {loggedIn ? (
                <Link href="/perfil">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
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
                <Link href="/acceso"><Button variant="volt" size="sm">Únete</Button></Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── COLLAPSED — floating capsule at bottom ── */}
      <nav
        className="fixed z-50 glass-nav"
        style={{
          bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'fit-content',
          minWidth: 340,
          maxWidth: 'calc(100vw - 32px)',
          borderRadius: DNA.radius.nav,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: DNA.shadow.float,
          padding: '10px 18px',
          opacity: isExpanded ? 0 : 1,
          pointerEvents: isExpanded ? 'none' : 'auto',
          transition,
        }}
      >
        <div className="flex items-center" style={{ gap: 18 }}>

          {/* Logo — home button */}
          <Link href="/" className="flex-shrink-0" aria-label="Inicio">
            <Logo variant="icon" size="sm" />
          </Link>

          {/* Vertical divider */}
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />

          {/* Nav items */}
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
                  size={26}
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
                    fontSize: 10, fontWeight: 500,
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
    </>
  );
}
