import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'volt' | 'electric' | 'muted' | 'verified';
  className?: string;
}

const variants = {
  volt:     'bg-volt text-carbon',
  electric: 'bg-electric/20 text-electric border border-electric/30',
  muted:    'bg-surface-2 text-muted',
  verified: 'bg-volt/15 text-volt border border-volt/30',
};

export function Badge({ children, variant = 'muted', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1
        rounded-full text-xs font-medium
        uppercase tracking-[0.06em]
        ${variants[variant]} ${className}
      `}
      style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
    >
      {variant === 'verified' && (
        <span className="w-1.5 h-1.5 rounded-full bg-volt animate-volt-blink flex-shrink-0" />
      )}
      {children}
    </span>
  );
}
