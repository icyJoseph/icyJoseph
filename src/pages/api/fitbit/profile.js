import axios from "axios";

export const fitbitAuth = axios.create({
  baseURL: "https://api.fitbit.com/1/user/-/",
  headers: {
    Authorization: `Bearer ${process.env.FITBIT_TOKEN}`
  }
});

export default async (_, res) => {
  const { data } = await fitbitAuth.get("/profile.json");

  return res.send(data);
};
