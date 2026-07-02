export interface Brand {
  id: string;
  name: string;
  country: string;
  color: string;
  category: 'economy' | 'mid' | 'premium' | 'luxury';
  featured: boolean;
  initials: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  iconKey: string;
  accentColor: string;
  priceFrom?: number;
  featured?: boolean;
}

export interface ServiceOption {
  id: string;
  serviceId: string;
  name: string;
  price: number;
  description: string;
  recommended?: boolean;
}

export interface Car {
  id: string;
  brandId: string;
  model: string;
  year: number;
  version: string;
  price: number;
  image: string;
  category: 'sedan' | 'suv' | 'hatchback' | 'pickup' | 'coupe' | 'minivan' | 'convertible' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatico' | 'cvt';
  fuel: 'gasolina' | 'diesel' | 'electrico' | 'hibrido';
  engine: string;
  horsepower: number;
  seats: number;
  isNew: boolean;
  dealershipId: string;
  specs: {
    performance: Record<string, string>;
    interior: Record<string, string>;
  };
}

export type QuotationStep =
  | 'formulario'
  | 'contexto'
  | 'revision'
  | 'cotizaciones'
  | 'test-drive'
  | 'financiamiento'
  | 'contrato'
  | 'desembolso'
  | 'aprobacion'
  | 'arranque';

export interface Quotation {
  id: string;
  carId: string;
  userId: string;
  currentStep: QuotationStep;
  createdAt: string;
  updatedAt: string;
  attachments: string[];
}

export interface OwnedCar {
  id: string;
  carId: string;
  userId: string;
  nickname?: string;
  purchasedAt: string;
  plate: string;
  km: number;
  image: string;
}

export interface Caravana {
  id: string;
  name: string;
  type: 'brand' | 'model' | 'color' | 'amigos';
  brandId?: string;
  description: string;
  memberCount: number;
  image: string;
  tags: string[];
  isPrivate: boolean;
  // TODO: future social feed — when the diary system supports sharing,
  // emit events like 'member_completed_service' | 'member_reached_milestone'
  // here so the caravana feed can pull from each member's AutoDiaryEntry.
  // Do not build the feed UI yet — just leave this marker.
}

// ── Ruta — feed social ────────────────────────────────────────────────────

export type PostType =
  | 'atelier_share'
  | 'question'
  | 'marketplace'
  | 'announcement'
  | 'launch'
  | 'industry_news'
  | 'brand_news'
  | 'memory_share';

export interface RutaPost {
  id: string;
  type: PostType;
  authorId: string;         // 'mouto_editorial' para contenido curado
  authorName: string;
  authorAvatar: string | null;
  caravanaId: string | null;
  createdAt: string;        // ISO
  title: string;
  body: string;
  imageUrl: string | null;
  linkedCarId?: string;     // para memory_share
  price?: number;           // para marketplace
  brandSlug?: string;       // para launch/brand_news
  sourceLabel?: string;     // para industry_news
  reactionsCount: number;
  commentsCount: number;
  isPinned?: boolean;
}

export interface RutaComment {
  id: string;
  postId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

// ── Auto Vivo ──────────────────────────────────────────────────────────────

export interface Trip {
  id: string;
  ownedCarId: string;
  startTime: string; // ISO
  endTime?: string;
  startLocation?: string;
  endLocation?: string;
  distanceKm?: number;
  duration?: number; // minutes
  status: 'active' | 'completed';
}

export interface TripMemory {
  id: string;
  ownedCarId: string;
  tripId?: string;
  photo: string; // Unsplash URL (mock)
  caption: string;
  location?: string; // always user-entered text, never raw GPS
  createdAt: string; // ISO
}

export type DiaryEntryType = 'trip' | 'service' | 'memory' | 'milestone';

export interface AutoDiaryEntry {
  id: string;
  ownedCarId: string;
  type: DiaryEntryType;
  title: string;
  description?: string;
  date: string; // ISO
  kmAtEntry?: number;
  milestoneKm?: number;
}

export interface HealthScoreFactors {
  overall: number; // 0-100
  maintenanceScore: number;
  mileageScore: number;
  timeSinceServiceScore: number;
  label: 'excelente' | 'bueno' | 'regular' | 'requiere atención';
}

export interface CarState {
  currentKm: number;
  lastServiceDate?: string; // ISO date
  pendingMilestones: number[]; // km values to mark (not yet celebrated)
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  driverCode: string;
  bio?: string;
  stats: {
    amigos: number;
    caravanas: number;
    autosEnPosesion: number;
    autosComprados: number;
    autosVendidos: number;
  };
  favoriteBrands: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  iconKey: string;
  protected: boolean;
}

// ── Atelier ────────────────────────────────────────────────────────────────

export type AtelierCategory = 'color' | 'llantas' | 'styling' | 'interior' | 'performance';

export interface AtelierOption {
  id: string;
  categoryId: AtelierCategory;
  label: string;
  thumbnailUrl: string;
  description: string;
}

export interface AtelierGeneration {
  id: string;
  carId: string | null;
  categoryId: AtelierCategory;
  optionId: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  createdAt: string;
  savedByUser: boolean;
}

// ── Marcas ─────────────────────────────────────────────────────────────────

export interface BrandModel {
  id: string;
  brandSlug: string;
  name: string;
  type: 'Sedán' | 'SUV' | 'Pickup' | 'Hatchback' | 'Van' | 'Deportivo';
  imageUrl: string;
  priceFrom: number;
  year: number;
}

export interface MarketplaceProduct {
  id: string;
  brandSlug: string;
  modelName?: string;
  name: string;
  category: 'accesorios' | 'repuestos' | 'estetica' | 'audio';
  price: number;
  imageUrl: string;
  sellerName: string;
  verified: boolean;
}
