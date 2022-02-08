import { NextApiRequest, NextApiResponse } from "next";

import { GET_YEAR_CONTRIBUTIONS } from "github/queries";
import { queryGitHub } from "github/fetcher";

const github = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await queryGitHub(
    GET_YEAR_CONTRIBUTIONS,
    req.body.variables
  );

  return res.send(data);
};

export default github;
