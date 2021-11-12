import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const githubAuth = axios.create({
  baseURL: "https://api.github.com/",
  auth: { username: "icyJoseph", password: process.env.GITHUB_TOKEN || "" }
});

export const queryGitHub = (query: string, variables: Record<string, string>) =>
  githubAuth
    .post("graphql", {
      query,
      variables
    })
    .then(({ data }) => data);

const github = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await queryGitHub(req.body.query, req.body.variables);

  return res.send(data);
};

export default github;
