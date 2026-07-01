/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import { ServiceQuickAction } from './ServiceQuickAction';
import { HealthScoreCard }    from './HealthScoreCard';
import { DiaryTimeline }      from './DiaryTimeline';
import { SaveMemoryModal }    from './SaveMemoryModal';
import { getMemoriesForCar }           from '@/lib/driving-mode';
import { MOCK_MEMORIES }               from '@/lib/data';
import { shareMemoryToRuta, hasSharedMemory } from '@/lib/ruta';
import { IconShare }                   from '@/components/icons/MoutoIcons';
import type { OwnedCar, Car, TripMemory } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const BRAND_SLUG: Record<string, string> = {
  toyota: 'toyota', hyundai: 'hyundai', kia: 'kia', nissan: 'nissan',
  chevrolet: 'chevrolet', volkswagen: 'volkswagen', bmw: 'bmw',
  audi: 'audi', suzuki: 'suzuki', mitsubishi: 'mitsubishi',
  honda: 'honda', mazda: 'mazda', ford: 'ford', renault: 'renault',
  peugeot: 'peugeot', jeep: 'jeep', volvo: 'volvo', porsche: 'porsche',
  landrover: 'landrover', lexus: 'lexus', subaru: 'subaru',
};

function getRevisionStatus(km: number): 'al día' | 'próximo' | 'vencido' {
  if (km < 30000) return 'al día';
  if (km < 50000) return 'próximo';
  return 'vencido';
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  'al día':  { bg: 'rgba(200,241,53,0.12)',  color: '#C8F135' },
  'próximo': { bg: 'rgba(10,132,255,0.12)',  color: '#0A84FF' },
  'vencido': { bg: 'rgba(255,59,48,0.12)',   color: '#FF3B30' },
};

function estimateValue(car: Car, km: number): number {
  const age              = new Date().getFullYear() - car.year;
  const depreciationRate = Math.min(age * 0.10 + (km / 200000) * 0.20, 0.45);
  return Math.round(car.price * (1 - depreciationRate) / 1000) * 1000;
}

function formatTransmission(t: string): string {
  return { automatico: 'Automático', manual: 'Manual', cvt: 'CVT' }[t] ?? t;
}

function SpecRow({ label, value, volt = false }: { label: string; value: string; volt?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontFamily: cabinet, fontSize: 10, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: cabinet, fontSize: 15, fontWeight: 500,
        color: volt ? '#C8F135' : '#F5F0E8',
      }}>
        {value}
      </span>
    </div>
  );
}

interface CarProfileProps {
  ownedCar: OwnedCar;
  car: Car;
}

