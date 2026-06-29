import Link from 'next/link';
import { BRANDS } from '@/lib/data';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export function BrandsGrid() {
  return (
    <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-7">
        <p
          className="text-muted mb-2 uppercase tracking-[0.1em]"
          style={{ fontFamily: cabinet, fontSize: 11 }}
        >
          Catálogo
        </p>
        <h2
          className="text-ivory"
          style={{ fontFamily: clash, fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          Explora por marca
        </h2>
      </div>

      {/* Scroll horizontal de chips — hover con clases Tailwind puras */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/marcas/${brand.id}`}
            className="
              flex-shrink-0 px-4 py-2 rounded-full
              bg-surface border border-white/[0.08]
              hover:border-electric
              transition-all duration-150 group
            "
          >
            <span
              className="text-ivory group-hover:text-electric whitespace-nowrap transition-colors"
              style={{ fontFamily: cabinet, fontSize: 13, fontWeight: 500 }}
            >
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
