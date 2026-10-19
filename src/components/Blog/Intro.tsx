import { Keyword } from "design-system/Keyword";

export const BlogIntro = () => {
  return (
    <>
      <header>
        <h1 className="blog-index__title my-4">Blog</h1>
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
            className="blog-index__link font-normal"
          >
            <i>@icjoseph</i>
          </a>
          .
        </p>

        <h2 className="blog-index__heading pt-1 mt-4 mb-2 text-xl">
          Coding Challenges
        </h2>

        <p className="font-light mb-2">
          I put time into coding competitons and coding challengens. I focus
          mostly on <Keyword className="!text-flare-wet">Hash Code</Keyword>,{" "}
          <Keyword className="!text-flare-wet">Code Jam</Keyword>,{" "}
          <Keyword className="!text-flare-wet">Kick Start</Keyword>, and{" "}
          <Keyword className="!text-flare-wet">Advent of Code</Keyword>.
        </p>

        <p className="font-light mb-2">
          When solving coding challenges, I use the Rust programming language.
        </p>

        <h2 className="blog-index__heading pt-1 mt-4 mb-2 text-xl">
          Lessons Learned
        </h2>

        <p className="font-light mb-2">
          In this blog, I take the opportunity to document, things I learn, or
          best practices to use when working with front end and back end
          frameworks, using{" "}
          <Keyword className="!text-flare-wet">JavaScript</Keyword>,{" "}
          <Keyword className="!text-flare-wet">TypeScript</Keyword>, and even{" "}
          <Keyword className="!text-flare-wet">Rust</Keyword>.
        </p>
      </div>
    </>
  );
};
