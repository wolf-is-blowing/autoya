/* eslint-disable @next/next/no-img-element */
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import type { Car } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const BRAND_LABEL: Record<string, string> = {
  toyota:  'Toyota',
  bmw:     'BMW',
  hyundai: 'Hyundai',
  honda:   'Honda',
  mazda:   'Mazda',
  kia:     'Kia',
  audi:    'Audi',
  mercedes: 'Mercedes-Benz',
};

const FUEL_LABEL: Record<string, string> = {
  gasolina:  'Gasolina',
  diesel:    'Diésel',
  electrico: 'Eléctrico',
  hibrido:   'Híbrido',
};

const TRANS_LABEL: Record<string, string> = {
  manual:     'Manual',
  automatico: 'Automático',
  cvt:        'CVT',
};

export function BrowseCarCard({ car }: { car: Car }) {
  return (
    <FadeInView>
      <div style={{
        borderRadius: DNA.radius.card,
        background: '#1C1C1E',
        boxShadow: DNA.shadow.card,
        overflow: 'hidden',
      }}>
        {/* Imagen */}
        <div style={{ position: 'relative', height: 180 }}>
          <img
            src={car.image}
            alt={`${car.model} ${car.year}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,30,0.85) 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(17,17,17,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            padding: '3px 8px',
            fontFamily: cabinet,
            fontSize: 10,
            fontWeight: 600,
            color: '#8E8E93',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
          }}>
            {car.category}
          </div>
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(17,17,17,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            padding: '3px 8px',
            fontFamily: 'monospace',
            fontSize: 11,
            fontWeight: 600,
            color: '#F5F0E8',
            letterSpacing: '0.06em',
          }}>
            {car.year}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px 16px' }}>
          <p style={{
            fontFamily: cabinet, fontSize: 11, color: '#8E8E93',
            textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 2,
          }}>
            {BRAND_LABEL[car.brandId] ?? car.brandId}
          </p>
          <h3 style={{
            fontFamily: clash, fontSize: 20, fontWeight: 500,
            letterSpacing: '-0.01em', color: '#F5F0E8', lineHeight: 1.2, marginBottom: 2,
          }}>
            {car.model}
          </h3>
          <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93', marginBottom: 12 }}>
            {car.version}
          </p>

          {/* Precio */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
            <span style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>S/</span>
            <span style={{
              fontFamily: clash, fontSize: 24, fontWeight: 500,
              color: '#C8F135', letterSpacing: '-0.02em',
            }}>
              {car.price.toLocaleString('es-PE')}
            </span>
          </div>

          {/* Chips de specs */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 14 }}>
            {[
              `${car.horsepower} CV`,
              FUEL_LABEL[car.fuel] ?? car.fuel,
              TRANS_LABEL[car.transmission] ?? car.transmission,
              `${car.seats} asientos`,
            ].map((spec) => (
              <span key={spec} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: DNA.radius.chip,
                padding: '4px 8px',
                fontFamily: cabinet, fontSize: 11, color: '#8E8E93',
              }}>
                {spec}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button style={{
            width: '100%',
            padding: '11px',
            borderRadius: DNA.radius.button,
            border: '1.5px solid rgba(200,241,53,0.50)',
            background: 'transparent',
            color: '#C8F135',
            fontFamily: cabinet,
            fontSize: 13,
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            cursor: 'pointer',
          }}>
            Iniciar cotización
          </button>
        </div>
      </div>
    </FadeInView>
  );
}
