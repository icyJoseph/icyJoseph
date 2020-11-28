// Pipe
export const pipe = (...funcs: any[]) => (...args: any[]) =>
  funcs.reduce((val, func, i) => (i === 0 ? func(...val) : func(val)), args);

export const curry = <A, B extends [], C>(f: (a: A, ...b: B) => C) => (
  a: A
) => (...b: B) => f(a, ...b);

export const curryRight = <A, B extends [], C>(f: (a: A, ...b: B) => C) => (
  ...b: B
) => (a: A) => f(a, ...b);

export const take = (n: number, m = 0) => <T extends [] = []>(array: T) =>
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
