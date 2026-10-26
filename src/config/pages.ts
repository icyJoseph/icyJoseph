import { getCurrentYear } from "lib/time/current-year";

type NavEntry = {
  symbol: string;
  href: string;
  ariaLabel: string;
  title: string;
};

const staticEntries: NavEntry[] = [
  {
    symbol: "🏠",
    href: "/",
    ariaLabel: "Navigate Home",
    title: "Home",
  },
  {
    symbol: "📰",
    href: "/blog",
    ariaLabel: "Navigate to Posts",
    title: "Blog",
  },
];

/** Primary nav/footer links — XP goes straight to this calendar year. */
export async function getNavEntries(): Promise<NavEntry[]> {
  const year = await getCurrentYear();
  return [
    ...staticEntries,
    {
      symbol: "📊",
      href: `/contributions/${year}`,
      ariaLabel: `Navigate to Contributions ${year}`,
      title: "XP",
    },
  ];
}
