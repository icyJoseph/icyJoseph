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

export const getGist = gist => {
  return github()
    .post(`/gists`, { gist })
    .then(({ data: { files } }) => {
      return pipe(
        keys,
        head,
        curry(getByFileName)(files),
        curryRight(get)("content")
      )(files);
    });
};
