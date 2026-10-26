import { rest } from "msw";

import codewarsJSON from "./data/codewars.json";
import heartRateJSON from "./data/fitbit/heart-activity.json";
import listJSON from "./data/fitbit/list.json";
import profileJSON from "./data/fitbit/profile.json";
import stepsJSON from "./data/fitbit/steps-activity.json";

const fitbitProfile = rest.get(
  "https://api.fitbit.com/1/user/-/profile.json",
  (req, res, ctx) => {
    return res(ctx.json(profileJSON));
  },
);

const fitbitHeartRate = rest.get(
  "https://api.fitbit.com/1/user/-/activities/heart/date/today/:range.json",
  (req, res, ctx) => {
    return res(ctx.json(heartRateJSON));
  },
);

const fitbitSteps = rest.get(
  "https://api.fitbit.com/1/user/-/activities/steps/date/today/:range.json",
  (req, res, ctx) => {
    return res(ctx.json(stepsJSON));
  },
);

const fitbitList = rest.get(
  "https://api.fitbit.com/1/user/-/activities/list.json",
  (req, res, ctx) => {
    return res(ctx.json(listJSON));
  },
);

const codewars = rest.get(
  "https://www.codewars.com/api/v1/users/icyJoseph",
  (req, res, ctx) => {
    return res(ctx.json(codewarsJSON));
  },
);

export const handlers = [
  fitbitProfile,
  fitbitHeartRate,
  fitbitSteps,
  fitbitList,
  codewars,
];
