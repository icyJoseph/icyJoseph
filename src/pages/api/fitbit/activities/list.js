import { fitbitAuth } from "pages/api/fitbit/profile";

const paginate = async ({ activities, pagination }) => {
  const { data } = await fitbitAuth.get(pagination.next);

  const aggregate = [...activities, ...data.activities];
  if (data.next) {
    return await paginate({ ...data, activities: aggregate });
  }
  return aggregate;
};

export default async (req, res) => {
  const query = encodeURI(
    Object.entries(req.query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );

  const { data } = await fitbitAuth.get(`/activities/list.json?${query}`);

  const aggregate = await paginate(data);
  return res.send(aggregate);
};
