import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  glow?: boolean;
}

const variants = {
  default:  'bg-surface border-t-2 border-t-volt border-x-0 border-b-0',
  elevated: 'bg-surface border border-rim',
  bordered: 'bg-surface border border-rim',
};

export function Card({ children, variant = 'default', glow = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`
        overflow-hidden rounded-none
        ${variants[variant]}
        ${glow ? 'volt-glow' : ''}
        ${className}
      `}
      style={variant === 'default' ? { borderStyle: 'solid' } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
