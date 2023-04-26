import { useId } from "react";

import classNames from "classnames";

import { Bold } from "design-system/Bold";

const paragraph = "font-sans mx-auto mb-6";

export const Introduction = () => {
  const h1HeadingId = useId();
  return (
    <section
      className="flex flex-col justify-center items-center pt-20 pb-28 px-4 md:px-0"
      aria-labelledby={h1HeadingId}
    >
      <h1
        className="text-center text-5xl font-sans font-light my-8"
        id={h1HeadingId}
      >
        Joseph <span className="sr-only">Software Developer</span>
      </h1>

      <p className="mb-2">
        github:{" "}
        <a
          href="https://github.com/icyJoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icyJoseph</i>
        </a>
      </p>

      <p>
        medium:{" "}
        <a
          href="https://medium.com/@icjoseph"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i>@icjoseph</i>
        </a>
      </p>

      <div className="font-mono max-w-[55ch] text-[2rem] font-light mx-auto">
        <p className={classNames(paragraph, "mt-8")}>
          Developer from <Bold>Peru</Bold>, living in <Bold>Sweden</Bold>. I
          have a Bachelor&apos;s in Electronics Engineering, and a Master&apos;s
          degree on business design.
        </p>

        <p className={classNames(paragraph, "mt-8")}>
          I have over{" "}
          <Bold title="I do not believe in the value of this number.">
            {new Date().getFullYear() - 2016} years
          </Bold>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </p>

        <p className={classNames(paragraph, "mt-8")}>
          I write <Bold>JavaScript</Bold>, and <Bold>TypeScript</Bold>. I am
          comfortable with any runtime, browser and <Bold>NodeJS</Bold>, even a
          little <Bold>Deno</Bold>.
        </p>

        <p className={classNames(paragraph, "mt-8")}>
          Learning <Bold>Rust</Bold> on my free time, in fact it is my go to
          language for coding challenges.
        </p>

        <p className={classNames(paragraph, "mt-8")}>
          I have started to learn <Bold>Swift</Bold>, mainly by building iOS
          apps on xcode, and occasionally using it to solve coding challenges.
        </p>
      </div>
    </section>
  );
};
