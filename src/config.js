import App from "./routes";
import BSOD from "./containers/BSOD";

export function browserIE() {
  const userAgent = window.navigator.userAgent;
  return /MSIE|Trident/.test(userAgent);
}

export function renderRoutes() {
  const userHasIE = browserIE();
  if (userHasIE) {
    return BSOD;
  }

  return App;
}
