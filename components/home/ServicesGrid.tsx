import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { ServiceIcon, IconArrowRight } from '@/components/icons';

const SERVICE_IMAGES: Record<string, string> = {
  mantenimiento: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80',
  lavado:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  tapiceria:     'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&q=80',
  styling:       'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?w=400&q=80',
  audio:         'https://images.unsplash.com/photo-1608665343022-2ca1d0a05c07?w=400&q=80',
  exterior:      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80',
  performance:   'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=400&q=80',
};

export function ServicesGrid() {
  const featured   = SERVICES.find((s) => s.featured)!;
  const secondary  = SERVICES.filter((s) => !s.featured);

  return (
    <section id="servicios" className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-1">
          Servicios
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold text-snow"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          Todo para tu auto
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured card — buscar auto */}
        <Link href="/taller?tab=busqueda" className="md:col-span-1 md:row-span-2 group">
          <div className="relative h-64 md:h-full min-h-64 rounded-2xl overflow-hidden bg-surface border border-accent/30 hover-glow transition-all duration-300">
            {/* Glowing accent background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-surface to-surface" />
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20"
              style={{ background: featured.accentColor }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${featured.accentColor}20`, color: featured.accentColor }}
                >
                  <ServiceIcon iconKey={featured.iconKey} size={24} />
                </div>
                <h3
                  className="text-2xl font-bold text-snow mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                  {featured.name}
                </h3>
                <p className="text-ghost text-sm leading-relaxed">{featured.description}</p>
              </div>

              <div className="flex items-center gap-2 text-accent text-sm font-semibold group-hover:gap-3 transition-all">
                Empezar búsqueda <IconArrowRight size={16} />
              </div>
            </div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl border border-accent/20 group-hover:border-accent/50 transition-colors duration-300" />
          </div>
        </Link>

        {/* Secondary service cards */}
        {secondary.map((service) => (
          <Link key={service.id} href={`/taller/${service.id}`} className="group">
            <div className="relative rounded-2xl overflow-hidden bg-surface border border-rim hover:border-rim/60 hover-glow transition-all duration-300 h-40 md:h-full">
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SERVICE_IMAGES[service.id] ?? 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80'}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
              />
              <div className="absolute inset-0 gradient-card-overlay" />

              <div className="relative z-10 h-full flex flex-col justify-between p-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${service.accentColor}25`, color: service.accentColor }}
                >
                  <ServiceIcon iconKey={service.iconKey} size={18} />
                </div>

                <div>
                  <h3
                    className="font-bold text-snow text-base mb-0.5"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                  >
                    {service.name}
                  </h3>
                  {service.priceFrom && (
                    <p className="text-xs text-ghost">
                      Desde{' '}
                      <span className="font-semibold" style={{ color: service.accentColor }}>
                        S/{service.priceFrom}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
