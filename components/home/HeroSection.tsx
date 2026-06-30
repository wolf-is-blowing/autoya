import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge }  from '@/components/ui/Badge';

const STATS = [
  { value: '2,400', label: 'Autos disponibles' },
  { value: '850',   label: 'Servicios activos'  },
  { value: '50',    label: 'Concesionarias'      },
];

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-end overflow-hidden">

      {/* Background image with zoom-out drift */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85&auto=format"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover hero-zoom"
        style={{ opacity: 0.5, objectPosition: 'center top' }}
      />

      {/* Cinematic gradient — fades to solid carbon */}
      <div className="absolute inset-0 grad-cinematic" />

      {/* Left-side atmosphere (desktop) */}
      <div className="absolute inset-0 grad-overlay-left hidden md:block" />

      {/* Electric glow — lower left */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 100%, rgba(10,132,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content — anchored to bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-20 md:pb-24">

        {/* Badge */}
        <div className="animate-fade-up mb-5">
          <Badge variant="volt">El lugar de los conductores</Badge>
        </div>

        {/* H1 — weight 500, editorial, not aggressive */}
        <h1
          className="animate-fade-up delay-100 mb-4"
          style={{ fontFamily: clash, fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.03em' }}
        >
          <span
            className="block text-ivory"
            style={{ fontSize: 'clamp(44px, 10vw, 72px)' }}
          >
            Todo lo que necesitas
          </span>
          <span
            className="block"
            style={{ fontSize: 'clamp(44px, 10vw, 72px)', color: '#0A84FF' }}
          >
            como conductor.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-200 text-muted mb-8 max-w-[420px]"
          style={{ fontFamily: cabinet, fontSize: 16, lineHeight: 1.6 }}
        >
          Descubre tu próximo auto, agenda servicios y conéctate con tu comunidad — todo en Mouto.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 mb-10">
          <Link href="/taller?tab=busqueda">
            <Button variant="volt" size="lg">Encuentra tu auto</Button>
          </Link>
          <Link href="#servicios">
            <Button variant="ghost" size="lg">Ver servicios ↓</Button>
          </Link>
        </div>

        {/* Stats row — separated by 1px surface-2 dividers */}
        <div className="animate-fade-up delay-400 flex items-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && (
                <div style={{ width: 1, height: 32, background: '#2C2C2E', flexShrink: 0 }} />
              )}
              <div className={`text-center ${i === 0 ? 'pr-6' : i === STATS.length - 1 ? 'pl-6' : 'px-6'}`}>
                <div
                  style={{
                    fontFamily: clash,
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 600,
                    color: '#C8F135',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                  }}
                >
                  {s.value}+
                </div>
                <div
                  style={{
                    fontFamily: cabinet,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#8E8E93',
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
