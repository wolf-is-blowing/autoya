'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DNA } from '@/lib/design/dna';
import { authUtils } from '@/lib/auth';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface QuotationSheetProps {
  initialBrand?: string;
  initialModel?: string;
  onClose: () => void;
}

export function QuotationSheet({ initialBrand, initialModel, onClose }: QuotationSheetProps) {
  const router   = useRouter();
  const [sent,   setSent]   = useState(false);
  const [name,   setName]   = useState('');
  const [phone,  setPhone]  = useState('');

  function handleSubmit() {
    if (!name.trim() || !phone.trim()) return;
    // Persist minimal intent; real flow continues in /taller
    setSent(true);
    setTimeout(() => {
      onClose();
      router.push('/taller');
    }, 1600);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.60)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
        }}
      />
      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#1C1C1E',
        borderRadius: `${DNA.radius.card} ${DNA.radius.card} 0 0`,
        padding: '28px 20px 40px',
        zIndex: 101,
        boxShadow: '0 -8px 40px rgba(0,0,0,0.60)',
        borderTop: '1.5px solid rgba(255,255,255,0.07)',
      }}>
        {/* Handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.18)',
          margin: '0 auto 24px',
        }} />

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontFamily: clash, fontSize: 24, fontWeight: 500, color: '#C8F135', marginBottom: 8 }}>
              ¡Solicitud enviada!
            </p>
            <p style={{ fontFamily: cabinet, fontSize: 14, color: '#8E8E93' }}>
              Te redirigimos a Taller para continuar tu cotización.
            </p>
          </div>
        ) : (
          <>
            <p style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase' as const, letterSpacing: '0.10em',
              color: '#8E8E93', marginBottom: 12,
            }}>
              Cotizar
            </p>
            {initialBrand && initialModel && (
              <div style={{
                background: 'rgba(200,241,53,0.08)',
                border: '1px solid rgba(200,241,53,0.20)',
                borderRadius: DNA.radius.chip,
                padding: '10px 14px',
                marginBottom: 20,
                display: 'flex', alignItems: 'baseline', gap: 8,
              }}>
                <span style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  {initialBrand}
                </span>
                <span style={{ fontFamily: clash, fontSize: 20, fontWeight: 500, color: '#F5F0E8', letterSpacing: '-0.01em' }}>
                  {initialModel}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  padding: '13px 14px',
                  borderRadius: DNA.radius.input,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: '#2C2C2E',
                  color: '#F5F0E8',
                  fontFamily: cabinet, fontSize: 14,
                  outline: 'none',
                }}
              />
              <input
                type="tel"
                placeholder="Teléfono / WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  padding: '13px 14px',
                  borderRadius: DNA.radius.input,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: '#2C2C2E',
                  color: '#F5F0E8',
                  fontFamily: cabinet, fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1, padding: '13px',
                  borderRadius: DNA.radius.button,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: '#8E8E93',
                  fontFamily: cabinet, fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !phone.trim()}
                style={{
                  flex: 2, padding: '13px',
                  borderRadius: DNA.radius.button,
                  border: 'none',
                  background: name.trim() && phone.trim() ? '#C8F135' : '#2C2C2E',
                  color: name.trim() && phone.trim() ? '#111111' : '#8E8E93',
                  fontFamily: cabinet, fontSize: 14, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.05em',
                  cursor: name.trim() && phone.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background 150ms',
                }}
              >
                Solicitar cotización
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
