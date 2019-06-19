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
export function onScrollThreshold(setter, threshold = 100) {
  if (window.scrollY > threshold) {
    return setter(true);
  }
  return setter(false);
}

export const imageSrc = (w = 120) => `https://miro.medium.com/fit/c/${w}/${w}`;
