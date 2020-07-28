import axios from "axios";

export default async (_, res) => {
  const { data } = await axios.get(
    "https://www.codewars.com/api/v1/users/icyJoseph"
  );

  return res.send(data);
};
