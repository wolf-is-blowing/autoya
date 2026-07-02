/* eslint-disable @next/next/no-img-element */
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import type { MarketplaceProduct } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

// TODO: add individual product detail page (PDP) in a future phase

export function MarketplaceProductCard({ product }: { product: MarketplaceProduct }) {
  return (
    <FadeInView>
      <div style={{
        borderRadius: DNA.radius.card,
        background: '#1C1C1E',
        boxShadow: DNA.shadow.card,
        overflow: 'hidden',
        transition: 'transform 200ms',
        cursor: 'default',
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
      >
        {/* Image */}
        <div style={{ height: 140, overflow: 'hidden' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: '10px 12px 14px' }}>
          <p style={{
            fontFamily: cabinet, fontSize: 12, fontWeight: 500,
            color: '#F5F0E8', lineHeight: 1.35, marginBottom: 6,
            overflow: 'hidden', display: '-webkit-box',
            WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
            WebkitLineClamp: 2,
          } as React.CSSProperties}>
            {product.name}
          </p>
          <p style={{
            fontFamily: clash, fontSize: 18, fontWeight: 500,
            color: '#C8F135', letterSpacing: '-0.01em', marginBottom: 8,
          }}>
            S/ {product.price.toLocaleString('es-PE')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' as const }}>
            <span style={{ fontFamily: cabinet, fontSize: 10, color: '#8E8E93' }}>
              {product.sellerName}
            </span>
            {product.verified && (
              <span style={{
                background: 'rgba(200,241,53,0.12)',
                border: '1px solid rgba(200,241,53,0.25)',
                borderRadius: 4, padding: '1px 5px',
                fontFamily: cabinet, fontSize: 8, fontWeight: 700,
                color: '#C8F135', textTransform: 'uppercase' as const, letterSpacing: '0.06em',
              }}>
                VERIF.
              </span>
            )}
          </div>
        </div>
      </div>
    </FadeInView>
  );
}
