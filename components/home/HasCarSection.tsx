/* eslint-disable @next/next/no-img-element */
import { FeatureSection } from './FeatureSection';

function HasCarImage() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&q=85&auto=format"
        alt=""
        aria-hidden
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 20%, rgba(17,17,17,0.75) 65%, #111111 100%)',
        }}
      />
    </>
  );
}

export function HasCarSection() {
  return (
    <FeatureSection
      eyebrow="Para conductores activos"
      title="Tu auto, mejor cuidado."
      bullets={[
        'Agenda mantenimiento en un toque',
        'Únete a la comunidad de tu marca',
        'Historial completo de tu auto',
      ]}
      ctaLabel="Ver Mi Parque"
      ctaHref="/parque"
      ctaVariant="ghost-electric"
      imageSlot={<HasCarImage />}
      imagePosition="bottom"
    />
  );
}
