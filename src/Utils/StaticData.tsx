import { ChannelType } from "../vizoApi";
import { DropDownOption } from "../Components/DropDown";

export const getChannelTypeEnum = (channel: string) => {
  if (channel === "google") {
    return ChannelType.GOOGLE;
  } else if (channel === "facebook") {
    return ChannelType.FACEBOOK;
  } else if (channel === "google_analytics") {
    return ChannelType.GOOGLE_ANALYTICS;
  } else if (channel === "youtube") {
    return ChannelType.YOUTUBE;
  } else if (channel === "instagram") {
    return ChannelType.INSTAGRAM;
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
  } else if (selectedOption.channel === ChannelType.YOUTUBE) {
    return "YouTube";
  } else if (selectedOption.channel === ChannelType.INSTAGRAM) {
    return "Instagram";
  } else {
    return "";
  }
};
