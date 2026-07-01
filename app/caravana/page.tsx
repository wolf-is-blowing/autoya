/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/lib/auth';
import { MOCK_CARAVANAS } from '@/lib/data';
import { CaravanaCard, TYPE_META } from '@/components/caravana/CaravanaCard';
import { FadeInView } from '@/components/ui/FadeInView';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { DNA } from '@/lib/design/dna';
import type { User } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type Tab       = 'mis' | 'descubrir';
type TypeFilter = 'todo' | 'brand' | 'color' | 'amigos';

const FILTERS: { id: TypeFilter; label: string }[] = [
  { id: 'todo',    label: 'Todo'    },
  { id: 'brand',   label: 'Marca'   },
  { id: 'color',   label: 'Color'   },
  { id: 'amigos',  label: 'Amigos'  },
];

/* Simula las caravanas a las que el usuario pertenece */
const JOINED_IDS = new Set(['ca_001', 'ca_002', 'ca_003']);

export default function CaravanaPage() {
  const router = useRouter();
  const [ready,   setReady]   = useState(false);
  const [user,    setUser]    = useState<User | null>(null);
  const [tab,     setTab]     = useState<Tab>('mis');
  const [filter,  setFilter]  = useState<TypeFilter>('todo');
  const [joined,  setJoined]  = useState<Set<string>>(JOINED_IDS);

  useEffect(() => {
    if (!authUtils.isLoggedIn()) {
      router.replace('/acceso?redirect=/caravana');
      return;
    }
    setUser(authUtils.getUser());
    setReady(true);
  }, [router]);

  if (!ready || !user) return null;

  const myCaravanas = MOCK_CARAVANAS.filter((c) => joined.has(c.id));

  const discovered = filter === 'todo'
    ? MOCK_CARAVANAS
    : MOCK_CARAVANAS.filter((c) => c.type === filter);

  function toggleJoin(id: string) {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <PageWrapper>
      <div style={{ padding: '0 20px' }}>

        {/* ── Header ── */}
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
            Caravana
          </h1>
          <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
            Tu comunidad de conductores
          </p>
        </div>

        {/* ── Tabs ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 24,
        }}>
          {([
            { id: 'mis' as Tab,       label: 'Mis Caravanas' },
            { id: 'descubrir' as Tab, label: 'Descubrir'     },
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
                {id === 'mis' && myCaravanas.length > 0 && (
                  <span style={{
                    marginLeft: 6,
                    background: '#0A84FF',
                    color: '#F5F0E8',
                    borderRadius: 9999,
                    padding: '1px 6px',
                    fontSize: 10, fontWeight: 700,
                  }}>
                    {myCaravanas.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── TAB: MIS CARAVANAS ── */}
        {tab === 'mis' && (
          <div>
            {myCaravanas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <p style={{
                  fontFamily: clash, fontSize: 20, fontWeight: 500,
                  color: '#F5F0E8', marginBottom: 8,
                }}>
                  Aún no te has unido a ninguna
                </p>
                <p style={{
                  fontFamily: cabinet, fontSize: 14, color: '#8E8E93',
                  marginBottom: 24,
                }}>
                  Descubre caravanas de tu marca o comunidad
                </p>
                <button
                  onClick={() => setTab('descubrir')}
                  style={{
                    padding: '11px 24px',
                    borderRadius: DNA.radius.button,
                    border: '1.5px solid rgba(200,241,53,0.50)',
                    background: 'rgba(200,241,53,0.10)',
                    color: '#C8F135',
                    fontFamily: cabinet, fontSize: 13, fontWeight: 600,
                    textTransform: 'uppercase' as const, letterSpacing: '0.05em',
                    cursor: 'pointer',
                  }}
                >
                  Explorar caravanas
                </button>
              </div>
            ) : (
              <div>
                {/* Stat resumen */}
                <FadeInView>
                  <div style={{
                    background: '#1C1C1E',
                    borderRadius: DNA.radius.card,
                    padding: '16px 20px',
                    marginBottom: 20,
                    display: 'flex', alignItems: 'center', gap: 16,
                    boxShadow: DNA.shadow.card,
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: clash, fontSize: 28, fontWeight: 500,
                        color: '#C8F135', letterSpacing: '-0.02em', lineHeight: 1,
                        marginBottom: 2,
                      }}>
                        {myCaravanas.length}
                      </p>
                      <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
                        caravanas activas
                      </p>
                    </div>
                    <div style={{
                      width: 1, height: 40, background: 'rgba(255,255,255,0.08)',
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: clash, fontSize: 28, fontWeight: 500,
                        color: '#F5F0E8', letterSpacing: '-0.02em', lineHeight: 1,
                        marginBottom: 2,
                      }}>
                        {myCaravanas.reduce((acc, c) => acc + c.memberCount, 0).toLocaleString('es-PE')}
                      </p>
                      <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
                        conductores en total
                      </p>
                    </div>
                  </div>
                </FadeInView>

                {/* Lista compacta */}
                <FadeInView>
                  <div style={{
                    background: '#1C1C1E',
                    borderRadius: DNA.radius.card,
                    overflow: 'hidden',
                    boxShadow: DNA.shadow.card,
                    marginBottom: 20,
                  }}>
                    {myCaravanas.map((caravana, i) => {
                      const meta = TYPE_META[caravana.type] ?? { label: caravana.type, color: '#8E8E93' };
                      return (
                        <div
                          key={caravana.id}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '14px 16px',
                            borderBottom: i < myCaravanas.length - 1
                              ? '1px solid rgba(255,255,255,0.06)'
                              : 'none',
                          }}
                        >
                          {/* Thumbnail */}
                          <div style={{
                            width: 52, height: 36, borderRadius: 8,
                            overflow: 'hidden', flexShrink: 0,
                          }}>
                            <img
                              src={caravana.image}
                              alt={caravana.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontFamily: cabinet, fontSize: 14, fontWeight: 600,
                              color: '#F5F0E8', marginBottom: 2,
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                              {caravana.name}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{
                                fontFamily: cabinet, fontSize: 10, fontWeight: 700,
                                color: meta.color, textTransform: 'uppercase' as const,
                                letterSpacing: '0.06em',
                              }}>
                                {meta.label}
                              </span>
                              <span style={{ color: '#3A3A3C', fontSize: 10 }}>·</span>
                              <span style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
                                {caravana.memberCount.toLocaleString('es-PE')} miembros
                              </span>
                            </div>
                          </div>

                          {/* Dot activo */}
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: '#C8F135', flexShrink: 0,
                          }} />
                        </div>
                      );
                    })}
                  </div>
                </FadeInView>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: DESCUBRIR ── */}
        {tab === 'descubrir' && (
          <div>
            {/* Filtros por tipo */}
            <div style={{
              display: 'flex', gap: 8, marginBottom: 20,
              overflowX: 'auto' as const, paddingBottom: 4,
            }}>
              {FILTERS.map(({ id, label }) => {
                const isActive = filter === id;
                const color = id === 'todo' ? '#C8F135' : (TYPE_META[id]?.color ?? '#C8F135');
                return (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    style={{
                      flexShrink: 0,
                      padding: '7px 16px',
                      borderRadius: 9999,
                      border: isActive
                        ? `1.5px solid ${color}`
                        : '1.5px solid rgba(255,255,255,0.12)',
                      background: isActive ? `${color}14` : 'transparent',
                      color: isActive ? color : '#8E8E93',
                      fontFamily: cabinet,
                      fontSize: 13, fontWeight: isActive ? 600 : 400,
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

            {/* Cards */}
            {discovered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <p style={{
                  fontFamily: clash, fontSize: 18, fontWeight: 500,
                  color: '#F5F0E8', marginBottom: 8,
                }}>
                  No hay caravanas aquí aún
                </p>
                <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
                  Pronto habrá más comunidades disponibles
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 20 }}>
                {discovered.map((caravana) => (
                  <FadeInView key={caravana.id}>
                    <CaravanaCard
                      caravana={caravana}
                      joined={joined.has(caravana.id)}
                      onJoin={() => toggleJoin(caravana.id)}
                    />
                  </FadeInView>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
