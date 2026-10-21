import type { CSSProperties, ReactNode, JSX } from "react";

import { flareSeedFrom, type FlareSeed } from "lib/og/seed";

const room = "#030806";
const shade = "#0a1612";
const mid = "#14352c";
const leaf = "#5f8f7a";
const paperWarm = "#E8DCCF";
const paperCool = "#9BB5A8";
const flareWet = "#F97979";
const flareHot = "#FF6B7C";
const flareDry = "#C46E6D";

function hexAlpha(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, "0");
}

/**
 * One composition per seed: window / overhead / desk bounce.
 * Structure first; flare is the accent (Refactoring UI).
 */
function roomBackdrop(seed: FlareSeed): CSSProperties {
  const hotA = hexAlpha(0x28 + seed.wash * 180);
  const wetA = hexAlpha(0x14 + seed.wash * 100);
  const dryA = hexAlpha(0x10 + seed.wash * 70);
  const rim = seed.cool > 0.55 ? leaf : flareDry;
  const rimA = hexAlpha(0x18 + seed.cool * 40);
  const floorA = hexAlpha(0x10 + seed.floor * 55);

  const beam = `radial-gradient(${seed.hotSize}% ${seed.hotSize * 0.82}% at ${seed.beamX}% ${seed.beamY}%, ${flareHot}${hotA} 0%, ${flareWet}${wetA} 28%, ${flareDry}${dryA} 48%, transparent 68%)`;

  const wash = `linear-gradient(${seed.angle}deg, transparent 20%, ${rim}${rimA} 48%, transparent 78%)`;

  const floor =
    seed.mode === 2
      ? `radial-gradient(70% 40% at ${seed.beamX}% 92%, ${flareWet}${floorA} 0%, transparent 55%)`
      : `radial-gradient(80% 35% at 50% 100%, ${mid}${hexAlpha(28 + seed.floor * 40)} 0%, transparent 55%)`;

  const windowEdge =
    seed.mode === 0
      ? seed.side === "right"
        ? `linear-gradient(90deg, transparent 82%, ${mid}55 92%, ${leaf}22 100%)`
        : `linear-gradient(270deg, transparent 82%, ${mid}55 92%, ${leaf}22 100%)`
      : `linear-gradient(180deg, ${shade}88 0%, transparent 22%)`;

  return {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: room,
    backgroundImage: [beam, wash, floor, windowEdge, `linear-gradient(180deg, ${shade} 0%, ${room} 58%, #020504 100%)`].join(
      ", ",
    ),
  };
}

const Layout = ({
  children,
  seed,
}: {
  children: ReactNode;
  seed: FlareSeed;
}) => (
  <div style={roomBackdrop(seed)}>
    <div
      style={{
        display: "flex",
        position: "absolute",
        inset: 0,
        borderBottom: `1px solid ${mid}`,
        background: `linear-gradient(90deg, transparent 0%, ${mid}66 50%, transparent 100%)`,
        backgroundSize: "100% 1px",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        opacity: 0.45,
      }}
    />
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "3rem 3.25rem",
        color: paperWarm,
      }}
    >
      {children}
    </div>
  </div>
);

const Heading = ({
  level,
  children,
  style,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: string;
  style?: CSSProperties;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag style={{ fontSize: 48, margin: 0, ...style }}>{children}</Tag>;
};

const Paragraph = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <p style={{ margin: 0, fontSize: 24, ...style }}>{children}</p>
);

const defaultSeed = flareSeedFrom("profile", "icyJoseph");

export const ProfileImage = () => (
  <Layout seed={defaultSeed}>
    <Paragraph
      style={{
        fontSize: 18,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: leaf,
        marginBottom: "0.75rem",
      }}
    >
      icyjoseph.dev
    </Paragraph>
    <Heading
      level={1}
      style={{ fontSize: 64, lineHeight: 1.05, color: paperWarm, fontWeight: 700 }}
    >
      icyJoseph
    </Heading>
    <Paragraph
      style={{
        fontSize: 28,
        color: flareWet,
        marginTop: "0.5rem",
        fontWeight: 500,
      }}
    >
      Señor Developer
    </Paragraph>
  </Layout>
);

const formatter = new Intl.DateTimeFormat("en-SE", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "Europe/Stockholm",
});

export const BlogPostImage = ({
  slug,
  title,
  summary: _summary,
  tags,
  publishDate,
}: {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  publishDate: number | null;
}) => {
  const seed = flareSeedFrom(slug, title);
  const tag = tags[0];

  return (
    <Layout seed={seed}>
      <Paragraph
        style={{
          fontSize: 18,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: leaf,
          marginBottom: "0.85rem",
        }}
      >
        {tag ? `Notes · ${tag}` : "Notes"}
      </Paragraph>

      <Heading
        level={1}
        style={{
          fontSize: title.length > 42 ? 44 : 56,
          lineHeight: 1.12,
          color: paperWarm,
          fontWeight: 700,
          maxWidth: "92%",
        }}
      >
        {title}
      </Heading>

      <div
        style={{
          display: "flex",
          marginTop: "1.5rem",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {publishDate ? (
          <span style={{ fontSize: 20, color: paperCool }}>
            {formatter.format(new Date(publishDate * 1000))}
          </span>
        ) : null}
        <span style={{ fontSize: 18, color: mid }}>·</span>
        <span style={{ fontSize: 20, color: leaf }}>icyJoseph</span>
      </div>
    </Layout>
  );
};
