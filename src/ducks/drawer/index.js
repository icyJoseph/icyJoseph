// Action types
export const OPEN = "open";
export const CLOSE = "close";
export const CHANGE_CONTENT = "change_content";

// Action creators
export const openDrawer = id => {
  return {
    type: OPEN,
    payload: id
  };
};

export const closeDrawer = () => {
  return {
    type: CLOSE
  };
};

export const changeContent = content => {
  return {
    type: CHANGE_CONTENT,
    payload: content
  };
};

// Reducer
export default function reducer(drawer = { open: false, id: 0 }, action) {
  switch (action.type) {
    case OPEN:
      return { open: true, id: action.payload };
    case CHANGE_CONTENT:
      return { ...drawer, id: action.payload };
    case CLOSE:
      return { ...drawer, open: false };
    default:
      return drawer;
  }
}
