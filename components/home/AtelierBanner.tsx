/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const ATELIER      = '#B026FF';
const ATELIER_GLOW = '0 0 28px rgba(176,38,255,0.35)';

const PILLS = ['Renders en segundos', 'Sin compromiso', '100% IA'];

export function AtelierBanner() {
  return (
    <section className="section-card" style={{ overflow: 'hidden' }}>

      {/* Bloque superior — imagen */}
      <div style={{ position: 'relative', height: 'clamp(280px, 40vw, 360px)' }}>
        <img
          src="/images/atelier-hero.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Gradiente que derrite la imagen hacia el negro inferior */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, #111111 100%)',
          }}
        />
      </div>

      {/* Bloque inferior — contenido */}
      <div style={{ background: '#111111', padding: '24px 24px 32px' }}>

        {/* Logo + badge */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{
            fontFamily: clash,
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: '#F5F0E8',
            lineHeight: 1,
          }}>
            Atelier
          </span>
          <span style={{
            background: 'rgba(200,241,53,0.12)',
            border: '1px solid rgba(200,241,53,0.30)',
            color: '#C8F135',
            padding: '3px 10px',
            borderRadius: 9999,
            fontFamily: cabinet,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
          }}>
            Beta
          </span>
        </div>

        {/* Subtítulo */}
        <p style={{
          fontFamily: cabinet,
          fontSize: 15,
          color: 'rgba(245,240,232,0.70)',
          lineHeight: 1.5,
          marginTop: 8,
        }}>
          El visualizer de mejoras para tu auto, potenciado por IA.
        </p>

        {/* Copy secundario */}
        <p style={{
          fontFamily: cabinet,
          fontSize: 14,
          color: '#8E8E93',
          marginTop: 4,
        }}>
          Mira cómo queda antes de modificarlo.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginTop: 16 }}>
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
                background: 'transparent',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 20 }}>
          <Link href="/atelier" style={{ display: 'block' }}>
            <div style={{
              background: ATELIER,
              color: '#F5F0E8',
              padding: '16px',
              borderRadius: DNA.radius.button,
              fontFamily: cabinet,
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: ATELIER_GLOW,
              cursor: 'pointer',
            }}>
              Probar Atelier
              <span style={{ fontSize: 16 }}>→</span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
