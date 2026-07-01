import type { HealthScoreFactors } from '@/types';

const MAX_KM = 300_000;
const SERVICE_INTERVAL_KM = 5_000; // ideal service every 5k km
const SERVICE_GRACE_DAYS  = 180;   // score hits 0 after 6 months without service

export function calculateHealthScore(
  currentKm: number,
  lastServiceDate?: string,
): HealthScoreFactors {
  // Distance through expected lifespan
  const mileageScore = Math.max(0, Math.round(100 - (currentKm / MAX_KM) * 100));

  // Km since last ideal maintenance interval
  const kmIntoInterval = currentKm % SERVICE_INTERVAL_KM;
  const maintenanceScore = Math.round(100 - (kmIntoInterval / SERVICE_INTERVAL_KM) * 100);

  // Days since last service
  let timeSinceServiceScore = 70; // default: unknown history
  if (lastServiceDate) {
    const daysSince = Math.floor(
      (Date.now() - new Date(lastServiceDate).getTime()) / (1000 * 60 * 60 * 24),
    );
    timeSinceServiceScore = Math.max(0, Math.round(100 - (daysSince / SERVICE_GRACE_DAYS) * 100));
  }

  // Weighted: maintenance 40% · time-since-service 35% · mileage 25%
  const overall = Math.round(
    maintenanceScore       * 0.40 +
    timeSinceServiceScore  * 0.35 +
    mileageScore           * 0.25,
  );

  let label: HealthScoreFactors['label'];
  if (overall >= 80)      label = 'excelente';
  else if (overall >= 60) label = 'bueno';
  else if (overall >= 35) label = 'regular';
  else                    label = 'requiere atención';

  return { overall, maintenanceScore, mileageScore, timeSinceServiceScore, label };
}
