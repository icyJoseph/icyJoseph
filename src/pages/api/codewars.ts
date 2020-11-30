import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const getCodeWarsUser = () =>
  axios
    .get<IcyJoseph.CodeWars>("https://www.codewars.com/api/v1/users/icyJoseph")
    .then(({ data }) => data);

const codewars = async (
  _: NextApiRequest,
  res: NextApiResponse<IcyJoseph.CodeWars>
) => {
  const data = await getCodeWarsUser();

  return res.send(data);
};

export default codewars;
