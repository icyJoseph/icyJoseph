import { fitbitAuth } from "pages/api/fitbit/profile";

export const getActivityLog = async (params) => {
  const query = encodeURI(
    Object.entries({ ...params, sort: "desc", offset: 0, limit: 7 })
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );

  const { data } = await fitbitAuth.get(`/activities/list.json?${query}`);

  return data.activities;
};

const activityList = async (req, res) => {
  const activityLog = await getActivityLog(req.query);

  return res.send(activityLog);
};

export default activityList;
