// Pipe
export const pipe = (...funcs) => (...args) =>
  funcs.reduce((val, func, i) => (i === 0 ? func(...val) : func(val)), args);

// curry
export const curry = f => a => (...b) => f(a, ...b);

// curry Right
export const curryRight = f => (...b) => a => f(a, ...b);

// Take the first n elements of an array, starting at m
export const take = (n, m = 0) => array => array.slice(m, n + m);

// Apply the same argument against many functions
export const mapValueToFunctions = (...funcs) => (...args) =>
  funcs.map(func => func(...args));

// Flatten
export const flatten = arr => [].concat(...arr);

// Sort descending
export const sort = (type, arr) => arr.sort((a, b) => b[type] - a[type]);

// Map
export const mapf = (func, arr) => arr.map(func);

// Filter
export const filterf = (func, arr) => arr.filter(func);

// Head
export const head = ([head]) => head;

// Last
export const last = arr => head(arr.slice(arr.length - 1));

// keys
export const keys = obj => Object.keys(obj);

// values
export const values = obj => Object.values(obj);

// get when the key is a file name with extesion => script.js
export const getByFileName = (obj, filename, fail = null) =>
  obj ? obj[filename] : fail;

// get
export const get = (obj, key, fail = null) => {
  const path = key.split(".");
  if (!obj) return fail;
  return path.reduce((acc, val) => {
    const next = acc ? acc[val] : obj[val];
    return next ? next : fail;
  }, null);
};

// purify
export const purify = arr => arr.filter(a => a);

// split
export const split = (string, pattern) => string.split(pattern);

// capitalizer
export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// length
export const len = (arr, fail = 0) => (arr ? arr.length : fail);

// unique
export const unique = arr =>
  arr.reduce(
    (prev, curr) => (prev.includes(curr) ? prev : prev.concat(curr)),
    []
  );
