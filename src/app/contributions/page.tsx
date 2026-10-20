import { redirect } from "next/navigation";

import { getContributionYears } from "lib/github/year-detail";
import { getCurrentYear } from "lib/time/current-year";

export default async function ContributionsIndex() {
  const [years, currentYear] = await Promise.all([
    getContributionYears(),
    getCurrentYear(),
  ]);
  const latest = years[0] ?? currentYear;
  redirect(`/contributions/${latest}`);
}
