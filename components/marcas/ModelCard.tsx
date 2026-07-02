/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import { QuotationSheet } from './QuotationSheet';
import { BRANDS } from '@/lib/data';
import type { BrandModel } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface ModelCardProps {
  model: BrandModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const [showSheet, setShowSheet] = useState(false);
  const brand = BRANDS.find((b) => b.id === model.brandSlug);

  return (
    <FadeInView>
      <div style={{
        borderRadius: DNA.radius.card,
        background: '#1C1C1E',
        boxShadow: DNA.shadow.card,
        overflow: 'hidden',
      }}>
        {/* Image */}
        <div style={{ position: 'relative', height: 160 }}>
          <img
            src={model.imageUrl}
            alt={`${model.name} ${model.year}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,30,0.85) 100%)',
          }} />
          <span style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(17,17,17,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6, padding: '2px 8px',
            fontFamily: 'monospace', fontSize: 11, fontWeight: 600,
            color: '#F5F0E8', letterSpacing: '0.06em',
          }}>
            {model.year}
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px 14px' }}>
          <h3 style={{
            fontFamily: cabinet, fontSize: 15, fontWeight: 600,
            color: '#F5F0E8', marginBottom: 4, lineHeight: 1.2,
          }}>
            {model.name}
          </h3>
          <p style={{
            fontFamily: clash, fontSize: 16, fontWeight: 500,
            color: '#C8F135', letterSpacing: '-0.01em', marginBottom: 12,
          }}>
            Desde S/ {model.priceFrom.toLocaleString('es-PE')}
          </p>
          <button
            onClick={() => setShowSheet(true)}
            style={{
              width: '100%', padding: '10px',
              borderRadius: DNA.radius.button,
              border: '1.5px solid rgba(200,241,53,0.40)',
              background: 'rgba(200,241,53,0.06)',
              color: '#C8F135',
              fontFamily: cabinet, fontSize: 12, fontWeight: 600,
              textTransform: 'uppercase' as const, letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background 150ms',
            }}
          >
            Cotizar
          </button>
        </div>
      </div>

      {showSheet && (
        <QuotationSheet
          initialBrand={brand?.name ?? model.brandSlug}
          initialModel={model.name}
          onClose={() => setShowSheet(false)}
        />
      )}
    </FadeInView>
  );
}
