import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'volt' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  pill?: boolean;
}

const variants = {
  primary:   'bg-electric text-carbon hover:brightness-110 active:brightness-95',
  secondary: 'bg-transparent border border-electric/40 text-electric hover:bg-electric/10',
  volt:      'bg-volt text-carbon hover:brightness-110 active:brightness-95',
  ghost:     'bg-transparent text-ivory/60 hover:text-ivory',
};

const sizes = {
  sm: 'px-5 py-2    text-xs gap-1.5',
  md: 'px-6 py-3    text-sm gap-2',
  lg: 'px-8 py-[14px] text-sm gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  pill = true,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        uppercase tracking-[0.04em]
        transition-all duration-150 active:scale-[0.97] cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${pill ? 'rounded-full' : 'rounded-xl'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
      {...props}
    >
      {children}
    </button>
  );
}
