import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { ServiceIcon } from '@/components/icons';

const SERVICE_IMAGES: Record<string, string> = {
  mantenimiento: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=85&auto=format',
  lavado:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format',
  tapiceria:     'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=85&auto=format',
  styling:       'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?w=800&q=85&auto=format',
  audio:         'https://images.unsplash.com/photo-1608665343022-2ca1d0a05c07?w=800&q=85&auto=format',
  exterior:      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=85&auto=format',
  performance:   'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=85&auto=format',
};

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function ServicesGrid() {
  const featured  = SERVICES.find((s) => s.featured)!;
  const secondary = SERVICES.filter((s) => !s.featured);

  return (
    <section id="servicios" className="py-16 px-5 md:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-7">
        <p
          className="text-muted mb-2 uppercase tracking-[0.1em]"
          style={{ fontFamily: cabinet, fontSize: 11 }}
        >
          Servicios
        </p>
        <h2
          className="text-ivory"
          style={{ fontFamily: clash, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          Todo para tu auto
        </h2>
      </div>

      {/* Grid: 2 cols mobile / 4 cols desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {/* ── Card destacada — electric bg + imagen superpuesta ── */}
        <Link href="/taller?tab=busqueda" className="col-span-2 group">
          <div
            className="relative overflow-hidden rounded-[20px] h-52 md:h-64 card-hover"
            style={{ background: '#0A84FF' }}
          >
            {/* Car image at 20% opacity */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&auto=format"
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.18, mixBlendMode: 'luminosity' }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.15)' }}
              >
                <ServiceIcon iconKey={featured.iconKey} size={20} className="text-carbon" />
              </div>

              <div>
                <h3
                  className="text-carbon leading-tight mb-1"
                  style={{ fontFamily: clash, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, letterSpacing: '-0.01em' }}
                >
                  {featured.name}
                </h3>
                <p
                  className="mb-4"
                  style={{ fontFamily: cabinet, fontSize: 13, color: 'rgba(17,17,17,0.65)', lineHeight: 1.5 }}
                >
                  {featured.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                  style={{ fontFamily: cabinet, fontSize: 13, fontWeight: 600, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  Empezar <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* ── Cards secundarias — cinematic ── */}
        {secondary.map((service) => (
          <Link key={service.id} href={`/taller/${service.id}`} className="group">
            <div className="relative overflow-hidden rounded-[20px] h-48 md:h-64 card-hover">
              {/* Imagen de fondo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SERVICE_IMAGES[service.id] ?? 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=85&auto=format'}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradiente de carbon — unión imagen con fondo */}
              <div className="absolute inset-0 grad-cinematic" />

              {/* Contenido superpuesto al fondo */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3
                  className="text-ivory leading-tight mb-1"
                  style={{ fontFamily: cabinet, fontSize: 16, fontWeight: 600 }}
                >
                  {service.name}
                </h3>
                {service.priceFrom && (
                  <div style={{ fontFamily: cabinet, fontSize: 12 }}>
                    <span className="text-muted uppercase tracking-[0.06em]" style={{ fontSize: 10 }}>
                      Desde{' '}
                    </span>
                    <span
                      style={{ fontFamily: clash, fontSize: 18, fontWeight: 700, color: '#C8F135', letterSpacing: '-0.01em' }}
                    >
                      S/{service.priceFrom}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
