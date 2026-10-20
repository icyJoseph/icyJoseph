export type VitalTrend = "up" | "down" | "flat";

/** Compare latest sample to the prior one (or prior average). */
export function trendFromSeries(
  values: number[],
  flatEpsilon = 0,
): VitalTrend | undefined {
  const usable = values.filter((n) => Number.isFinite(n));
  if (usable.length < 2) return undefined;

  const latest = usable[usable.length - 1];
  const prior = usable[usable.length - 2];
  const delta = latest - prior;

  if (Math.abs(delta) <= flatEpsilon) return "flat";
  return delta > 0 ? "up" : "down";
}
