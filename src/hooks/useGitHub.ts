import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

const fetcher = <Response, Variables>(
  query: "profile" | "contributions",
  variables: Variables
) =>
  axios
    .post<Response>(`/api/github/${query}`, { variables })
    .then(({ data }) => data);

type ProfileVariables = { login: "icyJoseph"; from: string; to: string };

export const useGitHubProfile = ({
  from,
  to,
  fallbackData = null,
}: {
  from: string;
  to: string;
  fallbackData: IcyJoseph.GitHub | null;
}) => {
  return useSWRImmutable<IcyJoseph.GitHub | null>(
    `profile/${from}`,
    async () =>
      fetcher<{ user: IcyJoseph.GitHub }, ProfileVariables>("profile", {
        login: "icyJoseph",
        from,
        to,
      }).then(({ user }) => user),
    {
      shouldRetryOnError: false,
      fallbackData,
    }
  );
};

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
      return fetcher<{ user: IcyJoseph.GitHub }, ContributionVariables>(
        "contributions",
        {
          login: "icyJoseph",
          from,
          to,
        }
      ).then(({ user }) => user.contributionsCollection);
    }
  );
};
