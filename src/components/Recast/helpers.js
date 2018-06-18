import { golden, orange, white } from "../../constants";

export const syntax = new RegExp(
  /(export\s)|(const\s)(\w+)(\s=)|(=>)|(===)|(=\s)|(\?)|(\+)|(\.\.\.)|(:)|(\.map)|(\.filter)|(\.reduce)|(\.concat)|(\.slice)/g
);

export const highlights = new RegExp(
  /(export\s)|(\s=)|(=>)|(===)|(=\s)|(\?)|(\+)|(\.\.\.)|(:)|(\.concat)|(\.slice)/g
);

export const keywords = new RegExp(/(const\s)|(\.map)|(\.filter)|(\.reduce)/g);

export function colorPicker(word) {
  if (keywords.test(word)) {
    return golden;
  } else if (highlights.test(word)) {
    return orange;
  }
  return white;
}

export const descriptions = {
  curry: {
    description: `The curry function takes a function and takes its first argument,
        returning a function that accepts the remaining arguments.`
  },
  pipe: {
    description: `The pipe function takes a list of one or more functions
        and returns a new function. The pipe call applies its arguments to the
        first function, and then continuously passes the result as argument to the next function`
  },
  mapf: {
    description: `The mapf function takes a function and a list. It returns a new array, where each
      element has been evaluated against the function.`
  },
  filterf: {
    description: `The filterf function takes a function and a list. It returns a new array, excluding
      the elements for which the evaluation against the function is falsy.`
  },
  flatten: {
    description: `The flatten function smooshes, or normalizes, a nested list.`
  },
  take: {
    description: `The take function accepts as arguments, the number of elements to take from a list,
      and the index where to start taking.`
  }
};

export const Title = `Functional JavaScript`;

export const description = `I believe functional programming is a solid paradigm to attack most problems.
  After sometime using ES6, I took a Haskell course, and decided to make my own Higher Order functions and
  other functional helpers to improve my development experience.`;
