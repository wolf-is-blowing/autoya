/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { FadeInView } from '@/components/ui/FadeInView';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const ICON_SLUG: Record<string, string> = {
  toyota:     'toyota',
  hyundai:    'hyundai',
  kia:        'kia',
  nissan:     'nissan',
  chevrolet:  'chevrolet',
  volkswagen: 'volkswagen',
  bmw:        'bmw',
  /* mercedes: SimpleIcons no tiene este slug verificado — usa initials fallback */
  audi:       'audi',
  suzuki:     'suzuki',
  mitsubishi: 'mitsubishi',
  honda:      'honda',
  mazda:      'mazda',
  ford:       'ford',
  renault:    'renault',
  peugeot:    'peugeot',
  jeep:       'jeep',
  volvo:      'volvo',
  porsche:    'porsche',
  landrover:  'landrover',
  lexus:      'lexus',
  subaru:     'subaru',
};

export function BrandsGrid() {
  return (
    /* brands-section: curved top, overlaps hero bottom by 40px */
    <div className="brands-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        <FadeInView>
          <p
            className="text-muted mb-2 uppercase tracking-[0.1em]"
            style={{ fontFamily: cabinet, fontSize: 11 }}
          >
            Catálogo
          </p>
          <h2
            className="text-ivory mb-6"
            style={{ fontFamily: clash, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Explora por marca
          </h2>
        </FadeInView>

        {/* 2-row horizontal scroll grid — stable fixed-width columns */}
        <div className="brands-grid-2row">
          {BRANDS.map((brand, i) => {
            const slug = ICON_SLUG[brand.id];
            return (
              <div key={brand.id} style={{ scrollSnapAlign: 'start' }}>
                <Link href={`/marcas/${brand.id}`} className="flex flex-col items-center gap-2">

                  {/* Circular avatar — 64×64 fixed */}
                  <div
                    className="brand-avatar flex items-center justify-center"
                    style={{
                      width: 64,
                      height: 64,
                      flexShrink: 0,
                      borderRadius: DNA.radius.avatar,
                      background: '#1C1C1E',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: DNA.shadow.card,
                    }}
                  >
                    {slug ? (
                      <img
                        src={`https://cdn.simpleicons.org/${slug}/F5F0E8`}
                        alt={brand.name}
                        width={28}
                        height={28}
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: cabinet,
                          fontSize: brand.initials.length > 2 ? 11 : 14,
                          fontWeight: 600,
                          color: '#F5F0E8',
                        }}
                      >
                        {brand.initials}
                      </span>
                    )}
                  </div>

                  {/* Brand name */}
                  <span
                    className="text-center"
                    style={{
                      fontFamily: cabinet,
                      fontSize: 10,
                      fontWeight: 400,
                      color: '#8E8E93',
                      width: 64,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                    }}
                  >
                    {brand.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
