import { head } from "functional";

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
export function onScrollThreshold(
  setter: (state: boolean) => void,
  threshold = 100
) {
  if (window.scrollY > threshold) {
    return setter(true);
  }
  return setter(false);
}

// from today at midnight till january 1st at midnight
export const yearStart = (year = new Date().getFullYear()) => {
  const from = new Date(`${year}-01-01`);
  from.setUTCHours(0, 0, 0, 0);

  return { from: from.toISOString() };
};

// a whole year span
export const yearEnd = (year: string) => {
  const to = new Date(`${year}-12-31`);
  to.setUTCHours(23, 59, 59, 999);
  const from = new Date(`${year}-01-01`);
  from.setUTCHours(0, 0, 0, 0);
  return { from: from.toISOString(), to: to.toISOString() };
};

export function createClamp(min: number, max: number) {
  return (val: number) => Math.min(Math.max(val, min), max);
}

export const clamp = (val: number, min: number, max: number) =>
  createClamp(min, max)(val);

export const isoStringWithoutMs = (iso: string) => head(iso.split("."));

export const trunc = (num: number) => {
  if (Math.trunc) return Math.trunc(num);
  return num < 0 ? Math.ceil(num) : Math.floor(num);
};
