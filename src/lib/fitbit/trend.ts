export type VitalTrend = "up" | "down" | "flat";

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Direction across the series: later half vs earlier half.
 * (Not day-over-day — that disagreed with a rising weekly average.)
 */
export function trendFromSeries(
  values: number[],
  flatEpsilon = 0,
): VitalTrend | undefined {
  const usable = values.filter((n) => Number.isFinite(n));
  if (usable.length < 2) return undefined;

  const mid = Math.floor(usable.length / 2);
  const earlier = usable.slice(0, mid);
  const later = usable.slice(mid);
  if (earlier.length === 0 || later.length === 0) return undefined;

  const delta = mean(later) - mean(earlier);

  if (Math.abs(delta) <= flatEpsilon) return "flat";
  return delta > 0 ? "up" : "down";
}
