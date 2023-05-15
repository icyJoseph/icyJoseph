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

const cardLayout = "lg:flex-row max-w-3xl w-full flex flex-wrap py-4 px-2 ";
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
      <header className="flex flex-grow flex-shrink-0 basis-full">
        <div className="hidden basis-2/5 lg:block" />

        <h1 className="basis-full lg:basis-3/5 text-center text-4xl font-light p-4">
          Joseph <span className="sr-only">Software Developer</span>
        </h1>
      </header>

      <aside className="basis-full lg:basis-2/5 p-4">
        <Image
          priority
          className="w-full max-w-xs rounded-full mx-auto p-4"
          src={avatarUrl}
          alt={alt}
          width="320"
          height="320"
        />
        <div className="flex justify-around flex-wrap">
          <span className="flex flex-col items-center">
            <span className="text-xl text-pale-red">{restingHeartRate}</span>{" "}
            <span>bpm</span>
          </span>

          <span className="flex flex-col items-center">
            <span className="text-xl text-pale-red">{averageSteps}</span>{" "}
            <span>daily steps</span>
          </span>
        </div>
      </aside>

      <section className="basis-full lg:basis-3/5 p-4 flex flex-col justify-between">
        <p className="text-lg font-light">{bio}</p>

        <div className="pt-4 flex justify-around flex-wrap">
          <span className="flex flex-col items-center">
            <span className="text-xl text-pale-red">{followerCount}</span>{" "}
            <span>github followers</span>
          </span>

          <span className="flex flex-col items-center">
            <span className="text-xl text-pale-red">
              {totalSolvedDiscussions}
            </span>{" "}
            <span>resolved discussions</span>
          </span>
        </div>
      </section>

      <footer className="flex-grow flex-shrink-0 basis-full flex flex-wrap justify-around gap-4 p-4">
        <Social />
      </footer>
    </article>
  );
};
