import { redirect } from "next/navigation";

import { getContributionYears } from "lib/github/year-detail";

export default async function ContributionsIndex() {
  const years = await getContributionYears();
  const latest = years[0] ?? new Date().getFullYear();
  redirect(`/contributions/${latest}`);
}
