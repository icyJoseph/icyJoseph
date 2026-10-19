import Link from "next/link";

import { CodeBlock } from "components/Blog/CodeBlock";
import { Robot } from "design-system/Icons";
import { flareTokens, roomTokens } from "lib/design/tokens";

const sampleCode = `export async function getPost(slug: string) {
  "use cache";
  cacheTag(slug);

  const mod = await import(\`../../../posts/\${slug}.md\`);
  const { content, data } = matter(mod.default);

  return postSchema.parse({ ...data, content });
}`;

export default function DesignMockupPage() {
  return (
    <div className="design-mock min-h-screen text-[var(--paper-cool)]">
      <div className="design-mock__atmosphere" aria-hidden />
      <div className="design-mock__beam" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-28 pt-12 md:px-10">
        <p className="design-mock__eyebrow mb-14">
          <Link href="/" className="design-mock__mute-link">
            ← icyJoseph
          </Link>
          <span className="mx-3 opacity-35">·</span>
          design
          <span className="mx-3 opacity-35">·</span>
          <Link href="/design.md" className="design-mock__mute-link">
            design.md
          </Link>
        </p>

        <header className="design-mock__hero mb-24 md:mb-28">
          <p className="design-mock__brand">icyJoseph</p>
          <h1 className="design-mock__headline">Señor Developer</h1>
        </header>

        <section className="mb-24 max-w-2xl">
          <h2 className="design-mock__section-title">Vibe</h2>
          <div className="space-y-4 text-base leading-relaxed text-[var(--paper-cool)]/90">
            <p>
              Late afternoon. The laptop is still open. Orange-red light from the
              window cuts across the desk; everything else sits in cool green
              shade.
            </p>
            <p className="design-mock__icon-line">
              <Robot
                className="design-mock__inline-icon"
                size={22}
                weight="duotone"
                aria-hidden
              />
              <span>
                That is the frame for this design system: fluorescent where
                attention lands, dark emerald where it does not. Less startup
                neon, more end-of-day coding — the sense that the old developer
                era is closing, and the room is getting quieter.
              </span>
            </p>
          </div>
        </section>

        <section id="palette" className="mb-24 scroll-mt-16">
          <h2 className="design-mock__section-title">Color</h2>
          <p className="design-mock__section-copy mb-10 max-w-xl">
            Two families.{" "}
            <strong className="font-medium text-[var(--paper-warm)]">
              Room
            </strong>{" "}
            is emerald shadow.{" "}
            <strong className="font-medium text-[var(--flare-wet)]">
              Flare
            </strong>{" "}
            is Ohuhu FY02 fluorescent red — wet for glow, dry after a second
            coat.
          </p>

          <h3 className="mb-4 text-sm font-medium text-[var(--paper-warm)]">
            Room
          </h3>
          <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {roomTokens.map((t) => (
              <div key={t.name} className="design-mock__swatch">
                <div
                  className="design-mock__swatch-chip"
                  style={{ background: `var(--${t.css})` }}
                />
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--paper-warm)]">
                    {t.name}
                  </span>
                  <span className="font-mono text-xs opacity-55">{t.hex}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--leaf)]">{t.role}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 text-sm font-medium text-[var(--paper-warm)]">
            Flare
          </h3>
          <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {flareTokens.map((t) => (
              <div key={t.name} className="design-mock__swatch">
                <div
                  className={
                    t.name === "Wet" || t.name === "Hit" || t.name === "Glow"
                      ? "design-mock__swatch-chip design-mock__swatch-chip--neon"
                      : "design-mock__swatch-chip"
                  }
                  style={{ background: `var(--${t.css})` }}
                />
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--paper-warm)]">
                    {t.name}
                  </span>
                  <span className="font-mono text-xs opacity-55">{t.hex}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--leaf)]">{t.role}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-4 text-sm font-medium text-[var(--paper-warm)]">
            Layers
          </h3>
          <p className="design-mock__section-copy mb-6 max-w-xl">
            Same red, three coats. Wash, dry and pass again, then a wet top that
            still blooms.
          </p>
          <div className="design-mock__layers">
            <div>
              <div className="design-mock__layer design-mock__layer--1" />
              <p className="mt-2 text-xs text-[var(--leaf)]">1 · wash</p>
            </div>
            <div>
              <div className="design-mock__layer design-mock__layer--2" />
              <p className="mt-2 text-xs text-[var(--leaf)]">2 · dry + pass</p>
            </div>
            <div>
              <div className="design-mock__layer design-mock__layer--3" />
              <p className="mt-2 text-xs text-[var(--leaf)]">3 · wet neon</p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="design-mock__section-title">Type</h2>
          <p className="design-mock__section-copy mb-10 max-w-xl">
            Recursive for everything here. Flare on titles that should catch
            light. Leaf on meta. Body in cool paper so the red can glow.
          </p>
          <div className="space-y-6">
            <p className="design-mock__type-sun text-4xl md:text-5xl">
              Late light on the sill
            </p>
            <p className="design-mock__type-shade text-2xl md:text-3xl">
              Emerald in the corners
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--paper-cool)]/80">
              Body copy stays in shade. Links pick up wet flare on hover.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--leaf)]">
              19 Oct 2026 · next.js · reading time
            </p>
          </div>
        </section>

        <section id="samples" className="mb-24 scroll-mt-16">
          <h2 className="design-mock__section-title">Blog sample</h2>
          <p className="design-mock__section-copy mb-10 max-w-xl">
            Sketch of a post surface. Code uses the same Bright{" "}
            <code className="text-[var(--flare-wet)]">CodeBlock</code> as the
            blog.
          </p>

          <article className="design-mock__article">
            <p className="design-mock__meta mb-3">
              19 Oct 2026 · next.js · app router
            </p>
            <h3 className="design-mock__article-title">
              Server cache and soft nav
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--paper-cool)]/85">
              App Router made RSC mainstream, but server-side caching and soft
              navigation still lagged what CSR got from the browser. This post
              walks both.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--paper-cool)]/85">
              A follow-up covers{" "}
              <a href="#samples" className="design-mock__inline-link">
                Cache Components
              </a>
              .
            </p>

            <div className="design-mock__bright mt-5">
              <CodeBlock className="language-ts">{sampleCode}</CodeBlock>
            </div>

            <blockquote className="design-mock__quote my-8">
              Attention is flare. The rest of the room stays emerald.
            </blockquote>

            <details className="design-mock__details">
              <summary>File conventions</summary>
              <p className="mt-3 leading-relaxed text-[var(--paper-cool)]/80">
                Segments compose URL, UI, and cache boundaries. Expand blocks
                sit in shade; the summary line catches flare.
              </p>
            </details>
          </article>
        </section>

        <section className="mb-20">
          <h2 className="design-mock__section-title">Controls</h2>
          <p className="design-mock__section-copy mb-10 max-w-xl">
            Primary is wet neon. Secondary and fields stay in the room.
          </p>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-[var(--leaf)]">
                Buttons
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="design-mock__btn design-mock__btn--sun"
                >
                  Primary
                </button>
                <button
                  type="button"
                  className="design-mock__btn design-mock__btn--shade"
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className="design-mock__btn design-mock__btn--ghost"
                >
                  Ghost
                </button>
                <button
                  type="button"
                  className="design-mock__btn design-mock__btn--sun"
                  disabled
                >
                  Disabled
                </button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-[var(--leaf)]">
                Links
              </p>
              <div className="flex flex-wrap items-center gap-6 text-base">
                <a href="#palette" className="design-mock__inline-link">
                  Inline link
                </a>
                <a href="#samples" className="design-mock__mute-link">
                  Quiet link
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-[var(--leaf)]">
                Fields
              </p>
              <div className="grid max-w-md gap-3">
                <label className="design-mock__field">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    defaultValue=""
                  />
                </label>
                <label className="design-mock__field">
                  <span>Note</span>
                  <textarea rows={3} placeholder="Optional note" />
                </label>
                <label className="design-mock__check">
                  <input type="checkbox" defaultChecked />
                  <span>Subscribe to posts</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[var(--shade-mid)]/60 pt-8 text-sm text-[var(--leaf)]">
          <code className="text-[var(--flare-glow)]/80">/design</code>
          {" · "}
          <Link href="/design.md" className="design-mock__mute-link">
            /design.md
          </Link>
          {" · text for implementers"}
        </footer>
      </div>
    </div>
  );
}
