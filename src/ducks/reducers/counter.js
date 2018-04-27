export const INC = "increment";

export default function counter(state = { counter: 0 }, action) {
  switch (action.type) {
    case INC:
      return Object.assign({}, state, { counter: state.counter + 1 });
    default:
      return state;
  }
}
