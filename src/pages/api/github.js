import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com/",
  auth: { username: "icyJoseph", password: process.env.GITHUB_TOKEN }
});

export const queryGitHub = (query, variables) =>
  github
    .post("graphql", {
      query,
      variables
    })
    .then(({ data }) => data);

export default async (req, res) => {
  const { data } = await queryGitHub(req.body.query, req.body.variables);

  return res.send(data);
};
