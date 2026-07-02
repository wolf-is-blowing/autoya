'use client';

import { useState } from 'react';
import { FadeInView } from '@/components/ui/FadeInView';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import type { MarketplaceProduct } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type Filter = 'todos' | MarketplaceProduct['category'];

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos',      label: 'Todos'       },
  { id: 'accesorios', label: 'Accesorios'  },
  { id: 'repuestos',  label: 'Repuestos'   },
  { id: 'estetica',   label: 'Estética'    },
  { id: 'audio',      label: 'Audio'       },
];

interface BrandMarketplaceProps {
  brandName: string;
  products:  MarketplaceProduct[];
}

export function BrandMarketplace({ brandName, products }: BrandMarketplaceProps) {
  const [filter, setFilter] = useState<Filter>('todos');

  const filtered = filter === 'todos'
    ? products
    : products.filter((p) => p.category === filter);

  if (products.length === 0) return null;

  return (
    <div style={{ marginBottom: 32 }}>
      <FadeInView>
        <p style={{
          fontFamily: cabinet, fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase' as const, letterSpacing: '0.10em',
          color: '#8E8E93', marginBottom: 4,
        }}>
          Marketplace
        </p>
        <h2 style={{
          fontFamily: clash, fontSize: 22, fontWeight: 500,
          letterSpacing: '-0.01em', color: '#F5F0E8', marginBottom: 4,
        }}>
          Marketplace {brandName}
        </h2>
        <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93', marginBottom: 16 }}>
          Accesorios y repuestos para tu {brandName}
        </p>

        {/* Filters */}
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          marginBottom: 16,
        } as React.CSSProperties}>
          {FILTERS.map(({ id, label }) => (
            <ChipFilter
              key={id}
              active={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </ChipFilter>
          ))}
        </div>
      </FadeInView>

      {filtered.length === 0 ? (
        <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93', padding: '24px 0' }}>
          Sin productos en esta categoría.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map((p) => (
            <MarketplaceProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
