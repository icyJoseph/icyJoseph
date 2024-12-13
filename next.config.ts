import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const HTTPS = "https";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: HTTPS,
    hostname: "avatars.githubusercontent.com",
  },
  { protocol: HTTPS, hostname: "badges.fitbit.com" },
  { protocol: HTTPS, hostname: "www.gstatic.com" },
];

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns,
  },
};

export default withBundleAnalyzer(config);
