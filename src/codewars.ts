import axios from "axios";

export const getCodeWarsUser = () =>
  axios
    .get<IcyJoseph.CodeWars>("https://www.codewars.com/api/v1/users/icyJoseph")
    .then(({ data }) => data);
