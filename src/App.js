import Root from "./routes";
import BSOD from "./containers/BSOD";

export function browserIE() {
  const userAgent = window.navigator.userAgent;
  return /MSIE|Trident/.test(userAgent);
}

export function run() {
  const userHasIE = browserIE();
  if (userHasIE) {
    return BSOD;
  }

  return Root;
}
