/**
 * Absolute site origin for metadata / OG.
 * Prefers Vercel system envs (`VERCEL_URL`, then production host) — no `NEXT_PUBLIC_*`.
 */
export function siteOrigin(): string {
  const host =
    process.env.VERCEL_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "localhost:3000";
  const protocol =
    host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https";
  return `${protocol}://${host}`;
}
