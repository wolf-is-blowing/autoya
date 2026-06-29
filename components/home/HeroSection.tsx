import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconArrowRight, IconChevronDown } from '@/components/icons';

const STATS = [
  { value: '2,400',  label: 'Autos disponibles' },
  { value: '850',    label: 'Servicios activos' },
  { value: '50',     label: 'Concesionarias' },
];

export function HeroSection() {
  const bebas = "var(--font-bebas), 'Bebas Neue', sans-serif";
  const dm    = "var(--font-dm-sans), sans-serif";

  return (
    <section className="relative min-h-dvh flex flex-col justify-end overflow-hidden">
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.45 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-gradient-left" />

      {/* Volt glow accent */}
      <div
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,178,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-20 md:pb-24 pt-32 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <p
            className="animate-fade-up text-xs font-medium uppercase tracking-[0.14em] text-muted mb-5"
            style={{ fontFamily: dm }}
          >
            La plataforma del conductor peruano
          </p>

          {/* Headline — Bebas Neue, massive */}
          <h1
            className="animate-fade-up delay-100 text-snow leading-none mb-6"
            style={{
              fontFamily: bebas,
              fontSize: 'clamp(60px, 9vw, 112px)',
              letterSpacing: '0.01em',
            }}
          >
            DESCUBRE.
            <br />
            EVALÚA.
            <br />
            <span style={{ color: '#00FFB2' }}>YA</span> ES TUYO.
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-200 text-muted mb-10 max-w-lg"
            style={{ fontFamily: dm, fontSize: 16, lineHeight: 1.65 }}
          >
            Encuentra tu auto ideal con concesionarias verificadas, agenda servicios
            y conéctate con la comunidad más grande de conductores del Perú.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 mb-14">
            <Link href="/taller?tab=busqueda">
              <Button variant="primary" size="lg">
                Encontrar mi auto
                <IconArrowRight size={16} />
              </Button>
            </Link>
            <Link href="#servicios">
              <Button variant="ghost" size="lg">
                Ver servicios
                <IconChevronDown size={16} />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-400 flex gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="leading-none mb-1"
                  style={{ fontFamily: bebas, fontSize: 40, color: '#00FFB2', letterSpacing: '0.02em' }}
                >
                  {s.value}+
                </div>
                <div
                  className="text-muted"
                  style={{ fontFamily: dm, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 right-6 flex flex-col items-center gap-1 opacity-30">
        <IconChevronDown className="text-snow" size={16} />
      </div>
    </section>
  );
}
