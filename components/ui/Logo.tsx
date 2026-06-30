const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface LogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg';
  transparent?: boolean;
}

const iconSizes = { sm: 28, md: 36, lg: 48 };
const textSizes = { sm: 18, md: 24, lg: 32 };

/** Mouto isotipo — M geométrico como dos arcos de circuito.
 *  transparent=true omite el rect de fondo carbon — ideal sobre imágenes o slots con su propio bg.
 */
export function MoutoIsotipo({ size = 28, transparent = false }: { size?: number; transparent?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mouto"
    >
      {!transparent && <rect width="40" height="40" rx="10" fill="#111111" />}
      <path
        d="M 7 32 C 7 32 7 12 14 12 C 21 12 21 28 21 28"
        stroke="#F5F0E8"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 21 28 C 21 28 21 12 28 12 C 35 12 33 32 33 32"
        stroke="#0A84FF"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="21" cy="28" r="2.4" fill="#C8F135" />
    </svg>
  );
}

export function Logo({ variant = 'full', size = 'md', transparent = false }: LogoProps) {
  const iconPx = iconSizes[size];
  const textPx = textSizes[size];

  if (variant === 'icon') return <MoutoIsotipo size={iconPx} transparent={transparent} />;

  if (variant === 'wordmark') {
    return (
      <span style={{ fontFamily: cabinet, fontWeight: 700, fontSize: textPx, letterSpacing: '-0.01em' }}>
        <span style={{ color: '#F5F0E8' }}>mout</span>
        <span style={{ color: '#0A84FF' }}>o</span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <MoutoIsotipo size={iconPx} transparent={transparent} />
      <span style={{ fontFamily: cabinet, fontWeight: 700, fontSize: textPx, letterSpacing: '-0.01em', lineHeight: 1 }}>
        <span style={{ color: '#F5F0E8' }}>mout</span>
        <span style={{ color: '#0A84FF' }}>o</span>
      </span>
    </div>
  );
}
