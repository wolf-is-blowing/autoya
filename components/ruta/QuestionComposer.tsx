'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DNA } from '@/lib/design/dna';
import { authUtils } from '@/lib/auth';
import { createQuestionPost } from '@/lib/ruta';
import type { RutaPost } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface QuestionComposerProps {
  onPublished: (post: RutaPost) => void;
}

export function QuestionComposer({ onPublished }: QuestionComposerProps) {
  const router              = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [title,    setTitle]    = useState('');
  const [body,     setBody]     = useState('');
  const [posting,  setPosting]  = useState(false);
  const textareaRef             = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (expanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [expanded]);

  function handleFocus() {
    if (!authUtils.isLoggedIn()) {
      router.push('/acceso?redirect=/caravana');
      return;
    }
    setExpanded(true);
  }

  function handlePublish() {
    if (!title.trim() || posting) return;
    setPosting(true);
    const post = createQuestionPost(title, body);
    setTimeout(() => {
      setPosting(false);
      setExpanded(false);
      setTitle('');
      setBody('');
      onPublished(post);
    }, 300);
  }

  return (
    <div style={{
      background: '#1C1C1E',
      borderRadius: DNA.radius.card,
      border: expanded
        ? '1.5px solid rgba(10,132,255,0.40)'
        : '1.5px solid rgba(255,255,255,0.07)',
      padding: 16,
      marginBottom: 16,
      transition: 'border-color 200ms',
    }}>
      {/* Title input — always visible */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={handleFocus}
        placeholder="¿Qué quieres preguntarle a la comunidad?"
        style={{
          width: '100%',
          background: 'none', border: 'none', outline: 'none',
          fontFamily: cabinet, fontSize: 14,
          color: '#F5F0E8',
          '::placeholder': { color: '#8E8E93' },
        } as React.CSSProperties}
      />

      {/* Expanded view */}
      {expanded && (
        <>
          <div style={{
            height: 1, background: 'rgba(255,255,255,0.07)',
            margin: '12px 0',
          }} />
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Añade más detalle (opcional)…"
            rows={3}
            style={{
              width: '100%',
              background: 'none', border: 'none', outline: 'none', resize: 'none',
              fontFamily: cabinet, fontSize: 13,
              color: 'rgba(245,240,232,0.80)',
              lineHeight: 1.6,
              boxSizing: 'border-box',
            } as React.CSSProperties}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <button
              onClick={() => { setExpanded(false); setTitle(''); setBody(''); }}
              style={{
                background: 'none', border: 'none', padding: '8px 14px',
                fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
                cursor: 'pointer', borderRadius: DNA.radius.button,
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || posting}
              style={{
                padding: '9px 20px',
                borderRadius: DNA.radius.button,
                border: 'none',
                background: title.trim() ? '#C8F135' : '#2C2C2E',
                color: title.trim() ? '#111111' : '#8E8E93',
                fontFamily: cabinet, fontSize: 13, fontWeight: 700,
                textTransform: 'uppercase' as const, letterSpacing: '0.05em',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 150ms, color 150ms',
              }}
            >
              {posting ? '…' : 'Publicar pregunta'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
