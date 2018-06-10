// Pipe
export const pipe = (...funcs) => (...args) =>
  funcs.reduce((val, func, i) => (i === 0 ? func(...val) : func(val)), args);

// curry
export const curry = f => a => (...b) => f(a, ...b);

// Take the first n elements of an array
export const take = n => array => array.slice(0, n);

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
