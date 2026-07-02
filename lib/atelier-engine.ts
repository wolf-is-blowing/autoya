// TODO: reemplazar esta simulación por llamada real a Replicate API usando
// REPLICATE_API_TOKEN. Requiere convertir el proyecto de static export a
// servidor (quitar output:'export' de next.config) para habilitar rutas de
// API. Ver /lib/atelier-engine.ts como único punto de integración.

import type { AtelierCategory, AtelierGeneration } from '@/types';
import { MOCK_TRANSFORMATIONS } from '@/lib/data/atelier';

const GENERATIONS_KEY = 'mouto_atelier_generations';

export async function generateTransformation(
  carImageUrl: string,
  categoryId: AtelierCategory,
  optionId: string,
): Promise<AtelierGeneration> {
  // Simula latencia real de generación IA: 2.5–3.5s
  const delay = 2500 + Math.random() * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const pair = MOCK_TRANSFORMATIONS[categoryId];

  const generation: AtelierGeneration = {
    id:             `ag_${Date.now()}`,
    carId:          null,
    categoryId,
    optionId,
    beforeImageUrl: carImageUrl || pair.before,
    afterImageUrl:  pair.after,
    createdAt:      new Date().toISOString(),
    savedByUser:    false,
  };

  return generation;
}

export function saveGeneration(generation: AtelierGeneration): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getUserGenerations();
    const updated = all.filter((g) => g.id !== generation.id);
    updated.unshift({ ...generation, savedByUser: true });
    localStorage.setItem(GENERATIONS_KEY, JSON.stringify(updated));
  } catch { /* silent */ }
}

export function getUserGenerations(): AtelierGeneration[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(GENERATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
