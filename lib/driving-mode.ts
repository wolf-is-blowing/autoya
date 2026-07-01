import type { Trip, AutoDiaryEntry, CarState, TripMemory } from '@/types';

const CURRENT_TRIP_KEY = 'mouto_current_trip';
const TRIPS_KEY        = 'mouto_trips';
const DIARY_KEY        = 'mouto_diary';
const CAR_STATE_KEY    = 'mouto_car_state';
const MEMORIES_KEY     = 'mouto_memories';
const MILESTONE_EVERY  = 5_000;

// ── Car State ──────────────────────────────────────────────────────────────

export function getCarState(ownedCarId: string, fallbackKm: number, fallbackServiceDate?: string): CarState {
  if (typeof window === 'undefined') {
    return { currentKm: fallbackKm, lastServiceDate: fallbackServiceDate, pendingMilestones: [] };
  }
  try {
    const raw = localStorage.getItem(CAR_STATE_KEY);
    const states: Record<string, CarState> = raw ? JSON.parse(raw) : {};
    return states[ownedCarId] ?? {
      currentKm: fallbackKm,
      lastServiceDate: fallbackServiceDate,
      pendingMilestones: [],
    };
  } catch {
    return { currentKm: fallbackKm, lastServiceDate: fallbackServiceDate, pendingMilestones: [] };
  }
}

export function setCarState(ownedCarId: string, state: CarState): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CAR_STATE_KEY);
    const states: Record<string, CarState> = raw ? JSON.parse(raw) : {};
    states[ownedCarId] = state;
    localStorage.setItem(CAR_STATE_KEY, JSON.stringify(states));
  } catch { /* silent */ }
}

export function updateCarState(ownedCarId: string, patch: Partial<CarState>): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CAR_STATE_KEY);
    const states: Record<string, CarState> = raw ? JSON.parse(raw) : {};
    const prev = states[ownedCarId] ?? { currentKm: 0, pendingMilestones: [] };
    states[ownedCarId] = { ...prev, ...patch };
    localStorage.setItem(CAR_STATE_KEY, JSON.stringify(states));
  } catch { /* silent */ }
}

export function clearPendingMilestones(ownedCarId: string): void {
  updateCarState(ownedCarId, { pendingMilestones: [] });
}

// ── Trip lifecycle ─────────────────────────────────────────────────────────

export function getCurrentTrip(): Trip | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_TRIP_KEY);
    return raw ? (JSON.parse(raw) as Trip) : null;
  } catch { return null; }
}

export function startTrip(ownedCarId: string, startLocation?: string): Trip {
  const trip: Trip = {
    id:            `tr_${Date.now()}`,
    ownedCarId,
    startTime:     new Date().toISOString(),
    startLocation,
    status:        'active',
  };
  try {
    localStorage.setItem(CURRENT_TRIP_KEY, JSON.stringify(trip));
  } catch { /* silent */ }
  return trip;
}

export function endTrip(distanceKm: number, endLocation?: string): Trip | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_TRIP_KEY);
    if (!raw) return null;
    const trip: Trip = JSON.parse(raw);
    const endTime    = new Date().toISOString();
    const durationMs = new Date(endTime).getTime() - new Date(trip.startTime).getTime();
    const duration   = Math.max(1, Math.round(durationMs / (1000 * 60)));

    const completed: Trip = {
      ...trip, endTime, endLocation, distanceKm, duration, status: 'completed',
    };

    // Persist completed trip
    const tripsRaw = localStorage.getItem(TRIPS_KEY);
    const trips: Trip[] = tripsRaw ? JSON.parse(tripsRaw) : [];
    trips.push(completed);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    localStorage.removeItem(CURRENT_TRIP_KEY);

    // Update car km + detect milestones
    const stateRaw = localStorage.getItem(CAR_STATE_KEY);
    const states: Record<string, CarState> = stateRaw ? JSON.parse(stateRaw) : {};
    const prev = states[trip.ownedCarId] ?? { currentKm: 0, pendingMilestones: [] };
    const newKm = prev.currentKm + distanceKm;
    const oldMult = Math.floor(prev.currentKm / MILESTONE_EVERY);
    const newMult = Math.floor(newKm / MILESTONE_EVERY);
    const pending = [...(prev.pendingMilestones ?? [])];
    for (let m = oldMult + 1; m <= newMult; m++) pending.push(m * MILESTONE_EVERY);
    states[trip.ownedCarId] = { ...prev, currentKm: newKm, pendingMilestones: pending };
    localStorage.setItem(CAR_STATE_KEY, JSON.stringify(states));

    // Create diary entries
    const diaryRaw = localStorage.getItem(DIARY_KEY);
    const diary: AutoDiaryEntry[] = diaryRaw ? JSON.parse(diaryRaw) : [];
    diary.push({
      id:          `de_${Date.now()}`,
      ownedCarId:  trip.ownedCarId,
      type:        'trip',
      title:       endLocation ? `Viaje a ${endLocation}` : 'Viaje completado',
      description: `${distanceKm} km · ${duration} min`,
      date:        endTime,
      kmAtEntry:   newKm,
    });
    for (let m = oldMult + 1; m <= newMult; m++) {
      const km = m * MILESTONE_EVERY;
      diary.push({
        id:          `de_ms_${Date.now()}_${m}`,
        ownedCarId:  trip.ownedCarId,
        type:        'milestone',
        title:       `${km.toLocaleString('es-PE')} km alcanzados`,
        date:        endTime,
        milestoneKm: km,
        kmAtEntry:   newKm,
      });
    }
    localStorage.setItem(DIARY_KEY, JSON.stringify(diary));

    return completed;
  } catch { return null; }
}

// ── Diary ──────────────────────────────────────────────────────────────────

export function getDiaryForCar(ownedCarId: string): AutoDiaryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    const diary: AutoDiaryEntry[] = raw ? JSON.parse(raw) : [];
    return diary.filter((e) => e.ownedCarId === ownedCarId);
  } catch { return []; }
}

export function addDiaryEntry(entry: AutoDiaryEntry): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    const diary: AutoDiaryEntry[] = raw ? JSON.parse(raw) : [];
    diary.push(entry);
    localStorage.setItem(DIARY_KEY, JSON.stringify(diary));
  } catch { /* silent */ }
}

// ── Memories ───────────────────────────────────────────────────────────────

export function getMemoriesForCar(ownedCarId: string): TripMemory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MEMORIES_KEY);
    const memories: TripMemory[] = raw ? JSON.parse(raw) : [];
    return memories.filter((m) => m.ownedCarId === ownedCarId);
  } catch { return []; }
}

export function saveMemory(memory: TripMemory): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(MEMORIES_KEY);
    const memories: TripMemory[] = raw ? JSON.parse(raw) : [];
    memories.push(memory);
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
    // Create diary entry for the memory
    addDiaryEntry({
      id:          `de_mem_${Date.now()}`,
      ownedCarId:  memory.ownedCarId,
      type:        'memory',
      title:       memory.caption || 'Recuerdo guardado',
      description: memory.location,
      date:        memory.createdAt,
    });
  } catch { /* silent */ }
}

// ── Haversine GPS distance ─────────────────────────────────────────────────

export function calculateDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
): number {
  const R    = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
