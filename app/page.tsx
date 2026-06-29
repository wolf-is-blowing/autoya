import { PageWrapper }   from '@/components/layout/PageWrapper';
import { HeroSection }   from '@/components/home/HeroSection';
import { BrandsGrid }    from '@/components/home/BrandsGrid';
import { ServicesGrid }  from '@/components/home/ServicesGrid';

export default function HomePage() {
  return (
    <PageWrapper noBottomPad>
      <HeroSection />
      <BrandsGrid />
      <ServicesGrid />

      {/* Footer spacing for bottom nav */}
      <div className="h-24" />
    </PageWrapper>
  );
}
