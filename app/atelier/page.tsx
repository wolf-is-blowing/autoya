/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PageWrapper }          from '@/components/layout/PageWrapper';
import { FadeInView }           from '@/components/ui/FadeInView';
import { DNA }                  from '@/lib/design/dna';
import { authUtils }            from '@/lib/auth';
import { BeforeAfterSlider }    from '@/components/atelier/BeforeAfterSlider';
import { ServiceIcon }          from '@/components/icons/MoutoIcons';
import { IconPaint, IconWheel, IconZap } from '@/components/icons/MoutoIcons';
import {
  ATELIER_CATEGORIES,
  ATELIER_OPTIONS,
  SAMPLE_CAR_IMAGE,
} from '@/lib/data/atelier';
import {
  generateTransformation,
  saveGeneration,
  getUserGenerations,
} from '@/lib/atelier-engine';
import { shareAtelierToRuta } from '@/lib/ruta';
import type { AtelierCategory, AtelierGeneration } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";
const ATELIER = '#B026FF';

// Atelier-to-taller service mapping
const CATEGORY_TALLER: Record<AtelierCategory, string> = {
  color:       '/taller?tab=servicios',
  styling:     '/taller?tab=servicios',
  llantas:     '/taller?tab=servicios',
  performance: '/taller?tab=servicios',
  interior:    '/taller?tab=servicios',
};

type Step = 1 | 2 | 3 | 4;

const SCAN_TEXTS = [
  'Analizando superficie…',
  'Procesando textura…',
  'Renderizando resultado…',
];

function CategoryIcon({ iconId, size = 28 }: { iconId: string; size?: number }) {
  if (iconId === 'paint')   return <IconPaint size={size} />;
  if (iconId === 'wheel')   return <IconWheel size={size} />;
  if (iconId === 'performance') return <IconZap size={size} />;
  return <ServiceIcon id={iconId} size={size} />;
}

// ── Scan overlay animation ─────────────────────────────────────────────────

