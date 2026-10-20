import { cacheLife } from "next/cache";

/** Calendar year for labels — cached so Cache Components can prerender. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
