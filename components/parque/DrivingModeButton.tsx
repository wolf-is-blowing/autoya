'use client';

import { useState, useEffect } from 'react';
import { DNA } from '@/lib/design/dna';
import { IconSteeringWheel, IconClose } from '@/components/icons/MoutoIcons';
import { getCurrentTrip, startTrip, endTrip, calculateDistance } from '@/lib/driving-mode';
import { TripSummaryModal } from './TripSummaryModal';
import { SaveMemoryModal }  from './SaveMemoryModal';
import type { Trip, OwnedCar, Car } from '@/types';

/* eslint-disable @next/next/no-img-element */

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type Phase = 'idle' | 'selecting-car' | 'active' | 'ending' | 'saving-memory';

interface DrivingModeButtonProps {
  ownedCars: Array<{ ownedCar: OwnedCar; car: Car }>;
}

function formatElapsed(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function DrivingModeButton({ ownedCars }: DrivingModeButtonProps) {
  const [phase,        setPhase]        = useState<Phase>('idle');
  const [activeTrip,   setActiveTrip]   = useState<Trip | null>(null);
  const [selectedId,   setSelectedId]   = useState<string | null>(null);
  const [elapsed,      setElapsed]      = useState(0);
  const [calcKm,       setCalcKm]       = useState<number | undefined>();
  const [startCoords,  setStartCoords]  = useState<{ lat: number; lng: number } | null>(null);
  const [pulsed,       setPulsed]       = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [pendingTrip,  setPendingTrip]  = useState<Trip | null>(null);

  // Restore active trip on mount
  useEffect(() => {
    const trip = getCurrentTrip();
    if (trip) {
      setActiveTrip(trip);
      setPhase('active');
      const mins = Math.floor((Date.now() - new Date(trip.startTime).getTime()) / 60000);
      setElapsed(mins);
    }
  }, []);

  // Elapsed timer
  useEffect(() => {
    if (phase !== 'active' || !activeTrip) return;
    const tick = () => {
      setElapsed(Math.floor((Date.now() - new Date(activeTrip.startTime).getTime()) / 60000));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [phase, activeTrip]);

  // Pulse animation when active
  useEffect(() => {
    if (phase !== 'active') return;
    const id = setInterval(() => setPulsed((p) => !p), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Sheet open animation
  useEffect(() => {
    if (phase === 'selecting-car') {
      const t = setTimeout(() => setSheetVisible(true), 30);
      return () => clearTimeout(t);
    } else {
      setSheetVisible(false);
    }
  }, [phase]);

  function requestGPS(onResult: (coords: { lat: number; lng: number } | null) => void) {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      onResult(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => onResult({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => onResult(null),
      { timeout: 6_000 },
    );
  }

  function initiateStart(ownedCarId: string) {
    // GPS only on button press — never in background
    requestGPS((coords) => {
      setStartCoords(coords);
      const trip = startTrip(ownedCarId);
      setActiveTrip(trip);
      setSelectedId(ownedCarId);
      setElapsed(0);
      setPhase('active');
    });
  }

  function handleStartClick() {
    if (ownedCars.length === 0) return;
    if (ownedCars.length === 1) {
      initiateStart(ownedCars[0].ownedCar.id);
    } else {
      setPhase('selecting-car');
    }
  }

  function handleEndClick() {
    if (!activeTrip) return;
    if (startCoords) {
      // GPS at trip end only if we had start coords
      requestGPS((endCoords) => {
        if (endCoords && startCoords) {
          const dist = calculateDistance(
            startCoords.lat, startCoords.lng,
            endCoords.lat,   endCoords.lng,
          );
          setCalcKm(Math.round(dist * 10) / 10);
        } else {
          setCalcKm(undefined);
        }
        setStartCoords(null);
        setPhase('ending');
      });
    } else {
      setPhase('ending');
    }
  }

  function handleTripConfirm(distanceKm: number, endLocation?: string) {
    if (!activeTrip) return;
    const completed = endTrip(distanceKm, endLocation);
    setPendingTrip(completed);
    setActiveTrip(null);
    setCalcKm(undefined);
    setPhase('idle');
  }

  function handleSaveMemory(distanceKm: number, endLocation?: string) {
    if (!activeTrip) return;
    const completed = endTrip(distanceKm, endLocation);
    setPendingTrip(completed);
    setActiveTrip(null);
    setCalcKm(undefined);
    setPhase('saving-memory');
  }

  function handleMemorySaved() {
    setPendingTrip(null);
    setPhase('idle');
  }

  const activeEntry = ownedCars.find(
    (e) => e.ownedCar.id === (activeTrip?.ownedCarId ?? selectedId),
  );

  // ── Idle button ────────────────────────────────────────────────────────────
  if (phase === 'idle') {
    return (
      <button
        onClick={handleStartClick}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '16px',
          borderRadius: DNA.radius.button,
          border: 'none',
          background: '#C8F135',
          color: '#111111',
          fontFamily: cabinet, fontSize: 15, fontWeight: 700,
          textTransform: 'uppercase' as const, letterSpacing: '0.08em',
          cursor: 'pointer',
          boxShadow: '0 0 24px rgba(200,241,53,0.25)',
        }}
      >
        <IconSteeringWheel size={20} />
        Iniciar viaje
      </button>
    );
  }

  // ── Active state ───────────────────────────────────────────────────────────
  if (phase === 'active') {
    const carName = activeEntry?.ownedCar.nickname ?? activeEntry?.car.model ?? 'tu auto';
    return (
      <button
        onClick={handleEndClick}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px',
          borderRadius: DNA.radius.button,
          border: '1.5px solid rgba(10,132,255,0.50)',
          background: 'rgba(10,132,255,0.10)',
          color: '#0A84FF',
          fontFamily: cabinet, fontSize: 14, fontWeight: 600,
          textAlign: 'left' as const,
          cursor: 'pointer',
          boxShadow: pulsed
            ? '0 0 24px rgba(10,132,255,0.30)'
            : '0 0 12px rgba(10,132,255,0.12)',
          transition: 'box-shadow 800ms ease',
        }}
      >
        {/* Pulsing dot */}
        <div style={{ position: 'relative', flexShrink: 0, width: 10, height: 10 }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#0A84FF',
            opacity: pulsed ? 1 : 0.5,
            transition: 'opacity 800ms ease',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#0A84FF' }}>
            Conduciendo {carName}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: '#8E8E93', fontWeight: 400 }}>
            {formatElapsed(elapsed)} · Toca para finalizar
          </p>
        </div>
        <div style={{
          flexShrink: 0, color: '#8E8E93',
          fontFamily: cabinet, fontSize: 12,
        }}>
          ■
        </div>
      </button>
    );
  }

  // ── Car selector sheet ─────────────────────────────────────────────────────
  if (phase === 'selecting-car') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div
          onClick={() => setPhase('idle')}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.70)',
            opacity: sheetVisible ? 1 : 0, transition: 'opacity 300ms',
          }}
        />
        <div style={{
          position: 'relative', zIndex: 1,
          background: '#1C1C1E',
          borderRadius: `${DNA.radius.card} ${DNA.radius.card} 0 0`,
          padding: '24px 20px 48px',
          transform: sheetVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform 350ms ${DNA.easing.out}`,
        }}>
          <div style={{
            width: 36, height: 4, borderRadius: 9999,
            background: 'rgba(255,255,255,0.18)',
            margin: '0 auto 20px',
          }} />
          <button
            onClick={() => setPhase('idle')}
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

          <p style={{
            fontFamily: cabinet, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 16,
          }}>
            ¿Con cuál auto?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ownedCars.map(({ ownedCar, car }) => (
              <button
                key={ownedCar.id}
                onClick={() => {
                  setPhase('idle'); // reset sheet first
                  setTimeout(() => initiateStart(ownedCar.id), 50);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px',
                  borderRadius: DNA.radius.card,
                  border: '1.5px solid rgba(200,241,53,0.30)',
                  background: 'rgba(200,241,53,0.06)',
                  cursor: 'pointer', textAlign: 'left' as const,
                }}
              >
                <div style={{
                  width: 56, height: 38, borderRadius: 8,
                  overflow: 'hidden', flexShrink: 0,
                }}>
                  <img
                    src={ownedCar.image}
                    alt={ownedCar.nickname ?? car.model}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p style={{
                    fontFamily: cabinet, fontSize: 15, fontWeight: 600,
                    color: '#F5F0E8', margin: 0, marginBottom: 2,
                  }}>
                    {ownedCar.nickname ?? car.model}
                  </p>
                  <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93', margin: 0 }}>
                    {ownedCar.plate} · {ownedCar.km.toLocaleString('es-PE')} km
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Trip summary modal ─────────────────────────────────────────────────────
  if (phase === 'ending' && activeTrip) {
    return (
      <TripSummaryModal
        trip={activeTrip}
        calculatedKm={calcKm}
        onConfirm={handleTripConfirm}
        onSaveMemory={handleSaveMemory}
        onClose={() => setPhase('active')}
      />
    );
  }

  // ── Save memory modal ──────────────────────────────────────────────────────
  if (phase === 'saving-memory' && pendingTrip) {
    return (
      <SaveMemoryModal
        ownedCarId={pendingTrip.ownedCarId}
        tripId={pendingTrip.id}
        onSaved={handleMemorySaved}
        onClose={handleMemorySaved}
      />
    );
  }

  return null;
}
