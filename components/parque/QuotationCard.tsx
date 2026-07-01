'use client';

import { useState } from 'react';
import { DNA } from '@/lib/design/dna';
import { FadeInView } from '@/components/ui/FadeInView';
import { QuotationTimeline } from './QuotationTimeline';
import type { Quotation, Car } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const STEP_LABELS: Record<string, string> = {
  formulario:    'Formulario',
  contexto:      'Contexto',
  revision:      'Revisión de opciones',
  cotizaciones:  'Cotizaciones',
  'test-drive':  'Test Drive',
  financiamiento:'Financiamiento',
  contrato:      'Contrato',
  desembolso:    'Desembolso',
  aprobacion:    'Aprobación',
  arranque:      'Arranque 🏁',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

interface QuotationCardProps {
  quotation: Quotation;
  car: Car;
}

export function QuotationCard({ quotation, car }: QuotationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const stepLabel = STEP_LABELS[quotation.currentStep] ?? quotation.currentStep;

  return (
    <FadeInView>
      <div style={{
        borderRadius: DNA.radius.card,
        background: '#1C1C1E',
        boxShadow: DNA.shadow.card,
        overflow: 'hidden',
        borderTop: '2px solid #0A84FF',
      }}>
        <div style={{ padding: '16px 16px 14px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: clash,
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#F5F0E8',
                lineHeight: 1.2,
                marginBottom: 2,
              }}>
                {car.model}
              </h3>
              <p style={{ fontFamily: cabinet, fontSize: 13, color: '#8E8E93' }}>
                {car.version}
              </p>
            </div>
            {/* Paso actual */}
            <span style={{
              flexShrink: 0,
              background: 'rgba(10,132,255,0.12)',
              border: '1px solid rgba(10,132,255,0.30)',
              color: '#0A84FF',
              borderRadius: 9999,
              padding: '4px 10px',
              fontFamily: cabinet,
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginTop: 2,
            }}>
              {stepLabel}
            </span>
          </div>

          {/* Fecha */}
          <p style={{
            fontFamily: cabinet,
            fontSize: 12,
            color: '#8E8E93',
            marginBottom: 14,
          }}>
            Última actualización: {formatDate(quotation.updatedAt)}
          </p>

          {/* Toggle timeline */}
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '10px',
              borderRadius: DNA.radius.button,
              border: '1.5px solid rgba(10,132,255,0.50)',
              color: '#0A84FF',
              fontFamily: cabinet,
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'background 150ms',
              gap: 8,
            }}
          >
            {expanded ? 'Ocultar proceso' : 'Ver proceso'}
            <span style={{
              display: 'inline-block',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
              fontSize: 14,
            }}>▾</span>
          </button>

          {/* Timeline — expandible */}
          {expanded && (
            <div style={{
              marginTop: 16,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: 16,
            }}>
              <QuotationTimeline currentStep={quotation.currentStep} />
            </div>
          )}
        </div>
      </div>
    </FadeInView>
  );
}
