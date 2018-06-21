export const filterCriteria = (topics, meta) => {
  switch (meta) {
    case "react":
      return !topics.includes("redux") && topics.includes("react");
    case "redux":
      return topics.includes("redux");
    case "hackathon":
      return topics.includes("hackathon");
    case "python":
      return topics.includes("python");
    case "algorithms":
      return topics.includes("algorithms");
    default: {
      return !topics.includes("redux") && topics.includes("react");
    }
  }
};
