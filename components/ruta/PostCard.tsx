/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import {
  IconMegaphone, IconDestello,
} from '@/components/icons/MoutoIcons';
import { hasReacted, toggleDestello } from '@/lib/ruta';
import { MOCK_CARAVANAS } from '@/lib/data';
import { CommentsInline } from './CommentsInline';
import type { RutaPost } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

// ── Design tokens per type ─────────────────────────────────────────────────

const ACCENT: Record<RutaPost['type'], string> = {
  question:       '#0A84FF',
  marketplace:    '#C8F135',
  announcement:   '#C8F135',
  launch:         '#B026FF',
  industry_news:  '#0A84FF',
  brand_news:     '#0A84FF',
  memory_share:   '#C8F135',
  atelier_share:  '#B026FF',
};

const TYPE_LABEL: Partial<Record<RutaPost['type'], string>> = {
  question:       'PREGUNTA',
  marketplace:    'VENTA',
  launch:         'LANZAMIENTO',
  atelier_share:  'ATELIER',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)    return 'ahora';
  if (mins < 60)   return `hace ${mins}m`;
  const h = Math.floor(mins / 60);
  if (h < 24)      return `hace ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7)       return `hace ${d}d`;
  return new Date(iso).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
}

function Avatar({ name, isEditor }: { name: string; isEditor: boolean }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: isEditor ? 'rgba(200,241,53,0.12)' : '#2C2C2E',
      border: `1.5px solid ${isEditor ? 'rgba(200,241,53,0.35)' : 'rgba(255,255,255,0.08)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: cabinet, fontSize: 14, fontWeight: 700,
      color: isEditor ? '#C8F135' : '#8E8E93',
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function BrandCircle({ slug }: { slug: string }) {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
      background: '#2C2C2E', border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img
        src={`https://cdn.simpleicons.org/${slug}/F5F0E8`}
        alt={slug} width={20} height={20}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

function ImageBlock({ url, ratio = '56.25%' }: { url: string; ratio?: string }) {
  return (
    <div style={{ position: 'relative', paddingBottom: ratio, overflow: 'hidden' }}>
      <img
        src={url}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
        }}
      />
    </div>
  );
}

function BodyText({ text, expanded, onToggle }: { text: string; expanded: boolean; onToggle: () => void }) {
  if (!text) return null;
  return (
    <div>
      <p style={{
        fontFamily: cabinet, fontSize: 14, color: 'rgba(245,240,232,0.75)',
        lineHeight: 1.6,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
        WebkitLineClamp: expanded ? undefined : 3,
        overflow: expanded ? 'visible' : 'hidden',
      } as React.CSSProperties}>
        {text}
      </p>
      {text.length > 140 && (
        <button
          onClick={onToggle}
          style={{
            background: 'none', border: 'none', padding: '4px 0 0',
            fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
            cursor: 'pointer',
          }}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}

// ── Content sections per type ──────────────────────────────────────────────

function QuestionContent({ post, expanded, onToggle }: { post: RutaPost; expanded: boolean; onToggle: () => void }) {
  return (
    <div style={{ padding: '14px 16px 0' }}>
      <div style={{
        display: 'inline-block',
        background: 'rgba(10,132,255,0.12)',
        color: '#0A84FF',
        borderRadius: 6, padding: '2px 8px',
        fontFamily: cabinet, fontSize: 10, fontWeight: 700,
        letterSpacing: '0.08em',
        marginBottom: 10,
      }}>
        PREGUNTA
      </div>
      <p style={{
        fontFamily: cabinet, fontSize: 16, fontWeight: 600,
        color: '#F5F0E8', lineHeight: 1.4, marginBottom: 10,
      }}>
        {post.title}
      </p>
      <BodyText text={post.body} expanded={expanded} onToggle={onToggle} />
    </div>
  );
}

function MarketplaceContent({ post, expanded, onToggle }: { post: RutaPost; expanded: boolean; onToggle: () => void }) {
  return (
    <div>
      {post.imageUrl && (
        <div style={{ position: 'relative' }}>
          <ImageBlock url={post.imageUrl} />
          {post.price != null && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(17,17,17,0.80)',
              backdropFilter: 'blur(8px)',
              borderRadius: 8, padding: '6px 12px',
            }}>
              <span style={{
                fontFamily: clash, fontSize: 18, fontWeight: 500,
                color: '#C8F135', letterSpacing: '-0.02em',
              }}>
                S/ {post.price.toLocaleString('es-PE')}
              </span>
            </div>
          )}
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(200,241,53,0.15)',
            border: '1px solid rgba(200,241,53,0.40)',
            borderRadius: 6, padding: '2px 8px',
            fontFamily: cabinet, fontSize: 10, fontWeight: 700,
            color: '#C8F135', letterSpacing: '0.08em',
            backdropFilter: 'blur(8px)',
          }}>
            VENTA
          </div>
        </div>
      )}
      <div style={{ padding: '14px 16px 0' }}>
        <p style={{
          fontFamily: cabinet, fontSize: 15, fontWeight: 600,
          color: '#F5F0E8', marginBottom: 8,
        }}>
          {post.title}
        </p>
        <BodyText text={post.body} expanded={expanded} onToggle={onToggle} />
      </div>
    </div>
  );
}

