'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DNA } from '@/lib/design/dna';
import { authUtils } from '@/lib/auth';
import { getComments, addComment } from '@/lib/ruta';
import type { RutaComment } from '@/types';

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return 'ahora';
  if (mins < 60) return `hace ${mins}m`;
  const h = Math.floor(mins / 60);
  if (h < 24)   return `hace ${h}h`;
  return new Date(iso).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
}

interface CommentsInlineProps {
  postId: string;
  onCountUpdate?: () => void;
}

export function CommentsInline({ postId, onCountUpdate }: CommentsInlineProps) {
  const [comments,  setComments]  = useState<RutaComment[]>([]);
  const [input,     setInput]     = useState('');
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [visible,   setVisible]   = useState(false);

  useEffect(() => {
    setComments(getComments(postId));
    setLoggedIn(authUtils.isLoggedIn());
    // Animate in
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [postId]);

  function handleSubmit() {
    if (!input.trim() || !loggedIn) return;
    const comment = addComment(postId, input);
    setComments((prev) => [...prev, comment]);
    setInput('');
    onCountUpdate?.();
  }

  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.18)',
      overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      transition: `opacity ${DNA.duration.base}, transform ${DNA.duration.base}`,
    }}>
      {/* Comments list */}
      {comments.length > 0 ? (
        <div style={{ padding: '12px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              {/* Avatar */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: '#2C2C2E', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: cabinet, fontSize: 11, fontWeight: 700, color: '#8E8E93',
              }}>
                {c.authorName.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: cabinet, fontSize: 12, fontWeight: 600, color: '#F5F0E8' }}>
                    {c.authorName}
                  </span>
                  <span style={{ fontFamily: cabinet, fontSize: 10, color: '#8E8E93' }}>
                    {formatTime(c.createdAt)}
                  </span>
                </div>
                <p style={{
                  fontFamily: cabinet, fontSize: 13,
                  color: 'rgba(245,240,232,0.80)', lineHeight: 1.5,
                }}>
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{
          padding: '12px 16px 8px',
          fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
        }}>
          Sin comentarios aún. Sé el primero.
        </p>
      )}

      {/* Input */}
      <div style={{ padding: '8px 16px 14px', display: 'flex', gap: 8 }}>
        {loggedIn ? (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Escribe un comentario…"
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: DNA.radius.input,
                border: '1px solid rgba(255,255,255,0.10)',
                background: '#1C1C1E',
                color: '#F5F0E8',
                fontFamily: cabinet, fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              style={{
                flexShrink: 0,
                padding: '9px 14px',
                borderRadius: DNA.radius.button,
                border: 'none',
                background: input.trim() ? '#C8F135' : '#2C2C2E',
                color: input.trim() ? '#111111' : '#8E8E93',
                fontFamily: cabinet, fontSize: 12, fontWeight: 700,
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 150ms',
              }}
            >
              ↑
            </button>
          </>
        ) : (
          <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93' }}>
            <Link href="/acceso?redirect=/caravana" style={{ color: '#0A84FF' }}>
              Inicia sesión
            </Link>{' '}
            para comentar
          </p>
        )}
      </div>
    </div>
  );
}
