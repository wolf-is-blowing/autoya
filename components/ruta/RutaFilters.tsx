'use client';

import { ChipFilter } from '@/components/ui/ChipFilter';
import type { FeedFilter } from '@/lib/ruta';

const FILTERS: Array<{ id: FeedFilter; label: string }> = [
  { id: 'todo',        label: 'Todo'       },
  { id: 'preguntas',   label: 'Preguntas'  },
  { id: 'marketplace', label: 'Marketplace'},
  { id: 'novedades',   label: 'Novedades'  },
  { id: 'comunidad',   label: 'Comunidad'  },
];

interface RutaFiltersProps {
  active: FeedFilter;
  onChange: (f: FeedFilter) => void;
}

export function RutaFilters({ active, onChange }: RutaFiltersProps) {
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto',
      paddingBottom: 4,
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    } as React.CSSProperties}>
      {FILTERS.map(({ id, label }) => (
        <ChipFilter
          key={id}
          active={active === id}
          onClick={() => onChange(id)}
        >
          {label}
        </ChipFilter>
      ))}
    </div>
  );
}
