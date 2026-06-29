import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { IconArrowRight, IconChevronDown } from '@/components/icons';

const STATS = [
  { value: '2,400+', label: 'Autos disponibles' },
  { value: '850+',   label: 'Servicios activos' },
  { value: '50+',    label: 'Concesionarias' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85"
        alt="Auto deportivo en la noche"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/40 to-transparent" />

      {/* Accent glow */}
      <div
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00E5FF, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20 pt-32 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-fade-up">
            <Badge variant="accent" className="mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-glow-pulse" />
              La plataforma del conductor peruano
            </Badge>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            Descubre.{' '}
            <br className="hidden sm:block" />
            Evalúa.{' '}
            <br className="hidden sm:block" />
            <span className="text-accent">Ya</span> es tuyo.
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up delay-200 text-ghost text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            Encuentra tu auto ideal, agenda servicios y conéctate con la comunidad más grande de conductores del Perú.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/taller?tab=busqueda">
              <Button variant="primary" size="lg">
                Encontrar mi auto
                <IconArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#servicios">
              <Button variant="secondary" size="lg">
                Ver servicios
                <IconChevronDown size={18} />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-400 flex gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl md:text-3xl font-bold text-snow"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-ghost mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-ghost">Desliza</span>
        <IconChevronDown className="text-ghost animate-bounce" size={18} />
      </div>
    </section>
  );
}
