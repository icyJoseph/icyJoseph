// Pipe
export const pipe = (...funcs) => (...args) =>
  funcs.reduce((val, func, i) => (i === 0 ? func(...val) : func(val)), args);

// curry
export const curry = (f) => (a) => (...b) => f(a, ...b);

// curry Right
export const curryRight = (f) => (...b) => (a) => f(a, ...b);

// Take the first n elements of an array, starting at m
export const take = (n, m = 0) => (array) => array.slice(m, n + m);

export const head = ([head]) => head;

export const last = (arr) => head(arr.slice(-1));

export const get = (obj, key, fail = null) => {
  if (!obj) return fail;
  const dotted = obj[key];
  if (dotted) {
    return dotted;
  }
  const path = key.split(".");
  return path.reduce((acc, val) => {
    const next = acc ? acc[val] : obj[val];
    return next ? next : fail;
  }, null);
};

export const purify = (arr) => arr.filter((a) => a);

export const split = (string, pattern) => string.split(pattern);

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const exists = (val) => val === (val ?? !val);
