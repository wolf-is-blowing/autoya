import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  glow?: boolean;
}

const variants = {
  default:  'bg-surface',
  elevated: 'bg-elevated',
  bordered: 'bg-surface border border-rim',
};

export function Card({ children, variant = 'default', glow = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl overflow-hidden
        ${variants[variant]}
        ${glow ? 'hover-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
