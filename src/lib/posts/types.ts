export type Post = {
  // Unchangeable publication date
  publish_date: number;
  // Last time post was edited
  update_date?: number | null;
  // Post title as seen by the reader
  title: string;
  // Post human readable resource name
  slug: string;
  // To be used when previewing the post
  summary: string;
  // Post content
  content: string | null;
  // Optional image to use for previews
  image?: string | null;
  // What subjects is the post about
  tags: Array<string>;
  // Who wrote the post
  authors: Array<string>;
};

export type PostPreview = Pick<
  Post,
  "title" | "tags" | "slug" | "summary" | "publish_date"
>;