function ScanOverlay({ imageUrl }: { imageUrl: string }) {
  const [textIdx, setTextIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIdx((i) => (i < SCAN_TEXTS.length - 1 ? i + 1 : i));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', borderRadius: DNA.radius.card, overflow: 'hidden' }}>
      <img
        src={imageUrl}
        alt=""
        style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
      />
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(17,17,17,0.55)',
      }} />
      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(176,38,255,0.07) 3px, rgba(176,38,255,0.07) 4px)',
        animation: 'scanMove 1.2s linear infinite',
      }} />
      {/* Purple sweep line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: 'linear-gradient(to right, transparent, #B026FF, transparent)',
        boxShadow: '0 0 8px rgba(176,38,255,0.8)',
        animation: 'scanSweep 1.2s ease-in-out infinite',
      }} />
      {/* Corner brackets HUD */}
      {[
        { top: 12,    left: 12,   borderTop: '2px solid #B026FF', borderLeft: '2px solid #B026FF',   width: 20, height: 20 },
        { top: 12,    right: 12,  borderTop: '2px solid #B026FF', borderRight: '2px solid #B026FF',  width: 20, height: 20 },
        { bottom: 12, left: 12,   borderBottom: '2px solid #B026FF', borderLeft: '2px solid #B026FF',  width: 20, height: 20 },
        { bottom: 12, right: 12,  borderBottom: '2px solid #B026FF', borderRight: '2px solid #B026FF', width: 20, height: 20 },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', ...s }} />
      ))}
      {/* Rotating text */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(17,17,17,0.90), transparent)',
        padding: '28px 16px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: ATELIER,
          boxShadow: `0 0 6px ${ATELIER}`,
          animation: 'pulse 1s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: cabinet, fontSize: 13, color: 'rgba(176,38,255,0.90)',
          fontWeight: 500, letterSpacing: '0.03em',
        }}>
          {SCAN_TEXTS[textIdx]}
        </span>
      </div>
      <style>{`
        @keyframes scanSweep {
          0%   { top: 0% }
          100% { top: 100% }
        }
        @keyframes scanMove {
          0%   { background-position-y: 0 }
          100% { background-position-y: 8px }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1 }
          50%       { opacity: 0.3 }
        }
      `}</style>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function AtelierPage() {
  const router = useRouter();

  const [step,         setStep]         = useState<Step>(1);
  const [carImage,     setCarImage]     = useState(SAMPLE_CAR_IMAGE);
  const [isGuest,      setIsGuest]      = useState(true);
  const [selectedCat,  setSelectedCat]  = useState<AtelierCategory | null>(null);
  const [selectedOpt,  setSelectedOpt]  = useState<string | null>(null);
  const [generating,   setGenerating]   = useState(false);
  const [generation,   setGeneration]   = useState<AtelierGeneration | null>(null);
  const [saved,        setSaved]        = useState(false);
  const [sharedRuta,   setSharedRuta]   = useState(false);
  const [savedGens,    setSavedGens]    = useState<AtelierGeneration[]>([]);

  useEffect(() => {
    const loggedIn = authUtils.isLoggedIn();
    setIsGuest(!loggedIn);
    setSavedGens(getUserGenerations());
  }, []);

  async function handleGenerate() {
    if (!selectedCat || !selectedOpt) return;
    setGenerating(true);
    setStep(4);
    const gen = await generateTransformation(carImage, selectedCat, selectedOpt);
    setGeneration(gen);
    setGenerating(false);
  }

  function handleSave() {
    if (!generation) return;
    saveGeneration(generation);
    setSaved(true);
    setSavedGens(getUserGenerations());
  }

  function handleShareRuta() {
    if (!generation || !selectedCat) return;
    const catLabel = ATELIER_CATEGORIES.find((c) => c.id === selectedCat)?.label ?? selectedCat;
    shareAtelierToRuta(generation.afterImageUrl, catLabel);
    setSharedRuta(true);
  }

  function handleCotizar() {
    if (!selectedCat) return;
    router.push(CATEGORY_TALLER[selectedCat]);
  }

  const filteredOptions = selectedCat
    ? ATELIER_OPTIONS.filter((o) => o.categoryId === selectedCat)
    : [];

  const selectedCatMeta = ATELIER_CATEGORIES.find((c) => c.id === selectedCat);

  return (
    <PageWrapper>
      <div style={{ padding: '0 20px' }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: 24, paddingBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
            <h1 style={{
              fontFamily: clash, fontSize: 'clamp(30px, 8vw, 40px)',
              fontWeight: 400, letterSpacing: '0.02em', color: '#F5F0E8', lineHeight: 1,
            }}>
              Atelier
            </h1>
            <span style={{
              background: 'rgba(176,38,255,0.12)',
              border: '1px solid rgba(176,38,255,0.30)',
              color: ATELIER,
              padding: '3px 10px', borderRadius: 9999,
              fontFamily: cabinet, fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase' as const, letterSpacing: '0.08em',
            }}>
              Beta
            </span>
          </div>
          <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
            Visualiza cambios en tu auto con IA
          </p>
        </div>

        {/* ── Step indicators ── */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 28, alignItems: 'center',
        }}>
          {([1,2,3,4] as Step[]).map((s) => (
            <div key={s} style={{
              height: 3, flex: 1, borderRadius: 2,
              background: s <= step ? ATELIER : 'rgba(255,255,255,0.10)',
              transition: 'background 300ms',
            }} />
          ))}
        </div>

        {/* ══════════════════════════════════════════
            PASO 1 — Seleccionar auto
        ══════════════════════════════════════════ */}
        {step === 1 && (
          <FadeInView>
            <div>
              <p style={{
                fontFamily: cabinet, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.10em',
                color: ATELIER, marginBottom: 16,
              }}>
                Paso 1 — Tu auto
              </p>

              {/* Car image preview */}
              <div style={{
                borderRadius: DNA.radius.card,
                overflow: 'hidden',
                marginBottom: 16,
                border: `1.5px solid rgba(176,38,255,0.20)`,
                boxShadow: `0 0 24px rgba(176,38,255,0.10)`,
              }}>
                <img
                  src={carImage}
                  alt="Tu auto"
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Guest notice */}
              {isGuest && (
                <div style={{
                  background: 'rgba(176,38,255,0.08)',
                  border: '1px solid rgba(176,38,255,0.20)',
                  borderRadius: DNA.radius.card,
                  padding: '12px 16px',
                  marginBottom: 20,
                }}>
                  <p style={{ fontFamily: cabinet, fontSize: 13, color: 'rgba(245,240,232,0.80)', lineHeight: 1.5 }}>
                    Estás probando con un auto de muestra.{' '}
                    <button
                      onClick={() => router.push('/acceso?redirect=/atelier')}
                      style={{
                        background: 'none', border: 'none', padding: 0,
                        color: ATELIER, fontFamily: cabinet, fontSize: 13,
                        fontWeight: 600, cursor: 'pointer', textDecoration: 'underline',
                      }}
                    >
                      Inicia sesión
                    </button>{' '}
                    y registra tu auto para resultados personalizados.
                  </p>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: DNA.radius.button,
                  border: 'none',
                  background: ATELIER,
                  color: '#F5F0E8',
                  fontFamily: cabinet, fontSize: 14, fontWeight: 600,
                  textTransform: 'uppercase' as const, letterSpacing: '0.06em',
                  cursor: 'pointer',
                  boxShadow: `0 0 20px rgba(176,38,255,0.30)`,
                }}
              >
                Continuar →
              </button>
            </div>
          </FadeInView>
        )}

        {/* ══════════════════════════════════════════
            PASO 2 — Elegir categoría
        ══════════════════════════════════════════ */}
        {step === 2 && (
          <FadeInView>
            <div>
              <p style={{
                fontFamily: cabinet, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.10em',
                color: ATELIER, marginBottom: 16,
              }}>
                Paso 2 — ¿Qué quieres cambiar?
              </p>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 12, marginBottom: 20,
              }}>
                {ATELIER_CATEGORIES.map((cat) => {
                  const active = selectedCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCat(cat.id);
                        setSelectedOpt(null);
                        setTimeout(() => setStep(3), 150);
                      }}
                      style={{
                        padding: '20px 16px',
                        borderRadius: DNA.radius.card,
                        border: active
                          ? `2px solid ${ATELIER}`
                          : '1.5px solid rgba(255,255,255,0.07)',
                        background: active
                          ? 'rgba(176,38,255,0.10)'
                          : '#1C1C1E',
                        color: active ? ATELIER : '#F5F0E8',
                        cursor: 'pointer',
                        textAlign: 'left' as const,
                        transition: 'border-color 150ms, background 150ms',
                        boxShadow: active ? `0 0 16px rgba(176,38,255,0.15)` : DNA.shadow.card,
                      }}
                    >
                      <div style={{ color: active ? ATELIER : '#8E8E93', marginBottom: 10 }}>
                        <CategoryIcon iconId={cat.iconId} size={28} />
                      </div>
                      <p style={{
                        fontFamily: cabinet, fontSize: 14, fontWeight: 600,
                        marginBottom: 4, color: active ? ATELIER : '#F5F0E8',
                      }}>
                        {cat.label}
                      </p>
                      <p style={{
                        fontFamily: cabinet, fontSize: 11,
                        color: 'rgba(245,240,232,0.50)', lineHeight: 1.4,
                      }}>
                        {cat.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'none', border: 'none', padding: '8px 0',
                  fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
                  cursor: 'pointer',
                }}
              >
                ← Volver
              </button>
            </div>
          </FadeInView>
        )}

        {/* ══════════════════════════════════════════
            PASO 3 — Elegir opción
        ══════════════════════════════════════════ */}
        {step === 3 && (
          <FadeInView>
            <div>
              <p style={{
                fontFamily: cabinet, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.10em',
                color: ATELIER, marginBottom: 4,
              }}>
                Paso 3 — {selectedCatMeta?.label}
              </p>
              <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93', marginBottom: 16 }}>
                {selectedCatMeta?.description}
              </p>

              {/* Options horizontal scroll */}
              <div style={{
                display: 'flex', gap: 12, overflowX: 'auto',
                paddingBottom: 8, marginBottom: 24,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              } as React.CSSProperties}>
                {filteredOptions.map((opt) => {
                  const active = selectedOpt === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOpt(opt.id)}
                      style={{
                        flexShrink: 0, width: 130,
                        background: 'none', border: 'none', padding: 0,
                        cursor: 'pointer', textAlign: 'left' as const,
                      }}
                    >
                      <div style={{
                        borderRadius: DNA.radius.card,
                        overflow: 'hidden',
                        border: active
                          ? `2px solid ${ATELIER}`
                          : '1.5px solid rgba(255,255,255,0.07)',
                        boxShadow: active ? `0 0 12px rgba(176,38,255,0.25)` : 'none',
                        transition: 'border-color 150ms',
                      }}>
                        <img
                          src={opt.thumbnailUrl}
                          alt={opt.label}
                          style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <p style={{
                        fontFamily: cabinet, fontSize: 12,
                        fontWeight: active ? 600 : 400,
                        color: active ? ATELIER : '#F5F0E8',
                        marginTop: 6, paddingLeft: 2,
                      }}>
                        {opt.label}
                      </p>
                      <p style={{
                        fontFamily: cabinet, fontSize: 10,
                        color: '#8E8E93', paddingLeft: 2,
                      }}>
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: '13px',
                    borderRadius: DNA.radius.button,
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    background: 'transparent',
                    color: '#8E8E93',
                    fontFamily: cabinet, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ← Volver
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!selectedOpt}
                  style={{
                    flex: 2, padding: '13px',
                    borderRadius: DNA.radius.button,
                    border: 'none',
                    background: selectedOpt ? ATELIER : '#2C2C2E',
                    color: selectedOpt ? '#F5F0E8' : '#8E8E93',
                    fontFamily: cabinet, fontSize: 14, fontWeight: 600,
                    textTransform: 'uppercase' as const, letterSpacing: '0.06em',
                    cursor: selectedOpt ? 'pointer' : 'not-allowed',
                    transition: 'background 200ms',
                    boxShadow: selectedOpt ? `0 0 20px rgba(176,38,255,0.30)` : 'none',
                  }}
                >
                  Generar →
                </button>
              </div>
            </div>
          </FadeInView>
        )}

        {/* ══════════════════════════════════════════
            PASO 4 — Resultado
        ══════════════════════════════════════════ */}
        {step === 4 && (
          <FadeInView>
            <div>
              <p style={{
                fontFamily: cabinet, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.10em',
                color: ATELIER, marginBottom: 16,
              }}>
                {generating ? 'Generando…' : 'Tu resultado'}
              </p>

              {/* Loading state */}
              {generating && (
                <ScanOverlay imageUrl={carImage} />
              )}

              {/* Result */}
              {!generating && generation && (
                <>
                  <div style={{
                    borderRadius: DNA.radius.card,
                    overflow: 'hidden',
                    border: `1.5px solid rgba(176,38,255,0.25)`,
                    boxShadow: `0 0 32px rgba(176,38,255,0.12)`,
                    marginBottom: 20,
                  }}>
                    <BeforeAfterSlider
                      beforeUrl={generation.beforeImageUrl}
                      afterUrl={generation.afterImageUrl}
                      height={280}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Row 1 */}
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        onClick={handleSave}
                        disabled={saved}
                        style={{
                          flex: 1, padding: '13px',
                          borderRadius: DNA.radius.button,
                          border: `1.5px solid ${saved ? 'rgba(176,38,255,0.30)' : ATELIER}`,
                          background: saved ? 'rgba(176,38,255,0.10)' : 'transparent',
                          color: ATELIER,
                          fontFamily: cabinet, fontSize: 13, fontWeight: 600,
                          cursor: saved ? 'default' : 'pointer',
                          transition: 'all 200ms',
                        }}
                      >
                        {saved ? 'Guardado ✓' : 'Guardar'}
                      </button>
                      <button
                        onClick={handleShareRuta}
                        disabled={sharedRuta}
                        style={{
                          flex: 1, padding: '13px',
                          borderRadius: DNA.radius.button,
                          border: 'none',
                          background: sharedRuta ? 'rgba(176,38,255,0.30)' : ATELIER,
                          color: '#F5F0E8',
                          fontFamily: cabinet, fontSize: 13, fontWeight: 600,
                          cursor: sharedRuta ? 'default' : 'pointer',
                          boxShadow: sharedRuta ? 'none' : `0 0 16px rgba(176,38,255,0.25)`,
                        }}
                      >
                        {sharedRuta ? 'Compartido ✓' : 'Compartir en Ruta'}
                      </button>
                    </div>
                    {/* Row 2 */}
                    <button
                      onClick={handleCotizar}
                      style={{
                        width: '100%', padding: '14px',
                        borderRadius: DNA.radius.button,
                        border: 'none',
                        background: '#C8F135',
                        color: '#111111',
                        fontFamily: cabinet, fontSize: 14, fontWeight: 700,
                        textTransform: 'uppercase' as const, letterSpacing: '0.06em',
                        cursor: 'pointer',
                        boxShadow: DNA.shadow.volt,
                      }}
                    >
                      Cotizar este cambio →
                    </button>
                    {/* Row 3 */}
                    <button
                      onClick={() => {
                        setStep(2);
                        setGeneration(null);
                        setSaved(false);
                        setSharedRuta(false);
                        setSelectedOpt(null);
                      }}
                      style={{
                        width: '100%', padding: '12px',
                        borderRadius: DNA.radius.button,
                        border: '1.5px solid rgba(255,255,255,0.10)',
                        background: 'transparent',
                        color: '#8E8E93',
                        fontFamily: cabinet, fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      Probar otra opción
                    </button>
                  </div>
                </>
              )}
            </div>
          </FadeInView>
        )}

        {/* ══════════════════════════════════════════
            GALERÍA PERSONAL
        ══════════════════════════════════════════ */}
        {savedGens.length > 0 && step === 1 && (
          <FadeInView>
            <div style={{ marginTop: 40 }}>
              <p style={{
                fontFamily: cabinet, fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.10em',
                color: '#8E8E93', marginBottom: 16,
              }}>
                Tus creaciones
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {savedGens.map((gen) => {
                  const catMeta = ATELIER_CATEGORIES.find((c) => c.id === gen.categoryId);
                  return (
                    <div key={gen.id} style={{ position: 'relative', borderRadius: DNA.radius.card, overflow: 'hidden' }}>
                      <img
                        src={gen.afterImageUrl}
                        alt=""
                        style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(17,17,17,0.85) 100%)',
                      }} />
                      <span style={{
                        position: 'absolute', top: 8, left: 8,
                        background: 'rgba(176,38,255,0.18)',
                        border: '1px solid rgba(176,38,255,0.40)',
                        borderRadius: 6, padding: '2px 7px',
                        fontFamily: cabinet, fontSize: 9, fontWeight: 700,
                        color: ATELIER, textTransform: 'uppercase' as const, letterSpacing: '0.08em',
                        backdropFilter: 'blur(6px)',
                      }}>
                        {catMeta?.label ?? gen.categoryId}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeInView>
        )}

      </div>
    </PageWrapper>
  );
}
