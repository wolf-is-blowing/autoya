import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { IconArrowRight } from '@/components/icons';

export function BrandsGrid() {
  const bebas = "var(--font-bebas), 'Bebas Neue', sans-serif";
  const dm    = "var(--font-dm-sans), sans-serif";

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p
            className="text-muted mb-1 uppercase tracking-[0.12em]"
            style={{ fontFamily: dm, fontSize: 11 }}
          >
            Catálogo
          </p>
          <h2 style={{ fontFamily: bebas, fontSize: 36, letterSpacing: '0.02em', color: '#F0F0F0' }}>
            Explora por marca
          </h2>
        </div>
        <Link
          href="/taller?tab=busqueda"
          className="hidden sm:flex items-center gap-1.5 text-muted hover:text-volt transition-colors"
          style={{ fontFamily: dm, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}
        >
          Ver todas <IconArrowRight size={14} />
        </Link>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {BRANDS.map((brand) => (
          <Link
              key={brand.id}
              href={`/marcas/${brand.id}`}
              className="flex-shrink-0 group px-4 py-2.5 border border-rim hover:border-volt transition-colors duration-200"
              style={{ background: '#1A1A2E', borderRadius: 0, minWidth: 90 }}
            >
              <span
                className="block text-center text-snow group-hover:text-volt transition-colors whitespace-nowrap"
                style={{ fontFamily: dm, fontSize: 12, fontWeight: 500 }}
              >
                {brand.name}
              </span>
            </Link>
        ))}
      </div>

      {/* Mobile: ver todas */}
      <div className="sm:hidden mt-5">
        <Link
          href="/taller?tab=busqueda"
          className="flex items-center gap-1.5 text-muted hover:text-volt transition-colors"
          style={{ fontFamily: dm, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}
        >
          Ver todas las marcas <IconArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
