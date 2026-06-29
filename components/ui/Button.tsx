import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'action';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-volt text-base hover:brightness-110 border border-volt',
  secondary:
    'bg-transparent border border-volt text-volt hover:bg-volt hover:text-base',
  action:
    'bg-ignite text-white hover:brightness-110 border border-ignite',
  ghost:
    'bg-transparent border border-transparent text-muted hover:text-snow',
};

const sizes = {
  sm: 'px-4 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-sm gap-2.5',
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
        font-medium uppercase tracking-[0.06em]
        transition-all duration-150 active:scale-[0.97] cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        rounded-none
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
      {...props}
    >
      {children}
    </button>
  );
}
