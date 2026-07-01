import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

interface FeatureSectionProps {
  eyebrow: string;
  title: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: 'ghost-volt' | 'ghost-electric';
  imageSlot: ReactNode;
  /** 'top' = image left on desktop; 'bottom' = image right on desktop */
  imagePosition: 'top' | 'bottom';
}

export function FeatureSection({
  eyebrow, title, bullets, ctaLabel, ctaHref, ctaVariant, imageSlot, imagePosition,
}: FeatureSectionProps) {
  const isVolt     = ctaVariant === 'ghost-volt';
  const bulletBg   = isVolt ? 'rgba(200,241,53,0.12)' : 'rgba(10,132,255,0.12)';
  const bulletColor = isVolt ? '#C8F135' : '#0A84FF';

  /* On mobile: flex-col → image (first DOM child) = top always.
     On desktop: flex-row → image left | flex-row-reverse → image right. */
  const flexDir = imagePosition === 'top'
    ? 'flex-col md:flex-row'
    : 'flex-col md:flex-row-reverse';

  return (
    <section className="section-card">
      <div className="max-w-7xl mx-auto px-5 md:px-8" style={{ paddingTop: DNA.spacing.sectionGap, paddingBottom: '48px' }}>
        <div className={`flex ${flexDir} gap-8 md:gap-12 md:items-center`}>

          {/* Image slot — always first in DOM = always top on mobile */}
          <div
            className="w-full md:w-[45%] flex-shrink-0"
            style={{
              borderRadius: DNA.radius.card,
              overflow: 'hidden',
              aspectRatio: '4/3',
              position: 'relative',
              boxShadow: DNA.shadow.card,
            }}
          >
            {imageSlot}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 flex-1">
            <p style={{
              fontFamily: cabinet, fontSize: 11, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8E8E93',
            }}>
              {eyebrow}
            </p>

            <h2 style={{
              fontFamily: clash,
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#F5F0E8',
            }}>
              {title}
            </h2>

            <ul className="flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: bulletBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 11, color: bulletColor, fontWeight: 700 }}>✓</span>
                  </span>
                  <span style={{ fontFamily: cabinet, fontSize: 15, color: '#8E8E93', lineHeight: 1.4 }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="self-start mt-2">
              <Link href={ctaHref}>
                <Button variant={ctaVariant} size="md">
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
