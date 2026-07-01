'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import { MOCK_OWNED_CARS, MOCK_CARS, MOCK_QUOTATIONS } from '@/lib/data';
import { CarCard } from '@/components/parque/CarCard';
import { QuotationCard } from '@/components/parque/QuotationCard';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type Tab = 'autos' | 'cotis';

/* ── Empty state: car blueprint ── */
function EmptyAutos() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <svg width="120" height="72" viewBox="0 0 120 72" fill="none" aria-hidden style={{ margin: '0 auto 24px' }}>
        <rect x="12" y="24" width="96" height="36" rx="10" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M24 24 L32 10 L88 10 L96 24" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="4 3" strokeLinejoin="round"/>
        <circle cx="30" cy="60" r="8" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="90" cy="60" r="8" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="4 3"/>
        <line x1="38" y1="60" x2="82" y2="60" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="4 3"/>
        <rect x="42" y="16" width="36" height="16" rx="3" stroke="#3A3A3C" strokeWidth="1" strokeDasharray="3 2"/>
      </svg>
      <h3 style={{
        fontFamily: clash, fontSize: 20, fontWeight: 500,
        letterSpacing: '-0.01em', color: '#F5F0E8', marginBottom: 8,
      }}>
        Aún no tienes autos en tu parque
      </h3>
      <p style={{
        fontFamily: cabinet, fontSize: 14, color: '#8E8E93',
        lineHeight: 1.6, marginBottom: 24,
      }}>
        Agrega tu auto o empieza a buscar uno
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link href="/taller?tab=busqueda">
          <Button variant="volt" size="md" fullWidth>Encontrar mi auto</Button>
        </Link>
        <Button variant="ghost" size="md" fullWidth>Agregar auto existente</Button>
      </div>
    </div>
  );
}

function EmptyQuotations() {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden style={{ margin: '0 auto 24px' }}>
        <rect x="16" y="12" width="48" height="56" rx="6" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="4 3"/>
        <line x1="28" y1="28" x2="52" y2="28" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="3 2"/>
        <line x1="28" y1="38" x2="52" y2="38" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="3 2"/>
        <line x1="28" y1="48" x2="44" y2="48" stroke="#3A3A3C" strokeWidth="1.5" strokeDasharray="3 2"/>
      </svg>
      <h3 style={{
        fontFamily: clash, fontSize: 20, fontWeight: 500,
        letterSpacing: '-0.01em', color: '#F5F0E8', marginBottom: 8,
      }}>
        No tienes cotizaciones activas
      </h3>
      <p style={{
        fontFamily: cabinet, fontSize: 14, color: '#8E8E93',
        lineHeight: 1.6, marginBottom: 24,
      }}>
        Inicia tu búsqueda para encontrar el auto ideal
      </p>
      <Link href="/taller?tab=busqueda">
        <Button variant="volt" size="md" fullWidth>Iniciar búsqueda</Button>
      </Link>
    </div>
  );
}

export default function ParquePage() {
  const router  = useRouter();
  const [ready, setReady]  = useState(false);
  const [tab,   setTab]    = useState<Tab>('autos');
  const [user,  setUser]   = useState<User | null>(null);

  useEffect(() => {
    if (!authUtils.isLoggedIn()) {
      router.replace('/acceso?redirect=/parque');
      return;
    }
    setUser(authUtils.getUser());
    setReady(true);
  }, [router]);

  if (!ready) return null;

  const firstName = user?.name.split(' ')[0] ?? 'tú';

  /* Cross-reference data */
  const ownedWithCar = MOCK_OWNED_CARS.map((oc) => ({
    ownedCar: oc,
    car: MOCK_CARS.find((c) => c.id === oc.carId)!,
  })).filter((e) => !!e.car);

  const quotationsWithCar = MOCK_QUOTATIONS.map((q) => ({
    quotation: q,
    car: MOCK_CARS.find((c) => c.id === q.carId)!,
  })).filter((e) => !!e.car);

  return (
    <PageWrapper>
      <div style={{ padding: '0 20px' }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: 24, paddingBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <h1 style={{
                fontFamily: clash,
                fontSize: 'clamp(28px, 7vw, 36px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F0E8',
                lineHeight: 1.1,
                marginBottom: 4,
              }}>
                Hola, {firstName}
              </h1>
              <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
                Tu parque personal
              </p>
            </div>
            <button style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 9999,
              border: '1.5px solid rgba(200,241,53,0.60)',
              background: 'transparent',
              color: '#C8F135',
              fontFamily: cabinet,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
              Agregar auto
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          {(['autos', 'cotis'] as const).map((t) => {
            const isActive = tab === t;
            const label    = t === 'autos' ? 'Mis Autos' : 'Mis Cotis';
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '10px 0',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #C8F135' : '2px solid transparent',
                  background: 'transparent',
                  fontFamily: cabinet,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#F5F0E8' : '#8E8E93',
                  cursor: 'pointer',
                  transition: 'color 200ms, border-color 200ms',
                }}
              >
                {label}
                {t === 'cotis' && quotationsWithCar.length > 0 && (
                  <span style={{
                    marginLeft: 6,
                    background: '#0A84FF',
                    color: '#F5F0E8',
                    borderRadius: 9999,
                    padding: '1px 6px',
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {quotationsWithCar.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab content ── */}
        <div style={{ opacity: 1, transition: 'opacity 200ms ease' }}>

          {/* MIS AUTOS */}
          {tab === 'autos' && (
            <div>
              {ownedWithCar.length === 0 ? (
                <EmptyAutos />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 20 }}>
                  {ownedWithCar.map(({ ownedCar, car }) => (
                    <CarCard key={ownedCar.id} ownedCar={ownedCar} car={car} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MIS COTIS */}
          {tab === 'cotis' && (
            <div>
              {quotationsWithCar.length === 0 ? (
                <EmptyQuotations />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 20 }}>
                  {quotationsWithCar.map(({ quotation, car }) => (
                    <QuotationCard key={quotation.id} quotation={quotation} car={car} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
