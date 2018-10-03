import "./index.css";
import Routes from "./routes";
import BSOD from "./containers/BSOD";

export function browserIE() {
  const userAgent = window.navigator.userAgent;
  return /MSIE|Trident/.test(userAgent);
}

export function browserRender() {
  const userHasIE = browserIE();
  if (userHasIE) {
    return BSOD;
  }

  return Routes;
}
