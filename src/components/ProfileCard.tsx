import classNames from "classnames";
import Image from "next/image";

import { Social } from "components/Social";
import { ICY_JOSEPH } from "github/constants";

type ProfileCardProps = {
  avatarUrl: string;
  alt: string;
  bio: string;
  location: string;
  restingHeartRate: number | undefined;
  averageSteps: number;
  totalSolvedDiscussions: number;
  followerCount: number;
  highlights: IcyJoseph.GitHub["itemShowcase"]["items"]["nodes"];
};

const cardLayout = "lg:flex-row max-w-3xl w-full flex flex-wrap";
const cardBorder = "bg-zinc-900 rounded-lg border border-zinc-700";

export const ProfileCard = ({
  avatarUrl,
  alt,
  bio,
  location,
  restingHeartRate,
  averageSteps,
  totalSolvedDiscussions,
  followerCount,
  highlights,
}: ProfileCardProps) => {
  return (
    <article className={classNames(cardLayout, cardBorder)}>
      <header className="flex flex-grow flex-shrink-0 basis-full py-4">
        <div className="hidden basis-2/5 lg:block" />

        <h1 className="basis-full lg:basis-3/5 text-center text-4xl font-light">
          Joseph <span className="sr-only">Software Developer</span>
        </h1>
      </header>

      <aside className="basis-full lg:basis-2/5 p-4 flex flex-col justify-around">
        <Image
          priority
          className="w-full max-w-xs rounded-full mx-auto p-4"
          src={avatarUrl}
          alt={alt}
          width="320"
          height="320"
        />
        <div className="flex justify-around flex-wrap pt-4">
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
        <p className="text-md italic">{location}</p>

        <p className="text-lg font-light">{bio}</p>

        <ul className="flex flex-wrap gap-4 justify-around py-6">
          {highlights.map(({ id, url, name, nameWithOwner }) => (
            <li key={id}>
              <a
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className={classNames(
                  nameWithOwner.startsWith(ICY_JOSEPH)
                    ? "text-pale-blue"
                    : "text-pale-orange",
                  "underline hover:text-pale-yellow"
                )}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>

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
