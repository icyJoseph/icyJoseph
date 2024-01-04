export const take =
  (n: number, m = 0) =>
  <T>(array: Array<T>) =>
    array.slice(m, n + m);

export const head = <T>([head]: T[]) => head;

export const last = <T>(arr: T[]) => head(arr.slice(-1));

export const exists = <T>(val: T | undefined | null): val is T =>
  val === (val ?? !val);

export const purify = <T>(arr: (T | null | undefined)[]): T[] =>
  arr.filter(exists);

export const split = <T extends string | RegExp>(string: string, pattern: T) =>
  string.split(pattern);

export const capitalize = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
