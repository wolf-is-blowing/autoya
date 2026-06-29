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
