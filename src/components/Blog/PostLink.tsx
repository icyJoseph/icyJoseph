import Link from "next/link";

import { FlarePlate } from "components/Blog/FlarePlate";
import { flareSeedFrom } from "lib/og/seed";
import type { PostPreview } from "lib/posts/types";

const dateFmt = new Intl.DateTimeFormat("en-SE", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "Europe/Stockholm",
});

export const PostLink = ({ post }: { post: PostPreview }) => {
  const href = `/blog/${post.slug}`;
  const imageSrc = `/og-image/${post.slug}`;
  const when = dateFmt.format(new Date(post.publish_date * 1000));
  const tags = post.tags.slice(0, 3);
  const seed = flareSeedFrom(post.slug, post.title);

  return (
    <article className="blog-card">
      <Link href={href} prefetch className="blog-card__hit">
        <FlarePlate seed={seed} fallbackSrc={imageSrc} />
        <div className="blog-card__body">
          <p className="blog-card__meta">
            <time dateTime={new Date(post.publish_date * 1000).toISOString()}>
              {when}
            </time>
            {tags.length > 0 ? (
              <>
                <span aria-hidden className="blog-card__dot">
                  ·
                </span>
                <span>{tags.join(" · ")}</span>
              </>
            ) : null}
          </p>
          <h2 className="blog-card__title">{post.title}</h2>
          <p className="blog-card__summary">{post.summary}</p>
        </div>
      </Link>
    </article>
  );
};
