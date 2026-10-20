import Image from "next/image";

import { VitalsHud } from "components/Home/VitalsHud";
import { YearXp } from "components/Home/YearXp";
import { ICY_JOSEPH } from "lib/github/constants";
import type { VitalTrend } from "lib/fitbit/trend";
import type { YearContributionTotal } from "lib/github/year-totals";

type Pin = {
  id: string;
  name: string;
  url: string;
  nameWithOwner: string;
};

type HumanStripProps = {
  name: string;
  avatarUrl: string;
  location: string;
  bio: string;
  yearsOnGitHub: number;
  pins: Pin[];
  restingHeartRate: number | undefined;
  averageDailySteps: number;
  heartTrend?: VitalTrend;
  stepsTrend?: VitalTrend;
  contributionYears: YearContributionTotal[];
  careerTotal: number;
  currentYear: number;
};

const preferences = [
  "JavaScript, TypeScript, and Rust on the side.",
  "Coding challenges — Hash Code, Advent of Code, the long night ones.",
  "Fullstack work. Quiet rooms. Things that ship.",
];

export function HumanStrip({
  name,
  avatarUrl,
  location,
  bio,
  yearsOnGitHub,
  pins,
  restingHeartRate,
  averageDailySteps,
  heartTrend,
  stepsTrend,
  contributionYears,
  careerTotal,
  currentYear,
}: HumanStripProps) {
  return (
    <section className="home-human" aria-label="About">
      <div className="home-human__face">
        <Image
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 120px, 160px"
          className="home-human__avatar"
          src={avatarUrl}
          alt={`${name} GitHub profile picture`}
          width={160}
          height={160}
          draggable={false}
        />
        <div className="home-human__who">
          <h2 className="home-human__name">{name}</h2>
          <p className="home-human__place">{location}</p>
          <p className="home-human__bio">{bio}</p>
        </div>
      </div>

      <VitalsHud
        restingHeartRate={restingHeartRate}
        averageDailySteps={averageDailySteps}
        heartTrend={heartTrend}
        stepsTrend={stepsTrend}
      />

      <div className="home-human__block">
        <h3 className="home-human__heading">Preferences</h3>
        <ul className="home-human__prefs">
          {preferences.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="home-human__block">
        <h3 className="home-human__heading">Work signal</h3>
        <p className="home-human__signal">
          <span className="home-human__stat">{yearsOnGitHub}</span> years on
          GitHub
        </p>

        <YearXp
          years={contributionYears}
          careerTotal={careerTotal}
          currentYear={currentYear}
        />

        {pins.length > 0 ? (
          <>
            <p className="home-human__pins-label">Notable repos</p>
            <ul className="home-human__pins">
              {pins.slice(0, 3).map((pin) => (
                <li key={pin.id}>
                  <a
                    href={pin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-human__pin"
                  >
                    {pin.nameWithOwner.startsWith(`${ICY_JOSEPH}/`)
                      ? pin.name
                      : pin.nameWithOwner}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  );
}
