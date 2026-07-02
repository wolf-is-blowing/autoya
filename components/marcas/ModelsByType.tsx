import { FadeInView } from '@/components/ui/FadeInView';
import { ModelCard } from './ModelCard';
import type { BrandModel } from '@/types';

const clash   = "'Clash Display', system-ui, sans-serif";
const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

type ModelType = BrandModel['type'];

const TYPE_ORDER: ModelType[] = ['SUV', 'Sedán', 'Pickup', 'Hatchback', 'Deportivo', 'Van'];

interface ModelsByTypeProps {
  models: BrandModel[];
  brandName: string;
}

export function ModelsByType({ models, brandName }: ModelsByTypeProps) {
  if (models.length === 0) return null;

  // Group by type, preserving order
  const groups = TYPE_ORDER.reduce<Record<string, BrandModel[]>>((acc, type) => {
    const inType = models.filter((m) => m.type === type);
    if (inType.length) acc[type] = inType;
    return acc;
  }, {});

  return (
    <div style={{ marginBottom: 32 }}>
      <FadeInView>
        <p style={{
          fontFamily: cabinet, fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase' as const, letterSpacing: '0.10em',
          color: '#8E8E93', marginBottom: 20,
        }}>
          Modelos {brandName}
        </p>
      </FadeInView>

      {Object.entries(groups).map(([type, typeModels]) => (
        <div key={type} style={{ marginBottom: 28 }}>
          <FadeInView>
            <h2 style={{
              fontFamily: clash, fontSize: 22, fontWeight: 500,
              letterSpacing: '-0.01em', color: '#F5F0E8',
              marginBottom: 14,
            }}>
              {type}
            </h2>
          </FadeInView>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {typeModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
