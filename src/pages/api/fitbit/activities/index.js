import { fitbitAuth } from "pages/api/fitbit/profile";

export default async (_, res) => {
  const { data } = await fitbitAuth.get(`/activities.json`);
  return res.send(data);
};
