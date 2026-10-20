import { cacheLife } from "next/cache";

/** Calendar year for labels / XP links — weeks is enough across year boundaries. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("weeks");
  return new Date().getFullYear();
}
