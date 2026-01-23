"use client";

import dynamic from "next/dynamic";

/**
 * DeferredAnalytics component loads Vercel Analytics after hydration
 * to avoid blocking Time to Interactive (TTI).
 *
 * This follows the bundle-defer-third-party pattern from Vercel React best practices.
 * Using dynamic import with ssr: false ensures analytics only loads on the client
 * after the initial page render is complete.
 */
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false }
);

export function DeferredAnalytics() {
  return <Analytics />;
}
