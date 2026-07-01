/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import { ServiceQuickAction } from './ServiceQuickAction';
import type { OwnedCar, Car, HealthScoreFactors } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

function getRevisionStatus(km: number): 'al día' | 'próximo' | 'vencido' {
  if (km < 30000) return 'al día';
  if (km < 50000) return 'próximo';
  return 'vencido';
}

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  'al día':  { bg: 'rgba(200,241,53,0.12)',  color: '#C8F135', label: 'AL DÍA'  },
  'próximo': { bg: 'rgba(10,132,255,0.12)',  color: '#0A84FF', label: 'PRÓXIMO' },
  'vencido': { bg: 'rgba(255,59,48,0.12)',   color: '#FF3B30', label: 'VENCIDO' },
};

interface CarCardProps {
  ownedCar:    OwnedCar;
  car:         Car;
  healthScore?: HealthScoreFactors;
}

export function CarCard({ ownedCar, car, healthScore }: CarCardProps) {
  const status     = getRevisionStatus(ownedCar.km);
  const statusStyle = STATUS_STYLE[status];
  const brandLabel  = `${car.model} · ${car.version}`;

  return (
    <FadeInView>
      <div style={{
        borderRadius: DNA.radius.card,
        background: '#1C1C1E',
        boxShadow: DNA.shadow.card,
        overflow: 'hidden',
        borderTop: '2px solid #C8F135',
      }}>
        {/* Imagen del auto */}
        <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
          <img
            src={ownedCar.image}
            alt={ownedCar.nickname ?? car.model}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(28,28,30,0.85) 100%)',
            }}
          />
          {/* Placa en la imagen */}
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(17,17,17,0.72)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            padding: '3px 8px',
            fontFamily: 'monospace',
            fontSize: 11,
            fontWeight: 600,
            color: '#F5F0E8',
            letterSpacing: '0.12em',
          }}>
            {ownedCar.plate}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 16px 12px' }}>
          {/* Nombre + health dot + badge revisión */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
            <h3 style={{
              fontFamily: clash,
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: '#F5F0E8',
              lineHeight: 1.2,
            }}>
              {ownedCar.nickname ?? car.model}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, flexShrink: 0 }}>
              {healthScore && (
                <div
                  title={`Health: ${healthScore.label}`}
                  style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: DNA.healthScoreColors[healthScore.label],
                    flexShrink: 0,
                  }}
                />
              )}
              <span style={{
                background: statusStyle.bg, color: statusStyle.color,
                borderRadius: 9999, padding: '3px 8px',
                fontFamily: cabinet, fontSize: 10, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {statusStyle.label}
              </span>
            </div>
          </div>

          {/* Marca + modelo */}
          <p style={{
            fontFamily: cabinet,
            fontSize: 13,
            color: '#8E8E93',
            marginBottom: 12,
          }}>
            {brandLabel}
          </p>

          {/* KM */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
            <span style={{
              fontFamily: clash,
              fontSize: 22,
              fontWeight: 500,
              color: '#C8F135',
              letterSpacing: '-0.02em',
            }}>
              {ownedCar.km.toLocaleString('es-PE')}
            </span>
            <span style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>km</span>
          </div>

          {/* CTA */}
          <Link
            href={`/parque/${ownedCar.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '10px',
              borderRadius: DNA.radius.button,
              border: '1.5px solid rgba(10,132,255,0.50)',
              color: '#0A84FF',
              fontFamily: cabinet,
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'background 150ms, border-color 150ms',
              marginBottom: 14,
            }}
          >
            Ver perfil
          </Link>

          {/* Quick actions */}
          <ServiceQuickAction carId={ownedCar.id} />
        </div>
      </div>
    </FadeInView>
  );
}
