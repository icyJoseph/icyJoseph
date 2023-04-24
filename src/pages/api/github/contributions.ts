import type { NextApiRequest, NextApiResponse } from "next";

import { queryGitHub, redactedGitHubRepositoryData } from "github/fetcher";
import { GET_YEAR_CONTRIBUTIONS } from "github/queries";

type ContributionData = {
  user: Pick<IcyJoseph.GitHub, "contributionsCollection">;
};

const github = async (
  req: NextApiRequest,
  res: NextApiResponse<ContributionData>
) => {
  const { data } = await queryGitHub<{
    data: {
      user: Pick<IcyJoseph.GitHub, "contributionsCollection">;
    };
  }>(GET_YEAR_CONTRIBUTIONS, req.body.variables);

  const githubData = {
    user: {
      contributionsCollection: {
        ...data.user.contributionsCollection,
        commitContributionsByRepository: redactedGitHubRepositoryData(
          data.user.contributionsCollection.commitContributionsByRepository
        ),
      },
    },
  };

  return res.json(githubData);
};

export default github;
