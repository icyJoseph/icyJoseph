import classNames from "classnames";
import Image from "next/image";

import { Social } from "components/Social";
import style from "design-system/border-gradient.module.css";
import { ICY_JOSEPH } from "lib/github/constants";

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

const cardLayout = "md:flex-row max-w-3xl w-full flex flex-wrap";

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
    <article className={classNames(cardLayout, style.borderGradient)}>
      <aside className="basis-full md:basis-2/5 p-4 flex flex-col justify-between min-w-">
        <Image
          priority
          className="w-full max-w-xs rounded-full mx-auto p-4 select-none"
          src={avatarUrl}
          alt={alt}
          width="320"
          height="320"
          draggable="false"
        />
        <div className="flex justify-around flex-wrap pt-4 w-full max-w-md mx-auto">
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

      <div className="basis-full md:basis-3/5 p-4">
        <header className="pb-4">
          <h1 className="text-4xl font-light text-center md:text-left">
            Joseph <span className="sr-only">Software Developer</span>
          </h1>
        </header>

        <section className="basis-full md:basis-3/5 flex flex-col justify-between">
          <p className="text-md italic text-center md:text-left mb-2 text-pale-orange">
            {location}
          </p>

          <p className="text-lg font-light">{bio}</p>

          <ul className="flex flex-wrap gap-4 justify-around py-6 w-full max-w-md mx-auto">
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

          <div className="pt-4 flex justify-around flex-wrap w-full max-w-md mx-auto">
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
      </div>

      <footer className="flex-grow flex-shrink-0 basis-full flex flex-wrap justify-around gap-4 p-4">
        <Social />
      </footer>
    </article>
  );
};
