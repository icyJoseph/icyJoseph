import type { GetStaticProps } from "next";
import { MeiliSearch } from "meilisearch";
import Link from "next/link";

import { BlogIntro } from "components/Blog/Intro";

import { Container } from "design-system/Container";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";
import { Search } from "components/Blog/Search";

type PostPreview = Pick<
  IcyJoseph.Post,
  "title" | "tags" | "slug" | "summary" | "publish_date"
>;

type BlogProps = {
  pages: PostPreview[];
};

/**
 * Search box for articles
 */

export const Blog = ({ pages }: BlogProps) => {
  const hasPages = pages.length > 0;
  return (
    <>
      <BlogIntro />

      <Container pt={1} mt={5}>
        <Text as="h2" mb={2} $fontSize="2.25rem" px={1}>
          Posts
        </Text>

        <Search>
          {hasPages ? (
            pages.map((page) => (
              <Link key={page.slug} href={`/blog/${page.slug}`}>
                <a>
                  <Section as="article" mb={2} px={1}>
                    <Text as="h3" $textColor="--yellow">
                      {page.title}
                    </Text>

                    <div>
                      <Text>{page.summary}</Text>
                    </div>
                  </Section>
                </a>
              </Link>
            ))
          ) : (
            <Section mb={2} px={1}>
              <Text>Nothing has been published yet.</Text>
            </Section>
          )}
        </Search>
      </Container>
    </>
  );
};

const attributesToRetrieve: Array<keyof PostPreview> = [
  "title",
  "tags",
  "slug",
  "summary",
  "publish_date"
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

    const { hits } = await index.search<IcyJoseph.Post>("", {
      limit: 50,
      attributesToRetrieve,
      sort: ["publish_date:desc"]
    });

    return { props: { pages: hits }, revalidate: 20 };
  } catch (e) {
    console.log("Error while building Blog landing page", e);

    return { props: { pages: [] }, revalidate: 20 };
  }
};

export default Blog;
