interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

const sizes = {
  sm: { text: 'text-xl',  needle: { w: 5,  h: 18 } },
  md: { text: 'text-2xl', needle: { w: 6,  h: 22 } },
  lg: { text: 'text-4xl', needle: { w: 8,  h: 30 } },
};

export function Logo({ size = 'md', iconOnly = false }: LogoProps) {
  const { text, needle } = sizes[size];
  const font = "var(--font-bebas), 'Bebas Neue', sans-serif";

  return (
    <div className="flex items-baseline gap-0" style={{ lineHeight: 1 }}>
      {/* AUTO in off-white */}
      <span
        style={{ fontFamily: font, color: '#F0F0F0', letterSpacing: '0.04em' }}
        className={text}
      >
        AUTO
      </span>

      {/* Speed needle — diagonal volt line between AUTO and YA */}
      <svg
        width={needle.w}
        height={needle.h}
        viewBox={`0 0 ${needle.w} ${needle.h}`}
        fill="none"
        className="mx-1 self-center"
        aria-hidden
      >
        <line
          x1={needle.w - 1}
          y1="2"
          x2="1"
          y2={needle.h - 2}
          stroke="#00FFB2"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      {/* YA in volt */}
      {!iconOnly && (
        <span
          style={{ fontFamily: font, color: '#00FFB2', letterSpacing: '0.04em' }}
          className={text}
        >
          YA
        </span>
      )}
    </div>
  );
}
