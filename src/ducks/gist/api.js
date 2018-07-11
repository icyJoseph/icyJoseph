import {
  curry,
  curryRight,
  get,
  head,
  keys,
  pipe,
  getByFileName
} from "../../functional";
import { github } from "../github/api";

export const getGist = (gist, token) => {
  return github(token)
    .get(`/gists/${gist}`)
    .then(({ data: { files } }) => {
      return pipe(
        keys,
        head,
        curry(getByFileName)(files),
        curryRight(get)("content")
      )(files);
    });
};
