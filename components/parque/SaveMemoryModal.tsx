'use client';

import { useState, useEffect } from 'react';
import { DNA } from '@/lib/design/dna';
import { IconClose } from '@/components/icons/MoutoIcons';
import { saveMemory } from '@/lib/driving-mode';
import type { TripMemory } from '@/types';

/* eslint-disable @next/next/no-img-element */

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&q=80',
  'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=600&q=80',
];

const CAPTION_MAX = 100;

interface SaveMemoryModalProps {
  ownedCarId: string;
  tripId?:    string;
  onSaved:    () => void;
  onClose:    () => void;
}

export function SaveMemoryModal({ ownedCarId, tripId, onSaved, onClose }: SaveMemoryModalProps) {
  const [selected, setSelected]   = useState(0);
  const [caption,  setCaption]    = useState('');
  const [location, setLocation]   = useState('');
  const [saving,   setSaving]     = useState(false);
  const [visible,  setVisible]    = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  function handleSave() {
    setSaving(true);
    const memory: TripMemory = {
      id:          `mem_${Date.now()}`,
      ownedCarId,
      tripId,
      photo:       MOCK_PHOTOS[selected],
      caption:     caption.trim() || 'Recuerdo guardado',
      location:    location.trim() || undefined,
      createdAt:   new Date().toISOString(),
    };
    saveMemory(memory);
    setTimeout(() => {
      setSaving(false);
      onSaved();
    }, 400);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 210, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.75)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 300ms',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#1C1C1E',
        borderRadius: `${DNA.radius.card} ${DNA.radius.card} 0 0`,
        padding: '24px 20px 48px',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform 350ms ${DNA.easing.out}`,
        maxHeight: '90dvh',
        overflowY: 'auto',
      }}>
        {/* Handle */}
        <div style={{
          width: 36, height: 4, borderRadius: 9999,
          background: 'rgba(255,255,255,0.18)',
          margin: '0 auto 20px',
        }} />
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: '#2C2C2E', border: 'none', borderRadius: '50%',
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#8E8E93',
          }}
          aria-label="Cerrar"
        >
          <IconClose size={16} />
        </button>

        <p style={{
          fontFamily: cabinet, fontSize: 11, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.10em',
          color: '#8E8E93', marginBottom: 16,
        }}>
          Guardar recuerdo
        </p>

        {/* Photo selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
          {MOCK_PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                border: selected === i
                  ? '2px solid #C8F135'
                  : '2px solid transparent',
                borderRadius: 10,
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '1',
                outline: 'none',
              }}
            >
              <img
                src={photo}
                alt={`Foto ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>

        {/* Selected photo preview */}
        <div style={{
          height: 160, borderRadius: 12, overflow: 'hidden',
          marginBottom: 20, position: 'relative',
        }}>
          <img
            src={MOCK_PHOTOS[selected]}
            alt="Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(17,17,17,0.70) 100%)',
          }} />
        </div>

        {/* Caption */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
            }}>
              Descripción
            </label>
            <span style={{ fontFamily: cabinet, fontSize: 11, color: '#8E8E93' }}>
              {caption.length}/{CAPTION_MAX}
            </span>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value.slice(0, CAPTION_MAX))}
            placeholder="¿Qué hace especial este momento?"
            rows={2}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: DNA.radius.input,
              border: '1.5px solid rgba(255,255,255,0.10)',
              background: '#2C2C2E',
              color: '#F5F0E8',
              fontFamily: cabinet, fontSize: 14,
              outline: 'none', resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Location — text only, never GPS */}
        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block',
            fontFamily: cabinet, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.10em',
            color: '#8E8E93', marginBottom: 8,
          }}>
            Lugar (opcional)
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="ej. Malecón de Miraflores"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: DNA.radius.input,
              border: '1.5px solid rgba(255,255,255,0.10)',
              background: '#2C2C2E',
              color: '#F5F0E8',
              fontFamily: cabinet, fontSize: 15,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            width: '100%', padding: '14px',
            borderRadius: DNA.radius.button,
            border: 'none',
            background: saving ? '#2C2C2E' : '#C8F135',
            color: saving ? '#8E8E93' : '#111111',
            fontFamily: cabinet, fontSize: 14, fontWeight: 700,
            textTransform: 'uppercase' as const, letterSpacing: '0.06em',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background 200ms',
          }}
        >
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </div>
  );
}
