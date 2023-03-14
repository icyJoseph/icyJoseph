import { NextApiRequest, NextApiResponse } from "next";

import { queryGitHub } from "github/fetcher";
import { GET_YEAR_CONTRIBUTIONS } from "github/queries";

const github = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await queryGitHub<{
    data: {
      user: Pick<IcyJoseph.GitHub, "contributionsCollection">;
    };
  }>(GET_YEAR_CONTRIBUTIONS, req.body.variables);

  const githubData = {
    user: {
      ...data.user,

      commitContributionsByRepository:
        data.user.contributionsCollection.commitContributionsByRepository.filter(
          ({ repository }) => {
            return repository.owner.login === "icyJoseph";
          }
        ),
    },
  };

  return res.send(githubData);
};

export default github;
