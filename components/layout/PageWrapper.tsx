import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  /** Remove bottom padding for pages that have their own bottom treatment */
  noBottomPad?: boolean;
}

export function PageWrapper({ children, className = '', noBottomPad = false }: PageWrapperProps) {
  return (
    <main
      className={`
        min-h-dvh
        pt-16
        ${noBottomPad ? '' : 'pb-24'}
        ${className}
      `}
    >
      {children}
    </main>
  );
}
