import Link from 'next/link';

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const CHIPS = [
  { label: 'Mantenimiento', id: 'mantenimiento' },
  { label: 'Lavado',        id: 'lavado'        },
  { label: 'Styling',       id: 'styling'       },
] as const;

interface ServiceQuickActionProps {
  carId: string;
}

export function ServiceQuickAction({ carId }: ServiceQuickActionProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 2,
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    } as React.CSSProperties}>
      {CHIPS.map((s) => (
        <Link
          key={s.id}
          href={`/taller?servicio=${s.id}&auto=${carId}`}
          style={{
            flexShrink: 0,
            background: '#2C2C2E',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 9999,
            padding: '6px 14px',
            fontFamily: cabinet,
            fontSize: 12,
            fontWeight: 500,
            color: '#F5F0E8',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            transition: 'border-color 150ms, color 150ms',
          }}
        >
          {s.label}
        </Link>
      ))}
      <Link
        href="/taller"
        style={{
          flexShrink: 0,
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 9999,
          padding: '6px 14px',
          fontFamily: cabinet,
          fontSize: 12,
          color: '#8E8E93',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}
      >
        Ver todo →
      </Link>
    </div>
  );
}
