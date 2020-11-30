import axios from "axios";
import useSWR from "swr";

type UseGitHubProps<Variables, Data, Response> = {
  query: string;
  variables: Variables;
  initialData?: Data | null;
  selector?: ((res: Response) => Data) | Identity;
};

type Identity = <T>(res: T) => T;
const mirror: Identity = <T>(res: T) => res;

const fetcher = <Variables>(query: string, variables: Variables) =>
  axios.post("/api/github", { query, variables }).then(({ data }) => data);

export const useGitHub = <V, D, R>({
  query,
  variables,
  initialData = null,
  selector = mirror
}: UseGitHubProps<V, D, R>) => {
  return useSWR(
    [query, JSON.stringify(variables)],
    (...args: [query: string, variables: V]) =>
      fetcher<V>(...args).then(selector),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      dedupingInterval: 60 * 60 * 1000,
      initialData
    }
  );
};
