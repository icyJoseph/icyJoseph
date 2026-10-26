/**
 * Public repos whose author commits are missing from contributionsCollection
 * (org attribution quirks). We count them via the commits API and merge into
 * the normal public totals — no separate UI bucket.
 */
export type SideChannelRepo = {
  owner: string;
  name: string;
  homepageUrl?: string;
  description?: string;
  language?: { name: string; color: string };
};

export const SIDE_CHANNEL_REPOS: SideChannelRepo[] = [
  {
    owner: "vercel",
    name: "next.js",
    homepageUrl: "https://nextjs.org",
    description: "The React Framework",
    language: { name: "TypeScript", color: "#3178c6" },
  },
];
