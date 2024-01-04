import { http, HttpResponse } from "msw";

import codewarsJSON from "./data/codewars.json";
import heartRateJSON from "./data/fitbit/heart-activity.json";
import listJSON from "./data/fitbit/list.json";
import profileJSON from "./data/fitbit/profile.json";

const fitbitProfile = http.get(
  "https://api.fitbit.com/1/user/-/profile.json",
  () => {
    return HttpResponse.json(profileJSON);
  }
);

const fitbitHeartRate = http.get(
  "https://api.fitbit.com/1/user/-/activities/heart/date/today/1m.json",
  () => {
    return HttpResponse.json(heartRateJSON);
  }
);

const fitbitList = http.get(
  "https://api.fitbit.com/1/user/-/activities/list.json",
  () => {
    return HttpResponse.json(listJSON);
  }
);

const codewars = http.get(
  "https://www.codewars.com/api/v1/users/icyJoseph",
  () => {
    return HttpResponse.json(codewarsJSON);
  }
);

export const handlers = [fitbitProfile, fitbitHeartRate, fitbitList, codewars];
