import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { MoutoIsotipo } from '@/components/ui/Logo';

const STATS = [
  { value: '2,400', label: 'Autos disponibles' },
  { value: '850',   label: 'Servicios activos'  },
  { value: '50',    label: 'Concesionarias'      },
];

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function HeroSection() {
  return (
    <section className="hero-fullbleed flex flex-col justify-end">

      {/* Background image — full-bleed, behind notch/Dynamic Island */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85&auto=format"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover hero-zoom"
        style={{ opacity: 0.5, objectPosition: 'center top' }}
      />
      <div className="absolute inset-0 grad-cinematic" />
      <div className="absolute inset-0 grad-overlay-left hidden md:block" />
      <div
        className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 100%, rgba(10,132,255,0.06) 0%, transparent 70%)' }}
      />

      {/* Logo + "Únete" overlay — anclado al hero, usa safe-area propio */}
      <div className="hero-header-overlay flex items-center justify-between z-20">
        <MoutoIsotipo size={32} transparent />
        <Link
          href="/acceso"
          style={{
            background: '#C8F135',
            color: '#111111',
            padding: '7px 16px',
            borderRadius: 9999,
            fontFamily: cabinet,
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Únete
        </Link>
      </div>

      {/* Content — paddingTop respeta safe-area + espacio visual suficiente */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 20px) + 80px)',
          paddingBottom: '48px',
        }}
      >
        <div className="animate-fade-up mb-5">
          <Badge variant="volt">El lugar de los conductores</Badge>
        </div>

        <h1
          className="animate-fade-up delay-100 mb-4"
          style={{ fontFamily: clash, fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em' }}
        >
          <span className="block text-ivory" style={{ fontSize: 'clamp(44px, 10vw, 72px)' }}>
            Todo lo que necesitas
          </span>
          <span className="block" style={{ fontSize: 'clamp(44px, 10vw, 72px)', color: '#0A84FF' }}>
            como conductor.
          </span>
        </h1>

        <p
          className="animate-fade-up delay-200 text-muted mb-7 max-w-[420px]"
          style={{ fontFamily: cabinet, fontSize: 16, lineHeight: 1.6 }}
        >
          Descubre tu próximo auto, agenda servicios y conéctate con tu comunidad — todo en Mouto.
        </p>

        <div className="animate-fade-up delay-300 flex items-center mb-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && (
                <div style={{ width: 1, height: 32, background: '#2C2C2E', flexShrink: 0 }} />
              )}
              <div className={i === 0 ? 'pr-6' : i === STATS.length - 1 ? 'pl-6' : 'px-6'}>
                <div style={{ fontFamily: clash, fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 600, color: '#C8F135', letterSpacing: '-0.01em', lineHeight: 1 }}>
                  {s.value}+
                </div>
                <div style={{ fontFamily: cabinet, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8E8E93', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-fade-up delay-400 flex flex-col items-start gap-4">
          <Link href="/taller?tab=busqueda" className="btn-hero" style={{ fontFamily: cabinet }}>
            Encuentra tu auto
          </Link>
          <Link
            href="#servicios"
            className="text-muted hover:text-ivory transition-colors"
            style={{ fontFamily: cabinet, fontSize: 14 }}
          >
            Ver servicios ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
