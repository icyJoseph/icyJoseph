import useSWR from "swr";

import { client } from "utils/client";

const fetcher = () => client().get<IcyJoseph.CodeWars>("/api/codewars");

export const useCodeWars = (fallbackData?: IcyJoseph.CodeWars) => {
  return useSWR<IcyJoseph.CodeWars>("code-wars", fetcher, {
    shouldRetryOnError: false,
    fallbackData: fallbackData,
    revalidateOnMount: true,
  });
};
