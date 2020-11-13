import axios from "axios";

const githubAuth = axios.create({
  baseURL: "https://api.github.com/",
  auth: { username: "icyJoseph", password: process.env.GITHUB_TOKEN }
});

export const queryGitHub = (query, variables) =>
  githubAuth
    .post("graphql", {
      query,
      variables
    })
    .then(({ data }) => data);

const github = async (req, res) => {
  const { data } = await queryGitHub(req.body.query, req.body.variables);

  return res.send(data);
};

export default github;
