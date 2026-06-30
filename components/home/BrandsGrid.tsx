import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { FadeInView } from '@/components/ui/FadeInView';
import { DNA } from '@/lib/design/dna';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

// SimpleIcons CDN slug per brand id
const ICON_SLUG: Record<string, string> = {
  toyota:     'toyota',
  hyundai:    'hyundai',
  kia:        'kia',
  nissan:     'nissan',
  chevrolet:  'chevrolet',
  volkswagen: 'volkswagen',
  bmw:        'bmw',
  mercedes:   'mercedes',
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
    <section className="pt-16 pb-12 px-5 md:px-8 max-w-7xl mx-auto">

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

      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x-mandatory pb-2">
        {BRANDS.map((brand, i) => {
          const slug = ICON_SLUG[brand.id];
          return (
            <FadeInView key={brand.id} delay={i * 30} className="snap-center-item flex-shrink-0">
              <Link href={`/marcas/${brand.id}`} className="flex flex-col items-center gap-2">

                {/* Circular avatar — 64×64 */}
                <div
                  className="brand-avatar flex items-center justify-center"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: DNA.radius.avatar,
                    background: '#1C1C1E',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: DNA.shadow.card,
                    flexShrink: 0,
                  }}
                >
                  {slug ? (
                    // eslint-disable-next-line @next/next/no-img-element
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
                  className="text-center whitespace-nowrap"
                  style={{
                    fontFamily: cabinet,
                    fontSize: 10,
                    fontWeight: 400,
                    color: '#8E8E93',
                    maxWidth: 68,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {brand.name}
                </span>
              </Link>
            </FadeInView>
          );
        })}
      </div>
    </section>
  );
}
