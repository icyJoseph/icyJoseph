import { redirect } from "next/navigation";

import { getCurrentYear } from "lib/time/current-year";

/** `/contributions` → this calendar year (not “latest year with activity”). */
export default async function ContributionsIndex() {
  const currentYear = await getCurrentYear();
  redirect(`/contributions/${currentYear}`);
}
