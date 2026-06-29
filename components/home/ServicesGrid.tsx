import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { ServiceIcon, IconArrowRight } from '@/components/icons';

const SERVICE_IMAGES: Record<string, string> = {
  mantenimiento: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80',
  lavado:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  tapiceria:     'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80',
  styling:       'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?w=600&q=80',
  audio:         'https://images.unsplash.com/photo-1608665343022-2ca1d0a05c07?w=600&q=80',
  exterior:      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80',
  performance:   'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=600&q=80',
};

export function ServicesGrid() {
  const bebas = "var(--font-bebas), 'Bebas Neue', sans-serif";
  const dm    = "var(--font-dm-sans), sans-serif";

  const featured  = SERVICES.find((s) => s.featured)!;
  const secondary = SERVICES.filter((s) => !s.featured);

  return (
    <section id="servicios" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-muted mb-1 uppercase tracking-[0.12em]"
          style={{ fontFamily: dm, fontSize: 11 }}
        >
          Servicios
        </p>
        <h2 style={{ fontFamily: bebas, fontSize: 36, letterSpacing: '0.02em', color: '#F0F0F0' }}>
          Todo para tu auto
        </h2>
      </div>

      {/* Grid: 2 cols mobile / 4 cols desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {/* Featured — volt bg, spans 2 cols */}
        <Link href="/taller?tab=busqueda" className="col-span-2 group">
          <div
            className="relative h-44 md:h-52 flex flex-col justify-between p-5 overflow-hidden transition-all duration-200 group-hover:brightness-110"
            style={{ background: '#00FFB2' }}
          >
            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 8px)',
              }}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.12)' }}
              >
                <ServiceIcon iconKey={featured.iconKey} size={20} className="text-base" />
              </div>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-1"
                style={{ fontFamily: dm, background: 'rgba(0,0,0,0.12)', color: '#0A0A0F' }}
              >
                Destacado
              </span>
            </div>

            <div className="relative z-10">
              <h3
                className="leading-none mb-1"
                style={{ fontFamily: bebas, fontSize: 28, color: '#0A0A0F', letterSpacing: '0.02em' }}
              >
                {featured.name}
              </h3>
              <p style={{ fontFamily: dm, fontSize: 12, color: 'rgba(10,10,15,0.7)', lineHeight: 1.5 }}>
                {featured.description}
              </p>
              <div
                className="flex items-center gap-1.5 mt-3 font-semibold uppercase tracking-[0.06em] group-hover:gap-3 transition-all"
                style={{ fontFamily: dm, fontSize: 11, color: '#0A0A0F' }}
              >
                Empezar <IconArrowRight size={14} />
              </div>
            </div>
          </div>
        </Link>

        {/* Secondary service cards */}
        {secondary.map((service) => (
          <Link key={service.id} href={`/taller/${service.id}`} className="group">
            <div
              className="relative h-40 md:h-52 flex flex-col justify-between p-4 overflow-hidden transition-all duration-200 volt-glow"
              style={{
                background: '#1A1A2E',
                borderTop: '2px solid #00FFB2',
              }}
            >
              {/* Background image dim */}
              {SERVICE_IMAGES[service.id] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={SERVICE_IMAGES[service.id]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.08 }}
                />
              )}

              <div className="relative z-10">
                <div
                  className="w-8 h-8 flex items-center justify-center mb-3"
                  style={{ background: 'rgba(0,255,178,0.1)', color: '#00FFB2' }}
                >
                  <ServiceIcon iconKey={service.iconKey} size={16} />
                </div>
                <h3
                  className="text-snow leading-tight"
                  style={{ fontFamily: bebas, fontSize: 18, letterSpacing: '0.03em' }}
                >
                  {service.name}
                </h3>
              </div>

              {service.priceFrom && (
                <div className="relative z-10">
                  <span
                    style={{ fontFamily: dm, fontSize: 11, color: '#6B6B7A', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    Desde{' '}
                  </span>
                  <span
                    style={{ fontFamily: bebas, fontSize: 18, color: '#00FFB2', letterSpacing: '0.02em' }}
                  >
                    S/{service.priceFrom}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
