import { fitbitAuth } from "pages/api/fitbit/profile";

export default async ({ query: { activities } }, res) => {
  const { data } = await fitbitAuth.get(
    `/activities/${activities.join("/")}.json`
  );
  return res.send(data);
};
