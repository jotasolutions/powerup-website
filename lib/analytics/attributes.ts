import type { AnalyticsEventName } from "./events";

type TrackAttrsOptions = {
  label?: string;
  location?: string;
  linkUrl?: string;
};

export function trackAttrs(
  event: AnalyticsEventName | string,
  options: TrackAttrsOptions = {}
) {
  return {
    "data-track-event": event,
    ...(options.label ? { "data-track-label": options.label } : {}),
    ...(options.location ? { "data-track-location": options.location } : {}),
    ...(options.linkUrl ? { "data-track-link-url": options.linkUrl } : {}),
  };
}
