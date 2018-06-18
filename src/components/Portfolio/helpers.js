export const filterCriteria = (topics, meta) => {
  switch (meta) {
    case "react":
      return !topics.includes("redux") && topics.includes("react");
    case "redux":
      return topics.includes("redux");
    default: {
      return !topics.includes("redux") && topics.includes("react");
    }
  }
};
