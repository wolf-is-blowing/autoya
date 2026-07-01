import { HeroSection }   from '@/components/home/HeroSection';
import { BrandsGrid }    from '@/components/home/BrandsGrid';
import { ServicesGrid }  from '@/components/home/ServicesGrid';
import { NoCarSection }  from '@/components/home/NoCarSection';
import { HasCarSection } from '@/components/home/HasCarSection';
import { DriveSection }  from '@/components/home/DriveSection';
import { AtelierBanner } from '@/components/home/AtelierBanner';
import { Footer }        from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandsGrid />
      <ServicesGrid />
      <NoCarSection />
      <HasCarSection />
      <DriveSection />
      <AtelierBanner />
      <Footer />
    </main>
  );
}
