import axios from "axios";
import useSWR from "swr";

const fetcher = (query, variables) =>
  axios.post("/api/github", { query, variables }).then(({ data }) => data);

export const useGitHub = ({
  query,
  variables,
  initialData = null,
  selector = (a) => a
}) => {
  return useSWR(
    [query, JSON.stringify(variables)],
    (...args) => fetcher(...args).then(selector),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 60 * 60 * 1000,
      initialData
    }
  );
};
