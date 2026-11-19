export const BlogIntro = () => {
  return (
    <header className="blog-index__intro">
      <p className="blog-index__eyebrow">Writing</p>
      <h1 className="blog-index__title">Notes</h1>
      <p className="blog-index__lead">
        Small studies of things I want to understand, mostly React and Next.js,
        and the occasional coding challenge.
      </p>
      <p className="blog-index__lead">
        Other posts I wrote are on{" "}
        <a
          href="https://medium.com/@icjoseph"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-index__link"
        >
          Medium
        </a>{" "}
        and{" "}
        <a
          href="https://dev.to/icyjoseph"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-index__link"
        >
          dev.to
        </a>
        .
      </p>
    </header>
  );
};
