import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { FadeInView } from '@/components/ui/FadeInView';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

function initialsSize(str: string) {
  if (str.length === 1) return 18;
  if (str.length === 2) return 15;
  return 11;
}

export function BrandsGrid() {
  return (
    <section className="pt-16 pb-12 px-5 md:px-8 max-w-7xl mx-auto">

      {/* Section header */}
      <FadeInView>
        <p
          className="text-muted mb-2 uppercase tracking-[0.1em]"
          style={{ fontFamily: cabinet, fontSize: 11 }}
        >
          Catálogo
        </p>
        <h2
          className="text-ivory mb-7"
          style={{ fontFamily: clash, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em' }}
        >
          Explora por marca
        </h2>
      </FadeInView>

      {/* Horizontal scroll — circular avatars with snap */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x-mandatory pb-2">
        {BRANDS.map((brand, i) => (
          <FadeInView key={brand.id} delay={i * 30} className="snap-center-item flex-shrink-0">
            <Link
              href={`/marcas/${brand.id}`}
              className="flex flex-col items-center gap-2"
            >
              {/* Circular avatar */}
              <div
                className="brand-avatar flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: DNA.radius.avatar,
                  background: '#1C1C1E',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: DNA.shadow.card,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: cabinet,
                    fontSize: initialsSize(brand.initials),
                    fontWeight: 600,
                    color: '#F5F0E8',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                  }}
                >
                  {brand.initials}
                </span>
              </div>

              {/* Brand name below */}
              <span
                className="text-center whitespace-nowrap"
                style={{
                  fontFamily: cabinet,
                  fontSize: 10,
                  fontWeight: 400,
                  color: '#8E8E93',
                  maxWidth: 64,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {brand.name}
              </span>
            </Link>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
