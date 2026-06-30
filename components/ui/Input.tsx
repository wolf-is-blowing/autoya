import type { InputHTMLAttributes } from 'react';
import { DNA } from '@/lib/design/dna';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function Input({ label, error, id, className = '', style, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: cabinet,
            fontSize: 11,
            fontWeight: 500,
            color: '#8E8E93',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`mouto-input ${error ? 'mouto-input-error' : ''} ${className}`}
        style={{
          fontFamily: cabinet,
          fontSize: 15,
          background: '#2C2C2E',
          borderRadius: DNA.radius.input,
          padding: '14px 16px',
          color: '#F5F0E8',
          width: '100%',
          ...style,
        }}
        {...props}
      />
      {error && (
        <span style={{ fontFamily: cabinet, fontSize: 12, color: 'rgba(255,59,48,0.9)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
