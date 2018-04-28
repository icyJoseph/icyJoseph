export const INC = "increment";

export default function counter(counter = 0, action) {
  switch (action.type) {
    case INC:
      return counter + 1;
    default:
      return counter;
  }
}
