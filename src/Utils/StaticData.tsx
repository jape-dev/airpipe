import { ChannelType } from "../vizoApi";

export const getChannelTypeEnum = (channel: string) => {
  if (channel === "google") {
    return ChannelType.GOOGLE;
  } else if (channel === "facebook") {
    return ChannelType.FACEBOOK;
  } else if (channel === "google_analytics") {
    return ChannelType.GOOGLE_ANALYTICS;
  }
};
