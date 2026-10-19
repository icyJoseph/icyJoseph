import Link from "next/link";

export function HomeHero() {
  return (
    <header className="home-hero">
      <p className="home-hero__brand">icyJoseph</p>
      <h1 className="home-hero__title">Señor Developer</h1>
      <p className="home-hero__line">
        Late light through the window. Still at the desk — shipping what others
        can see.
      </p>
      <div className="home-hero__cta">
        <Link href="/blog" className="home-hero__btn home-hero__btn--primary">
          Read the blog
        </Link>
        <a
          href="https://github.com/icyJoseph"
          className="home-hero__btn home-hero__btn--ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
