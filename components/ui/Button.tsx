import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'action';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary:   'gradient-brand text-base font-semibold shadow-lg shadow-accent/20 hover:opacity-90',
  secondary: 'bg-surface border border-rim text-snow hover:border-accent hover:text-accent',
  ghost:     'bg-transparent text-ghost hover:text-snow hover:bg-elevated',
  action:    'gradient-action text-white font-semibold shadow-lg shadow-action/20 hover:opacity-90',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-body transition-all duration-200 active:scale-[0.97] cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
