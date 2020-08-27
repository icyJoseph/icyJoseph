import axios from "axios";

export const getCodeWarsUser = () =>
  axios
    .get("https://www.codewars.com/api/v1/users/icyJoseph")
    .then(({ data }) => data);

export default async (_, res) => {
  const data = await getCodeWarsUser();

  return res.send(data);
};
