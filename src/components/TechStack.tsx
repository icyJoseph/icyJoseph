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
    <h3 className="site-footer__heading text-xl">Tech Stack</h3>

    <ul className="site-footer__list">
      {techStack.map((entry) => (
        <li key={entry} className="my-3 font-light">
          {entry}
        </li>
      ))}
    </ul>
  </div>
);
