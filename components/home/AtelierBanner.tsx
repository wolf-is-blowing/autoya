import Link from 'next/link';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function AtelierBanner() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginBottom: DNA.spacing.sectionGap,
        /* No padding lateral — full width */
      }}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #111111 0%, rgba(10,132,255,0.07) 50%, rgba(200,241,53,0.03) 100%)',
        }}
      />

      {/* Diagonal line pattern a 11° (ángulo DNA) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(11deg, transparent 0px, transparent 40px, rgba(10,132,255,0.05) 40px, rgba(10,132,255,0.05) 41px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(10,132,255,0.4), rgba(200,241,53,0.3), transparent)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-8"
        style={{ paddingTop: 60, paddingBottom: 60 }}
      >
        {/* Beta badge */}
        <div className="mb-5">
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
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Beta
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <div className="flex-1">
            <h2
              style={{
                fontFamily: clash,
                fontSize: 'clamp(48px, 10vw, 80px)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#F5F0E8',
                marginBottom: 16,
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
                color: 'rgba(245,240,232,0.5)',
                letterSpacing: '0.01em',
              }}
            >
              Mira cómo queda antes de modificarlo.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link href="/atelier">
              <div
                style={{
                  background: '#0A84FF',
                  color: '#F5F0E8',
                  padding: '16px 32px',
                  borderRadius: 14,
                  fontFamily: cabinet,
                  fontSize: 14,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: DNA.shadow.glow,
                  cursor: 'pointer',
                  transition: 'filter 150ms, transform 150ms',
                }}
                className="hover:brightness-110 active:brightness-95"
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
