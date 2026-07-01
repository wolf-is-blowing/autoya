'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';
import { calculateHealthScore } from '@/lib/health-score';
import { getCarState } from '@/lib/driving-mode';
import { INITIAL_CAR_STATES } from '@/lib/data';
import type { HealthScoreFactors } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const RADIUS        = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 251.33

interface HealthScoreCardProps {
  ownedCarId: string;
  fallbackKm: number;
}

function BarRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>{label}</span>
        <span style={{ fontFamily: cabinet, fontSize: 12, fontWeight: 600, color }}>{value}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 9999, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{
          height: '100%',
          width: `${value}%`,
          borderRadius: 9999,
          background: color,
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
    </div>
  );
}

export function HealthScoreCard({ ownedCarId, fallbackKm }: HealthScoreCardProps) {
  const circleRef                  = useRef<SVGCircleElement>(null);
  const [expanded, setExpanded]    = useState(false);
  const [score, setScore]          = useState<HealthScoreFactors | null>(null);

  useEffect(() => {
    const init   = INITIAL_CAR_STATES[ownedCarId];
    const state  = getCarState(ownedCarId, fallbackKm, init?.lastServiceDate);
    const result = calculateHealthScore(state.currentKm, state.lastServiceDate);
    setScore(result);
  }, [ownedCarId, fallbackKm]);

  useEffect(() => {
    if (!circleRef.current || !score) return;
    const target = CIRCUMFERENCE * (1 - score.overall / 100);
    // Reset to empty, force reflow, then animate to target
    circleRef.current.style.transition = 'none';
    circleRef.current.style.strokeDashoffset = String(CIRCUMFERENCE);
    void circleRef.current.getBoundingClientRect();
    circleRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    circleRef.current.style.strokeDashoffset = String(target);
  }, [score]);

  if (!score) return null;

  const color  = DNA.healthScoreColors[score.label];
  const needsAttention = score.label === 'requiere atención';

  return (
    <div style={{
      borderRadius: DNA.radius.card,
      background: '#1C1C1E',
      borderTop: `2px solid ${color}`,
      padding: '20px',
      boxShadow: DNA.shadow.card,
    }}>
      {/* Score + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: expanded ? 20 : 0 }}>
        {/* SVG Circle */}
        <div style={{ position: 'relative', flexShrink: 0, width: 88, height: 88 }}>
          <svg width={88} height={88} viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />
            <circle
              ref={circleRef}
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: clash, fontSize: 22, fontWeight: 500,
              color: color, letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              {score.overall}
            </span>
            <span style={{ fontFamily: cabinet, fontSize: 9, color: '#8E8E93', marginTop: 1 }}>
              /100
            </span>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: cabinet, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 4,
          }}>
            Health Score
          </p>
          <p style={{
            fontFamily: clash, fontSize: 20, fontWeight: 500,
            color: color, letterSpacing: '-0.01em', marginBottom: 8,
            textTransform: 'capitalize',
          }}>
            {score.label}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none', border: 'none', padding: 0,
              fontFamily: cabinet, fontSize: 12, color: '#8E8E93',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            {expanded ? 'Ocultar detalle' : 'Ver detalle'}
            <svg
              width={12} height={12} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded breakdown */}
      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BarRow label="Mantenimiento"       value={score.maintenanceScore}      color={color} />
          <BarRow label="Tiempo sin servicio" value={score.timeSinceServiceScore} color={color} />
          <BarRow label="Kilometraje"         value={score.mileageScore}          color={color} />
        </div>
      )}

      {/* CTA if needs attention */}
      {needsAttention && (
        <div style={{ marginTop: expanded ? 16 : 0 }}>
          <Link
            href="/taller"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '10px',
              borderRadius: DNA.radius.button,
              border: `1.5px solid rgba(255,59,48,0.45)`,
              background: 'rgba(255,59,48,0.08)',
              color: '#FF3B30',
              fontFamily: cabinet,
              fontSize: 13, fontWeight: 500,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              marginTop: needsAttention && !expanded ? 16 : 0,
            }}
          >
            Agendar servicio
          </Link>
        </div>
      )}
    </div>
  );
}
