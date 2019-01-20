// figure out if expiry date is past
export const shouldFetch = expiry => {
  if (!expiry) return true;
  const now = new Date();
  const lastSave = new Date(expiry);

  return now >= lastSave;
};

// softly scroll to top
export const softTopScroll = () => {
  const { documentElement, body } = document;
  const distance = documentElement.scrollTop || body.scrollTop;
  const step = 8;
  if (distance > 0) {
    window.requestAnimationFrame(softTopScroll);
    window.scrollTo(0, distance - distance / step);
  }
  return null;
};

// toggles the key on threshold pass
export function onScrollThreshold(key, { threshold = 100 }) {
  const { [key]: stateKey } = this.state;
  if (window.scrollY > threshold) {
    return !stateKey && this.setState({ [key]: true });
  }
  return stateKey && this.setState({ [key]: false });
}
