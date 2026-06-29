interface IconProps {
  className?: string;
  size?: number;
}

export function IconSteeringWheel({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      {/* top spoke */}
      <line x1="12" y1="9.5" x2="12" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* bottom-left spoke */}
      <line x1="9.85" y1="10.85" x2="4.65" y2="19.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* bottom-right spoke */}
      <line x1="14.15" y1="10.85" x2="19.35" y2="19.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* horizontal grip segment */}
      <path d="M2.5 12 Q2.5 10 4 10 H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21.5 12 Q21.5 10 20 10 H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconGarage({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {/* roof */}
      <path d="M2 10 L12 3 L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* walls */}
      <path d="M4 10 V21 H20 V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* door */}
      <rect x="7" y="14" width="10" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      {/* door lines */}
      <line x1="7" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="14" x2="12" y2="21" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function IconWrench({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconConvoy({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {/* car 1 (front) */}
      <rect x="13" y="9" width="9" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14 9 L15.5 6.5 H19.5 L21 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.5" cy="14.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20.5" cy="14.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      {/* car 2 (back) */}
      <rect x="2" y="10" width="8" height="4.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 10 L4 8 H8 L9 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="15" r="1.1" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8.5" cy="15" r="1.1" stroke="currentColor" strokeWidth="1.2" />
      {/* motion lines */}
      <line x1="2" y1="12" x2="0.5" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="14" x2="0.5" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpeedometer({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="currentColor" strokeWidth="1.5" />
      {/* arc track */}
      <path d="M5.5 16 A7 7 0 0 1 18.5 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* tick marks */}
      <line x1="5.2" y1="13" x2="6.4" y2="13.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="6.5" x2="12" y2="7.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="18.8" y1="13" x2="17.6" y2="13.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* needle - pointing to ~10 o'clock = "performance" */}
      <line x1="12" y1="13" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconSearch({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconUser({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMenu({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronRight({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronDown({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlus({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconStar({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconShield({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C17.5 22.15 21 17.25 21 12V6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCar({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 17H3a1 1 0 0 1-1-1v-4l2.69-6.52A2 2 0 0 1 6.56 4h10.88a2 2 0 0 1 1.87 1.48L21.5 12H22v4a1 1 0 0 1-1 1h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconSpark({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconWater({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSeat({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 3v9a4 4 0 0 0 4 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 16v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 16v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="13" y="3" width="6" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconSpeaker({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

import type { ReactElement } from 'react';

const SERVICE_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  'search-car': IconSearch,
  'wrench': IconWrench,
  'water': IconWater,
  'seat': IconSeat,
  'sparkle': IconSpark,
  'speaker': IconSpeaker,
  'car-front': IconCar,
  'gauge': IconSpeedometer,
};

export function ServiceIcon({ iconKey, ...props }: { iconKey: string } & IconProps) {
  const Icon = SERVICE_ICONS[iconKey] ?? IconCar;
  return <Icon {...props} />;
}
