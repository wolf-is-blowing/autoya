'use client';

import type { ReactNode } from 'react';

interface ChipFilterProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChipFilter({ children, active = false, onClick, className = '' }: ChipFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 inline-flex items-center px-4 py-2
        rounded-full text-xs font-medium uppercase tracking-[0.05em]
        transition-all duration-150 cursor-pointer
        ${active
          ? 'bg-electric/15 text-electric border border-electric/40'
          : 'bg-surface-2 text-muted border border-transparent hover:text-ivory'
        }
        ${className}
      `}
      style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}
    >
      {children}
    </button>
  );
}
