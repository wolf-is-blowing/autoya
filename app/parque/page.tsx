import { PageWrapper } from '@/components/layout/PageWrapper';

export default function ParquePage() {
  return (
    <PageWrapper className="flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl mb-4">🚗</div>
        <h1
          className="text-2xl font-bold text-snow mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          Mi Parque
        </h1>
        <p className="text-ghost text-sm">Próximamente — Fase 3</p>
      </div>
    </PageWrapper>
  );
}
