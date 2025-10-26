import type { NextConfig } from "next";

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
  cacheComponents: true,
  experimental: {
    browserDebugInfoInTerminal: true,
  },
};

export default config;
