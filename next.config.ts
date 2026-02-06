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

const cliUA = {
  type: "header" as const,
  key: "user-agent",
  value: ".*(curl|Wget|HTTPie|Go-http-client).*",
};

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns,
  },
  cacheComponents: true,
  experimental: {
    browserDebugInfoInTerminal: true,
  },
  rewrites: async () => ({
    beforeFiles: [
      // Anyone requesting markdown gets markdown
      {
        source: "/",
        has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
        destination: "/text/markdown",
      },
      {
        source: "/blog/:slug",
        has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
        destination: "/text/blog/:slug",
      },
      // Known CLI clients get plain text by default
      {
        source: "/",
        has: [cliUA],
        destination: "/text",
      },
    ],
    afterFiles: [],
    fallback: [],
  }),
};

export default config;
