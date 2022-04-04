interface Gtag {
  (event: string, action: string, payload: Record<string, string>): void;
  pageview: (url: string) => void;
}
declare global {
  interface Window {
    gtag: Gtag;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
