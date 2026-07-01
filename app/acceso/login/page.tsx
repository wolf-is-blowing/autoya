'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo }      from '@/components/ui/Logo';
import { Button }    from '@/components/ui/Button';
import { Input }     from '@/components/ui/Input';
import { authUtils } from '@/lib/auth';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get('redirect') ?? '/';
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  const handleLogin = () => {
    if (!email.trim()) {
      setError('Ingresa tu email');
      return;
    }
    authUtils.login();
    router.push(redirectTo);
  };

  return (
    <div className="relative z-10 w-full max-w-sm">
      <div className="flex justify-center mb-10">
        <Link href="/acceso">
          <Logo variant="icon" size="md" />
        </Link>
      </div>

      <h1
        className="mb-2"
        style={{ fontFamily: clash, fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: '#F5F0E8', lineHeight: 1.1 }}
      >
        Bienvenido de vuelta.
      </h1>
      <p
        className="text-muted mb-8"
        style={{ fontFamily: cabinet, fontSize: 14, lineHeight: 1.6 }}
      >
        Ingresa tus datos para continuar.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          error={error}
          autoComplete="email"
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <Button variant="volt" size="lg" fullWidth onClick={handleLogin}>
        Entrar
      </Button>

      <p className="text-center mt-6" style={{ fontFamily: cabinet, fontSize: 13 }}>
        <span className="text-muted">¿No tienes cuenta? </span>
        <Link href="/onboarding" className="text-electric hover:underline">Crear cuenta</Link>
      </p>

      <div className="text-center mt-8">
        <Link href="/acceso" className="text-muted hover:text-ivory transition-colors" style={{ fontFamily: cabinet, fontSize: 13 }}>
          ← Volver
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-dvh bg-carbon flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(10,132,255,0.08) 0%, transparent 65%)' }}
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
