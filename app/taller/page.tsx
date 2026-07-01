'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICES, SERVICE_OPTIONS, MOCK_CARS } from '@/lib/data';
import { BrowseCarCard } from '@/components/taller/BrowseCarCard';
import { ServiceRow } from '@/components/taller/ServiceRow';
import { PageWrapper } from '@/components/layout/PageWrapper';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type Tab      = 'busqueda' | 'servicios';
type Category = 'todo' | 'suv' | 'sedan' | 'hatchback';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'todo',      label: 'Todo'      },
  { id: 'suv',       label: 'SUV'       },
  { id: 'sedan',     label: 'Sedán'     },
  { id: 'hatchback', label: 'Hatchback' },
];

function TallerContent() {
  const searchParams = useSearchParams();
  const initialTab   = (searchParams.get('tab') as Tab) ?? 'busqueda';

  const [tab,      setTab]      = useState<Tab>(initialTab);
  const [category, setCategory] = useState<Category>('todo');

  const mainServices = SERVICES.filter((s) => s.id !== 'busqueda');

  const filteredCars = category === 'todo'
    ? MOCK_CARS
    : MOCK_CARS.filter((c) => c.category === category);

  return (
    <PageWrapper>
      <div style={{ padding: '0 20px' }}>

        {/* Header */}
        <div style={{ paddingTop: 24, paddingBottom: 20 }}>
          <h1 style={{
            fontFamily: clash,
            fontSize: 'clamp(28px, 7vw, 36px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F0E8',
            lineHeight: 1.1,
            marginBottom: 4,
          }}>
            Taller
          </h1>
          <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
            {tab === 'busqueda' ? 'Encuentra tu próximo auto' : 'Servicios para tu auto'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          {([
            { id: 'busqueda'  as Tab, label: 'Buscar auto' },
            { id: 'servicios' as Tab, label: 'Servicios'   },
          ]).map(({ id, label }) => {
            const isActive = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
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
              </button>
            );
          })}
        </div>

        {/* ── TAB: BUSQUEDA ── */}
        {tab === 'busqueda' && (
          <div>
            {/* Category chips */}
            <div style={{
              display: 'flex', gap: 8, marginBottom: 20,
              overflowX: 'auto' as const, paddingBottom: 4,
            }}>
              {CATEGORIES.map(({ id, label }) => {
                const isActive = category === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCategory(id)}
                    style={{
                      flexShrink: 0,
                      padding: '7px 16px',
                      borderRadius: 9999,
                      border: isActive
                        ? '1.5px solid #C8F135'
                        : '1.5px solid rgba(255,255,255,0.12)',
                      background: isActive ? 'rgba(200,241,53,0.10)' : 'transparent',
                      color: isActive ? '#C8F135' : '#8E8E93',
                      fontFamily: cabinet,
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 150ms',
                      whiteSpace: 'nowrap' as const,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Car cards */}
            {filteredCars.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '48px 0',
                fontFamily: cabinet, fontSize: 14, color: '#8E8E93',
              }}>
                No hay autos en esta categoría.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 20 }}>
                {filteredCars.map((car) => (
                  <BrowseCarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: SERVICIOS ── */}
        {tab === 'servicios' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
            {mainServices.map((service) => {
              const options = SERVICE_OPTIONS.filter((o) => o.serviceId === service.id);
              return (
                <ServiceRow key={service.id} service={service} options={options} />
              );
            })}
          </div>
        )}

      </div>
    </PageWrapper>
  );
}

export default function TallerPage() {
  return (
    <Suspense>
      <TallerContent />
    </Suspense>
  );
}
