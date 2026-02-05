"use client";

import { Suspense } from "react";

import dynamic from "next/dynamic";

/**
 * DeferredAnalytics component loads Vercel Analytics and Speed Insights
 * after hydration to avoid blocking Time to Interactive (TTI).
 *
 * This follows the bundle-defer-third-party pattern from Vercel React best practices.
 * Using dynamic import with ssr: false ensures these only load on the client
 * after the initial page render is complete.
 *
 * - Analytics: tracks page views and custom events
 * - SpeedInsights: tracks Core Web Vitals (LCP, CLS, INP, FCP, TTFB)
 */
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

export function DeferredAnalytics() {
  return (
    <Suspense fallback={null}>
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
}