function AnnouncementContent({ post, expanded, onToggle }: { post: RutaPost; expanded: boolean; onToggle: () => void }) {
  return (
    <div style={{ padding: '14px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
        <div style={{ color: '#C8F135', marginTop: 1, flexShrink: 0 }}>
          <IconMegaphone size={18} />
        </div>
        <p style={{
          fontFamily: cabinet, fontSize: 16, fontWeight: 600,
          color: '#F5F0E8', lineHeight: 1.4,
        }}>
          {post.title}
        </p>
      </div>
      <BodyText text={post.body} expanded={expanded} onToggle={onToggle} />
    </div>
  );
}

function LaunchContent({ post, expanded, onToggle }: { post: RutaPost; expanded: boolean; onToggle: () => void }) {
  return (
    <div>
      {post.imageUrl && <ImageBlock url={post.imageUrl} />}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          {post.brandSlug && <BrandCircle slug={post.brandSlug} />}
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(176,38,255,0.12)',
              color: '#B026FF',
              borderRadius: 6, padding: '2px 8px',
              fontFamily: cabinet, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.08em', marginBottom: 4,
            }}>
              LANZAMIENTO
            </div>
            <p style={{
              fontFamily: cabinet, fontSize: 15, fontWeight: 600,
              color: '#F5F0E8', lineHeight: 1.35,
            }}>
              {post.title}
            </p>
          </div>
        </div>
        <BodyText text={post.body} expanded={expanded} onToggle={onToggle} />
      </div>
    </div>
  );
}

