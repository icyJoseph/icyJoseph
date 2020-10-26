export const buildMissionName = (obj) => {
  const missionName = `${obj.mission_name}`.toLowerCase();

  const [first = "space", second = "x"] = missionName.split(" ").map((word) =>
    word
      .split("")
      .filter((ch) => RegExp(/^(\p{L}|\p{N})/, "u").test(ch))
      .join("")
  );

  return `${first} ${second}`;
};
