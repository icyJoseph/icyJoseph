import Image from "next/image";

import { Bytes } from "components/Bytes";
import YearlyContribution from "components/GitHub/YearlyContribution";
import { Bird, Briefcase, Code, FileRs, Student } from "components/Icons";
import { Social } from "components/Social";
import { ParagraphWithIcon, Introduction } from "composition/Introduction";
import { Bold } from "design-system/Bold";
import { gitHubProfile } from "github/fetcher";

export const revalidate = 60;

export default async function Page() {
  const { profile, languages } = await gitHubProfile();

  const { avatarUrl, name, contributionsCollection } = profile;

  const currentYear = new Date().getFullYear();

  return (
    <Introduction>
      <Image
        priority
        className="w-4/5 max-w-sm rounded-full border-white border-2 border-solid mx-auto"
        src={avatarUrl}
        alt={`${name} github profile picture`}
        width="320"
        height="320"
      />

      <div className="my-2" />

      <Social />

      <div className="my-2" />

      <section className="font-mono max-w-[55ch] text-xl mx-auto w-full">
        <h2 className="font-sans text-2xl">Me and my Work</h2>

        <ParagraphWithIcon Icon={Student} className="mt-16">
          Developer from <Bold className="text-pale-blue">Peru</Bold>, living in{" "}
          <Bold className="text-pale-blue">Sweden</Bold>. I have a
          Bachelor&apos;s in Electronics Engineering, and a Master&apos;s degree
          on business design.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={Briefcase} reverse>
          I have over{" "}
          <Bold
            title="I do not believe in the value of this number."
            className="text-pale-blue"
          >
            {currentYear - 2016} years
          </Bold>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </ParagraphWithIcon>

        <YearlyContribution
          currentYear={currentYear}
          initial={contributionsCollection}
        />
      </section>

      <div className="my-2" />

      <section className="font-mono max-w-[55ch] text-xl mx-auto w-full">
        <h2 className="font-sans text-2xl">Coding</h2>

        <ParagraphWithIcon Icon={Code}>
          I write <Bold className="text-pale-red">JavaScript</Bold>, and{" "}
          <Bold className="text-pale-red">TypeScript</Bold>. I am comfortable
          with any runtime, browser and{" "}
          <Bold className="text-pale-blue">NodeJS</Bold>, even a little{" "}
          <Bold className="text-pale-blue">Deno</Bold>.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={FileRs} reverse>
          Learning <Bold className="text-pale-red">Rust</Bold> on my free time,
          in fact it is my go to language for coding challenges.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={Bird}>
          I have started to learn <Bold className="text-pale-red">Swift</Bold>,
          mainly by building iOS apps on xcode, and occasionally using it to
          solve coding challenges.
        </ParagraphWithIcon>

        <Bytes languages={languages} />
      </section>
    </Introduction>
  );
}
