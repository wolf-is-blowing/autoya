import type { BrandModel, MarketplaceProduct } from '@/types';

export const MOCK_BRAND_MODELS: BrandModel[] = [
  // ── Toyota ──
  { id: 'tm_01', brandSlug: 'toyota', name: 'Corolla',    type: 'Sedán',    imageUrl: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80', priceFrom: 94900,  year: 2024 },
  { id: 'tm_02', brandSlug: 'toyota', name: 'RAV4',       type: 'SUV',      imageUrl: 'https://images.unsplash.com/photo-1616455579100-2ceaa4306c6a?w=600&q=80', priceFrom: 139900, year: 2024 },
  { id: 'tm_03', brandSlug: 'toyota', name: 'Hilux',      type: 'Pickup',   imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',     priceFrom: 129900, year: 2024 },
  { id: 'tm_04', brandSlug: 'toyota', name: 'Yaris',      type: 'Hatchback',imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', priceFrom: 72900,  year: 2024 },

  // ── Hyundai ──
  { id: 'hm_01', brandSlug: 'hyundai', name: 'Tucson',    type: 'SUV',      imageUrl: 'https://images.unsplash.com/photo-1637624832738-46a32d45e9b2?w=600&q=80', priceFrom: 119900, year: 2024 },
  { id: 'hm_02', brandSlug: 'hyundai', name: 'Elantra',   type: 'Sedán',    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', priceFrom: 88900,  year: 2024 },
  { id: 'hm_03', brandSlug: 'hyundai', name: 'Santa Fe',  type: 'SUV',      imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',    priceFrom: 149900, year: 2024 },

  // ── KIA ──
  { id: 'km_01', brandSlug: 'kia', name: 'Sportage',      type: 'SUV',      imageUrl: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=600&q=80',    priceFrom: 109900, year: 2024 },
  { id: 'km_02', brandSlug: 'kia', name: 'Rio',           type: 'Hatchback',imageUrl: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80', priceFrom: 69900,  year: 2024 },
  { id: 'km_03', brandSlug: 'kia', name: 'Sorento',       type: 'SUV',      imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',    priceFrom: 159900, year: 2024 },

  // ── Nissan ──
  { id: 'nm_01', brandSlug: 'nissan', name: 'Frontier',   type: 'Pickup',   imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80', priceFrom: 124900, year: 2024 },
  { id: 'nm_02', brandSlug: 'nissan', name: 'X-Trail',    type: 'SUV',      imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80', priceFrom: 129900, year: 2024 },
  { id: 'nm_03', brandSlug: 'nissan', name: 'Sentra',     type: 'Sedán',    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',    priceFrom: 82900,  year: 2024 },

  // ── Chevrolet ──
  { id: 'chm_01', brandSlug: 'chevrolet', name: 'Tracker',  type: 'SUV',    imageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80', priceFrom: 104900, year: 2024 },
  { id: 'chm_02', brandSlug: 'chevrolet', name: 'Onix',     type: 'Sedán',  imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80',   priceFrom: 74900,  year: 2024 },
  { id: 'chm_03', brandSlug: 'chevrolet', name: 'D-Max',    type: 'Pickup', imageUrl: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=600&q=80', priceFrom: 119900, year: 2024 },
];

export const MOCK_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  { id: 'mp_01', brandSlug: 'toyota',    modelName: 'Corolla', name: 'Alfombras 3D Toyota Corolla',        category: 'accesorios', price: 320,  imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80', sellerName: 'AutoPartes PE',  verified: true  },
  { id: 'mp_02', brandSlug: 'toyota',    modelName: 'RAV4',    name: 'Forro de asiento RAV4 2022-24',      category: 'estetica',   price: 480,  imageUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&q=80', sellerName: 'TecnoAuto',      verified: true  },
  { id: 'mp_03', brandSlug: 'hyundai',   modelName: 'Tucson',  name: 'Kit LED Hyundai Tucson interior',    category: 'audio',      price: 190,  imageUrl: 'https://images.unsplash.com/photo-1614026480418-bd11fdb9a3e2?w=400&q=80', sellerName: 'LED Shop Lima',  verified: false },
  { id: 'mp_04', brandSlug: 'hyundai',   modelName: 'Elantra', name: 'Filtro de aire alto flujo Elantra',  category: 'repuestos',  price: 145,  imageUrl: 'https://images.unsplash.com/photo-1600705722908-bcd6b01e3caa?w=400&q=80', sellerName: 'Repuestos Max',  verified: true  },
  { id: 'mp_05', brandSlug: 'kia',       modelName: 'Sportage',name: 'Emblema cromado KIA Sportage',       category: 'estetica',   price: 85,   imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', sellerName: 'KIA Accesorios', verified: false },
  { id: 'mp_06', brandSlug: 'kia',       modelName: 'Rio',     name: 'Cámara trasera HD KIA Rio',          category: 'audio',      price: 260,  imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', sellerName: 'TecnoAuto',      verified: true  },
  { id: 'mp_07', brandSlug: 'nissan',    modelName: 'Frontier',name: 'Parrilla delantera Frontier Black',  category: 'estetica',   price: 690,  imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80', sellerName: 'Offroad Parts',  verified: true  },
  { id: 'mp_08', brandSlug: 'nissan',    modelName: 'Sentra',  name: 'Pastillas de freno Sentra 2023',     category: 'repuestos',  price: 210,  imageUrl: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&q=80', sellerName: 'Repuestos Max',  verified: true  },
  { id: 'mp_09', brandSlug: 'chevrolet', modelName: 'Tracker', name: 'Portaequipaje Tracker barras laterales', category: 'accesorios', price: 780, imageUrl: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&q=80', sellerName: 'AutoPartes PE', verified: false },
  { id: 'mp_10', brandSlug: 'chevrolet', modelName: 'Onix',    name: 'Tapetes termoplástico Onix 2023',    category: 'accesorios', price: 290,  imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80', sellerName: 'AutoPartes PE',  verified: true  },
];
