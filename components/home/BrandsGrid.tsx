import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { IconArrowRight } from '@/components/icons';

export function BrandsGrid() {
  return (
    <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-1">
            Catálogo
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-snow"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            Explora por marca
          </h2>
        </div>
        <Link
          href="/taller?tab=busqueda"
          className="hidden sm:flex items-center gap-1.5 text-sm text-ghost hover:text-accent transition-colors"
        >
          Ver todas <IconArrowRight size={16} />
        </Link>
      </div>

      {/* Horizontal scroll on mobile, wrap on desktop */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible pb-2 md:pb-0">
        {BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/marcas/${brand.id}`}
            className="flex-shrink-0 group"
          >
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-surface border border-rim hover:border-accent/40 hover-glow transition-all duration-200 w-20 md:w-24">
              {/* Brand circle with initials */}
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: brand.color, fontFamily: 'var(--font-space-grotesk), sans-serif' }}
              >
                {brand.initials}
              </div>
              <span className="text-[11px] text-ghost group-hover:text-snow transition-colors text-center leading-tight w-full truncate px-1">
                {brand.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: ver todas */}
      <div className="sm:hidden mt-4">
        <Link
          href="/taller?tab=busqueda"
          className="flex items-center justify-center gap-1.5 text-sm text-ghost hover:text-accent transition-colors py-2"
        >
          Ver todas las marcas <IconArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
