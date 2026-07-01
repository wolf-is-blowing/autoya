'use client';

import { useState, useEffect, useRef } from 'react';
import { DNA } from '@/lib/design/dna';
import { IconClose } from '@/components/icons/MoutoIcons';
import type { Trip } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface TripSummaryModalProps {
  trip: Trip;
  calculatedKm?: number; // from GPS Haversine
  onConfirm:     (distanceKm: number, endLocation?: string) => void;
  onSaveMemory:  (distanceKm: number, endLocation?: string) => void;
  onClose:       () => void;
}

function AnimatedCheck({ color }: { color: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength?.() ?? 40;
    pathRef.current.style.strokeDasharray  = String(len);
    pathRef.current.style.strokeDashoffset = String(len);
    void pathRef.current.getBoundingClientRect();
    pathRef.current.style.transition = 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';
    pathRef.current.style.strokeDashoffset = '0';
  }, []);

  return (
    <div style={{
      width: 64, height: 64, borderRadius: '50%',
      background: `${color}14`,
      border: `2px solid ${color}33`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 20px',
    }}>
      <svg width={32} height={32} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity={0.3}/>
        <path
          ref={pathRef}
          d="M7 12 L10.5 15.5 L17 9"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function formatDuration(trip: Trip): string {
  if (!trip.endTime) return '—';
  const mins = Math.round(
    (new Date(trip.endTime).getTime() - new Date(trip.startTime).getTime()) / (1000 * 60),
  );
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function TripSummaryModal({
  trip, calculatedKm, onConfirm, onSaveMemory, onClose,
}: TripSummaryModalProps) {
  const [km,       setKm]       = useState(calculatedKm != null ? String(Math.round(calculatedKm)) : '');
  const [location, setLocation] = useState(trip.endLocation ?? '');
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const kmNum = parseFloat(km);
  const valid = !isNaN(kmNum) && kmNum > 0;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.70)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 300ms',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#1C1C1E',
        borderRadius: `${DNA.radius.card} ${DNA.radius.card} 0 0`,
        padding: '24px 20px 40px',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform 350ms ${DNA.easing.out}`,
        maxHeight: '85dvh',
        overflowY: 'auto',
      }}>
        {/* Handle + close */}
        <div style={{
          width: 36, height: 4, borderRadius: 9999,
          background: 'rgba(255,255,255,0.18)',
          margin: '0 auto 20px',
        }} />
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: '#2C2C2E', border: 'none', borderRadius: '50%',
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#8E8E93',
          }}
          aria-label="Cerrar"
        >
          <IconClose size={16} />
        </button>

        {/* Check */}
        <AnimatedCheck color="#C8F135" />

        <h2 style={{
          fontFamily: clash, fontSize: 24, fontWeight: 500,
          letterSpacing: '-0.02em', color: '#F5F0E8',
          textAlign: 'center', marginBottom: 6,
        }}>
          ¡Viaje terminado!
        </h2>
        <p style={{
          fontFamily: cabinet, fontSize: 14, color: '#8E8E93',
          textAlign: 'center', marginBottom: 24,
        }}>
          {formatDuration(trip)} · {calculatedKm != null ? 'distancia calculada por GPS' : 'ingresa los km manualmente'}
        </p>

        {/* Km input */}
        <div style={{ marginBottom: 14 }}>
          <label style={{
            display: 'block',
            fontFamily: cabinet, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 8,
          }}>
            Distancia recorrida (km)
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              placeholder="ej. 24.5"
              style={{
                width: '100%',
                padding: '13px 48px 13px 16px',
                borderRadius: DNA.radius.input,
                border: valid
                  ? '1.5px solid rgba(200,241,53,0.40)'
                  : '1.5px solid rgba(255,255,255,0.10)',
                background: '#2C2C2E',
                color: '#F5F0E8',
                fontFamily: cabinet, fontSize: 16,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
            }}>
              km
            </span>
          </div>
        </div>

        {/* Location input */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block',
            fontFamily: cabinet, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 8,
          }}>
            Destino (opcional)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="ej. Miraflores"
            style={{
              width: '100%',
              padding: '13px 16px',
              borderRadius: DNA.radius.input,
              border: '1.5px solid rgba(255,255,255,0.10)',
              background: '#2C2C2E',
              color: '#F5F0E8',
              fontFamily: cabinet, fontSize: 15,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={() => valid && onSaveMemory(kmNum, location || undefined)}
            disabled={!valid}
            style={{
              width: '100%', padding: '13px',
              borderRadius: DNA.radius.button,
              border: valid
                ? '1.5px solid rgba(200,241,53,0.50)'
                : '1.5px solid rgba(255,255,255,0.08)',
              background: valid ? 'rgba(200,241,53,0.10)' : 'transparent',
              color: valid ? '#C8F135' : '#3A3A3C',
              fontFamily: cabinet, fontSize: 14, fontWeight: 600,
              textTransform: 'uppercase' as const, letterSpacing: '0.06em',
              cursor: valid ? 'pointer' : 'not-allowed',
            }}
          >
            Guardar recuerdo
          </button>
          <button
            onClick={() => valid && onConfirm(kmNum, location || undefined)}
            disabled={!valid}
            style={{
              width: '100%', padding: '13px',
              borderRadius: DNA.radius.button,
              border: 'none',
              background: valid ? '#C8F135' : '#2C2C2E',
              color: valid ? '#111111' : '#8E8E93',
              fontFamily: cabinet, fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase' as const, letterSpacing: '0.06em',
              cursor: valid ? 'pointer' : 'not-allowed',
            }}
          >
            Confirmar viaje
          </button>
        </div>
      </div>
    </div>
  );
}
