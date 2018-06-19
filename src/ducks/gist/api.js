import axios from "axios";
import { curry, curryRight, get, head, keys, pipe } from "../../functional";

import { github } from "../github/api";

export const getGist = (gist, token) => {
  return axios
    .get(`${github}/gists/${gist}`, {
      auth: {
        username: "icyJoseph",
        password: `${token}`
      }
    })
    .then(({ data: { files } }) => {
      return pipe(
        keys,
        head,
        curry(get)(files),
        curryRight(get)("content")
      )(files);
    });
};
