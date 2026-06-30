import Link from 'next/link';
import { MoutoIsotipo } from '@/components/ui/Logo';

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";
const clash   = "'Clash Display', system-ui, sans-serif";

const SOCIAL = [
  { name: 'Instagram', slug: 'instagram', href: 'https://instagram.com' },
  { name: 'TikTok',   slug: 'tiktok',    href: 'https://tiktok.com'    },
  { name: 'YouTube',  slug: 'youtube',   href: 'https://youtube.com'   },
];

const COLS = [
  {
    title: 'Producto',
    links: [
      { label: 'Encontrar auto',  href: '/taller?tab=busqueda' },
      { label: 'Taller',         href: '/taller'               },
      { label: 'Mi Parque',      href: '/parque'               },
      { label: 'Caravana',       href: '/caravana'             },
      { label: 'Atelier (Beta)', href: '/atelier'              },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Sobre Mouto',    href: '/sobre-nosotros' },
      { label: 'Cómo funciona',  href: '/como-funciona'  },
      { label: 'Contacto',       href: '/contacto'        },
      { label: 'Blog',           href: '/blog'            },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos',       href: '/terminos'        },
      { label: 'Privacidad',     href: '/privacidad'      },
      { label: 'Cookies',        href: '/cookies'         },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 64,
        paddingBottom: 120, /* leaves room above floating nav */
        background: '#111111',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <MoutoIsotipo size={32} />
              <span style={{ fontFamily: cabinet, fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>
                <span style={{ color: '#F5F0E8' }}>mout</span>
                <span style={{ color: '#0A84FF' }}>o</span>
              </span>
            </div>
            <p
              style={{
                fontFamily: cabinet,
                fontSize: 13,
                color: '#8E8E93',
                lineHeight: 1.6,
                maxWidth: 220,
              }}
            >
              El sistema operativo para la vida de un conductor.
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.slug}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    background: '#1C1C1E',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 200ms, background 200ms',
                  }}
                  className="hover:border-electric/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${s.slug}/8E8E93`}
                    alt={s.name}
                    width={14}
                    height={14}
                    style={{ objectFit: 'contain' }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2–4 — Links */}
          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p
                style={{
                  fontFamily: cabinet,
                  fontSize: 11, fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                  color: '#F5F0E8',
                  marginBottom: 16,
                }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      style={{
                        fontFamily: cabinet,
                        fontSize: 14,
                        color: '#8E8E93',
                        transition: 'color 150ms',
                      }}
                      className="hover:text-ivory"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            marginTop: 48,
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
            © 2026 Mouto. Todos los derechos reservados.
          </p>
          <span
            style={{
              fontFamily: cabinet,
              fontSize: 12,
              color: '#8E8E93',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            🇵🇪 Perú
          </span>
        </div>
      </div>
    </footer>
  );
}
