import { fitBitProfile } from "lib/fitbit/fetcher";
import { getAllContributions } from "lib/github/aggregator";
import { MAIN_LANGUAGES } from "lib/github/constants";
import { gitHubProfile } from "lib/github/fetcher";

const RESET = "\x1b[0m";

function color(code: string, text: string) {
  return `${code}${text}${RESET}`;
}

export const COLORS = {
  title: "\x1b[38;5;221m", // pale yellow-ish
  section: "\x1b[38;5;81m", // cyan/blue
  accent: "\x1b[38;5;213m", // pink
  subtle: "\x1b[38;5;245m", // gray (a bit brighter for readability)
  bullet: "\x1b[38;5;208m", // orange
};

const MAIN_LANGUAGES_ORDER = ["TypeScript", "JavaScript", "Rust", "Swift"] as const;

const isLanguageEdge = (
  edge: IcyJoseph.LanguageEdge | null
): edge is IcyJoseph.LanguageEdge => Boolean(edge);

function getPrimaryLanguage(
  repo: Pick<IcyJoseph.Repository, "languages">
): string {
  const languages = repo.languages.edges.filter(isLanguageEdge);
  const primaryLang = languages[0]?.node.name;

  if (!primaryLang) return "Others";

  return MAIN_LANGUAGES.includes(primaryLang as (typeof MAIN_LANGUAGES)[number])
    ? primaryLang
    : "Others";
}

type FormatHelpers = {
  formatTitle: (text: string) => string;
  formatSection: (text: string) => string;
  formatSubtitle: (text: string) => string;
  formatBullet: (text: string) => string;
  formatAccent: (text: string) => string;
};

export function createAnsiFormatters(): FormatHelpers {
  return {
    formatTitle: (text: string) => color(COLORS.title, text),
    formatSection: (text: string) => color(COLORS.section, text),
    formatSubtitle: (text: string) => color(COLORS.subtle, text),
    formatBullet: (text: string) => `${color(COLORS.bullet, "•")} ${text}`,
    formatAccent: (text: string) => color(COLORS.accent, text),
  };
}

export function createMarkdownFormatters(): FormatHelpers {
  return {
    formatTitle: (text: string) => `# ${text}`,
    formatSection: (text: string) => `## ${text}`,
    formatSubtitle: (text: string) => text,
    formatBullet: (text: string) => `- ${text}`,
    formatAccent: (text: string) => `**${text}**`,
  };
}

