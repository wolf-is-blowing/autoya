import type { AutoDiaryEntry, TripMemory, CarState } from '@/types';

export const INITIAL_CAR_STATES: Record<string, CarState> = {
  'oc_001': { currentKm: 24500, lastServiceDate: '2026-04-01', pendingMilestones: [] },
  'oc_002': { currentKm: 61200, lastServiceDate: '2026-05-15', pendingMilestones: [] },
};

export const MOCK_DIARY_ENTRIES: AutoDiaryEntry[] = [
  // La Blanca (oc_001)
  { id: 'de_001', ownedCarId: 'oc_001', type: 'service',   title: 'Mantenimiento completo', description: 'Taller Maquinauto',   date: '2026-04-01', kmAtEntry: 24000 },
  { id: 'de_002', ownedCarId: 'oc_001', type: 'service',   title: 'Lavado detailing',       description: 'Car Care Lima',       date: '2026-02-01', kmAtEntry: 22000 },
  { id: 'de_003', ownedCarId: 'oc_001', type: 'service',   title: 'Cambio de aceite',       description: 'Lubricentro Express', date: '2025-11-01', kmAtEntry: 18500 },
  { id: 'de_004', ownedCarId: 'oc_001', type: 'trip',      title: 'Viaje a Miraflores',     description: '45 km · 1h 30m',     date: '2026-06-28', kmAtEntry: 24455 },
  { id: 'de_005', ownedCarId: 'oc_001', type: 'milestone', title: '20,000 km alcanzados',   date: '2026-01-15', milestoneKm: 20000, kmAtEntry: 20000 },
  // El Azul (oc_002)
  { id: 'de_006', ownedCarId: 'oc_002', type: 'service',   title: 'Mantenimiento premium',  description: 'BMW Certified Lima',  date: '2026-05-15', kmAtEntry: 60800 },
  { id: 'de_007', ownedCarId: 'oc_002', type: 'service',   title: 'Pastillas de freno',     description: 'Autopartes Pelayo',   date: '2026-03-15', kmAtEntry: 59500 },
  { id: 'de_008', ownedCarId: 'oc_002', type: 'service',   title: 'Lavado completo',        description: 'Detailing Pro Lima',  date: '2025-12-01', kmAtEntry: 56000 },
  { id: 'de_009', ownedCarId: 'oc_002', type: 'milestone', title: '60,000 km alcanzados',   date: '2026-06-20', milestoneKm: 60000, kmAtEntry: 60000 },
];

export const MOCK_MEMORIES: TripMemory[] = [
  {
    id: 'mem_001',
    ownedCarId: 'oc_001',
    photo: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
    caption: 'Ruta a la costa',
    location: 'Asia, Lima',
    createdAt: '2026-05-20',
  },
  {
    id: 'mem_002',
    ownedCarId: 'oc_001',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    caption: 'Amanecer en la montaña',
    location: 'Marcapomacocha',
    createdAt: '2026-04-10',
  },
];
