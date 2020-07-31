import axios from "axios";
import useSWR from "swr";

const fetcher = () => axios.get("/api/codewars").then(({ data }) => data);

export const useCodeWars = (initialData = null) => {
  const { data, loading, error } = useSWR("code-wars", fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    initialData
  });

  return { data, loading, error };
};

export const RenderWithCodeWars = ({ initial, children }) => {
  return children(useCodeWars(initial));
};
