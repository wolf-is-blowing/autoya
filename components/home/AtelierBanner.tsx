/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

/* Acento exclusivo Atelier — NO usar en ningún otro componente */
const ATELIER      = '#B026FF';
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

/* Jarvis HUD overlay — purely decorative SVG */
function JarvisOverlay() {
  /* All coordinates in viewBox 0 0 1000 600 (preserveAspectRatio=none) */
  const stroke    = `rgba(176,38,255,0.35)`;
  const strokeDot = `rgba(176,38,255,0.60)`;
  const textColor = `rgba(176,38,255,0.80)`;
  const BRACKET   = 20;

  /* Rect encloses the dashboard area — 60-90% vertical, 70% wide centered */
  const R = { x: 150, y: 360, w: 700, h: 180 };

  /* Horizontal measurement points: [cx, cy, dir(-1|1), label, delay] */
  const H_POINTS: [number, number, -1 | 1, string, number][] = [
    [200, 300,  1, 'STEERING: 98%', 0],
    [800, 290, -1, 'DASH: OK',      800],
  ];

  /* Vertical measurement point — bottom center, line goes up, pulsing */
  const V = { cx: 500, cy: 540, label: 'INTERIOR: ANALIZANDO', delay: 1600 };

  return (
    <svg
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
    >
      {/* Dashboard target rectangle */}
      <rect x={R.x} y={R.y} width={R.w} height={R.h} fill="none" stroke={stroke} strokeWidth="1" />

      {/* Corner brackets */}
      {([
        [R.x, R.y],
        [R.x + R.w, R.y],
        [R.x, R.y + R.h],
        [R.x + R.w, R.y + R.h],
      ] as [number, number][]).map(([cx, cy], idx) => {
        const sx = cx === R.x ? -1 : 1;
        const sy = cy === R.y ? -1 : 1;
        return (
          <g key={idx} stroke={ATELIER} strokeWidth="1.5" strokeLinecap="round" opacity="0.70">
            <line x1={cx} y1={cy} x2={cx + sx * BRACKET} y2={cy} />
            <line x1={cx} y1={cy} x2={cx} y2={cy + sy * BRACKET} />
          </g>
        );
      })}

      {/* Horizontal measurement points */}
      {H_POINTS.map(([cx, cy, dir, label, delay]) => {
        const pulseStart = delay + 700;
        const anim = `hud-fade-in 600ms ease ${delay}ms 1 both, hud-pulse 2000ms ease-in-out ${pulseStart}ms infinite`;
        const lineX2 = cx + dir * 60;
        const textX  = dir === 1 ? lineX2 + 8 : lineX2 - 8;
        return (
          <g key={label} style={{ animation: anim }}>
            <circle cx={cx} cy={cy} r="4" fill={strokeDot} />
            <line x1={cx + dir * 5} y1={cy} x2={lineX2} y2={cy} stroke={strokeDot} strokeWidth="1" />
            <text
              x={textX} y={cy + 4}
              fill={textColor} fontSize="16"
              fontFamily="'Cabinet Grotesk', system-ui, sans-serif"
              fontWeight="600" letterSpacing="1.5"
              textAnchor={dir === 1 ? 'start' : 'end'}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Vertical measurement point — pulsing */}
      <g style={{ animation: `hud-fade-in 600ms ease ${V.delay}ms 1 both, hud-pulse 2000ms ease-in-out ${V.delay + 700}ms infinite` }}>
        <circle cx={V.cx} cy={V.cy} r="4" fill={strokeDot} />
        <line x1={V.cx} y1={V.cy - 5} x2={V.cx} y2={V.cy - 45} stroke={strokeDot} strokeWidth="1" />
        <text
          x={V.cx} y={V.cy - 52}
          fill={textColor} fontSize="16"
          fontFamily="'Cabinet Grotesk', system-ui, sans-serif"
          fontWeight="600" letterSpacing="1.5"
          textAnchor="middle"
        >
          {V.label}
        </text>
      </g>
    </svg>
  );
}

export function AtelierBanner() {
  return (
    <section className="section-card" style={{ position: 'relative' }}>

      {/* Fondo — interior de auto premium oscuro */}
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
          opacity: 0.35,
        }}
      />

      {/* Grilla técnica tipo CAD */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'repeating-linear-gradient(0deg,   rgba(176,38,255,0.06) 0px, transparent 1px, transparent 40px)',
            'repeating-linear-gradient(90deg,  rgba(176,38,255,0.06) 0px, transparent 1px, transparent 40px)',
          ].join(','),
          pointerEvents: 'none',
        }}
      />

      {/* Gradiente oscuro diagonal */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(17,17,17,0.30) 0%, rgba(17,17,17,0.90) 100%)',
        }}
      />

      {/* Jarvis HUD — entre los overlays y el contenido */}
      <JarvisOverlay />

      {/* Borde superior */}
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
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 section-padding">

        {/* Badge Beta */}
        <div className="mb-6">
          <span style={{
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
          }}>
            Beta
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <div className="flex-1">

            {/* Eyebrow + crosshair */}
            <div className="flex items-center gap-2 mb-4">
              <CrosshairIcon />
              <span style={{
                fontFamily: cabinet,
                fontSize: 11,
                fontWeight: 600,
                color: ATELIER,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.10em',
              }}>
                Sub-producto Mouto
              </span>
            </div>

            {/* Wordmark — mayor que el H1 del hero */}
            <h2 style={{
              fontFamily: clash,
              fontSize: 'clamp(64px, 14vw, 96px)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 0.92,
              color: '#F5F0E8',
              marginBottom: 20,
            }}>
              Atelier
            </h2>

            <p style={{
              fontFamily: cabinet,
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#8E8E93',
              lineHeight: 1.5,
              maxWidth: 480,
              marginBottom: 8,
            }}>
              El visualizer de mejoras para tu auto, potenciado por IA.
            </p>

            <p style={{
              fontFamily: cabinet,
              fontSize: 14,
              color: 'rgba(245,240,232,0.40)',
              marginBottom: 28,
            }}>
              Mira cómo queda antes de modificarlo.
            </p>

            {/* Feature pills */}
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

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link href="/atelier">
              <div style={{
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
              }}>
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
