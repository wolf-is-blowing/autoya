'use client';

import { use, useRef } from 'react';
import Link from 'next/link';
import { PageWrapper }        from '@/components/layout/PageWrapper';
import { FadeInView }         from '@/components/ui/FadeInView';
import { DNA }                from '@/lib/design/dna';
import { BrandHero }          from '@/components/marcas/BrandHero';
import { ModelsByType }       from '@/components/marcas/ModelsByType';
import { BrandMarketplace }   from '@/components/marcas/BrandMarketplace';
import { BRANDS }             from '@/lib/data';
import { MOCK_BRAND_MODELS, MOCK_MARKETPLACE_PRODUCTS } from '@/lib/data/brand-models';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const modelsRef = useRef<HTMLDivElement>(null);

  const brand    = BRANDS.find((b) => b.id === slug);
  const models   = MOCK_BRAND_MODELS.filter((m) => m.brandSlug === slug);
  const products = MOCK_MARKETPLACE_PRODUCTS.filter((p) => p.brandSlug === slug);

  function scrollToModels() {
    modelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── 404 state ─────────────────────────────────────────────────────────────
  if (!brand) {
    return (
      <PageWrapper>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', padding: '0 24px', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: clash, fontSize: 64, fontWeight: 500,
            color: 'rgba(245,240,232,0.12)', lineHeight: 1, marginBottom: 16,
          }}>
            404
          </p>
          <p style={{
            fontFamily: clash, fontSize: 22, fontWeight: 500,
            color: '#F5F0E8', marginBottom: 8,
          }}>
            Marca no encontrada
          </p>
          <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93', marginBottom: 28 }}>
            No tenemos información sobre "{slug}".
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '12px 28px',
            borderRadius: DNA.radius.button,
            background: '#C8F135',
            color: '#111111',
            fontFamily: cabinet, fontSize: 13, fontWeight: 700,
            textTransform: 'uppercase' as const, letterSpacing: '0.06em',
            textDecoration: 'none',
          }}>
            Volver al inicio
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero — flush to top, padding handled internally */}
      <BrandHero
        brand={brand}
        models={models}
        products={products}
        onCotizar={scrollToModels}
      />

      <div style={{ padding: '0 20px' }}>
        {/* Models section */}
        <div ref={modelsRef}>
          <ModelsByType models={models} brandName={brand.name} />
        </div>

        {/* Marketplace section */}
        <BrandMarketplace brandName={brand.name} products={products} />

        {/* Empty state if no content at all */}
        {models.length === 0 && products.length === 0 && (
          <FadeInView>
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
                Pronto agregaremos modelos y productos de {brand.name}.
              </p>
            </div>
          </FadeInView>
        )}
      </div>
    </PageWrapper>
  );
}
