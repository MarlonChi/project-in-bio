import Mixpanel from "mixpanel";

const mixpanelEvent = Mixpanel.init("3c337dd0b8b671df33179c03e35caea2");

export function trackServerEvent(eventName: string, properties: any) {
  if (process.env.NODE_ENV === "development") return;
  mixpanelEvent.track(eventName, properties);
}
