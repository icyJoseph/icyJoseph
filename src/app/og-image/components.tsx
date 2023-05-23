import type { CSSProperties, ReactNode } from "react";

const palette = {
  "--pale-blue": "165 200 228",
  "--pale-green": "192 236 204",
  "--pale-yellow": "249 240 193",
  "--pale-orange": "244 205 166",
  "--pale-red": "246 168 166",
  "--soft-black": "29 29 33",
  "--smoke-white": "251 249 255",
};

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(base: string) {
  const [r, g, b] = base.split(" ").map(Number);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const hexPalette = {
  "--pale-blue": rgbToHex(palette["--pale-blue"]),
  "--pale-green": rgbToHex(palette["--pale-green"]),
  "--pale-yellow": rgbToHex(palette["--pale-yellow"]),
  "--pale-orange": rgbToHex(palette["--pale-orange"]),
  "--pale-red": rgbToHex(palette["--pale-red"]),
  "--soft-black": rgbToHex(palette["--soft-black"]),
  "--smoke-white": rgbToHex(palette["--smoke-white"]),
};

const toRGB = (base: string, opacity = 1) => `rgb(${base} / ${opacity})`;

const hexGradient = [
  hexPalette["--pale-blue"],
  hexPalette["--pale-red"],
  hexPalette["--pale-yellow"],
  hexPalette["--pale-green"],
  hexPalette["--pale-orange"],
].join(", ");

const gradient = `linear-gradient(45deg, ${hexGradient})`;

const Layout = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      height: "100%",
      background: toRGB(palette["--soft-black"]),
      padding: "0.5rem",
    }}
  >
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundImage: gradient,
        padding: "0.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 128,
          background: toRGB(palette["--soft-black"]),
          color: toRGB(palette["--smoke-white"]),
          padding: "2rem",
        }}
      >
        {children}
      </div>
    </div>
  </div>
);

const Avatar = () => (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://github.com/icyjoseph.png"
      alt="icyJoseph user avatar"
      style={{
        borderRadius: "50%",
        flexBasis: "33.33%",
        margin: 0,
      }}
    />
  </>
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

const MainContent = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      flex: "auto",
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: "2rem",
    }}
  >
    {children}
  </div>
);

const Paragraph = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <p
    style={{
      margin: 0,
      fontSize: 48,
      ...style,
    }}
  >
    {children}
  </p>
);

export const ProfileImage = () => (
  <Layout>
    <Avatar />

    <MainContent>
      <Heading level={1}>@icyJoseph</Heading>
      <Paragraph
        style={{
          fontSize: 36,
          color: toRGB(palette["--pale-yellow"]),
        }}
      >
        Señor Software Developer
      </Paragraph>

      <Paragraph style={{ fontSize: 28, margin: "1rem 0" }}>
        JavaScript / TypeScript / Rust / Swift / CSS
      </Paragraph>

      <Paragraph>🇵🇪 🇸🇪</Paragraph>

      <Paragraph style={{ fontSize: 32, margin: "1rem 0" }}>
        I build both front-end and back-end applications.
      </Paragraph>

      <div style={{ flex: "auto" }} />

      <span style={{ fontSize: 28 }}>icyjoseph.dev</span>
    </MainContent>
  </Layout>
);

const formatter = new Intl.DateTimeFormat("en-SV", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const PublishedDate = ({ date }: { date: Date }) => {
  const formatted = `Published ${formatter.format(date)}`;

  return <Paragraph style={{ fontSize: 20 }}>{formatted}</Paragraph>;
};

export const BlogPostImage = ({
  title,
  summary,
  tags,
  publishDate,
}: {
  title: string;
  summary: string;
  tags: string[];
  publishDate: number | null;
}) => {
  return (
    <Layout>
      <Avatar />

      <MainContent>
        <Heading level={1}>@icyJoseph</Heading>
        <Paragraph
          style={{
            fontSize: 36,
            color: toRGB(palette["--pale-yellow"]),
          }}
        >
          Señor Software Developer
        </Paragraph>

        <Heading
          level={2}
          style={{
            fontSize: 32,
            color: toRGB(palette["--pale-orange"]),
            marginTop: "2rem",
          }}
        >
          {title}
        </Heading>

        <Paragraph style={{ fontSize: 24, margin: "0.5rem 0" }}>
          {tags.join(" / ")}
        </Paragraph>

        <Paragraph style={{ fontSize: 24, margin: "0.5rem 0" }}>
          {summary}
        </Paragraph>

        <div style={{ flex: "auto" }} />

        {publishDate && <PublishedDate date={new Date(publishDate * 1000)} />}
      </MainContent>
    </Layout>
  );
};
