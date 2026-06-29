import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'cinematic' | 'glass';
  hover?: boolean;
}

const variants = {
  default:   'bg-surface border border-white/5 rounded-[20px]',
  cinematic: 'relative overflow-hidden rounded-[20px]',
  glass:     'rounded-[20px] border border-white/10',
};

export function Card({
  children,
  variant = 'default',
  hover = false,
  className = '',
  ...props
}: CardProps) {
  const glassStyle = variant === 'glass'
    ? { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }
    : undefined;

  return (
    <div
      className={`
        overflow-hidden
        ${variants[variant]}
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
      style={glassStyle}
      {...props}
    >
      {children}
    </div>
  );
}
