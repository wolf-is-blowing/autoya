/* eslint-disable @next/next/no-img-element */
import { DNA } from '@/lib/design/dna';
import type { Brand } from '@/types';
import type { BrandModel, MarketplaceProduct } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const CATEGORY_LABEL: Record<Brand['category'], string> = {
  economy: 'Económico',
  mid:     'Segmento medio',
  premium: 'Premium',
  luxury:  'Lujo',
};

interface BrandHeroProps {
  brand:    Brand;
  models:   BrandModel[];
  products: MarketplaceProduct[];
  onCotizar?: () => void;
}

export function BrandHero({ brand, models, products, onCotizar }: BrandHeroProps) {
  // Parse brand color for subtle gradient — some are very dark, keep readable
  const brandColor = brand.color;

  return (
    <div style={{
      borderRadius: `0 0 ${DNA.radius.card} ${DNA.radius.card}`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${brandColor}18 0%, #111111 60%)`,
      border: `1px solid ${brandColor}22`,
      boxShadow: `0 0 40px ${brandColor}10`,
      marginBottom: 24,
      padding: '32px 20px 28px',
    }}>
      {/* Logo + nombre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 80, height: 80,
          background: 'rgba(17,17,17,0.70)',
          backdropFilter: 'blur(12px)',
          borderRadius: DNA.radius.card,
          border: `1.5px solid ${brandColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <img
            src={`https://cdn.simpleicons.org/${brand.id}/F5F0E8`}
            alt={brand.name}
            width={48} height={48}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          <h1 style={{
            fontFamily: clash,
            fontSize: 'clamp(28px, 8vw, 40px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F0E8',
            lineHeight: 1,
            marginBottom: 6,
          }}>
            {brand.name}
          </h1>
          <p style={{
            fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
          }}>
            {brand.country} · {CATEGORY_LABEL[brand.category]}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', gap: 0,
        background: 'rgba(0,0,0,0.25)',
        borderRadius: DNA.radius.chip,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        marginBottom: 20,
      }}>
        {[
          { value: models.length,   label: 'modelos disponibles' },
          { value: products.length, label: 'en Marketplace'       },
        ].map(({ value, label }, i) => (
          <div key={label} style={{
            flex: 1, padding: '14px 16px',
            borderRight: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <p style={{
              fontFamily: clash, fontSize: 24, fontWeight: 500,
              letterSpacing: '-0.02em', color: '#C8F135', lineHeight: 1, marginBottom: 3,
            }}>
              {value}
            </p>
            <p style={{ fontFamily: cabinet, fontSize: 11, color: '#8E8E93' }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onCotizar}
        style={{
          width: '100%', padding: '14px',
          borderRadius: DNA.radius.button,
          border: 'none',
          background: '#C8F135',
          color: '#111111',
          fontFamily: cabinet, fontSize: 14, fontWeight: 700,
          textTransform: 'uppercase' as const, letterSpacing: '0.06em',
          cursor: 'pointer',
          boxShadow: DNA.shadow.volt,
        }}
      >
        Cotizar un {brand.name} →
      </button>
    </div>
  );
}
