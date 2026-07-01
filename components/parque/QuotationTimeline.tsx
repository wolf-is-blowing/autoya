import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { QuotationStep } from '@/types';

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface StepDef {
  id: QuotationStep;
  label: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const STEPS: StepDef[] = [
  { id: 'formulario',    label: 'Formulario',          description: 'Completa los detalles de tu búsqueda y preferencias.',                                          ctaLabel: 'Completar formulario',           ctaHref: '/taller?tab=busqueda' },
  { id: 'contexto',      label: 'Contexto',             description: 'Estamos analizando tus preferencias y presupuesto.',                                             ctaLabel: 'Ver detalles',                   ctaHref: '/taller' },
  { id: 'revision',      label: 'Revisión de opciones', description: 'Revisando las mejores alternativas disponibles para ti.',                                        ctaLabel: 'Ver detalles',                   ctaHref: '/taller' },
  { id: 'cotizaciones',  label: 'Cotizaciones',         description: 'Estamos recopilando las mejores ofertas de concesionarias verificadas para ti.',                 ctaLabel: 'Ver cotizaciones',               ctaHref: '/taller' },
  { id: 'test-drive',    label: 'Test Drive',           description: 'Agenda tu prueba de manejo con el concesionario que elegiste.',                                  ctaLabel: 'Agendar Test Drive',             ctaHref: '/taller' },
  { id: 'financiamiento',label: 'Financiamiento',       description: 'Compara y elige la mejor opción de financiamiento disponible.',                                  ctaLabel: 'Ver opciones de financiamiento', ctaHref: '/taller' },
  { id: 'contrato',      label: 'Contrato',             description: 'Revisión y firma del contrato de compraventa.',                                                  ctaLabel: 'Ver detalles',                   ctaHref: '/taller' },
  { id: 'desembolso',    label: 'Desembolso',           description: 'Coordinando el pago y transferencia de fondos al concesionario.',                                ctaLabel: 'Ver detalles',                   ctaHref: '/taller' },
  { id: 'aprobacion',    label: 'Aprobación',           description: 'Aprobación final del financiamiento y revisión de documentos de transferencia.',                 ctaLabel: 'Ver detalles',                   ctaHref: '/taller' },
  { id: 'arranque',      label: 'Arranque 🏁',          description: '¡Tu auto está listo! Coordinando la entrega y firma de los papeles finales.',                   ctaLabel: 'Ver detalles',                   ctaHref: '/taller' },
];

interface QuotationTimelineProps {
  currentStep: QuotationStep;
}

export function QuotationTimeline({ currentStep }: QuotationTimelineProps) {
  const currentIdx    = STEPS.findIndex((s) => s.id === currentStep);
  const currentStepDef = STEPS[currentIdx];

  return (
    <div style={{ paddingTop: 8, paddingBottom: 4 }}>
      {STEPS.map((step, idx) => {
        const done    = idx < currentIdx;
        const active  = idx === currentIdx;

        return (
          <div key={step.id} style={{ display: 'flex', gap: 12, position: 'relative' }}>
            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div style={{
                position: 'absolute',
                left: 11,
                top: 24,
                width: 2,
                bottom: 0,
                background: done ? '#C8F135' : '#2C2C2E',
                transition: 'background 300ms',
              }} />
            )}

            {/* Circle */}
            <div style={{ flexShrink: 0, zIndex: 1 }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: done ? '#C8F135' : 'transparent',
                border: done ? 'none' : active ? '2px solid #0A84FF' : '2px solid #2C2C2E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: active ? 'hud-pulse 2000ms ease-in-out infinite' : 'none',
                boxShadow: active ? '0 0 12px rgba(10,132,255,0.3)' : 'none',
              }}>
                {done && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6 L5 9 L10 3" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {active && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0A84FF' }} />
                )}
              </div>
            </div>

            {/* Label + description */}
            <div style={{ paddingBottom: idx < STEPS.length - 1 ? 18 : 0, flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: cabinet,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: done ? '#8E8E93' : active ? '#0A84FF' : '#8E8E93',
                textDecoration: done ? 'line-through' : 'none',
                lineHeight: 1.4,
                marginBottom: active ? 4 : 0,
              }}>
                {step.label}
              </p>
              {active && (
                <p style={{
                  fontFamily: cabinet,
                  fontSize: 13,
                  color: '#8E8E93',
                  lineHeight: 1.5,
                }}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* CTA contextual al paso actual */}
      {currentStepDef && (
        <div style={{ marginTop: 20 }}>
          <Link href={currentStepDef.ctaHref}>
            <Button variant="ghost-volt" size="md" fullWidth>
              {currentStepDef.ctaLabel}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