function NewsContent({ post }: { post: RutaPost }) {
  const hasImage   = !!post.imageUrl;
  const hasBrand   = !!post.brandSlug && !hasImage;

  return (
    <div style={{ padding: '14px 16px 0' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {/* Thumbnail or brand logo */}
        {(hasImage || hasBrand) && (
          <div style={{ width: 72, height: 72, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
            {hasImage ? (
              <img
                src={post.imageUrl!}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: '#2C2C2E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={`https://cdn.simpleicons.org/${post.brandSlug}/F5F0E8`}
                  alt={post.brandSlug} width={32} height={32}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
          </div>
        )}
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: cabinet, fontSize: 14, fontWeight: 600,
            color: '#F5F0E8', lineHeight: 1.4, marginBottom: 4,
          }}>
            {post.title}
          </p>
          {post.sourceLabel && (
            <p style={{
              fontFamily: cabinet, fontSize: 11, color: '#8E8E93',
              marginBottom: 6,
            }}>
              Fuente: {post.sourceLabel}
            </p>
          )}
          <p style={{
            fontFamily: cabinet, fontSize: 13, color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
            WebkitLineClamp: 2,
            overflow: 'hidden',
          } as React.CSSProperties}>
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function MemoryContent({ post, isAtelier }: { post: RutaPost; isAtelier: boolean }) {
  const accent = isAtelier ? '#B026FF' : '#C8F135';
  return (
    <div>
      {post.imageUrl && (
        <div style={{ position: 'relative', paddingBottom: '75%', overflow: 'hidden' }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(17,17,17,0.85) 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
            <p style={{
              fontFamily: cabinet, fontSize: 15, fontWeight: 600,
              color: '#F5F0E8', marginBottom: 3,
            }}>
              {post.title}
            </p>
            {post.body && (
              <p style={{ fontFamily: cabinet, fontSize: 12, color: 'rgba(245,240,232,0.70)' }}>
                {post.body}
              </p>
            )}
          </div>
          {isAtelier && (
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: 'rgba(176,38,255,0.18)',
              border: '1px solid rgba(176,38,255,0.45)',
              borderRadius: 6, padding: '2px 8px',
              fontFamily: cabinet, fontSize: 10, fontWeight: 700,
              color: accent, letterSpacing: '0.08em',
              backdropFilter: 'blur(8px)',
            }}>
              ATELIER
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main PostCard ──────────────────────────────────────────────────────────

interface PostCardProps {
  post: RutaPost;
}

export function PostCard({ post }: PostCardProps) {
  const isEditor            = post.authorId === 'mouto_editorial';
  const accent              = ACCENT[post.type];
  const typeLabel           = TYPE_LABEL[post.type];
  const [destellado,  setDestellado]  = useState(false);
  const [count,       setCount]       = useState(post.reactionsCount);
  const [countBounce, setCountBounce] = useState(false);
  const [label,       setLabel]       = useState<'count' | 'done'>('count');
  const [flash,       setFlash]       = useState(false);
  const [expanded,    setExpanded]    = useState(false);
  const [showCmts,    setShowCmts]    = useState(false);

  const caravana = post.caravanaId
    ? MOCK_CARAVANAS.find((c) => c.id === post.caravanaId)
    : null;

  useEffect(() => {
    setDestellado(hasReacted(post.id));
  }, [post.id]);

  function handleDestello() {
    const now = toggleDestello(post.id);
    setDestellado(now);
    setCount((c) => now ? c + 1 : c - 1);

    if (now) {
      // Flash pulse
      setFlash(true);
      setTimeout(() => setFlash(false), 350);
      // Counter bounce
      setCountBounce(true);
      setTimeout(() => setCountBounce(false), 220);
      // Label "Destellado ✓" for 1.5s
      setLabel('done');
      setTimeout(() => setLabel('count'), 1500);
    }
  }

  const isCompactNews = post.type === 'industry_news' || post.type === 'brand_news';
  const isAnnouncement = post.type === 'announcement';
  const cardBg = isAnnouncement ? '#2C2C2E' : '#1C1C1E';

  return (
    <FadeInView>
      <article style={{
        borderRadius: DNA.radius.card,
        background: cardBg,
        boxShadow: DNA.shadow.card,
        overflow: 'hidden',
        borderTop: `2px solid ${accent}`,
        position: 'relative',
      }}>
        {/* Pinned badge */}
        {post.isPinned && (
          <div style={{
            position: 'absolute', top: 0, right: 16,
            background: '#C8F135',
            color: '#111111',
            fontFamily: cabinet, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.10em', padding: '2px 10px',
            borderRadius: '0 0 8px 8px',
          }}>
            DESTACADO
          </div>
        )}

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px',
          paddingBottom: isCompactNews ? 0 : 12,
          paddingRight: post.isPinned ? 80 : 16,
        }}>
          <Avatar name={post.authorName} isEditor={isEditor} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' as const }}>
              <span style={{
                fontFamily: cabinet, fontSize: 13, fontWeight: 600,
                color: isEditor ? '#C8F135' : '#F5F0E8',
              }}>
                {post.authorName}
              </span>
              {caravana && (
                <span style={{
                  background: '#2C2C2E',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 9999, padding: '1px 7px',
                  fontFamily: cabinet, fontSize: 10, color: '#8E8E93',
                }}>
                  {caravana.name}
                </span>
              )}
            </div>
            <p style={{ fontFamily: cabinet, fontSize: 11, color: '#8E8E93', marginTop: 1 }}>
              {formatRelativeTime(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Content per type */}
        {post.type === 'question'      && <QuestionContent post={post} expanded={expanded} onToggle={() => setExpanded(!expanded)} />}
        {post.type === 'marketplace'   && <MarketplaceContent post={post} expanded={expanded} onToggle={() => setExpanded(!expanded)} />}
        {post.type === 'announcement'  && <AnnouncementContent post={post} expanded={expanded} onToggle={() => setExpanded(!expanded)} />}
        {post.type === 'launch'        && <LaunchContent post={post} expanded={expanded} onToggle={() => setExpanded(!expanded)} />}
        {isCompactNews                 && <NewsContent post={post} />}
        {post.type === 'memory_share'  && <MemoryContent post={post} isAtelier={false} />}
        {post.type === 'atelier_share' && <MemoryContent post={post} isAtelier />}

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '12px 16px 14px',
        }}>
          {/* Destello */}
          <button
            onClick={handleDestello}
            title="Destellar"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', padding: 0,
              cursor: 'pointer',
              color: destellado ? '#C8F135' : '#8E8E93',
              transition: 'color 150ms',
              position: 'relative',
            }}
          >
            {/* Flash ring */}
            <span style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              boxShadow: flash ? '0 0 0 8px rgba(200,241,53,0.45)' : '0 0 0 0px rgba(200,241,53,0)',
              opacity: flash ? 0 : 1,
              transform: flash ? 'scale(1.4)' : 'scale(1)',
              transition: flash
                ? 'box-shadow 300ms ease-out, transform 300ms ease-out, opacity 300ms ease-out'
                : 'none',
              pointerEvents: 'none',
            }} />
            <IconDestello
              size={19}
              active={destellado}
              id={`destello-${post.id}`}
            />
            {label === 'done' ? (
              <span style={{
                fontFamily: cabinet, fontSize: 12, fontWeight: 600,
                color: '#C8F135', whiteSpace: 'nowrap',
              }}>
                Destellado ✓
              </span>
            ) : (
              <span style={{
                fontFamily: cabinet, fontSize: 13,
                fontWeight: destellado ? 600 : 400,
                transform: countBounce ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'transform 200ms ease-out',
                display: 'inline-block',
              }}>
                {count}
              </span>
            )}
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowCmts(!showCmts)}
            style={{
              background: 'none', border: 'none', padding: 0,
              fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
              cursor: 'pointer',
            }}
          >
            {post.commentsCount} comentario{post.commentsCount !== 1 ? 's' : ''}
          </button>
        </div>

        {/* Comments inline */}
        {showCmts && (
          <CommentsInline
            postId={post.id}
            onCountUpdate={() => {/* count shown is static from post for simplicity */}}
          />
        )}
      </article>
    </FadeInView>
  );
}
