'use client';
import { useState } from 'react';
import { ServiceIcon } from '@/components/icons/MoutoIcons';
import { DNA } from '@/lib/design/dna';
import { BookingForm } from './BookingForm';
import type { Service, ServiceOption } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface ServiceRowProps {
  service: Service;
  options: ServiceOption[];
}

export function ServiceRow({ service, options }: ServiceRowProps) {
  const [open,       setOpen]       = useState(false);
  const [bookingOpt, setBookingOpt] = useState<ServiceOption | null>(null);

  return (
    <div style={{
      borderRadius: DNA.radius.card,
      background: '#1C1C1E',
      overflow: 'hidden',
      border: open
        ? `1px solid ${service.accentColor}33`
        : '1px solid rgba(255,255,255,0.05)',
      transition: 'border-color 200ms',
    }}>
      {/* Header row — tap to expand */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left' as const,
        }}
      >
        {/* Icon */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${service.accentColor}14`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: service.accentColor,
        }}>
          <ServiceIcon id={service.id} size={20} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: cabinet, fontSize: 15, fontWeight: 600,
            color: '#F5F0E8', marginBottom: 2,
          }}>
            {service.name}
          </p>
          {service.priceFrom != null && (
            <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
              Desde S/ {service.priceFrom}
            </p>
          )}
        </div>

        {/* Chevron */}
        <svg
          width={16} height={16} viewBox="0 0 24 24" fill="none"
          stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" aria-hidden
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expanded */}
      {open && (
        <div style={{ padding: '0 16px 16px' }}>
          <p style={{
            fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
            lineHeight: 1.5, marginBottom: 14,
          }}>
            {service.description}
          </p>

          {options.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {options.map((opt) => (
                <div
                  key={opt.id}
                  style={{
                    borderRadius: 12,
                    border: opt.recommended
                      ? `1.5px solid ${service.accentColor}50`
                      : '1px solid rgba(255,255,255,0.08)',
                    background: opt.recommended
                      ? `${service.accentColor}08`
                      : 'rgba(255,255,255,0.03)',
                    padding: '12px 14px',
                    position: 'relative' as const,
                  }}
                >
                  {opt.recommended && (
                    <span style={{
                      position: 'absolute', top: -1, right: 12,
                      background: service.accentColor,
                      color: '#111111',
                      fontSize: 9, fontWeight: 700,
                      fontFamily: cabinet,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.08em',
                      padding: '2px 8px',
                      borderRadius: '0 0 6px 6px',
                    }}>
                      Recomendado
                    </span>
                  )}

                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: 6,
                  }}>
                    <p style={{
                      fontFamily: cabinet, fontSize: 14, fontWeight: 600, color: '#F5F0E8',
                    }}>
                      {opt.name}
                    </p>
                    <p style={{
                      fontFamily: clash, fontSize: 16, fontWeight: 500,
                      color: service.accentColor, flexShrink: 0, marginLeft: 8,
                    }}>
                      S/ {opt.price}
                    </p>
                  </div>

                  <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93', lineHeight: 1.5 }}>
                    {opt.description}
                  </p>

                  <button
                    onClick={() => setBookingOpt(opt)}
                    style={{
                      marginTop: 10,
                      width: '100%',
                      padding: '9px',
                      borderRadius: DNA.radius.button,
                      border: `1.5px solid ${service.accentColor}50`,
                      background: 'transparent',
                      color: service.accentColor,
                      fontFamily: cabinet,
                      fontSize: 12,
                      fontWeight: 500,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                    }}
                  >
                    Agendar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 12,
              border: '1px dashed rgba(255,255,255,0.08)',
            }}>
              <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93' }}>
                Próximamente disponible
              </p>
            </div>
          )}
        </div>
      )}
      {bookingOpt && (
        <BookingForm
          service={service}
          option={bookingOpt}
          onClose={() => setBookingOpt(null)}
        />
      )}
    </div>
  );
}
