import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'accent' | 'action' | 'muted' | 'verified';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  accent:   'bg-volt text-base font-semibold',
  action:   'bg-ignite text-white font-semibold',
  muted:    'bg-surface text-muted border border-rim',
  verified: 'bg-transparent text-volt border border-volt',
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

export function Badge({ children, variant = 'muted', size = 'md', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 uppercase tracking-[0.06em]
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      style={{ fontFamily: 'var(--font-dm-sans), sans-serif', borderRadius: 0 }}
    >
      {variant === 'verified' && (
        <span className="w-1.5 h-1.5 rounded-full bg-volt animate-volt-pulse flex-shrink-0" />
      )}
      {children}
    </span>
  );
}
