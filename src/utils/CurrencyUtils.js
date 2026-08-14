export function calculateRateChange(oldRate, newRate) {
  return ((newRate - oldRate) / oldRate) * 100;
}
