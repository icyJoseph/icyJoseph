import type { NextApiRequest, NextApiResponse } from "next";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_URL,
  apiKey: process.env.MEILISEARCH_KEY
});

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const index = await client.getIndex<IcyJoseph.Post>(
    process.env.MEILISEARCH_INDEX
  );

  const query = encodeURIComponent(`${req.query.q || ""}`);

  const { tags } = req.query;

  const tagFilter = [tags || ""]
    .flatMap((n) => n)
    .flatMap((n) => n.split(","))
    .map((tag) => `tags = '${tag}'`)
    .join(" OR ");

  const results = await index.search<IcyJoseph.Post>(query, {
    sort: ["publish_date:desc"],
    filter: tags && tagFilter,
    attributesToRetrieve: ["title", "tags", "slug", "summary", "publish_date"],
    attributesToCrop: ["content"],
    cropLength: 10
  });

  return res.json(results);
};

export default search;
