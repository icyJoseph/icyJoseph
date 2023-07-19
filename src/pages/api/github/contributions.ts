import type { NextApiRequest, NextApiResponse } from "next";

import { gitHubContributions } from "lib/github/fetcher";

type ContributionData = IcyJoseph.GitHub["contributionsCollection"];

const github = async (
  req: NextApiRequest,
  res: NextApiResponse<ContributionData>
) => {
  if (req.method !== "GET") return res.status(404).end();

  const year = Number(req.query.year);

  if (isNaN(year)) return res.status(400).end();

  try {
    const data = await gitHubContributions(year);

    return res.json(data);
  } catch (reason) {
    return res.status(500).end();
  }
};

export default github;
