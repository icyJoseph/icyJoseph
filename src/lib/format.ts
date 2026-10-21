const countFormat = new Intl.NumberFormat("en-US");

/** Stable across Node/browser — avoids hydration mismatches from locale grouping. */
export function formatCount(n: number): string {
  return countFormat.format(n);
}
