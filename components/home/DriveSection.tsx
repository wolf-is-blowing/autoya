'use client';

import { useState, useEffect } from 'react';
import { authUtils } from '@/lib/auth';
import { MOCK_OWNED_CARS, MOCK_CARS } from '@/lib/data';
import { DrivingModeButton } from '@/components/parque/DrivingModeButton';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function DriveSection() {
  const [ready,   setReady]   = useState(false);
  const [hasCars, setHasCars] = useState(false);

  useEffect(() => {
    setReady(authUtils.isLoggedIn() && MOCK_OWNED_CARS.length > 0);
    setHasCars(MOCK_OWNED_CARS.length > 0);
  }, []);

  if (!ready || !hasCars) return null;

  const ownedCars = MOCK_OWNED_CARS.map((oc) => ({
    ownedCar: oc,
    car:      MOCK_CARS.find((c) => c.id === oc.carId)!,
  })).filter((e) => !!e.car);

  return (
    <section style={{
      padding: '0 20px',
      marginBottom: 64,
    }}>
      <div style={{
        background: '#1C1C1E',
        borderRadius: '18px',
        padding: '20px',
        borderTop: '2px solid rgba(200,241,53,0.30)',
      }}>
        <p style={{
          fontFamily: cabinet, fontSize: 10, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: '#8E8E93', marginBottom: 4,
        }}>
          Modo Conducción
        </p>
        <p style={{
          fontFamily: clash, fontSize: 18, fontWeight: 500,
          letterSpacing: '-0.01em', color: '#F5F0E8', marginBottom: 16,
        }}>
          ¿Adónde vas hoy?
        </p>
        <DrivingModeButton ownedCars={ownedCars} />
      </div>
    </section>
  );
}
