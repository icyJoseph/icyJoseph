import axios from "axios";
import useSWR from "swr";

type UseGitHubProps<Variables, Data, Response> = {
  query: string;
  variables: Variables;
  fallbackData?: Data | null;
  selector?: (res: Response) => Data;
};

type Identity = <T, D>(res: T) => T extends D ? D : never;
const mirror: Identity = <T, D>(res: T) => res as unknown as D;

const fetcher = <Variables, Response>(query: string, variables: Variables) =>
  axios
    .post<Response>("/api/github", { query, variables })
    .then(({ data }) => data);

export const useGitHub = <Variables, Data, Response = Data>({
  query,
  variables,
  fallbackData = null,
  selector = mirror
}: UseGitHubProps<Variables, Data, Response>) => {
  return useSWR<Data | null>(
    [query, JSON.stringify(variables)],
    (...args: [query: string, variables: Variables]): Promise<Data> =>
      fetcher<Variables, Response>(...args).then((response) =>
        selector(response)
      ),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      fallbackData
    }
  );
};
