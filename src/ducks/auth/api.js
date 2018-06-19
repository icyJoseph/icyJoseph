import axios from "axios";

export const getToken = () => {
  return axios
    .get(`${process.env.REACT_APP_GITHUB_TOKEN}/?user=icyjoseph`)
    .then(({ data: { token } }) => token);
};
