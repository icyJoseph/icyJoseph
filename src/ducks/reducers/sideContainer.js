import { OPEN, CLOSE, CHANGE_CONTENT } from "../constants/sideContainer";

export default function sideContainer(
  sideContainer = { open: false, Content: null },
  action
) {
  switch (action.type) {
    case OPEN:
      return { open: true, Content: action.payload };
    case CHANGE_CONTENT:
      return { ...sideContainer, Content: action.payload };
    case CLOSE:
      return { ...sideContainer, open: false };
    default:
      return sideContainer;
  }
}
