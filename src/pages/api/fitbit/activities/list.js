import { fitbitAuth } from "pages/api/fitbit/profile";

export const getActivityLog = async (params) => {
  const query = encodeURI(
    Object.entries({ ...params, sort: "asc", offset: 0, limit: 20 })
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );

  const { data } = await fitbitAuth.get(`/activities/list.json?${query}`);
  const aggregate = await paginate(data);

  return aggregate;
};

const paginate = async ({ activities, pagination }) => {
  const { data } = await fitbitAuth.get(pagination.next);

  const aggregate = [...activities, ...data.activities];

  if (data.pagination.next) {
    return await paginate({ ...data, activities: aggregate });
  }
  return aggregate;
};

export default async (req, res) => {
  const activityLog = await getActivityLog(req.query);

  return res.send(activityLog);
};
