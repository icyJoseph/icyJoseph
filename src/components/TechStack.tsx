const techStack = [
  "GitHub's GraphQL API",
  "Fitbit's API",
  "React",
  "NodeJS",
  "Next.js",
  "Recursive Font Face",
  "Phosphor Icons",
];

export const TechStack = () => (
  <div className="flex flex-1 flex-col">
    <h3 className="text-xl text-pale-yellow">Tech Stack</h3>

    <ul>
      {techStack.map((entry) => (
        <li key={entry} className="my-3 font-light">
          {entry}
        </li>
      ))}
    </ul>
  </div>
);
