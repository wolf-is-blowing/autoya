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
      <path d="M3,10 L12,3 L21,10"/>
      <path d="M5,10 V20 H19 V10"/>
      <path d="M9,20 V14 H15 V20"/>
    </svg>
  );
}

export function NavParque({ className = '', size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden>
      <path d="M2,14 H22 V10 Q20,6 16,6 H8 Q4,6 2,10 Z"/>
      <circle cx="6"  cy="14" r="2.5"/>
      <circle cx="18" cy="14" r="2.5"/>
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

export function IconClose({ className = '', size = 18, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} style={style} aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