export async function generateTextLanding(isMarkdown: boolean): Promise<string> {
  const [github, allContributionsData, fitbit] = await Promise.all([
    gitHubProfile(),
    getAllContributions(),
    fitBitProfile(),
  ]);

  const { profile, companyAvatarUrl } = github;
  const { aggregated, totalRestrictedContributions } = allContributionsData;

  const name = profile.name ?? "icyJoseph";
  const handle = profile.login ?? "icyJoseph";
  const location = profile.location ?? "";
  const company = profile.company ?? "";

  const currentYear = profile.contributionsCollection.contributionYears[0];
  const yearsOnGitHub =
    profile.contributionsCollection.contributionYears.length;
  const startYear =
    profile.contributionsCollection.contributionYears[yearsOnGitHub - 1];

  const formatters = isMarkdown
    ? createMarkdownFormatters()
    : createAnsiFormatters();

  const {
    formatTitle,
    formatSection,
    formatSubtitle,
    formatBullet,
    formatAccent,
  } = formatters;

  const lines: string[] = [];

  lines.push(formatTitle(`${name} — Señor Developer`));
  lines.push(formatSubtitle("JavaScript, TypeScript, Rust, CSS — full‑stack developer."));
  lines.push(formatSubtitle(`GitHub: @${handle}`));
  lines.push(
    formatSubtitle(
      "Links: github.com/icyJoseph  ·  linkedin.com/in/icyjoseph  ·  dev.to/icyjoseph  ·  medium.com/@icjoseph  ·  github.com/sponsors/icyJoseph"
    )
  );
  if (location) {
    lines.push(formatSubtitle(`Based in ${location}.`));
  }
  lines.push(
    formatSubtitle(
      "Blog posts at /blog — engineering notes, writeups and experiments."
    )
  );
  lines.push("");

  // Me and my work
  lines.push(formatSection("Me and my Work"));
  lines.push("");

  // Fun stats (Fitbit)
  const averageDailySteps = fitbit.profile.averageDailySteps;
  const restingHeartRate = fitbit.restingHeartRate;

  if (averageDailySteps || restingHeartRate) {
    lines.push(formatSection("Stats & Fun"));
    lines.push("");
    if (averageDailySteps) {
      lines.push(
        formatBullet(
          `Average daily steps (Fitbit): ${averageDailySteps.toLocaleString()}`
        )
      );
    }
    if (restingHeartRate) {
      lines.push(
        formatBullet(`Resting heart rate (recent): ${restingHeartRate} bpm`)
      );
    }
    lines.push("");
  }
  lines.push(
    formatBullet(
      "Electronics Engineering (control + automation) and Business Design."
    )
  );
  lines.push(
    formatBullet(
      `${currentYear - startYear} years as a software developer across telecom, mining, freight, real estate, news, transport, and automotive.`
    )
  );
  if (company) {
    lines.push(
      formatBullet(
        `Currently at ${company}${companyAvatarUrl ? " (GitHub verified)" : ""}.`
      )
    );
  }
  lines.push("");

  // Coding
  lines.push(formatSection("Coding"));
  lines.push("");
  lines.push(
    formatBullet(
      "Comfortable with JavaScript & TypeScript across browser, Node.js and Deno."
    )
  );
  lines.push(
    formatBullet(
      "Learning Rust and using it as a go‑to language for coding challenges."
    )
  );
  lines.push(
    formatBullet(
      "Exploring Swift by building iOS apps and solving challenges."
    )
  );
  lines.push("");

  // Contributions (simplified)
  const external = aggregated.external ?? [];
  const owned = aggregated.owned ?? [];

  const allContributions: typeof aggregated.external = [
    ...external,
    ...owned,
  ];

  // Aggregate total commits per primary language
  const totalsByLanguage = new Map<string, number>();
  allContributions.forEach((item) => {
    const lang = getPrimaryLanguage(item.repository);
    const prev = totalsByLanguage.get(lang) ?? 0;
    totalsByLanguage.set(lang, prev + item.totalContributions);
  });

  const languageSummaryParts: string[] = [];

  MAIN_LANGUAGES_ORDER.forEach((lang) => {
    const value = totalsByLanguage.get(lang);
    if (value && value > 0) {
      languageSummaryParts.push(`${lang} ${formatAccent(value.toString())}`);
    }
  });

  // Pick notable repositories across all languages by stars
  const sortedByStars = [...allContributions]
    .filter((item) => (item.repository.stargazerCount ?? 0) > 0)
    .sort(
      (a, b) =>
        (b.repository.stargazerCount ?? 0) - (a.repository.stargazerCount ?? 0)
    );

  const topNotable = sortedByStars.slice(0, 6);
  const notableLabels = topNotable.map((item) => {
    const repo = item.repository;
    const owner = repo.owner.login;
    return owner === handle ? repo.name : `${owner}/${repo.name}`;
  });

  lines.push(formatSection("Public GitHub Contributions"));
  lines.push("");

  if (languageSummaryParts.length > 0) {
    lines.push(
      formatBullet(`Using ${languageSummaryParts.join(", ")} commits.`)
    );
  }

  if (notableLabels.length > 0) {
    const formattedNotables = notableLabels.map((label) => formatAccent(label));
    const separator = isMarkdown
      ? ", "
      : color(COLORS.subtle, ", ");
    lines.push(
      formatBullet(
        `Notable repositories: ${formattedNotables.join(separator)}.`
      )
    );
  }
  lines.push("");

  if (totalRestrictedContributions > 0) {
    lines.push(
      formatSubtitle(
        `+ ${totalRestrictedContributions} private contributions across all years.`
      )
    );
    lines.push("");
  }

  lines.push(
    formatSubtitle(
      "Tip: open https://icyjoseph.dev in a browser for the full visual version."
    )
  );

  return lines.join("\n");
}
