import type { GetStaticProps } from "next";
import { MeiliSearch } from "meilisearch";
import Link from "next/link";

import { Container } from "design-system/Container";
import { Text } from "design-system/Text";
import { Section } from "design-system/Section";

type PostPreview = Pick<IcyJoseph.Post, "title" | "tags" | "slug" | "summary">;

type BlogProps = {
  pages: PostPreview[];
};

export const Blog = ({ pages }: BlogProps) => {
  return (
    <>
      <Container mt={4}>
        {pages.map((page) => (
          <Section as="article" key={page.slug} mb={2}>
            <Link href={`/blog/${page.slug}`}>
              <a>
                <Text as="h2" $textColor="--yellow">
                  {page.title}
                </Text>
              </a>
            </Link>

            <div>
              <Text>{page.summary}</Text>
            </div>
          </Section>
        ))}
      </Container>
    </>
  );
};

const attributesToRetrieve: Array<keyof PostPreview> = [
  "title",
  "tags",
  "slug",
  "summary"
];

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const client = new MeiliSearch({
    host: process.env.MEILISEARCH_URL,
    apiKey: process.env.MEILISEARCH_KEY
  });

  const index = await client.getIndex<IcyJoseph.Post>(
    process.env.MEILISEARCH_INDEX
  );

  const pages = await index.getDocuments({
    limit: 50,
    attributesToRetrieve
  });

  return { props: { pages } };
};

export default Blog;