export function CarProfile({ ownedCar, car }: CarProfileProps) {
  const [memories,        setMemories]        = useState<TripMemory[]>([]);
  const [showSaveMemory,  setShowSaveMemory]  = useState(false);
  const [sharedIds,       setSharedIds]       = useState<Set<string>>(new Set());

  useEffect(() => {
    const mock   = MOCK_MEMORIES.filter((m) => m.ownedCarId === ownedCar.id);
    const stored = getMemoriesForCar(ownedCar.id);
    const all    = [...mock, ...stored];
    setMemories(all);
    const shared = new Set(all.filter((m) => hasSharedMemory(m.id)).map((m) => m.id));
    setSharedIds(shared);
  }, [ownedCar.id]);

  function handleShareMemory(mem: TripMemory) {
    if (sharedIds.has(mem.id)) return;
    shareMemoryToRuta(mem);
    setSharedIds((prev) => new Set([...prev, mem.id]));
  }

  const status      = getRevisionStatus(ownedCar.km);
  const statusStyle = STATUS_STYLE[status];
  const brandSlug   = BRAND_SLUG[car.brandId];
  const value       = estimateValue(car, ownedCar.km);
  const perfSpecs   = car.specs.performance;
  const carName     = ownedCar.nickname ?? car.model;

  return (
    <div>
      {/* ── Hero del auto ── */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img
          src={ownedCar.image}
          alt={carName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.85) 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 64 }}>
          <h1 style={{
            fontFamily: clash, fontSize: 32, fontWeight: 500,
            letterSpacing: '-0.02em', color: '#F5F0E8',
            lineHeight: 1.1, marginBottom: 4,
          }}>
            {carName}
          </h1>
          <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
            {car.model} · {car.version}
          </p>
        </div>
        {brandSlug && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(28,28,30,0.80)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src={`https://cdn.simpleicons.org/${brandSlug}/F5F0E8`}
              alt={car.brandId} width={20} height={20}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

      {/* ── Health Score ── */}
      <FadeInView>
        <div style={{ padding: '20px 20px 0' }}>
          <HealthScoreCard ownedCarId={ownedCar.id} fallbackKm={ownedCar.km} />
        </div>
      </FadeInView>

      {/* ── Specs ── */}
      <FadeInView>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{
            fontFamily: cabinet, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 16,
          }}>
            Especificaciones
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px' }}>
            <SpecRow label="Motor"       value={car.engine} />
            <SpecRow label="Potencia"    value={perfSpecs['Potencia'] ?? `${car.horsepower} CV`} />
            <SpecRow label="0–100 km/h" value={perfSpecs['0-100 km/h'] ?? '—'} />
            <SpecRow label="Transmisión" value={formatTransmission(car.transmission)} />
            <SpecRow label="Kilometraje" value={`${ownedCar.km.toLocaleString('es-PE')} km`} volt />
            <SpecRow label="Año"         value={String(car.year)} />
            <div>
              <span style={{
                fontFamily: cabinet, fontSize: 10, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
              }}>
                Placa
              </span>
              <div style={{ marginTop: 4 }}>
                <span style={{
                  fontFamily: 'monospace', fontSize: 14, fontWeight: 600,
                  color: '#F5F0E8', background: '#2C2C2E',
                  borderRadius: 6, padding: '3px 8px', letterSpacing: '0.10em',
                }}>
                  {ownedCar.plate}
                </span>
              </div>
            </div>
            <div>
              <span style={{
                fontFamily: cabinet, fontSize: 10, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
              }}>
                Rev. técnica
              </span>
              <div style={{ marginTop: 4 }}>
                <span style={{
                  background: statusStyle.bg, color: statusStyle.color,
                  borderRadius: 9999, padding: '3px 8px',
                  fontFamily: cabinet, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>

      {/* ── Valorización ── */}
      <FadeInView>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            borderRadius: DNA.radius.card, background: '#1C1C1E',
            borderTop: '2px solid #C8F135', padding: 20, boxShadow: DNA.shadow.card,
          }}>
            <p style={{
              fontFamily: cabinet, fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: '#8E8E93', marginBottom: 8,
            }}>
              Valor estimado
            </p>
            <p style={{
              fontFamily: clash, fontSize: 28, fontWeight: 500,
              letterSpacing: '-0.02em', color: '#F5F0E8', marginBottom: 4,
            }}>
              S/ {value.toLocaleString('es-PE')}
            </p>
            <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93', marginBottom: 16 }}>
              Basado en km y año del vehículo
            </p>
            <button style={{
              width: '100%', padding: '10px',
              borderRadius: DNA.radius.button,
              border: '1.5px solid rgba(200,241,53,0.50)',
              color: '#C8F135', fontFamily: cabinet, fontSize: 13, fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              background: 'transparent', cursor: 'pointer',
            }}>
              Poner en venta
            </button>
          </div>
        </div>
      </FadeInView>

      {/* ── Memories grid ── */}
      <FadeInView>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 16,
          }}>
            <p style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
            }}>
              Auto Memories
            </p>
            <button
              onClick={() => setShowSaveMemory(true)}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: cabinet, fontSize: 12, color: '#C8F135',
                cursor: 'pointer',
              }}
            >
              + Guardar recuerdo
            </button>
          </div>

          {memories.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '24px',
              background: '#2C2C2E', borderRadius: DNA.radius.chip,
            }}>
              <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93' }}>
                Aún no tienes recuerdos guardados
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}>
              {memories.slice(0, 6).map((mem) => {
                const shared = sharedIds.has(mem.id);
                return (
                  <div
                    key={mem.id}
                    style={{
                      position: 'relative', aspectRatio: '1',
                      borderRadius: 12, overflow: 'hidden',
                    }}
                  >
                    <img
                      src={mem.photo}
                      alt={mem.caption}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, transparent 45%, rgba(17,17,17,0.80) 100%)',
                    }} />
                    <p style={{
                      position: 'absolute', bottom: 8, left: 8, right: 8,
                      fontFamily: cabinet, fontSize: 11, fontWeight: 500,
                      color: '#F5F0E8', margin: 0,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {mem.caption}
                    </p>
                    {/* Share to Ruta button */}
                    <button
                      onClick={() => handleShareMemory(mem)}
                      style={{
                        position: 'absolute', top: 7, right: 7,
                        width: 28, height: 28, borderRadius: '50%',
                        background: shared
                          ? 'rgba(200,241,53,0.25)'
                          : 'rgba(17,17,17,0.65)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${shared ? 'rgba(200,241,53,0.50)' : 'rgba(255,255,255,0.15)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: shared ? '#C8F135' : '#F5F0E8',
                        cursor: shared ? 'default' : 'pointer',
                        transition: 'background 200ms, border-color 200ms',
                      }}
                      title={shared ? 'Ya compartido en Ruta' : 'Compartir en Ruta'}
                    >
                      <IconShare size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </FadeInView>

      {/* ── Diario del auto ── */}
      <FadeInView>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <DiaryTimeline ownedCarId={ownedCar.id} carName={carName} />
        </div>
      </FadeInView>

      {/* ── Agendar servicios ── */}
      <FadeInView>
        <div style={{ padding: '24px 20px' }}>
          <p style={{
            fontFamily: cabinet, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 16,
          }}>
            Agendar servicio
          </p>
          <ServiceQuickAction carId={ownedCar.id} />
        </div>
      </FadeInView>

      {/* ── Save Memory Modal ── */}
      {showSaveMemory && (
        <SaveMemoryModal
          ownedCarId={ownedCar.id}
          onSaved={() => {
            setShowSaveMemory(false);
            // Refresh memories
            const mock   = MOCK_MEMORIES.filter((m) => m.ownedCarId === ownedCar.id);
            const stored = getMemoriesForCar(ownedCar.id);
            setMemories([...mock, ...stored]);
          }}
          onClose={() => setShowSaveMemory(false)}
        />
      )}
    </div>
  );
}
