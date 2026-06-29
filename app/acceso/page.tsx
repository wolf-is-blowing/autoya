import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Logo }   from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconShield } from '@/components/icons';

export default function AccesoPage() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
          <IconShield size={28} className="text-accent" />
        </div>

        <h1
          className="text-2xl font-bold text-snow mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          Inicia sesión para continuar
        </h1>
        <p className="text-ghost text-sm mb-8 leading-relaxed">
          Esta sección está disponible solo para conductores registrados en Mouto.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button variant="primary" size="lg" fullWidth>
              Crear cuenta gratis
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="lg" fullWidth>
              Ya tengo cuenta
            </Button>
          </Link>
        </div>

        <Link href="/" className="block mt-6 text-sm text-ghost hover:text-snow transition-colors">
          Volver al inicio
        </Link>
      </div>
    </PageWrapper>
  );
}
