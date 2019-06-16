export function saveState(state) {
  localStorage.setItem("icyJoseph", JSON.stringify(state));
}

export const getStateAndSave = store => () => {
  const state = store.getState();
  saveState(state);
};

// TODO: move to middleware
export const userTiming = () => next => action => {
  if (performance.mark === undefined) return next(action);
  performance.mark(`${action.type}_start`);
  const result = next(action);
  performance.mark(`${action.type}_end`);
  performance.measure(
    `${action.type}`,
    `${action.type}_start`,
    `${action.type}_end`
  );
  return result;
};

export default function() {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(getStateAndSave(store));
    return store;
  };
}
