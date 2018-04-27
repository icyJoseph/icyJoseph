export function saveState(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

export const getStateAndSave = store => {
  const state = store.getState();
  saveState(state);
};

export default function() {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(getStateAndSave);
    return store;
  };
}
