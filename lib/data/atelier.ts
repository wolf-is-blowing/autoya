import type { AtelierCategory, AtelierOption, AtelierGeneration } from '@/types';

export interface AtelierCategoryMeta {
  id: AtelierCategory;
  label: string;
  iconId: string; // maps to ServiceIcon id or custom icon key
  description: string;
}

export const ATELIER_CATEGORIES: AtelierCategoryMeta[] = [
  { id: 'color',       label: 'Color y Wraps',      iconId: 'paint',       description: 'Cambia el color de tu auto sin comprometerte' },
  { id: 'llantas',     label: 'Llantas',             iconId: 'wheel',       description: 'Prueba distintos rines antes de comprarlos'    },
  { id: 'styling',     label: 'Styling',             iconId: 'styling',     description: 'Kits estéticos, spoilers, difusores'            },
  { id: 'interior',    label: 'Interior',            iconId: 'tapiceria',   description: 'Tapicería y acabados personalizados'            },
  { id: 'performance', label: 'Performance visual',  iconId: 'performance', description: 'Escapes, suspensión, look deportivo'            },
];

export const ATELIER_OPTIONS: AtelierOption[] = [
  // ── Color ──
  { id: 'co_01', categoryId: 'color', label: 'Rojo Pasión',      thumbnailUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&q=80', description: 'Rojo cereza intenso, acabado mate' },
  { id: 'co_02', categoryId: 'color', label: 'Azul Eléctrico',   thumbnailUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80', description: 'Azul metálico profundo'             },
  { id: 'co_03', categoryId: 'color', label: 'Verde Oliva',      thumbnailUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80', description: 'Verde militar, acabado satinado'     },
  { id: 'co_04', categoryId: 'color', label: 'Negro Gloss',      thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80', description: 'Negro piano, máximo brillo'          },

  // ── Llantas ──
  { id: 'll_01', categoryId: 'llantas', label: 'Rin 18" Sport',   thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'Multiradiante, negro brillo'         },
  { id: 'll_02', categoryId: 'llantas', label: 'Rin 20" Forged',  thumbnailUrl: 'https://images.unsplash.com/photo-1614026480418-bd11fdb9a3e2?w=400&q=80', description: 'Forjado 5 rayos, silver'             },
  { id: 'll_03', categoryId: 'llantas', label: 'Rin 17" Classic', thumbnailUrl: 'https://images.unsplash.com/photo-1600705722908-bcd6b01e3caa?w=400&q=80', description: 'Estilo clásico, cromo satinado'       },
  { id: 'll_04', categoryId: 'llantas', label: 'Rin 19" Mesh',    thumbnailUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', description: 'Diseño mesh, bicolor'                 },

  // ── Styling ──
  { id: 'st_01', categoryId: 'styling', label: 'Kit Aero Delantero', thumbnailUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80', description: 'Lip frontal y canards laterales' },
  { id: 'st_02', categoryId: 'styling', label: 'Spoiler Trasero',    thumbnailUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80', description: 'Alerón tipo GT en fibra de carbono' },
  { id: 'st_03', categoryId: 'styling', label: 'Difusor Inferior',   thumbnailUrl: 'https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=400&q=80', description: 'Difusor trasero deportivo' },

  // ── Interior ──
  { id: 'in_01', categoryId: 'interior', label: 'Tapicería Sport Negro', thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80', description: 'Cuero sintético negro, costuras rojas' },
  { id: 'in_02', categoryId: 'interior', label: 'Interior Crema Luxury', thumbnailUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&q=80', description: 'Cuero natural crema, madera clara'      },
  { id: 'in_03', categoryId: 'interior', label: 'Panel Carbono',         thumbnailUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&q=80', description: 'Trim de fibra de carbono real'           },

  // ── Performance ──
  { id: 'pe_01', categoryId: 'performance', label: 'Escape Deportivo',      thumbnailUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80', description: 'Salida doble, titanio burnished'   },
  { id: 'pe_02', categoryId: 'performance', label: 'Suspensión Lowered',    thumbnailUrl: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=400&q=80', description: '40mm rebaje, look track-ready'      },
  { id: 'pe_03', categoryId: 'performance', label: 'Frenos Gran Turismo',   thumbnailUrl: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&q=80', description: 'Pinzas rojas, discos ranurados'      },
  { id: 'pe_04', categoryId: 'performance', label: 'Toma de Aire Cold',     thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', description: 'Filtro de cono, aspecto racing'      },
];

// Before/after pairs por categoría (genéricos, no por auto específico)
export const MOCK_TRANSFORMATIONS: Record<AtelierCategory, { before: string; after: string }> = {
  color: {
    before: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
  },
  llantas: {
    before: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  styling: {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  },
  interior: {
    before: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  },
  performance: {
    before: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    after:  'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=800&q=80',
  },
};

// Generic sample car image for unauthenticated users
export const SAMPLE_CAR_IMAGE = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80';
