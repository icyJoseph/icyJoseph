const BASE_API_PATH = "https://api.countapi.xyz";
const validPattern = /^[A-Za-z0-9_\-.]{3,64}$/;
const validRegex = new RegExp(validPattern);

function validName(name: string) {
  return validRegex.test(name) || name === ":HOST:" || name === ":PATHNAME:";
}

export const validatePath = function (namespace: unknown, key: unknown) {
  if (typeof namespace !== "string") {
    return Promise.reject("namespace must be a string");
  }
  if (typeof key !== "string") {
    return Promise.reject("key must be a string");
  }

  if (!validName(key)) {
    return Promise.reject(`Key must match ${validPattern}. Got '${namespace}'`);
  }
  if (!validName(namespace)) {
    return Promise.reject(
      `Namespace must match ${validPattern} or be empty. Got '${namespace}'`
    );
  }

  return Promise.resolve({
    path: `${namespace}/${key}`,
  });
};

export const validateTuple = async (
  namespace: unknown,
  key: unknown,
  value: unknown
) => {
  if (typeof namespace !== "string") {
    return Promise.reject("namespace must be a string");
  }
  if (typeof key !== "string") {
    return Promise.reject("key must be a string");
  }

  if (typeof value !== "number" || Number.isNaN(value)) {
    return Promise.reject("Value is NaN");
  }

  return validatePath(namespace, key).then((result) => {
    return { ...result, value };
  });
};

async function finalize(res: Response) {
  const valid_responses = [200, 400, 403, 404];

  if (!valid_responses.includes(res.status))
    return Promise.reject("Response from server: " + res.status);

  if (res.status === 200) {
    const json = (await res.json()) as unknown;

    return {
      status: res.status,
      json,
    };
  }

  return { status: res.status, json: null };
}

export const isRecord = (obj: unknown): obj is Record<string, unknown> => {
  const props = Object.getOwnPropertyNames(obj);

  return props.length > 0;
};

function queryParams(params: Record<string, string>) {
  return Object.keys(params || {})
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

export const get = async (
  namespace: string,
  key: string,
  signal?: AbortSignal
) => {
  const { path } = await validatePath(namespace, key);

  return fetch(`${BASE_API_PATH}/get/${path}`, { signal }).then(finalize);
};

export const set = async (
  namespace: string,
  key: string,
  val: unknown,
  signal?: AbortSignal
) => {
  const { path, value } = await validateTuple(namespace, key, val);

  return fetch(`${BASE_API_PATH}/set/${path}?value=${value}`, { signal }).then(
    finalize
  );
};

export const update = async (
  namespace: string,
  key: string,
  amount: string,
  signal?: AbortSignal
) => {
  const { path, value } = await validateTuple(namespace, key, amount);

  return fetch(`${BASE_API_PATH}/update/${path}?amount=${value}`, {
    signal,
  }).then(finalize);
};

export const hit = async (
  namespace: string,
  key: string,
  signal?: AbortSignal
) => {
  const { path } = await validatePath(namespace, key);

  return fetch(`${BASE_API_PATH}/hit/${path}`, { signal }).then(finalize);
};

export const info = async (
  namespace: string,
  key: string,
  signal?: AbortSignal
) => {
  const { path } = await validatePath(namespace, key);

  return fetch(`${BASE_API_PATH}/info/${path}`, { signal }).then(finalize);
};

export const create = async (
  options: Record<string, string>,
  signal?: AbortSignal
) => {
  const params = queryParams(options);

  return fetch(
    `${BASE_API_PATH}/create${params.length > 0 ? "?" + params : ""}`,
    { signal }
  ).then(finalize);
};

export const stats = async (signal?: AbortSignal) => {
  return fetch(`${BASE_API_PATH}/stats`, { signal }).then(finalize);
};

export const visits = (page: string, signal?: AbortSignal) => {
  return hit(":HOST:", page, signal);
};

export const event = (name: string, signal?: AbortSignal) => {
  return hit(":HOST:", name, signal);
};
