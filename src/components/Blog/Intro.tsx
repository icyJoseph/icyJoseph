import { Keyword } from "design-system/Keyword";

export const BlogIntro = () => {
  return (
    <>
      <header>
        <h1 className="my-4 text-2xl">Blog</h1>
      </header>

      <div className="max-w-prose">
        <p className="font-light mb-2">
          Here I publish my solutions to coding challenges, and things I learn
          on my day to day job.
        </p>

        <p className="font-light mb-2">
          I also publish on Medium. You can find me over there as{" "}
          <a
            href="https://medium.com/@icjoseph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pale-yellow font-normal"
          >
            <i>@icjoseph</i>
          </a>
          .
        </p>

        <h2 className="pt-1 mt-3 mb-2 text-lg">Coding Challenges</h2>

        <p className="font-light mb-2">
          I put time into coding competitons and coding challengens. I focus
          mostly on <Keyword>Hash Code</Keyword>, <Keyword>Code Jam</Keyword>,{" "}
          <Keyword>Kick Start</Keyword>, and <Keyword>Advent of Code</Keyword>.
        </p>

        <p className="font-light mb-2">
          When solving coding challenges, I use the Rust programming language.
        </p>

        <h2 className="pt-1 mt-3 mb-2 text-lg">Lessons Learned</h2>

        <p className="font-light mb-2">
          In this blog, I take the opportunity to document, things I learn, or
          best practices to use when working with front end and back end
          frameworks, using <Keyword>JavaScript</Keyword>,{" "}
          <Keyword>TypeScript</Keyword>, and even <Keyword>Rust</Keyword>.
        </p>
      </div>
    </>
  );
};
