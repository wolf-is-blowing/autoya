'use client';

import { useState, useEffect } from 'react';
import { DNA } from '@/lib/design/dna';

/* eslint-disable @next/next/no-img-element */

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=85&auto=format',
    chip: 'PASO 1',
    title: 'Compara y cotiza',
  },
  {
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=85&auto=format',
    chip: 'PASO 2',
    title: 'Financia a tu medida',
  },
  {
    img: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=800&q=85&auto=format',
    chip: 'PASO 3',
    title: 'El auto es tuyo',
  },
] as const;

export function NoCarCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Slides — crossfade via opacity */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <img
            src={s.img}
            alt=""
            aria-hidden
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Bottom gradient */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(17,17,17,0.90) 0%, transparent 50%)',
            }}
          />
          {/* Chip + title overlay */}
          <div style={{ position: 'absolute', bottom: 44, left: 16, right: 16, zIndex: 2 }}>
            <span style={{
              fontFamily: cabinet,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.10em',
              color: '#C8F135',
              background: 'rgba(200,241,53,0.12)',
              border: '1px solid rgba(200,241,53,0.30)',
              borderRadius: 9999,
              padding: '3px 10px',
              display: 'inline-block',
              marginBottom: 8,
            }}>
              {s.chip}
            </span>
            <p style={{
              fontFamily: clash,
              fontSize: 18,
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: '#F5F0E8',
              lineHeight: 1.2,
            }}>
              {s.title}
            </p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i === active ? '#C8F135' : '#2C2C2E',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'background 250ms ease, transform 250ms ease',
              transform: i === active ? 'scale(1.4)' : 'scale(1)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
