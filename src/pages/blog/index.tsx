import type { GetStaticProps } from "next";
import { MeiliSearch } from "meilisearch";
import Link from "next/link";

import { BlogIntro } from "components/Blog/Intro";

import { Container } from "design-system/Container";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";

type PostPreview = Pick<IcyJoseph.Post, "title" | "tags" | "slug" | "summary">;

type BlogProps = {
  pages: PostPreview[];
};

export const Blog = ({ pages }: BlogProps) => {
  return (
    <>
      <BlogIntro />

      <Container pt={1} mt={5}>
        <Text as="h2" mb={2} $fontSize="2.25rem" px={1}>
          Posts
        </Text>

        {pages.length > 0 ? (
          pages.map((page) => (
            <Section as="article" key={page.slug} mb={2} px={1}>
              <Link href={`/blog/${page.slug}`}>
                <a>
                  <Text as="h3" $textColor="--yellow">
                    {page.title}
                  </Text>
                </a>
              </Link>

              <div>
                <Text>{page.summary}</Text>
              </div>
            </Section>
          ))
        ) : (
          <Section mb={2} px={1}>
            <Text>Nothing has been published yet.</Text>
          </Section>
        )}
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
  try {
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

    return { props: { pages }, revalidate: 1 };
  } catch (e) {
    return { props: { pages: [] }, revalidate: 1 };
  }
};

export default Blog;
