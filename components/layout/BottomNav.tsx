'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconSteeringWheel,
  IconGarage,
  IconWrench,
  IconConvoy,
  IconSpeedometer,
} from '@/components/icons';
import { authUtils } from '@/lib/auth';

const NAV_ITEMS = [
  { id: 'home',     label: 'Inicio',    href: '/',         Icon: IconSteeringWheel, protected: false },
  { id: 'parque',   label: 'Mi Parque', href: '/parque',   Icon: IconGarage,        protected: true  },
  { id: 'taller',   label: 'Taller',    href: '/taller',   Icon: IconWrench,        protected: false },
  { id: 'caravana', label: 'Caravana',  href: '/caravana', Icon: IconConvoy,        protected: false },
  { id: 'perfil',   label: 'Perfil',    href: '/perfil',   Icon: IconSpeedometer,   protected: true  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(authUtils.isLoggedIn());
    const onChange = () => setLoggedIn(authUtils.isLoggedIn());
    window.addEventListener('autoya:auth', onChange);
    return () => window.removeEventListener('autoya:auth', onChange);
  }, []);

  const handleNav = (item: (typeof NAV_ITEMS)[number], e: React.MouseEvent) => {
    if (item.protected && !loggedIn) {
      e.preventDefault();
      router.push('/acceso');
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-rim"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-lg mx-auto flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleNav(item, e)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-0.5 py-3 px-1
                transition-colors duration-200 group
                ${isActive ? 'text-accent' : 'text-ghost hover:text-snow'}
              `}
            >
              <item.Icon
                size={22}
                className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
              />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              {isActive && (
                <span className="absolute -top-0 w-6 h-0.5 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
