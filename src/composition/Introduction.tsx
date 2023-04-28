import { type ReactNode, type FC, useId } from "react";

import {
  type IconProps,
  Bird,
  Briefcase,
  CodeBlock,
  FileRs,
  Student,
} from "@phosphor-icons/react";
import classNames from "classnames";

import { Bold } from "design-system/Bold";

const ParagraphWithIcon = ({
  className = "",
  Icon,
  children,
}: {
  className?: string;
  Icon: FC<IconProps>;
  children: ReactNode;
}) => (
  <div
    className={classNames(
      "font-sans flex flex-col sm:flex-row mx-auto my-12 gap-6",
      className
    )}
  >
    <div className="flex justify-center items-center">
      <Icon size={32} />
    </div>

    <p>{children}</p>
  </div>
);

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
        <ParagraphWithIcon Icon={Student} className="mt-16">
          Developer from <Bold>Peru</Bold>, living in <Bold>Sweden</Bold>. I
          have a Bachelor&apos;s in Electronics Engineering, and a Master&apos;s
          degree on business design.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={Briefcase}>
          I have over{" "}
          <Bold title="I do not believe in the value of this number.">
            {new Date().getFullYear() - 2016} years
          </Bold>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={CodeBlock}>
          I write <Bold>JavaScript</Bold>, and <Bold>TypeScript</Bold>. I am
          comfortable with any runtime, browser and <Bold>NodeJS</Bold>, even a
          little <Bold>Deno</Bold>.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={FileRs}>
          Learning <Bold>Rust</Bold> on my free time, in fact it is my go to
          language for coding challenges.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={Bird}>
          I have started to learn <Bold>Swift</Bold>, mainly by building iOS
          apps on xcode, and occasionally using it to solve coding challenges.
        </ParagraphWithIcon>
      </div>
    </section>
  );
};
