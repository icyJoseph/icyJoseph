import Root from "./routes";
import BSOD from "./containers/BSOD";

// check if the userAgent is IE
export function browserIE() {
  const userAgent = window.navigator.userAgent;
  return /MSIE|Trident/.test(userAgent);
}

// run the app
export function run() {
  const userHasIE = browserIE();
  if (userHasIE) {
    return BSOD;
  }

  return Root;
}

export default run;
