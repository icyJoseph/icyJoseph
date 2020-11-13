import axios from "axios";

export const getCodeWarsUser = () =>
  axios
    .get("https://www.codewars.com/api/v1/users/icyJoseph")
    .then(({ data }) => data);

const codewars = async (_, res) => {
  const data = await getCodeWarsUser();

  return res.send(data);
};

export default codewars;
