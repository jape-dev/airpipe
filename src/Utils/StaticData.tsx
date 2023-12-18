import { ChannelType } from "../vizoApi";
import { DropDownOption } from "../Components/DropDown";

export const getChannelTypeEnum = (channel: string) => {
  if (channel === "google") {
    return ChannelType.GOOGLE;
  } else if (channel === "facebook") {
    return ChannelType.FACEBOOK;
  } else if (channel === "google_analytics") {
    return ChannelType.GOOGLE_ANALYTICS;
  } else {
    return ChannelType.AIRPIPE;
  }
};

export const getChannelNameFromEnum = (selectedOption: DropDownOption) => {
  if (selectedOption.channel === ChannelType.GOOGLE) {
    return "Google Ads";
  } else if (selectedOption.channel === ChannelType.FACEBOOK) {
    return "Facebook Ads";
  } else if (selectedOption.channel === ChannelType.GOOGLE_ANALYTICS) {
    return "Google Analytics";
  } else {
    return "";
  }
};
