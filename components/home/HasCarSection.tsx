import Link from 'next/link';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const POINTS = [
  { icon: '✓', text: 'Agenda mantenimiento en un toque' },
  { icon: '✓', text: 'Únete a la comunidad de tu marca' },
  { icon: '✓', text: 'Historial completo de tu auto' },
];

export function HasCarSection() {
  return (
    <section
      className="max-w-7xl mx-auto px-5 md:px-8 section-padding"
      style={{ marginBottom: DNA.spacing.sectionGap, backgroundColor: '#111111' }}
    >
      <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center">

        {/* Image — right on desktop (row-reverse makes it second) */}
        <div
          className="w-full md:w-[45%] flex-shrink-0"
          style={{
            borderRadius: DNA.radius.card,
            overflow: 'hidden',
            aspectRatio: '4/3',
            position: 'relative',
            boxShadow: DNA.shadow.card,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80&auto=format"
            alt=""
            aria-hidden
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute inset-0 grad-cinematic" />
        </div>

        {/* Content — left on desktop */}
        <div className="flex flex-col gap-5 flex-1">
          <p
            style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
            }}
          >
            Para conductores activos
          </p>

          <h2
            style={{
              fontFamily: clash,
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#F5F0E8',
            }}
          >
            Tu auto, mejor cuidado.
          </h2>

          <ul className="flex flex-col gap-3">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                <span
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(10,132,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 11, color: '#0A84FF', fontWeight: 700 }}>{p.icon}</span>
                </span>
                <span style={{ fontFamily: cabinet, fontSize: 15, color: '#8E8E93', lineHeight: 1.4 }}>
                  {p.text}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/parque" className="self-start mt-2">
            <button
              style={{
                fontFamily: cabinet,
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '16px 32px',
                borderRadius: 14,
                background: 'transparent',
                border: '1.5px solid rgba(10,132,255,0.40)',
                color: '#0A84FF',
                cursor: 'pointer',
                transition: 'background 150ms, border-color 150ms',
              }}
            >
              Ver Mi Parque
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
