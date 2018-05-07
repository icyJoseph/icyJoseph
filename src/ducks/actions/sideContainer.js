import { OPEN, CLOSE, CHANGE_CONTENT } from "../constants/sideContainer";

export const openSideContent = content => {
  return {
    type: OPEN,
    payload: content
  };
};

export const closeSideContent = () => {
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
