import { estimateReadingTime } from "lib/reading-stats/estimate";

export const ReadingTime = async ({ content }: { content: string }) => {
  const { minutes } = await estimateReadingTime(content);

  return <span className="inline-block">~{minutes} min</span>;
};
