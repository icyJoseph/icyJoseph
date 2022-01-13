import axios from "axios";
import useSWR from "swr";

const fetcher = () =>
  axios.get<IcyJoseph.CodeWars>("/api/codewars").then(({ data }) => data);

export const useCodeWars = (fallbackData?: IcyJoseph.CodeWars) => {
  return useSWR<IcyJoseph.CodeWars>("code-wars", fetcher, {
    shouldRetryOnError: false,
    fallbackData: fallbackData,
    revalidateOnMount: true
  });
};
