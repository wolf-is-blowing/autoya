/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authUtils } from '@/lib/auth';
import { BRANDS, MOCK_OWNED_CARS, MOCK_CARS } from '@/lib/data';
import { FadeInView } from '@/components/ui/FadeInView';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DNA } from '@/lib/design/dna';
import type { User } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: cabinet,
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.10em',
  color: '#8E8E93',
  marginBottom: 12,
};

function ChevronRight() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
      stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function PerfilPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user,  setUser]  = useState<User | null>(null);

  useEffect(() => {
    if (!authUtils.isLoggedIn()) {
      router.replace('/acceso?redirect=/perfil');
      return;
    }
    setUser(authUtils.getUser());
    setReady(true);
  }, [router]);

  if (!ready || !user) return null;

  const brandMap     = Object.fromEntries(BRANDS.map((b) => [b.id, b]));
  const ownedWithCar = MOCK_OWNED_CARS
    .map((oc) => ({ ownedCar: oc, car: MOCK_CARS.find((c) => c.id === oc.carId)! }))
    .filter((e) => !!e.car);

  function handleLogout() {
    authUtils.logout();
    router.replace('/acceso');
  }

  const STATS = [
    { label: 'Amigos',    value: user.stats.amigos           },
    { label: 'Caravanas', value: user.stats.caravanas         },
    { label: 'Autos',     value: user.stats.autosEnPosesion   },
  ];

  const CONFIG_ROWS = [
    'Editar perfil',
    'Notificaciones',
    'Privacidad',
    'Ayuda y soporte',
  ];

  return (
    <PageWrapper>
      <div style={{ padding: '0 20px' }}>

        {/* ── Hero: avatar + identidad ── */}
        <div style={{
          paddingTop: 32, paddingBottom: 28,
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%', overflow: 'hidden',
            border: '2px solid rgba(200,241,53,0.40)', flexShrink: 0,
          }}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%', background: '#1C1C1E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: clash, fontSize: 28, color: '#C8F135',
              }}>
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Nombre + código + bio */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{
              fontFamily: clash, fontSize: 24, fontWeight: 500,
              letterSpacing: '-0.02em', color: '#F5F0E8',
              lineHeight: 1.15, marginBottom: 6,
            }}>
              {user.name}
            </h1>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontFamily: 'monospace', fontSize: 11, fontWeight: 600,
                color: '#8E8E93', background: '#2C2C2E',
                borderRadius: 6, padding: '3px 8px',
                letterSpacing: '0.10em',
              }}>
                {user.driverCode}
              </span>
            </div>
            {user.bio && (
              <p style={{
                fontFamily: cabinet, fontSize: 13, color: '#8E8E93', lineHeight: 1.4,
              }}>
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* ── Stats ── */}
        <FadeInView>
          <div style={{
            background: '#1C1C1E',
            borderRadius: DNA.radius.card,
            boxShadow: DNA.shadow.card,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            marginBottom: 28,
          }}>
            {STATS.map(({ label, value }, i) => (
              <div key={label} style={{
                textAlign: 'center',
                padding: '18px 0',
                borderRight: i < STATS.length - 1
                  ? '1px solid rgba(255,255,255,0.07)'
                  : 'none',
              }}>
                <p style={{
                  fontFamily: clash, fontSize: 26, fontWeight: 500,
                  letterSpacing: '-0.02em', color: '#F5F0E8', marginBottom: 3,
                }}>
                  {value}
                </p>
                <p style={{ fontFamily: cabinet, fontSize: 11, color: '#8E8E93' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeInView>

        {/* ── Marcas favoritas ── */}
        {user.favoriteBrands.length > 0 && (
          <FadeInView>
            <div style={{ marginBottom: 28 }}>
              <p style={SECTION_LABEL}>Marcas favoritas</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {user.favoriteBrands.map((brandId) => {
                  const brand = brandMap[brandId];
                  if (!brand) return null;
                  return (
                    <div key={brandId} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: '#1C1C1E',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 9999,
                      padding: '7px 14px 7px 9px',
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: brand.color, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{
                          fontFamily: 'monospace', fontSize: 7,
                          fontWeight: 800, color: '#fff',
                          lineHeight: 1,
                        }}>
                          {brand.initials.charAt(0)}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: cabinet, fontSize: 13,
                        fontWeight: 500, color: '#F5F0E8',
                      }}>
                        {brand.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeInView>
        )}

        {/* ── Mis autos ── */}
        {ownedWithCar.length > 0 && (
          <FadeInView>
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 12,
              }}>
                <p style={{ ...SECTION_LABEL, marginBottom: 0 }}>Mis autos</p>
                <Link href="/parque" style={{
                  fontFamily: cabinet, fontSize: 12,
                  color: '#0A84FF', textDecoration: 'none',
                }}>
                  Ver parque
                </Link>
              </div>
              <div style={{
                background: '#1C1C1E',
                borderRadius: DNA.radius.card,
                overflow: 'hidden',
                boxShadow: DNA.shadow.card,
              }}>
                {ownedWithCar.map(({ ownedCar, car }, i) => (
                  <Link
                    key={ownedCar.id}
                    href={`/parque/${ownedCar.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 16px',
                      borderBottom: i < ownedWithCar.length - 1
                        ? '1px solid rgba(255,255,255,0.06)'
                        : 'none',
                      textDecoration: 'none',
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{
                      width: 54, height: 36, borderRadius: 8,
                      overflow: 'hidden', flexShrink: 0,
                    }}>
                      <img
                        src={ownedCar.image}
                        alt={ownedCar.nickname ?? car.model}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: cabinet, fontSize: 14, fontWeight: 600,
                        color: '#F5F0E8', marginBottom: 2,
                      }}>
                        {ownedCar.nickname ?? car.model}
                      </p>
                      <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
                        {car.model} · {ownedCar.km.toLocaleString('es-PE')} km
                      </p>
                    </div>

                    <ChevronRight />
                  </Link>
                ))}
              </div>
            </div>
          </FadeInView>
        )}

        {/* ── Configuración ── */}
        <FadeInView>
          <div style={{ marginBottom: 28 }}>
            <p style={SECTION_LABEL}>Configuración</p>
            <div style={{
              background: '#1C1C1E',
              borderRadius: DNA.radius.card,
              overflow: 'hidden',
              boxShadow: DNA.shadow.card,
            }}>
              {CONFIG_ROWS.map((label, i) => (
                <button
                  key={label}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '15px 16px',
                    borderBottom: i < CONFIG_ROWS.length - 1
                      ? '1px solid rgba(255,255,255,0.06)'
                      : 'none',
                    background: 'transparent', border: 'none',
                    fontFamily: cabinet, fontSize: 15, color: '#F5F0E8',
                    textAlign: 'left' as const, cursor: 'pointer',
                  }}
                >
                  {label}
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        </FadeInView>

        {/* ── Cerrar sesión ── */}
        <FadeInView>
          <div style={{ paddingBottom: 8 }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%', padding: '14px',
                borderRadius: DNA.radius.button,
                border: '1.5px solid rgba(255,59,48,0.30)',
                background: 'rgba(255,59,48,0.08)',
                color: '#FF3B30',
                fontFamily: cabinet, fontSize: 14, fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </FadeInView>

      </div>
    </PageWrapper>
  );
}
