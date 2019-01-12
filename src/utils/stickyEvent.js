export function fireEvent(stuck, target) {
  const evt = new CustomEvent("sticky-change", { detail: { stuck, target } });
  document.dispatchEvent(evt);
}

export function addSentinels(container, className) {
  return Array.from(container.querySelectorAll("#sticky-blog")).map(el => {
    const sentinel = document.createElement("div");
    sentinel.classList.add("sticky_sentinel", className);
    return el.appendChild(sentinel);
  });
}

export function observeHeader(container) {
  const observer = new IntersectionObserver(
    (records, observer) => {
      for (const record of records) {
        const targetInfo = record.boundingClientRect;
        const stickyTarget = record.target.parentElement.querySelector(
          "#sticky-blog"
        );

        const rootBoundsInfo = record.rootBounds;
        const ratio = record.intersectionRatio;

        // Started sticking.
        if (targetInfo.bottom > rootBoundsInfo.top && ratio === 1) {
          fireEvent(true, stickyTarget);
        }

        // Stopped sticking.
        if (
          targetInfo.top < rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom
        ) {
          fireEvent(false, stickyTarget);
        }
      }
    },
    { threshold: [1], root: container }
  );

  // Add the bottom sentinels to each section and attach an observer.
  const sentinels = addSentinels(container, "sticky_sentinel--top");
  sentinels.forEach(el => observer.observe(el));
}
