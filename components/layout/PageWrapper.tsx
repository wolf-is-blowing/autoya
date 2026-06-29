import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  noBottomPad?: boolean;
}

export function PageWrapper({ children, className = '', noBottomPad = false }: PageWrapperProps) {
  return (
    <main
      className={`min-h-dvh pt-[60px] ${noBottomPad ? '' : 'pb-[88px]'} ${className}`}
    >
      {children}
    </main>
  );
}
