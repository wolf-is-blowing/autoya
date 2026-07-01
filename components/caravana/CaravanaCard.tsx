/* eslint-disable @next/next/no-img-element */
import { DNA } from '@/lib/design/dna';
import type { Caravana } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export const TYPE_META: Record<string, { label: string; color: string }> = {
  brand:  { label: 'Marca',   color: '#0A84FF' },
  model:  { label: 'Modelo',  color: '#FF5C00' },
  color:  { label: 'Color',   color: '#C8F135' },
  amigos: { label: 'Amigos',  color: '#B026FF' },
};

interface CaravanaCardProps {
  caravana: Caravana;
  joined?: boolean;
  onJoin?: () => void;
}

export function CaravanaCard({ caravana, joined = false, onJoin }: CaravanaCardProps) {
  const meta = TYPE_META[caravana.type] ?? { label: caravana.type, color: '#8E8E93' };

  return (
    <div style={{
      borderRadius: DNA.radius.card,
      background: '#1C1C1E',
      boxShadow: DNA.shadow.card,
      overflow: 'hidden',
      borderTop: `2px solid ${meta.color}`,
    }}>
      {/* Imagen */}
      <div style={{ position: 'relative', height: 160 }}>
        <img
          src={caravana.image}
          alt={caravana.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(17,17,17,0.15) 0%, rgba(28,28,30,0.80) 100%)',
        }} />

        {/* Badge tipo */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: `${meta.color}22`,
          border: `1px solid ${meta.color}55`,
          borderRadius: 6,
          padding: '3px 8px',
          fontFamily: cabinet,
          fontSize: 10, fontWeight: 700,
          color: meta.color,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          backdropFilter: 'blur(8px)',
        }}>
          {meta.label}
        </div>

        {/* Contador de miembros */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(17,17,17,0.72)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 6,
          padding: '3px 8px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none"
            stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="9" cy="7" r="4"/>
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
          </svg>
          <span style={{
            fontFamily: cabinet, fontSize: 11, fontWeight: 600, color: '#F5F0E8',
          }}>
            {caravana.memberCount.toLocaleString('es-PE')}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: '14px 16px 16px' }}>
        <h3 style={{
          fontFamily: clash, fontSize: 19, fontWeight: 500,
          letterSpacing: '-0.01em', color: '#F5F0E8',
          lineHeight: 1.2, marginBottom: 6,
        }}>
          {caravana.name}
        </h3>

        <p style={{
          fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
          lineHeight: 1.5, marginBottom: 12,
        }}>
          {caravana.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 14 }}>
          {caravana.tags.map((tag) => (
            <span key={tag} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: DNA.radius.chip,
              padding: '4px 8px',
              fontFamily: cabinet, fontSize: 11, color: '#8E8E93',
            }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onJoin}
          style={{
            width: '100%', padding: '11px',
            borderRadius: DNA.radius.button,
            border: joined
              ? '1.5px solid rgba(255,255,255,0.12)'
              : `1.5px solid ${meta.color}50`,
            background: joined ? 'transparent' : `${meta.color}12`,
            color: joined ? '#8E8E93' : meta.color,
            fontFamily: cabinet, fontSize: 13, fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            cursor: joined ? 'default' : 'pointer',
          }}
        >
          {joined ? 'Ya miembro' : 'Unirse'}
        </button>
      </div>
    </div>
  );
}
