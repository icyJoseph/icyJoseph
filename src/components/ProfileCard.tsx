import classNames from "classnames";
import Image from "next/image";

import { Social } from "components/Social";

type ProfileCardProps = {
  avatarUrl: string;
  alt: string;
  bio: string;
  restingHeartRate: number | undefined;
  averageSteps: number;
  totalSolvedDiscussions: number;
  followerCount: number;
};

const cardLayout =
  "flex-col lg:flex-row max-w-3xl w-4/5 flex flex-wrap py-4 px-2 ";
const cardBorder = "bg-zinc-900 rounded-lg border border-zinc-700";

export const ProfileCard = ({
  avatarUrl,
  alt,
  bio,
  restingHeartRate,
  averageSteps,
  totalSolvedDiscussions,
  followerCount,
}: ProfileCardProps) => {
  return (
    <article className={classNames(cardLayout, cardBorder)}>
      <header className="flex-1 p-4">
        <Image
          priority
          className="w-full max-w-xs rounded-full mx-auto"
          src={avatarUrl}
          alt={alt}
          width="320"
          height="320"
        />
      </header>

      <section className="flex-[2]">
        <h1 className="text-center text-4xl font-light my-8">
          Joseph <span className="sr-only">Software Developer</span>
        </h1>

        <p>{bio}</p>

        <aside>
          <p>{followerCount} github followers</p>

          <p>{totalSolvedDiscussions} resolved discussions</p>

          <p>{restingHeartRate} bpm</p>

          <p>{averageSteps} daily steps</p>
        </aside>
      </section>

      <footer className="flex-grow flex-shrink-0 basis-full flex justify-around gap-4 pt-6">
        <Social />
      </footer>
    </article>
  );
};
