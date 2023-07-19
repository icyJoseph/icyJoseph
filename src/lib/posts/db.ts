import { MeiliSearch } from "meilisearch";

export type PostPreview = Pick<
  IcyJoseph.Post,
  "title" | "tags" | "slug" | "summary" | "publish_date"
>;

const attributesToRetrieve: Array<keyof PostPreview> = [
  "title",
  "tags",
  "slug",
  "summary",
  "publish_date",
];

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_URL,
  apiKey: process.env.MEILISEARCH_KEY,
});

export const getAllPosts = async (): Promise<PostPreview[]> => {
  try {
    const index = await client.getIndex<IcyJoseph.Post>(
      process.env.MEILISEARCH_INDEX
    );

    const { hits } = await index.search<IcyJoseph.Post>("", {
      limit: 50,
      attributesToRetrieve,
      sort: ["publish_date:desc"],
    });

    return hits;
  } catch (e) {
    console.log("Error while building Blog landing page", e);

    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<IcyJoseph.Post> => {
  const index = await client.getIndex<IcyJoseph.Post>(
    process.env.MEILISEARCH_INDEX
  );

  const post = await index.getDocument(slug);

  return post;
};
