import { NextApiRequest, NextApiResponse } from "next";

import { queryGitHub } from "github/fetcher";
import { GET_USER } from "github/queries";

const github = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await queryGitHub(GET_USER, req.body.variables);

  return res.send(data);
};

export default github;
