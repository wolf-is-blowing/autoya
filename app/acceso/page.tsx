import Link from 'next/link';
import { Logo }   from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { IconClose } from '@/components/icons/MoutoIcons';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

export default function AccesoPage() {
  return (
    <div className="min-h-dvh bg-carbon flex flex-col relative overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 50% at 50% 110%, rgba(10,132,255,0.10) 0%, transparent 65%)',
        }}
      />
      {/* Subtle top-left glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 10% 0%, rgba(200,241,53,0.04) 0%, transparent 60%)',
        }}
      />

      {/* X — close button back to home */}
      <Link
        href="/"
        className="fixed z-50 flex items-center justify-center"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + 20px)',
          right: 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(28,28,30,0.80)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        aria-label="Cerrar"
      >
        <IconClose size={18} />
      </Link>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-6 pt-16 pb-12">

        {/* Logo */}
        <div className="animate-fade-up mb-16">
          <Logo variant="full" size="lg" />
        </div>

        {/* Headline */}
        <div className="animate-fade-up delay-100 text-center max-w-[300px] mb-auto">
          <h1
            style={{
              fontFamily: clash,
              fontSize: 'clamp(36px, 9vw, 52px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#F5F0E8',
            }}
          >
            Tu lugar como conductor.
          </h1>
          <p
            className="text-muted mt-4"
            style={{ fontFamily: cabinet, fontSize: 15, lineHeight: 1.6 }}
          >
            Encuentra tu auto, agenda servicios y conecta con tu comunidad.
          </p>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-200 w-full max-w-sm flex flex-col gap-3 mt-16">
          <Link href="/onboarding">
            <Button variant="volt" size="lg" fullWidth>
              Crear cuenta gratis
            </Button>
          </Link>
          <Link href="/acceso/login">
            <Button variant="secondary" size="lg" fullWidth>
              Ya tengo cuenta
            </Button>
          </Link>
          <p
            className="text-center text-muted mt-1"
            style={{ fontFamily: cabinet, fontSize: 12 }}
          >
            Es gratis. Siempre.
          </p>
        </div>
      </div>
    </div>
  );
}
