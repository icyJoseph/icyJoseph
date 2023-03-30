import useSWR from "swr";

import { client } from "utils/client";

const fetcher = <Response, Variables>(variables: Variables) =>
  client({
    body: JSON.stringify({ variables }),
    headers: { "content-type": "application/json" },
  }).post<Response>(`/api/github/contributions`);

type ContributionVariables = { login: "icyJoseph"; from: string; to?: string };
type UseGitHubContributions = {
  from: string;
  to?: string;
};

export const useGitHubContributions = ({
  from,
  to,
}: UseGitHubContributions) => {
  return useSWR<IcyJoseph.ContributionCollection | null>(
    `contributions/${from}/${to}`,
    async () => {
      return fetcher<{ user: IcyJoseph.GitHub }, ContributionVariables>({
        login: "icyJoseph",
        from,
        to,
      }).then(({ user }) => user.contributionsCollection);
    },
    {
      refreshInterval: 1000 * 60 * 5,
      revalidateOnFocus: false,
    }
  );
};
