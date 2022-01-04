import { rest } from "msw";
import profileJSON from "./data/fitbit/profile.json";
import heartRateJSON from "./data/fitbit/heart-activity.json";
import listJSON from "./data/fitbit/list.json";
import codewarsJSON from "./data/codewars.json";

const fitbitProfile = rest.get(
  "https://api.fitbit.com/1/user/-/profile.json",
  (req, res, ctx) => {
    return res(ctx.json(profileJSON));
  }
);

const fitbitHeartRate = rest.get(
  "https://api.fitbit.com/1/user/-/activities/heart/date/today/1m.json",
  (req, res, ctx) => {
    return res(ctx.json(heartRateJSON));
  }
);

const fitbitList = rest.get(
  "https://api.fitbit.com/1/user/-/activities/list.json",
  (req, res, ctx) => {
    return res(ctx.json(listJSON));
  }
);

const codewars = rest.get(
  "https://www.codewars.com/api/v1/users/icyJoseph",
  (req, res, ctx) => {
    return res(ctx.json(codewarsJSON));
  }
);

export const handlers = [fitbitProfile, fitbitHeartRate, fitbitList, codewars];
