import axios from "axios";
import { print } from "graphql";
import { GET_USER } from "queries";

const github = axios.create({
  baseURL: "https://api.github.com/",
  auth: { username: "icyJoseph", password: process.env.GITHUB_TOKEN }
});

const selectUser = ({ data }) => data?.data?.user ?? {};

export const getGitHubUser = () =>
  github
    .post("graphql", {
      query: print(GET_USER),
      variables: { login: "icyJoseph" }
    })
    .then(selectUser);

export default async (_, res) => {
  const data = await getGitHubUser();
  return res.send(data);
};
