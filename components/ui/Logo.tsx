interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

const sizes = {
  sm: { icon: 28, text: 'text-lg' },
  md: { icon: 36, text: 'text-2xl' },
  lg: { icon: 48, text: 'text-3xl' },
};

export function Logo({ size = 'md', iconOnly = false }: LogoProps) {
  const { icon: s, text } = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon mark: speedometer gauge */}
      <svg
        width={s}
        height={s}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AutoYa"
      >
        {/* outer ring */}
        <circle cx="20" cy="20" r="18" stroke="#00E5FF" strokeWidth="2" />
        {/* inner ring */}
        <circle cx="20" cy="20" r="12" stroke="#252535" strokeWidth="1.5" />
        {/* gauge arc – lit portion (top-left to top-right) */}
        <path
          d="M9.1 27.5 A12 12 0 0 1 30.9 27.5"
          stroke="#252535"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9.1 27.5 A12 12 0 0 1 26.5 12.5"
          stroke="#00E5FF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* needle */}
        <line
          x1="20" y1="20"
          x2="26.5" y2="12.5"
          stroke="#FF5C00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* center dot */}
        <circle cx="20" cy="20" r="3" fill="#FF5C00" />
        {/* speed tick marks */}
        <line x1="8" y1="20" x2="10" y2="20" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="8" x2="20" y2="10" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="32" y1="20" x2="30" y2="20" stroke="#6B6B80" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {!iconOnly && (
        <span
          className={`font-display font-bold tracking-tight leading-none ${text}`}
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          <span className="text-snow">Auto</span>
          <span className="text-accent">Ya</span>
        </span>
      )}
    </div>
  );
}
