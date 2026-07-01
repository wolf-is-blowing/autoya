/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import { ServiceIcon } from '@/components/icons/MoutoIcons';
import { ServiceQuickAction } from './ServiceQuickAction';
import type { OwnedCar, Car } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

/* ── Helpers ── */

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

/* ── Mock service history per car ── */
const MOCK_HISTORY: Record<string, Array<{
  label: string; serviceId: string; taller: string; price: number; ago: string;
}>> = {
  'oc_001': [
    { label: 'Mantenimiento completo', serviceId: 'mantenimiento', taller: 'Taller Maquinauto',   price: 180, ago: 'hace 3 meses' },
    { label: 'Lavado detailing',       serviceId: 'lavado',        taller: 'Car Care Lima',         price: 55,  ago: 'hace 5 meses' },
    { label: 'Cambio de aceite',       serviceId: 'mantenimiento', taller: 'Lubricentro Express',   price: 80,  ago: 'hace 8 meses' },
  ],
  'oc_002': [
    { label: 'Mantenimiento premium',  serviceId: 'mantenimiento', taller: 'BMW Certified Lima',    price: 320, ago: 'hace 2 meses' },
    { label: 'Pastillas de freno',     serviceId: 'mantenimiento', taller: 'Autopartes Pelayo',     price: 450, ago: 'hace 4 meses' },
    { label: 'Lavado completo',        serviceId: 'lavado',        taller: 'Detailing Pro Lima',    price: 180, ago: 'hace 7 meses' },
  ],
};

/* ── Spec row ── */
function SpecRow({ label, value, volt = false }: { label: string; value: string; volt?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontFamily: cabinet,
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.10em',
        color: '#8E8E93',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: cabinet,
        fontSize: 15,
        fontWeight: 500,
        color: volt ? '#C8F135' : '#F5F0E8',
      }}>
        {value}
      </span>
    </div>
  );
}

/* ── Props ── */
interface CarProfileProps {
  ownedCar: OwnedCar;
  car: Car;
}

export function CarProfile({ ownedCar, car }: CarProfileProps) {
  const status      = getRevisionStatus(ownedCar.km);
  const statusStyle = STATUS_STYLE[status];
  const brandSlug   = BRAND_SLUG[car.brandId];
  const value       = estimateValue(car, ownedCar.km);
  const history     = MOCK_HISTORY[ownedCar.id] ?? [];

  const perfSpecs   = car.specs.performance;

  return (
    <div>
      {/* ── Hero del auto ── */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
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
            background: 'linear-gradient(to bottom, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.85) 100%)',
          }}
        />
        {/* Nombre sobre la imagen */}
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 64 }}>
          <h1 style={{
            fontFamily: clash,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#F5F0E8',
            lineHeight: 1.1,
            marginBottom: 4,
          }}>
            {ownedCar.nickname ?? car.model}
          </h1>
          <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
            {car.model} · {car.version}
          </p>
        </div>
        {/* Logo de marca */}
        {brandSlug && (
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(28,28,30,0.80)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={`https://cdn.simpleicons.org/${brandSlug}/F5F0E8`}
              alt={car.brandId}
              width={20}
              height={20}
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>

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
            {/* Performance */}
            <SpecRow label="Motor"       value={car.engine} />
            <SpecRow label="Potencia"    value={perfSpecs['Potencia'] ?? `${car.horsepower} CV`} />
            <SpecRow label="0–100 km/h" value={perfSpecs['0-100 km/h'] ?? '—'} />
            <SpecRow label="Transmisión" value={formatTransmission(car.transmission)} />

            {/* Estado */}
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
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#F5F0E8',
                  background: '#2C2C2E',
                  borderRadius: 6,
                  padding: '3px 8px',
                  letterSpacing: '0.10em',
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
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  borderRadius: 9999,
                  padding: '3px 8px',
                  fontFamily: cabinet,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
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
            borderRadius: DNA.radius.card,
            background: '#1C1C1E',
            borderTop: `2px solid #C8F135`,
            padding: 20,
            boxShadow: DNA.shadow.card,
          }}>
            <p style={{
              fontFamily: cabinet, fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: '#8E8E93', marginBottom: 8,
            }}>
              Valor estimado
            </p>
            <p style={{
              fontFamily: clash,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#F5F0E8',
              marginBottom: 4,
            }}>
              S/ {value.toLocaleString('es-PE')}
            </p>
            <p style={{
              fontFamily: cabinet, fontSize: 13, color: '#8E8E93', marginBottom: 16,
            }}>
              Basado en km y año del vehículo
            </p>
            <button style={{
              width: '100%',
              padding: '10px',
              borderRadius: DNA.radius.button,
              border: '1.5px solid rgba(200,241,53,0.50)',
              color: '#C8F135',
              fontFamily: cabinet,
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'transparent',
              cursor: 'pointer',
            }}>
              Poner en venta
            </button>
          </div>
        </div>
      </FadeInView>

      {/* ── Historial de servicios ── */}
      {history.length > 0 && (
        <FadeInView>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em',
              color: '#8E8E93', marginBottom: 16,
            }}>
              Historial de servicios
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {history.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    background: '#2C2C2E',
                    borderRadius: DNA.radius.chip,
                  }}
                >
                  {/* Icono */}
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: DNA.radius.chip,
                    background: '#1C1C1E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#8E8E93',
                  }}>
                    <ServiceIcon id={h.serviceId} size={18} />
                  </div>

                  {/* Texto */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: cabinet,
                      fontSize: 14,
                      fontWeight: 500,
                      color: '#F5F0E8',
                      marginBottom: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {h.label}
                    </p>
                    <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
                      {h.taller} · {h.ago}
                    </p>
                  </div>

                  {/* Precio */}
                  <span style={{
                    fontFamily: clash,
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#C8F135',
                    flexShrink: 0,
                  }}>
                    S/{h.price}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <Link
                href="/taller"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: cabinet,
                  fontSize: 13,
                  color: '#8E8E93',
                  textDecoration: 'none',
                  padding: '8px 0',
                }}
              >
                Ver todos en Taller →
              </Link>
            </div>
          </div>
        </FadeInView>
      )}

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
    </div>
  );
}
