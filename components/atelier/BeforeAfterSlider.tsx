/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { IconArrowsH } from '@/components/icons/MoutoIcons';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl:  string;
  height?:   number;
}

export function BeforeAfterSlider({ beforeUrl, afterUrl, height = 320 }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition]   = useState(50); // percent
  const [dragging, setDragging]   = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    updatePosition(e.clientX);
  };
  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => updatePosition(e.clientX);
    const up   = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup',   up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup',   up);
    };
  }, [dragging, updatePosition]);

  // Touch events — touch-action: none on container prevents scroll conflict
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    updatePosition(e.touches[0].clientX);
  };
  const onTouchEnd = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        borderRadius: '0 0 18px 18px',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Before image — full width baseline */}
      <img
        src={beforeUrl}
        alt="Antes"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* After image — clipped from left to `position`% */}
      <div
        style={{
          position: 'absolute', inset: 0,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transition: dragging ? 'none' : 'clip-path 50ms',
        }}
      >
        <img
          src={afterUrl}
          alt="Después"
          draggable={false}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Labels */}
      <span style={{
        position: 'absolute', bottom: 12, left: 14,
        fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
        fontSize: 11, fontWeight: 700,
        color: 'rgba(245,240,232,0.80)',
        background: 'rgba(17,17,17,0.65)',
        backdropFilter: 'blur(6px)',
        padding: '3px 8px', borderRadius: 6,
        pointerEvents: 'none',
      }}>
        ANTES
      </span>
      <span style={{
        position: 'absolute', bottom: 12, right: 14,
        fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
        fontSize: 11, fontWeight: 700,
        color: 'rgba(245,240,232,0.80)',
        background: 'rgba(17,17,17,0.65)',
        backdropFilter: 'blur(6px)',
        padding: '3px 8px', borderRadius: 6,
        pointerEvents: 'none',
      }}>
        DESPUÉS
      </span>

      {/* Divider line */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `${position}%`,
        width: 2,
        background: '#B026FF',
        boxShadow: '0 0 12px rgba(176,38,255,0.60)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Handle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: '#B026FF',
          boxShadow: '0 0 0 3px rgba(176,38,255,0.25), 0 4px 16px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#F5F0E8',
          cursor: 'grab',
          transition: dragging ? 'none' : 'left 50ms',
        }}
      >
        <IconArrowsH size={18} />
      </div>
    </div>
  );
}
