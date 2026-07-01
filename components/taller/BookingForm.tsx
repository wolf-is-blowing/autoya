'use client';

import { useState, useEffect } from 'react';
import { DNA } from '@/lib/design/dna';
import { IconClose } from '@/components/icons/MoutoIcons';
import { authUtils } from '@/lib/auth';
import { MOCK_OWNED_CARS, MOCK_CARS, INITIAL_CAR_STATES } from '@/lib/data';
import { addDiaryEntry, updateCarState } from '@/lib/driving-mode';
import type { Service, ServiceOption, OwnedCar } from '@/types';

/* eslint-disable @next/next/no-img-element */

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type BookingStep = 'form' | 'success';

interface BookingFormProps {
  service: Service;
  option:  ServiceOption;
  onClose: () => void;
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function maxDateISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export function BookingForm({ service, option, onClose }: BookingFormProps) {
  const [step,      setStep]      = useState<BookingStep>('form');
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [date,      setDate]      = useState(todayISO());
  const [notes,     setNotes]     = useState('');
  const [visible,   setVisible]   = useState(false);
  const [loggedIn,  setLoggedIn]  = useState(false);

  const ownedCars: Array<{ ownedCar: OwnedCar; carName: string }> = MOCK_OWNED_CARS.map((oc) => {
    const car = MOCK_CARS.find((c) => c.id === oc.carId);
    return { ownedCar: oc, carName: car ? `${car.model} · ${oc.plate}` : oc.plate };
  });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    const isAuth = authUtils.isLoggedIn();
    setLoggedIn(isAuth);
    if (isAuth && ownedCars.length > 0) {
      setSelectedCar(ownedCars[0].ownedCar.id);
    }
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleConfirm() {
    if (!selectedCar) return;
    // Create diary entry for this service
    addDiaryEntry({
      id:          `de_svc_${Date.now()}`,
      ownedCarId:  selectedCar,
      type:        'service',
      title:       option.name,
      description: service.name,
      date:        new Date(date).toISOString(),
    });
    // Update lastServiceDate
    const init = INITIAL_CAR_STATES[selectedCar];
    updateCarState(selectedCar, {
      lastServiceDate: date,
      currentKm:      init?.currentKm,
    });
    setStep('success');
  }

  const canConfirm = loggedIn ? !!selectedCar && !!date : !!date;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
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
        padding: '24px 20px 48px',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform 350ms ${DNA.easing.out}`,
      }}>
        {/* Handle */}
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

        {step === 'form' ? (
          <>
            <p style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em',
              color: '#8E8E93', marginBottom: 6,
            }}>
              Agendar servicio
            </p>
            <h2 style={{
              fontFamily: clash, fontSize: 22, fontWeight: 500,
              letterSpacing: '-0.02em', color: '#F5F0E8', marginBottom: 4,
            }}>
              {option.name}
            </h2>
            <p style={{
              fontFamily: cabinet, fontSize: 13, color: '#8E8E93', marginBottom: 24,
            }}>
              {service.name} · S/ {option.price}
            </p>

            {/* Car selector (only if logged in) */}
            {loggedIn && ownedCars.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <label style={{
                  display: 'block',
                  fontFamily: cabinet, fontSize: 11, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  color: '#8E8E93', marginBottom: 8,
                }}>
                  Para qué auto
                </label>
                <select
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px',
                    borderRadius: DNA.radius.input,
                    border: '1.5px solid rgba(255,255,255,0.10)',
                    background: '#2C2C2E', color: '#F5F0E8',
                    fontFamily: cabinet, fontSize: 15,
                    outline: 'none', appearance: 'none',
                  }}
                >
                  {ownedCars.map(({ ownedCar, carName }) => (
                    <option key={ownedCar.id} value={ownedCar.id}>
                      {ownedCar.nickname ?? carName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                fontFamily: cabinet, fontSize: 11, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                color: '#8E8E93', marginBottom: 8,
              }}>
                Fecha
              </label>
              <input
                type="date"
                value={date}
                min={todayISO()}
                max={maxDateISO()}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px',
                  borderRadius: DNA.radius.input,
                  border: '1.5px solid rgba(255,255,255,0.10)',
                  background: '#2C2C2E', color: '#F5F0E8',
                  fontFamily: cabinet, fontSize: 15,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              style={{
                width: '100%', padding: '14px',
                borderRadius: DNA.radius.button,
                border: 'none',
                background: canConfirm ? service.accentColor : '#2C2C2E',
                color: canConfirm ? '#111111' : '#8E8E93',
                fontFamily: cabinet, fontSize: 14, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.06em',
                cursor: canConfirm ? 'pointer' : 'not-allowed',
              }}
            >
              Confirmar agendamiento
            </button>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: `${service.accentColor}14`,
              border: `2px solid ${service.accentColor}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 12 L10.5 15.5 L17 9"
                  stroke={service.accentColor} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{
              fontFamily: clash, fontSize: 24, fontWeight: 500,
              letterSpacing: '-0.02em', color: '#F5F0E8', marginBottom: 8,
            }}>
              ¡Agendado!
            </h2>
            <p style={{
              fontFamily: cabinet, fontSize: 14, color: '#8E8E93', marginBottom: 28,
            }}>
              {option.name} el {new Date(date + 'T12:00:00').toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <button
              onClick={onClose}
              style={{
                width: '100%', padding: '14px',
                borderRadius: DNA.radius.button,
                border: '1.5px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#F5F0E8',
                fontFamily: cabinet, fontSize: 14, fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
