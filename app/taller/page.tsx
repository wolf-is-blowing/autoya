import { PageWrapper } from '@/components/layout/PageWrapper';

export default function TallerPage() {
  return (
    <PageWrapper className="flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl mb-4">🔧</div>
        <h1
          className="text-2xl font-bold text-snow mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          Taller
        </h1>
        <p className="text-ghost text-sm">Próximamente — Fase 4</p>
      </div>
    </PageWrapper>
  );
}
