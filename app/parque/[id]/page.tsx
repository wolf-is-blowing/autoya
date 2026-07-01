'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import { MOCK_OWNED_CARS, MOCK_CARS } from '@/lib/data';
import { CarProfile } from '@/components/parque/CarProfile';
import { PageWrapper } from '@/components/layout/PageWrapper';

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export default function CarProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id }     = use(params);
  const router     = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!authUtils.isLoggedIn()) {
      router.replace('/acceso?redirect=/parque');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  const ownedCar = MOCK_OWNED_CARS.find((c) => c.id === id);
  const car      = ownedCar ? MOCK_CARS.find((c) => c.id === ownedCar.carId) : undefined;

  if (!ownedCar || !car) {
    return (
      <PageWrapper>
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ fontFamily: cabinet, fontSize: 15, color: '#8E8E93' }}>
            Auto no encontrado.
          </p>
          <Link href="/parque" style={{ fontFamily: cabinet, fontSize: 14, color: '#0A84FF' }}>
            ← Volver a Mi Parque
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper noBottomPad>
      {/* Header de regreso */}
      <div style={{
        position: 'sticky',
        top: 60,
        zIndex: 40,
        background: 'rgba(17,17,17,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <Link
          href="/parque"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(28,28,30,0.80)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#F5F0E8',
            textDecoration: 'none',
            fontSize: 16,
          }}
          aria-label="Volver"
        >
          ←
        </Link>
        <span style={{
          fontFamily: cabinet,
          fontSize: 15,
          fontWeight: 500,
          color: '#F5F0E8',
        }}>
          {ownedCar.nickname ?? car.model}
        </span>
      </div>

      <CarProfile ownedCar={ownedCar} car={car} />

      {/* Bottom safe-area padding */}
      <div style={{ height: 88 }} />
    </PageWrapper>
  );
}
