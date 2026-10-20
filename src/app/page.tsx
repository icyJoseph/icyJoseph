import type { Metadata } from "next";

import { HomeHero } from "components/Home/Hero";
import { HomeChrome } from "components/Home/HomeChrome";
import { HumanStrip } from "components/Home/HumanStrip";
import { RoomShader } from "components/Home/RoomShader";
import { fitBitProfile } from "lib/fitbit/fetcher";
import { FEATURED_REPOS } from "lib/github/featured";
import { gitHubProfile } from "lib/github/fetcher";
import { getContributionYearTotals } from "lib/github/year-totals";
import { siteOrigin } from "lib/site-url";
import { getCurrentYear } from "lib/time/current-year";

const origin = siteOrigin();

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: "icyJoseph | Señor Developer",
  description:
    "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
  openGraph: {
    url: origin,
    title: "icyJoseph | Señor Developer",
    siteName: "icyJoseph",
    description:
      "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
    images: [
      {
        url: `${origin}/og-image`,
        width: 960,
        height: 540,
        alt: "icyJoseph, software developer",
        type: "image/png",
      },
    ],
  },
};

export default async function Page(_props: PageProps<"/">) {
  const [github, fitBit, contributionTotals, currentYear] = await Promise.all([
    gitHubProfile(),
    fitBitProfile(),
    getContributionYearTotals(),
    getCurrentYear(),
  ]);

  const { profile } = github;

  const { avatarUrl, name, bio, contributionsCollection, location } = profile;

  const pins = FEATURED_REPOS.map((repo) => ({ ...repo }));
  const yearsOnGitHub = contributionsCollection.contributionYears.length;

  return (
    <HomeChrome>
      <RoomShader />

      <div className="home-page">
        <HomeHero />
        <HumanStrip
          name={name}
          avatarUrl={avatarUrl}
          location={location}
          bio={bio}
          yearsOnGitHub={yearsOnGitHub}
          pins={pins}
          restingHeartRate={fitBit.restingHeartRate}
          averageDailySteps={fitBit.profile.averageDailySteps}
          heartTrend={fitBit.heartTrend}
          stepsTrend={fitBit.stepsTrend}
          contributionYears={contributionTotals.years}
          careerTotal={contributionTotals.careerTotal}
          currentYear={currentYear}
        />
      </div>
    </HomeChrome>
  );
}
