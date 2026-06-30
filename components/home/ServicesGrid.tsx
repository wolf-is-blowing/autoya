/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import { ServiceIcon } from '@/components/icons/MoutoIcons';
import { FadeInView } from '@/components/ui/FadeInView';
import { DNA } from '@/lib/design/dna';

const SERVICE_IMAGES: Record<string, string> = {
  busqueda:      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&auto=format',
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
  const gridServices   = SERVICES.slice(0, 4);
  const sliderServices = SERVICES.slice(4);

  return (
    <section id="servicios" className="max-w-7xl mx-auto" style={{ paddingTop: 16, paddingBottom: 64 }}>

      {/* Section header */}
      <FadeInView className="px-5 md:px-8">
        <p
          className="text-muted mb-2 uppercase tracking-[0.1em]"
          style={{ fontFamily: cabinet, fontSize: 11 }}
        >
          Servicios
        </p>
        <h2
          className="text-ivory mb-7"
          style={{ fontFamily: clash, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em' }}
        >
          Todo para tu auto
        </h2>
      </FadeInView>

      {/* 2×2 grid — large cinematic cards */}
      <div className="grid grid-cols-2 gap-3 mb-3 px-5 md:px-8">
        {gridServices.map((service, i) => (
          <FadeInView key={service.id} delay={i * 80}>
            <Link href={service.featured ? '/taller?tab=busqueda' : `/taller/${service.id}`}>
              <div
                className="relative card-hover"
                style={{
                  height: 200,
                  clipPath: DNA.clipCard,
                  boxShadow: DNA.shadow.card,
                }}
              >
                <img
                  src={SERVICE_IMAGES[service.id]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: service.featured ? 0.18 : 1 }}
                />
                {service.featured ? (
                  <div className="absolute inset-0" style={{ background: '#0A84FF' }} />
                ) : (
                  <div className="absolute inset-0 grad-cinematic" />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <div
                    className="mb-2 flex items-center justify-center"
                    style={{
                      width: 32, height: 32,
                      borderRadius: DNA.radius.chip,
                      background: service.featured ? 'rgba(0,0,0,0.15)' : 'rgba(17,17,17,0.5)',
                      marginBottom: 8,
                    }}
                  >
                    <ServiceIcon
                      id={service.id}
                      size={16}
                      className={service.featured ? 'text-carbon' : 'text-ivory'}
                    />
                  </div>
                  <h3
                    style={{
                      fontFamily: clash,
                      fontSize: 'clamp(16px, 2.5vw, 20px)',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      color: service.featured ? '#111111' : '#F5F0E8',
                      marginBottom: 4,
                    }}
                  >
                    {service.name}
                  </h3>
                  {service.priceFrom && (
                    <div>
                      <span style={{ fontFamily: cabinet, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8E8E93' }}>Desde </span>
                      <span style={{ fontFamily: clash, fontSize: 16, fontWeight: 600, color: '#C8F135', letterSpacing: '-0.01em' }}>S/{service.priceFrom}</span>
                    </div>
                  )}
                  {service.featured && (
                    <div style={{ fontFamily: cabinet, fontSize: 12, fontWeight: 600, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Empezar →
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </FadeInView>
        ))}
      </div>

      {/* Horizontal slider — secondary services, fixed card widths, px padding on both ends */}
      <div
        className="flex gap-3 overflow-x-auto no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 4,
        }}
      >
        {sliderServices.map((service, i) => (
          /* Outer div: flex item with fixed width + snap align */
          <div key={service.id} style={{ width: 140, flexShrink: 0, scrollSnapAlign: 'start' }}>
            <FadeInView delay={i * 60}>
            <Link href={`/taller/${service.id}`}>
              <div
                className="relative card-hover"
                style={{
                  width: 140,
                  height: 160,
                  clipPath: DNA.clipCard,
                  boxShadow: DNA.shadow.card,
                }}
              >
                <img
                  src={SERVICE_IMAGES[service.id]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 grad-cinematic" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <h3
                    style={{
                      fontFamily: clash,
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      color: '#F5F0E8',
                      lineHeight: 1.2,
                      marginBottom: service.priceFrom ? 2 : 0,
                    }}
                  >
                    {service.name}
                  </h3>
                  {service.priceFrom && (
                    <span style={{ fontFamily: clash, fontSize: 14, fontWeight: 600, color: '#C8F135', letterSpacing: '-0.01em' }}>
                      S/{service.priceFrom}
                    </span>
                  )}
                </div>
              </div>
            </Link>
            </FadeInView>
          </div>
        ))}
      </div>
    </section>
  );
}
