import Link from 'next/link';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const POINTS = [
  { icon: '✓', text: 'Compara opciones verificadas' },
  { icon: '✓', text: 'Agenda test drives reales' },
  { icon: '✓', text: 'Financiamiento sin letra pequeña' },
];

export function NoCarSection() {
  return (
    <section
      className="max-w-7xl mx-auto px-5 md:px-8 section-padding"
      style={{ marginBottom: DNA.spacing.sectionGap, backgroundColor: '#111111' }}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">

        {/* Image — left on desktop */}
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
            src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80&auto=format"
            alt=""
            aria-hidden
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="absolute inset-0 grad-cinematic" />
        </div>

        {/* Content — right on desktop */}
        <div className="flex flex-col gap-5 flex-1">
          <p
            style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
            }}
          >
            Para quienes buscan
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
            Encuentra el auto correcto, sin adivinar.
          </h2>

          <ul className="flex flex-col gap-3">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-3">
                <span
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(200,241,53,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 11, color: '#C8F135', fontWeight: 700 }}>{p.icon}</span>
                </span>
                <span style={{ fontFamily: cabinet, fontSize: 15, color: '#8E8E93', lineHeight: 1.4 }}>
                  {p.text}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/taller?tab=busqueda" className="self-start mt-2">
            <div className="btn-hero" style={{ fontFamily: cabinet }}>
              Empezar búsqueda
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
