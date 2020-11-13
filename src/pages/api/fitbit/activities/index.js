import { fitbitAuth } from "pages/api/fitbit/profile";

const activities = async (_, res) => {
  const { data } = await fitbitAuth.get(`/activities.json`);
  return res.send(data);
};

export default activities;
