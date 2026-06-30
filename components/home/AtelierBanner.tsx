/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

/* Acento exclusivo Atelier — NO usar en ningún otro componente */
const ATELIER = '#B026FF';
const ATELIER_GLOW = '0 0 28px rgba(176,38,255,0.35)';

const PILLS = ['Renders en segundos', 'Sin compromiso', '100% IA'];

function CrosshairIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="3.2" stroke={ATELIER} strokeWidth="1.4" />
      <line x1="10" y1="0"  x2="10" y2="5"  stroke={ATELIER} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="15" x2="10" y2="20" stroke={ATELIER} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="0"  y1="10" x2="5"  y2="10" stroke={ATELIER} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15" y1="10" x2="20" y2="10" stroke={ATELIER} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function AtelierBanner() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginBottom: DNA.spacing.sectionGap,
      }}
    >
      {/* Foto de fondo — interior de auto premium */}
      <img
        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=85&auto=format"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.30,
        }}
      />

      {/* Grilla técnica tipo CAD — solo el acento Atelier */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'repeating-linear-gradient(0deg,   rgba(176,38,255,0.07) 0px, transparent 1px, transparent 40px)',
            'repeating-linear-gradient(90deg,  rgba(176,38,255,0.07) 0px, transparent 1px, transparent 40px)',
          ].join(','),
          pointerEvents: 'none',
        }}
      />

      {/* Gradiente oscuro diagonal para legibilidad */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.92) 100%)',
        }}
      />

      {/* Borde superior en acento Atelier */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${ATELIER}, rgba(176,38,255,0.3), transparent)`,
        }}
      />

      {/* Contenido */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 section-padding"
      >
        {/* Badge BETA — usa paleta Mouto estándar (único elemento compartido) */}
        <div className="mb-6">
          <span
            style={{
              background: 'rgba(200,241,53,0.12)',
              border: '1px solid rgba(200,241,53,0.30)',
              color: '#C8F135',
              padding: '4px 12px',
              borderRadius: 9999,
              fontFamily: cabinet,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
            }}
          >
            Beta
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <div className="flex-1">

            {/* Crosshair + eyebrow — identidad visual Atelier */}
            <div className="flex items-center gap-2 mb-4">
              <CrosshairIcon />
              <span
                style={{
                  fontFamily: cabinet,
                  fontSize: 11,
                  fontWeight: 600,
                  color: ATELIER,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.10em',
                }}
              >
                Sub-producto Mouto
              </span>
            </div>

            {/* Wordmark Atelier — mayor que el H1 del hero */}
            <h2
              style={{
                fontFamily: clash,
                fontSize: 'clamp(64px, 14vw, 96px)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 0.92,
                color: '#F5F0E8',
                marginBottom: 20,
              }}
            >
              Atelier
            </h2>

            <p
              style={{
                fontFamily: cabinet,
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: '#8E8E93',
                lineHeight: 1.5,
                maxWidth: 480,
                marginBottom: 8,
              }}
            >
              El visualizer de mejoras para tu auto, potenciado por IA.
            </p>

            <p
              style={{
                fontFamily: cabinet,
                fontSize: 14,
                color: 'rgba(245,240,232,0.40)',
                marginBottom: 28,
              }}
            >
              Mira cómo queda antes de modificarlo.
            </p>

            {/* Feature pills — identidad Atelier */}
            <div className="flex flex-wrap gap-2">
              {PILLS.map((label) => (
                <span
                  key={label}
                  style={{
                    border: `1px solid rgba(176,38,255,0.30)`,
                    color: ATELIER,
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontFamily: cabinet,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* CTA — acento Atelier exclusivo, nunca volt */}
          <div className="flex-shrink-0">
            <Link href="/atelier">
              <div
                style={{
                  background: ATELIER,
                  color: '#F5F0E8',
                  padding: '16px 32px',
                  borderRadius: DNA.radius.button,
                  fontFamily: cabinet,
                  fontSize: 14,
                  fontWeight: 500,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.06em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: ATELIER_GLOW,
                  cursor: 'pointer',
                }}
              >
                Probar Atelier
                <span style={{ fontSize: 16 }}>→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
