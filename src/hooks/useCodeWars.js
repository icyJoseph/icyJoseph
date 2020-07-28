import axios from "axios";
import useSWR from "swr";

const fetcher = () => axios.get("/api/codewars").then(({ data }) => data);

export const useCodeWars = () => {
  const { data, loading, error } = useSWR("code-wars", fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  });

  return { data, loading, error };
};
