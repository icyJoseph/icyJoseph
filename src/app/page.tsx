import type { Metadata } from "next";
import Image from "next/image";

import { Bytes } from "components/Bytes";
import YearlyContribution from "components/GitHub/YearlyContribution";
import { Bird, Briefcase, Code, FileRs, Student } from "components/Icons";
import { Introduction } from "components/Introduction";
import { ParagraphWithIcon } from "components/ParagraphWithIcon";
import { Social } from "components/Social";
import { Bold } from "design-system/Bold";
import { gitHubProfile } from "github/fetcher";

export const revalidate = 60;

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const metadata: Metadata = {
  title: "icyJoseph | Señor Developer",
  description:
    "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
  openGraph: {
    url: VERCEL_URL,
    title: "icyJoseph | Señor Developer",
    siteName: "icyJoseph",
    description:
      "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
    images: [
      {
        url: `${VERCEL_URL}/waves_background.png`,
        width: 960,
        height: 540,
        alt: "icyJoseph wavy background",
        type: "image/png",
      },
    ],
  },
};

export default async function Page() {
  const { profile, languages } = await gitHubProfile();

  const { avatarUrl, name, contributionsCollection } = profile;

  const currentYear = contributionsCollection.contributionYears[0];

  const yearsOnGitHub = contributionsCollection.contributionYears.length;

  const startYear =
    contributionsCollection.contributionYears[yearsOnGitHub - 1];

  return (
    <Introduction>
      <Image
        priority
        className="w-4/5 max-w-xs rounded-full border-white border-2 border-solid mx-auto"
        src={avatarUrl}
        alt={`${name} github profile picture`}
        width="320"
        height="320"
      />

      <div className="py-2" />

      <Social />

      <div className="py-6" />

      <section className="font-mono max-w-prose mx-auto w-full">
        <h2 className="font-sans text-3xl">Me and my Work</h2>

        <ParagraphWithIcon Icon={Student} className="mt-16">
          Developer from <Bold className="text-pale-blue">Peru</Bold>, living in{" "}
          <Bold className="text-pale-blue">Sweden</Bold>. I have a
          Bachelor&apos;s in Electronics Engineering, and a Master&apos;s degree
          on business design.
        </ParagraphWithIcon>

        <ParagraphWithIcon Icon={Briefcase} reverse>
          I have over{" "}
          <Bold className="text-pale-blue">
            {currentYear - startYear} years
          </Bold>{" "}
          of experience working as a software developer, in telecom, mining,
          freight, real state, news, transport and automotive industries.
        </ParagraphWithIcon>

        <YearlyContribution
          currentYear={currentYear}
          initial={contributionsCollection}
        />
      </section>

      <div className="py-6" />

      <section className="font-mono max-w-prose mx-auto w-full">
        <h2 className="font-sans text-3xl">Coding</h2>

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

        <section>
          <Bytes languages={languages} />
        </section>
      </section>
    </Introduction>
  );
}
