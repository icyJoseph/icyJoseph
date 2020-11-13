import axios from "axios";
import useSWR from "swr";

const fetcher = () =>
  axios.get<IcyJoseph.CodeWars>("/api/codewars").then(({ data }) => data);

export const useCodeWars = (initialData?: IcyJoseph.CodeWars) => {
  return useSWR<IcyJoseph.CodeWars>("code-wars", fetcher, {
    shouldRetryOnError: false,
    initialData,
    revalidateOnMount: true
  });
};
