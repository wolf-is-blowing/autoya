import type { CSSProperties } from 'react';

interface IconProps {
  className?: string;
  size?: number;
  style?: CSSProperties;
}

// ── Nav Icons ──────────────────────────────────────────────────────────────

export function NavHome({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      {/* Techo con ángulo DNA de 11° — pico más agudo, no isósceles perfecto */}
      <path d="M2,11 L12,2 L22,11"/>
      <path d="M4,11 V21 H20 V11"/>
      <path d="M9,21 V15 H15 V21"/>
    </svg>
  );
}

export function NavParque({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      {/* Key fob — apertura remota de auto */}
      <rect x="7" y="2" width="10" height="16" rx="5"/>
      <circle cx="12" cy="8" r="2.2"/>
      <line x1="12" y1="14" x2="12" y2="16"/>
      <path d="M10,19 Q12,22 14,19"/>
    </svg>
  );
}

export function NavTaller({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <line x1="4" y1="20" x2="17" y2="7"/>
      <circle cx="20" cy="4" r="3"/>
      <line x1="18" y1="6" x2="17" y2="7"/>
    </svg>
  );
}

export function NavCaravana({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <circle cx="8"  cy="7" r="3"/>
      <path d="M3,21 Q3,14 8,14 Q13,14 13,21"/>
      <circle cx="16" cy="7" r="3"/>
      <path d="M11,21 Q11,14 16,14 Q21,14 21,21"/>
    </svg>
  );
}

export function NavPerfil({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <circle cx="12" cy="7" r="4"/>
      <path d="M4,21 Q4,13 12,13 Q20,13 20,21"/>
    </svg>
  );
}

// ── Service Icons ──────────────────────────────────────────────────────────

export function ServiceIcon({
  id,
  className = '',
  size = 24,
}: { id: string } & IconProps) {
  const stroke = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

  const icons: Record<string, React.ReactNode> = {
    busqueda: (
      <>
        <circle cx="11" cy="11" r="7" {...stroke}/>
        <line x1="16.5" y1="16.5" x2="21" y2="21" {...stroke}/>
      </>
    ),
    lavado: (
      <>
        <path d="M12 2 C6 8 4 12 4 15 a8 8 0 0 0 16 0 c0-3-2-7-8-13z" {...stroke}/>
        <path d="M9 15 a3 3 0 0 0 6 0" {...stroke}/>
      </>
    ),
    mantenimiento: (
      <>
        <line x1="5" y1="19" x2="15" y2="9" {...stroke}/>
        <path d="M12.5 10.5 A4 4 0 0 1 19.5 10.5" {...stroke}/>
        <path d="M13.8 10.5 A2.5 2.5 0 0 1 18.2 10.5" {...stroke}/>
      </>
    ),
    styling: (
      <>
        <path d="M12 3 L13.4 8.5 L19 8.5 L14.3 11.9 L15.7 17.4 L12 13.5 L8.3 17.4 L9.7 11.9 L5 8.5 L10.6 8.5 Z" {...stroke}/>
      </>
    ),
    tapiceria: (
      <>
        <rect x="3" y="7" width="18" height="12" rx="3" {...stroke}/>
        <path d="M3 12 L21 12" {...stroke}/>
        <path d="M9 7 L9 19" {...stroke}/>
        <path d="M15 7 L15 19" {...stroke}/>
      </>
    ),
    audio: (
      <>
        <circle cx="12" cy="12" r="9" {...stroke}/>
        <circle cx="12" cy="12" r="5" {...stroke}/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      </>
    ),
    exterior: (
      <>
        <path d="M2 12 L5 9 L9 7 L15 7 L19 9 L22 12" {...stroke}/>
        <path d="M2 12 L22 12" {...stroke}/>
        <circle cx="6" cy="15" r="2" {...stroke}/>
        <circle cx="18" cy="15" r="2" {...stroke}/>
        <path d="M8 15 L16 15" {...stroke}/>
      </>
    ),
    performance: (
      <>
        <path d="M5 19 L12 6 L19 19" {...stroke}/>
        <path d="M8 14 L16 14" {...stroke}/>
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {icons[id] ?? icons['busqueda']}
    </svg>
  );
}

// ── Utility Icons ──────────────────────────────────────────────────────────

export function IconSearch({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconBell({ className = '', size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M18 8 A6 6 0 0 0 6 8 c0 7-3 9-3 9 h18 s-3-2-3-9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21 a2 2 0 0 1-3.46 0"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconSteeringWheel({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
      <path d="M12 9.5 L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 12 L2.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14.5 12 L21.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconShield({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2 L19 5 L19 11 C19 15.4 15.9 19.5 12 21 C8.1 19.5 5 15.4 5 11 L5 5 Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconDestello({
  className = '',
  size = 24,
  style,
  active = false,
  id,
}: IconProps & { active?: boolean; id?: string }) {
  const gradId = id ?? 'destello-grad';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {active && (
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8F135" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="#C8F135" stopOpacity="0"/>
          </linearGradient>
        </defs>
      )}
      {/* Faro: semicírculo relleno */}
      <path
        d="M8,9 A3,3 0 0,0 8,15 Z"
        fill={active ? '#C8F135' : 'rgba(245,240,232,0.4)'}
        stroke="none"
      />
      <circle
        cx="8" cy="12" r="3"
        stroke={active ? '#C8F135' : 'rgba(245,240,232,0.4)'}
        fill="none"
      />
      {/* Haz superior */}
      <polygon
        points="11,9.5 21,5 21,10"
        fill={active ? `url(#${gradId})` : 'none'}
        stroke={active ? '#C8F135' : 'rgba(245,240,232,0.4)'}
        strokeLinejoin="round"
      />
      {/* Haz inferior */}
      <polygon
        points="11,14.5 21,14 21,19"
        fill={active ? `url(#${gradId})` : 'none'}
        stroke={active ? '#C8F135' : 'rgba(245,240,232,0.4)'}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMegaphone({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M3 11 L3 13 C3 14.66 4.34 16 6 16 L8 16 L8 20 L12 20 L12 16 L18 19 L18 5 L12 8 L6 8 L3 11Z"/>
    </svg>
  );
}

export function IconShare({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <circle cx="18" cy="5"  r="3"/>
      <circle cx="6"  cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49"/>
    </svg>
  );
}

export function IconHeart({ className = '', size = 24, style, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

export function IconCamera({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

export function IconTrophy({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <polyline points="8 21 12 17 16 21"/>
      <line x1="12" y1="17" x2="12" y2="12"/>
      <path d="M7 4H4a2 2 0 0 0-2 2v1c0 2.5 2 4.5 5 5"/>
      <path d="M17 4h3a2 2 0 0 1 2 2v1c0 2.5-2 4.5-5 5"/>
      <path d="M7 4c0 4 2 7 5 8 3-1 5-4 5-8H7z"/>
    </svg>
  );
}

export function IconClose({ className = '', size = 18, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} style={style} aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
