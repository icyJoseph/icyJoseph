import axios from "axios";
import useSWR from "swr";

const fetcher = () => axios.get("/api/codewars").then(({ data }) => data);

export const useCodeWars = (initialData = null) => {
  return useSWR("code-wars", fetcher, {
    shouldRetryOnError: false,
    initialData
  });
};

export const RenderWithCodeWars = ({ initial, children }) => {
  return children(useCodeWars(initial));
};
