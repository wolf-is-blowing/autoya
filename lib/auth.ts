import type { User } from '@/types';

const AUTH_KEY = 'mouto_logged_in';
const USER_KEY = 'mouto_user';

const MOCK_USER: User = {
  id: 'u_001',
  name: 'Ivan M.',
  email: 'ivan@mouto.pe',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  driverCode: 'IVAN-X7K',
  bio: 'Apasionado de los autos y la tecnología.',
  stats: {
    amigos: 24,
    caravanas: 3,
    autosEnPosesion: 2,
    autosComprados: 1,
    autosVendidos: 0,
  },
  favoriteBrands: ['toyota', 'bmw', 'porsche'],
};

export const authUtils = {
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  login(): void {
    localStorage.setItem(AUTH_KEY, 'true');
    if (!localStorage.getItem(USER_KEY)) {
      localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
    }
  },

  register(
    name: string,
    favoriteBrands: string[],
    firstCar?: { brand: string; model: string; year: string }
  ): void {
    const user: User = {
      ...MOCK_USER,
      id: `u_${Date.now()}`,
      name,
      favoriteBrands,
    };
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (firstCar) {
      localStorage.setItem('mouto_first_car', JSON.stringify(firstCar));
    }
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  toggle(): boolean {
    const current = this.isLoggedIn();
    if (current) {
      this.logout();
      return false;
    } else {
      this.login();
      return true;
    }
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },
};
