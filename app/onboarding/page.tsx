/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BRANDS } from '@/lib/data';
import { authUtils } from '@/lib/auth';
import { Input }  from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DNA } from '@/lib/design/dna';

const ICON_SLUG: Record<string, string> = {
  toyota: 'toyota',     hyundai: 'hyundai',   kia: 'kia',
  nissan: 'nissan',     chevrolet: 'chevrolet', volkswagen: 'volkswagen',
  bmw: 'bmw',           mercedes: 'mercedesbenz',  audi: 'audi',
  suzuki: 'suzuki',     mitsubishi: 'mitsubishi', honda: 'honda',
  mazda: 'mazda',       ford: 'ford',          renault: 'renault',
  peugeot: 'peugeot',  jeep: 'jeep',          volvo: 'volvo',
  porsche: 'porsche',   landrover: 'landrover', lexus: 'lexus',
  subaru: 'subaru',
};

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

const TOTAL = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [nombre,   setNombre]   = useState('');
  const [apellido, setApellido] = useState('');
  const [nameError, setNameError] = useState('');

  // Step 2
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Step 3
  const [tieneCarro, setTieneCarro] = useState<boolean | null>(null);
  const [carBrand,   setCarBrand]   = useState('');
  const [carModel,   setCarModel]   = useState('');
  const [carYear,    setCarYear]    = useState('');

  const complete = (skipCar = false) => {
    const firstCar =
      !skipCar && tieneCarro && carBrand.trim() && carModel.trim()
        ? { brand: carBrand, model: carModel, year: carYear }
        : undefined;
    authUtils.register(`${nombre} ${apellido}`.trim(), selectedBrands, firstCar);
    router.push('/');
  };

  const goNext = () => {
    if (step === 1) {
      if (!nombre.trim()) { setNameError('Ingresa tu nombre'); return; }
      setNameError('');
    }
    if (step < TOTAL) {
      setStep((s) => s + 1);
    } else {
      complete();
    }
  };

  const toggleBrand = (id: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(id)) return prev.filter((b) => b !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-dvh bg-carbon flex flex-col px-6 pt-14 pb-10">

      {/* Top bar — back + step dots */}
      <div className="flex items-center justify-between mb-10">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="text-muted hover:text-ivory transition-colors"
            style={{ fontFamily: cabinet, fontSize: 14 }}
          >
            ← Atrás
          </button>
        ) : (
          <Link
            href="/acceso"
            className="text-muted hover:text-ivory transition-colors"
            style={{ fontFamily: cabinet, fontSize: 14 }}
          >
            ← Atrás
          </Link>
        )}

        {/* Step dots */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i + 1 === step ? 20 : 6,
                height: 6,
                borderRadius: 9999,
                background:
                  i + 1 === step
                    ? '#C8F135'
                    : i + 1 < step
                    ? '#0A84FF'
                    : '#2C2C2E',
                transition: 'width 300ms cubic-bezier(0.16,1,0.3,1), background 200ms',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Step content ── */}
      <div className="flex-1">

        {/* PASO 1 — Nombre */}
        {step === 1 && (
          <div className="animate-fade-up">
            <p
              className="text-muted mb-2 uppercase tracking-[0.1em]"
              style={{ fontFamily: cabinet, fontSize: 11 }}
            >
              Paso 1 de {TOTAL}
            </p>
            <h2
              style={{
                fontFamily: clash,
                fontSize: 'clamp(28px, 7vw, 40px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F0E8',
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              ¿Cómo te llamas?
            </h2>
            <p className="text-muted mb-8" style={{ fontFamily: cabinet, fontSize: 15 }}>
              Tu nombre aparecerá en tu perfil y en las caravanas.
            </p>
            <div className="flex flex-col gap-4">
              <Input
                label="Nombre"
                placeholder="Juan"
                value={nombre}
                onChange={(e) => { setNombre(e.target.value); setNameError(''); }}
                error={nameError}
                autoFocus
              />
              <Input
                label="Apellido"
                placeholder="Quispe"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* PASO 2 — Marca favorita */}
        {step === 2 && (
          <div className="animate-fade-up">
            <p
              className="text-muted mb-2 uppercase tracking-[0.1em]"
              style={{ fontFamily: cabinet, fontSize: 11 }}
            >
              Paso 2 de {TOTAL}
            </p>
            <h2
              style={{
                fontFamily: clash,
                fontSize: 'clamp(28px, 7vw, 40px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F0E8',
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              ¿Cuál es tu marca?
            </h2>
            <p className="text-muted mb-6" style={{ fontFamily: cabinet, fontSize: 15 }}>
              Selecciona hasta 3.{' '}
              {selectedBrands.length > 0 && (
                <span style={{ color: '#C8F135' }}>{selectedBrands.length} seleccionada{selectedBrands.length > 1 ? 's' : ''}</span>
              )}
            </p>

            <div
              className="grid grid-cols-4 gap-x-3 gap-y-4 overflow-y-auto no-scrollbar"
              style={{ maxHeight: '52vh' }}
            >
              {BRANDS.map((brand) => {
                const isSelected = selectedBrands.includes(brand.id);
                const slug = ICON_SLUG[brand.id];
                return (
                  <button
                    key={brand.id}
                    onClick={() => toggleBrand(brand.id)}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: isSelected ? 'rgba(10,132,255,0.15)' : '#1C1C1E',
                        border: isSelected
                          ? '2px solid #0A84FF'
                          : '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'border 150ms, background 150ms, box-shadow 150ms',
                        boxShadow: isSelected ? '0 0 16px rgba(10,132,255,0.2)' : 'none',
                      }}
                    >
                      {slug ? (
                        <img
                          src={`https://cdn.simpleicons.org/${slug}/F5F0E8`}
                          alt={brand.name}
                          width={24}
                          height={24}
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <span
                          style={{
                            fontFamily: cabinet,
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#F5F0E8',
                          }}
                        >
                          {brand.initials}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: cabinet,
                        fontSize: 10,
                        color: isSelected ? '#F5F0E8' : '#8E8E93',
                        textAlign: 'center',
                        lineHeight: 1.2,
                        transition: 'color 150ms',
                      }}
                    >
                      {brand.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* PASO 3 — Primer auto */}
        {step === 3 && (
          <div className="animate-fade-up">
            <p
              className="text-muted mb-2 uppercase tracking-[0.1em]"
              style={{ fontFamily: cabinet, fontSize: 11 }}
            >
              Paso 3 de {TOTAL}
            </p>
            <h2
              style={{
                fontFamily: clash,
                fontSize: 'clamp(28px, 7vw, 40px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: '#F5F0E8',
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              ¿Ya tienes auto?
            </h2>
            <p className="text-muted mb-6" style={{ fontFamily: cabinet, fontSize: 15 }}>
              Lleva el control de tu auto desde Mi Parque.
            </p>

            {/* Toggle */}
            <div className="flex gap-3 mb-6">
              {([{ label: 'Sí, tengo', val: true }, { label: 'Todavía no', val: false }] as const).map(({ label, val }) => (
                <button
                  key={label}
                  onClick={() => setTieneCarro(val)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: DNA.radius.chip,
                    fontFamily: cabinet,
                    fontSize: 14,
                    fontWeight: 500,
                    border: tieneCarro === val
                      ? '1.5px solid #0A84FF'
                      : '1px solid rgba(255,255,255,0.08)',
                    background: tieneCarro === val ? 'rgba(10,132,255,0.12)' : '#1C1C1E',
                    color: tieneCarro === val ? '#F5F0E8' : '#8E8E93',
                    transition: 'all 150ms',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {tieneCarro === true && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <Input
                  label="Marca"
                  placeholder="ej. Toyota"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
                <Input
                  label="Modelo"
                  placeholder="ej. Corolla"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
                <Input
                  label="Año"
                  placeholder="ej. 2022"
                  type="number"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col gap-3 pt-6">
        <Button variant="volt" size="lg" fullWidth onClick={goNext}>
          {step < TOTAL ? 'Continuar' : 'Empezar →'}
        </Button>

        {step === TOTAL && (
          <button
            onClick={() => complete(true)}
            className="text-center text-muted hover:text-ivory transition-colors"
            style={{ fontFamily: cabinet, fontSize: 14 }}
          >
            Ahora no →
          </button>
        )}

        {step === 2 && (
          <button
            onClick={() => setStep(3)}
            className="text-center text-muted hover:text-ivory transition-colors"
            style={{ fontFamily: cabinet, fontSize: 14 }}
          >
            Saltar este paso →
          </button>
        )}
      </div>
    </div>
  );
}
