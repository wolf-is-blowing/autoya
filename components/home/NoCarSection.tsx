import { FeatureSection } from './FeatureSection';
import { NoCarCarousel } from './NoCarCarousel';

export function NoCarSection() {
  return (
    <FeatureSection
      eyebrow="Para quienes buscan"
      title="Encuentra el auto correcto, sin adivinar."
      bullets={[
        'Compara opciones verificadas',
        'Agenda test drives reales',
        'Financiamiento sin letra pequeña',
      ]}
      ctaLabel="Empezar búsqueda"
      ctaHref="/taller?tab=busqueda"
      ctaVariant="ghost-volt"
      imageSlot={<NoCarCarousel />}
      imagePosition="top"
    />
  );
}
