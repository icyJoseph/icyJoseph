export function client(customConfig: Omit<RequestInit, "method"> = {}) {
  const commonConfig = customConfig;

  const executor = async <Result>(
    endpoint: string,
    method: "GET" | "POST"
  ): Promise<Result> => {
    const config = { ...commonConfig, method };

    const response = await window.fetch(endpoint, config);

    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject(response);
    }
  };

  return {
    get<Result>(endpoint: string) {
      return executor<Result>(endpoint, "GET");
    },

    post<Result>(endpoint: string) {
      return executor<Result>(endpoint, "POST");
    },
  };
}
