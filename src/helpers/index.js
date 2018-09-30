export const shouldFetch = expiry => {
  if (!expiry) return true;
  const now = new Date();
  const lastSave = new Date(expiry);

  return now >= lastSave;
};

export function setUpMediaQuery(query) {
  const targetWindow = this.props.targetWindow || window;
  // get the matchMedia function
  this.mediaQueryList = targetWindow.matchMedia(query);
  // listen to updates
  this.mediaQueryList.addListener(this.updateMatches);
  // are we matching?
  return this.updateMatches();
}
