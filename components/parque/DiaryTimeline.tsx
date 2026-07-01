'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDiaryForCar } from '@/lib/driving-mode';
import { MOCK_DIARY_ENTRIES } from '@/lib/data';
import { DNA } from '@/lib/design/dna';
import { ServiceIcon, IconCamera, IconTrophy } from '@/components/icons/MoutoIcons';
import type { AutoDiaryEntry } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const INITIAL_VISIBLE = 5;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
}

function EntryIcon({ type }: { type: AutoDiaryEntry['type'] }) {
  const iconColor: Record<string, string> = {
    trip:      '#0A84FF',
    service:   '#C8F135',
    memory:    '#FF5C00',
    milestone: '#B026FF',
  };
  const color = iconColor[type] ?? '#8E8E93';

  return (
    <div style={{
      width: 36, height: 36, borderRadius: DNA.radius.chip, flexShrink: 0,
      background: `${color}14`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color,
    }}>
      {type === 'trip'      && <ServiceIcon id="exterior" size={17} />}
      {type === 'service'   && <ServiceIcon id="mantenimiento" size={17} />}
      {type === 'memory'    && <IconCamera size={17} />}
      {type === 'milestone' && <IconTrophy size={17} />}
    </div>
  );
}

interface DiaryTimelineProps {
  ownedCarId: string;
  carName: string;
}

export function DiaryTimeline({ ownedCarId, carName }: DiaryTimelineProps) {
  const [entries, setEntries]     = useState<AutoDiaryEntry[]>([]);
  const [expanded, setExpanded]   = useState(false);

  useEffect(() => {
    const mock   = MOCK_DIARY_ENTRIES.filter((e) => e.ownedCarId === ownedCarId);
    const stored = getDiaryForCar(ownedCarId);
    const all    = [...mock, ...stored].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    setEntries(all);
  }, [ownedCarId]);

  const visible = expanded ? entries : entries.slice(0, INITIAL_VISIBLE);

  return (
    <div>
      {/* Section header */}
      <p style={{
        fontFamily: cabinet, fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.10em',
        color: '#8E8E93', marginBottom: 16,
      }}>
        Diario de {carName}
      </p>

      {entries.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '28px 16px',
          background: '#2C2C2E', borderRadius: DNA.radius.chip,
        }}>
          <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93' }}>
            Aún no hay entradas en el diario
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visible.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                background: '#2C2C2E',
                borderRadius: DNA.radius.chip,
              }}
            >
              <EntryIcon type={entry.type} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: cabinet, fontSize: 14, fontWeight: 500,
                  color: entry.type === 'milestone' ? '#B026FF' : '#F5F0E8',
                  marginBottom: 2,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {entry.title}
                </p>
                <p style={{ fontFamily: cabinet, fontSize: 12, color: '#8E8E93' }}>
                  {entry.description
                    ? `${entry.description} · ${formatDate(entry.date)}`
                    : formatDate(entry.date)}
                </p>
              </div>
              {entry.kmAtEntry != null && (
                <span style={{
                  fontFamily: clash, fontSize: 13, fontWeight: 500,
                  color: '#8E8E93', flexShrink: 0,
                }}>
                  {entry.kmAtEntry.toLocaleString('es-PE')} km
                </span>
              )}
            </div>
          ))}

          {entries.length > INITIAL_VISIBLE && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'none', border: 'none', padding: '8px 0',
                fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
                cursor: 'pointer', textAlign: 'center' as const,
              }}
            >
              {expanded ? 'Ver menos' : `Ver ${entries.length - INITIAL_VISIBLE} más`}
            </button>
          )}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Link href="/taller" style={{
          display: 'block', textAlign: 'center',
          fontFamily: cabinet, fontSize: 13, color: '#8E8E93',
          textDecoration: 'none', padding: '6px 0',
        }}>
          Agendar servicio en Taller →
        </Link>
      </div>
    </div>
  );
}
