import { fitbitAuth } from "pages/api/fitbit/profile";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const compareFn = (a, b) => new Date(b.startTime) - new Date(a.startTime);

export const getActivityLog = async (params) => {
  try {
    const cachePath = path.resolve(
      path.join(process.cwd(), ".fitbit", "list.json")
    );
    const early = await promisify(fs.readFile)(cachePath, "utf-8").then(
      JSON.parse
    );
    return early.activities.sort(compareFn);
  } catch (e) {
    console.warn(e);
  }

  const query = encodeURI(
    Object.entries({ ...params, sort: "asc", offset: 0, limit: 20 })
      .map(([key, value]) => `${key}=${value}`)
      .join("&")
  );

  const { data } = await fitbitAuth.get(`/activities/list.json?${query}`);
  const aggregate = await paginate(data);

  return aggregate.sort(compareFn);
};

const paginate = async ({ activities, pagination }) => {
  const { data } = await fitbitAuth.get(pagination.next);

  const aggregate = [...activities, ...data.activities];

  if (data.pagination.next) {
    return await paginate({ ...data, activities: aggregate });
  }
  return aggregate;
};

const activityList = async (req, res) => {
  const activityLog = await getActivityLog(req.query);

  return res.send(activityLog);
};

export default activityList;
