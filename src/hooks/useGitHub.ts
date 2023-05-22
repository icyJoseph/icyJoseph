import useSWR from "swr";

import { client } from "utils/client";

const fetcher = <Response>(year: number) =>
  client({
    headers: { "content-type": "application/json" },
  }).get<Response>(`/api/github/contributions?year=${year}`);

export const useGitHubContributions = (
  year: number,
  fallback: Record<number, IcyJoseph.GitHub["contributionsCollection"]>
) => {
  return useSWR<IcyJoseph.ContributionCollection>(
    `contributions/${year}`,
    async () => {
      return fetcher<IcyJoseph.GitHub["contributionsCollection"]>(year);
    },
    {
      refreshInterval: 1000 * 60 * 5,
      revalidateOnFocus: false,
      suspense: true,
      fallback,
    }
  );
};
