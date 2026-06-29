import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'accent' | 'action' | 'muted' | 'verified';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  accent:   'bg-accent/10 text-accent border border-accent/20',
  action:   'bg-action/10 text-action border border-action/20',
  muted:    'bg-elevated text-ghost border border-rim',
  verified: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-3 py-1 text-xs rounded-lg',
};

export function Badge({ children, variant = 'muted', size = 'md', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
