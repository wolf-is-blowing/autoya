import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { DNA } from '@/lib/design/dna';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'volt' | 'ghost' | 'ghost-volt' | 'ghost-electric';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:        'bg-electric text-carbon hover:brightness-110 active:brightness-95',
  secondary:      'bg-transparent border border-electric/40 text-electric hover:bg-electric/10',
  volt:           'bg-volt text-carbon hover:brightness-110 active:brightness-95',
  ghost:          'bg-transparent text-ivory/60 hover:text-ivory',
  'ghost-volt':   'bg-transparent border-[1.5px] border-volt text-volt hover:bg-volt/10 active:bg-volt active:text-carbon',
  'ghost-electric': 'bg-transparent border-[1.5px] border-electric text-electric hover:bg-electric/10 active:bg-electric active:text-ivory',
};

const sizes = {
  sm: 'px-5 py-2    text-[13px] gap-1.5',
  md: 'px-6 py-3    text-sm     gap-2',
  lg: 'px-8 py-4    text-sm     gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        uppercase tracking-[0.04em]
        transition-all active:scale-[0.98] hover:scale-[1.02] cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
        borderRadius: DNA.radius.button,
        transitionDuration: DNA.duration.fast,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
