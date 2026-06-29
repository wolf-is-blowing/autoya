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

      {/* ── Imagen de fondo ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=85&auto=format"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.55 }}
      />

      {/* ── Gradiente de abajo hacia arriba (oscurece el fondo) ── */}
      <div className="absolute inset-0 grad-cinematic" />

      {/* ── Gradiente lateral sutil (izquierda) ── */}
      <div className="absolute inset-0 grad-overlay-left hidden md:block" />

      {/* ── Glow electric sutil ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 100%, rgba(10,132,255,0.07) 0%, transparent 70%)' }}
      />

      {/* ── Contenido anclado al fondo ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pb-20 md:pb-24">

        {/* Stats — sobre el título */}
        <div className="animate-fade-up flex gap-8 md:gap-12 mb-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="leading-none mb-1"
                style={{ fontFamily: clash, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#C8F135', letterSpacing: '-0.01em' }}
              >
                {s.value}+
              </div>
              <div
                className="text-muted"
                style={{ fontFamily: cabinet, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tag */}
        <div className="animate-fade-up delay-100 mb-5">
          <Badge variant="volt">El lugar de los conductores</Badge>
        </div>

        {/* Título */}
        <h1 className="animate-fade-up delay-200 mb-4" style={{ fontFamily: clash, fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em' }}>
          <span
            className="block text-ivory"
            style={{ fontSize: 'clamp(44px, 7vw, 72px)' }}
          >
            Todo lo que necesitas
          </span>
          <span
            className="block"
            style={{ fontSize: 'clamp(44px, 7vw, 72px)', color: '#0A84FF' }}
          >
            como conductor.
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="animate-fade-up delay-300 text-muted mb-8 max-w-md"
          style={{ fontFamily: cabinet, fontSize: 16, lineHeight: 1.6 }}
        >
          Descubre tu próximo auto, agenda servicios y conéctate con tu comunidad — todo en Mouto.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3">
          <Link href="/taller?tab=busqueda">
            <Button variant="volt" size="lg">
              Encuentra tu auto
            </Button>
          </Link>
          <Link href="#servicios">
            <Button variant="ghost" size="lg">
              Ver servicios ↓
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
