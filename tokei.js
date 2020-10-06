const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const devPath = "/home/joseph/dev";

const args = [
  "-t",
  "JavaScript,TypeScript,CSS,Rust",
  "-o",
  "json",
  "--exclude",
  "/home/joseph/dev/temp/",
  "--"
];

const ls = spawn("tokei", [...args, devPath]);

const chunks = [];

ls.stdout.on("data", (data) => {
  chunks.push(data);
});

ls.stderr.on("data", (data) => {
  console.error(`Something went wrong: ${data}`);
});

ls.on("close", (code) => {
  const parsed = JSON.parse(chunks.join(""));

  const filtered = Object.entries(parsed)
    .map(([language, { reports: _, ...rest }]) => ({ language, ...rest }))
    .map(({ language, ...rest }) =>
      language === "Css" ? { language: "CSS", ...rest } : { language, ...rest }
    )
    .sort((a, b) => b.code - a.code);

  fs.writeFile(
    path.resolve(__dirname, "tokei.json"),
    JSON.stringify(filtered, undefined, 2),
    (err) => {
      if (err) return console.log("Error while writing tokei.json", err);
      console.log(
        `Saved tokei data from ${devPath}. \n Process exited with code ${code}`
      );
    }
  );
});
