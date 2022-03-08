import type { GetStaticProps } from "next";
import { MeiliSearch } from "meilisearch";

import { BlogIntro } from "components/Blog/Intro";

import { Container } from "design-system/Container";
import { Section } from "design-system/Section";
import { Text } from "design-system/Text";
import { Search } from "components/Blog/Search";
import { PostLink, type PostPreview } from "components/Blog/PostLink";

type BlogProps = {
  posts: PostPreview[];
};

export const Blog = ({ posts }: BlogProps) => {
  const hasPosts = posts.length > 0;
  return (
    <>
      <BlogIntro />

      <Container pt={1} mt={5}>
        <Text as="h2" mb={2} $fontSize="2.25rem" px={1}>
          Posts
        </Text>

        <Search>
          {hasPosts ? (
            posts.map((post) => <PostLink key={post.slug} post={post} />)
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

    return { props: { posts: hits }, revalidate: 20 };
  } catch (e) {
    console.log("Error while building Blog landing page", e);

    return { props: { posts: [] }, revalidate: 20 };
  }
};

export default Blog;
