export const metricOptions = [
  { value: "clicks", label: "Clicks" },
  { value: "conversions", label: "Conversions" },
  { value: "cost_per_conversion", label: "Cost Per Conversion" },
  {
    value: "cost_per_inline_link_click",
    label: "Cost Per Inline Link Click",
  },
  {
    value: "cost_per_inline_post_engagement",
    label: "Cost Per Inline Post Engagement",
  },
  { value: "cost_per_outbound_click", label: "Cost Per Outbound Click" },
  { value: "cost_per_thruplay", label: "Cost Per Thruplay" },
  {
    value: "cost_per_unique_action_type",
    label: "Cost Per Unique Action Type",
  },
  { value: "cost_per_unique_click", label: "Cost Per Unique Click" },
  {
    value: "cost_per_unique_inline_link_click",
    label: "Cost Per Unique Inline Link Click",
  },
  {
    value: "cost_per_unique_outbound_click",
    label: "Cost Per Unique Outbound Click",
  },
  { value: "cpc", label: "CPC" },
  { value: "cpm", label: "CPM" },
  { value: "cpp", label: "CPP" },
  { value: "ctr", label: "CTR" },
  { value: "frequency", label: "Frequency" },
  { value: "impressions", label: "Impressions" },
  { value: "inline_link_click_ctr", label: "Inline Link Click CTR" },
  { value: "inline_link_clicks", label: "Inline Link Clicks" },
  { value: "inline_post_engagement", label: "Inline Post Engagement" },
  { value: "outbound_clicks", label: "Outbound Clicks" },
  { value: "outbound_clicks_ctr", label: "Outbound Clicks CTR" },
  { value: "reach", label: "Reach" },
  { value: "spend", label: "Spend" },
  { value: "unique_actions", label: "Unique Actions" },
  { value: "unique_clicks", label: "Unique Clicks" },
  { value: "unique_ctr", label: "Unique CTR" },
  {
    value: "unique_inline_link_click_ctr",
    label: "Unique Inline Link Click CTR",
  },
  {
    value: "unique_inline_link_clicks",
    label: "Unique Inline Link Clicks",
  },
  { value: "unique_link_clicks_ctr", label: "Unique Link Clicks CTR" },
  { value: "unique_outbound_clicks", label: "Unique Outbound Clicks" },
  {
    value: "unique_outbound_clicks_ctr",
    label: "Unique Outbound Clicks CTR",
  },
  {
    value: "unique_video_continuous_2_sec_watched_actions",
    label: "Unique Video Continuous 2 Sec Watched Actions",
  },
  { value: "unique_video_view_15_sec", label: "Unique Video View 15 Sec" },
  {
    value: "video_15_sec_watched_actions",
    label: "Video 15 Sec Watched Actions",
  },
  {
    value: "video_30_sec_watched_actions",
    label: "Video 30 Sec Watched Actions",
  },
  {
    value: "video_continuous_2_sec_watched_actions",
    label: "Video Continuous 2 Sec Watched Actions",
  },
  {
    value: "video_p100_watched_actions",
    label: "Video P100 Watched Actions",
  },
  {
    value: "video_p25_watched_actions",
    label: "Video P25 Watched Actions",
  },
  {
    value: "video_p50_watched_actions",
    label: "Video P50 Watched Actions",
  },
  {
    value: "video_p75_watched_actions",
    label: "Video P75 Watched Actions",
  },
  {
    value: "video_p95_watched_actions",
    label: "Video P95 Watched Actions",
  },
  { value: "video_play_actions", label: "Video Play Actions" },
  {
    value: "video_play_retention_0_to_15s_actions",
    label: "Video Play Retention 0 To 15s Actions",
  },
  {
    value: "video_play_retention_20_to_60s_actions",
    label: "Video Play Retention 20 To 60s Actions",
  },
  {
    value: "video_play_retention_graph_actions",
    label: "Video Play Retention Graph Actions",
  },
  {
    value: "video_thruplay_watched_actions",
    label: "Video Thruplay Watched Actions",
  },
  {
    value: "video_time_watched_actions",
    label: "Video Time Watched Actions",
  },
  { value: "website_ctr", label: "Website CTR" },
  { value: "website_purchase_roas", label: "Website Purchase ROAS" },
];

export const dimensionOptions = [
  { value: "account_id", label: "Account Id" },
  { value: "account_name", label: "Account Name" },
  { value: "adset_id", label: "Adset Id" },
  { value: "adset_name", label: "Adset Name" },
  { value: "campaign_id", label: "Campaign Id" },
  { value: "campaign_name", label: "Campaign Name" },
  { value: "ad_id", label: "Ad Id" },
  { value: "ad_name", label: "Ad Name" },
  { value: "date", label: "Date" },
];

export const googleMetricOptions = [
  {
    value: "metrics.absolute_top_impression_percentage",
    label: "Absolute Top Impressions Percentage",
  },
  { value: "metrics.active_view_cpm", label: "Active View CPM" },
  { value: "metrics.active_view_ctr", label: "Active View CTR" },
  {
    value: "metrics.active_view_impressions",
    label: "Active View Impressions",
  },
  {
    value: "metrics.active_view_measurability",
    label: "Active View Measurability",
  },
  {
    value: "metrics.active_view_measurable_cost_micros",
    label: "Active View Measurable Cost Micros",
  },
  {
    value: "metrics.active_view_measurable_impressions",
    label: "Active View Measurable Impressions",
  },
  {
    value: "metrics.active_view_viewability",
    label: "Active View Viewability",
  },
  { value: "metrics.all_conversions", label: "All Conversions" },
  {
    value: "metrics.all_conversions_by_conversion_date",
    label: "All Conversions By Conversion Date",
  },
  {
    value: "metrics.all_conversions_from_interactions_rate",
    label: "All Conversions From Interactions Rate",
  },
  {
    value: "metrics.all_conversions_from_interactions_value_per_interaction",
    label: "All Conversions From Interactions Value Per Interaction",
  },
  {
    value: "metrics.metrics.all_conversions_value",
    label: "All Conversions Value",
  },
  {
    value: "metrics.all_conversions_value_by_conversion_date",
    label: "All Conversions Value By Conversion Date",
  },
  {
    value: "metrics.all_conversions_value_per_cost",
    label: "All Conversions Value Per Cost",
  },
  { value: "metrics.average_cost", label: "Average Cost" },
  { value: "metrics.average_cpc", label: "Average CPC" },
  { value: "metrics.average_cpe", label: "Average CPE" },
  { value: "metrics.average_cpm", label: "Average CPM" },
  { value: "metrics.average_cpv", label: "Average CPV" },
  { value: "metrics.average_page_views", label: "Average Page Views" },
  { value: "metrics.average_time_on_site", label: "Average Time On Site" },
  { value: "metrics.bounce_rate", label: "Bounce Rate" },
  { value: "metrics.clicks", label: "Clicks" },
  { value: "metrics.conversions", label: "Conversions" },
  {
    value: "metrics.conversions_by_conversion_date",
    label: "Conversions By Conversion Date",
  },
  {
    value: "metrics.conversions_from_interactions_rate",
    label: "Conversions From Interactions Rate",
  },
  {
    value: "metrics.conversions_from_interactions_value_per_interaction",
    label: "Conversions From Interactions Value Per Interaction",
  },
  { value: "metrics.conversions_value", label: "Conversions Value" },
  {
    value: "metrics.conversions_value_by_conversion_date",
    label: "Conversions Value By Conversion Date",
  },
  {
    value: "metrics.conversions_value_per_cost",
    label: "Conversions Value Per Cost",
  },
  { value: "metrics.cost_micros", label: "Cost Micros" },
  {
    value: "metrics.cost_per_all_conversions",
    label: "Cost Per All Conversions",
  },
  { value: "metrics.cost_per_conversion", label: "Cost Per Conversion" },
  {
    value: "metrics.cost_per_current_model_attributed_conversion",
    label: "Cost Per Current Model Attributed Conversion",
  },
  {
    value: "metrics.cross_device_conversions",
    label: "Cross Device Conversions",
  },
  { value: "metrics.ctr", label: "CTR" },
  {
    value: "metrics.current_model_attributed_conversions",
    label: "Current Model Attributed Conversions",
  },
  {
    value:
      "metrics.current_model_attributed_conversions_from_interactions_rate",
    label: "Current Model Attributed Conversions From Interactions Rate",
  },
  {
    value:
      "metrics.current_model_attributed_conversions_from_interactions_value_per_interaction",
    label:
      "Current Model Attributed Conversions From Interactions Value Per Interaction",
  },
  {
    value: "metrics.current_model_attributed_conversions_value",
    label: "Current Model Attributed Conversions Value",
  },
  {
    value: "metrics.current_model_attributed_conversions_value_per_cost",
    label: "Current Model Attributed Conversions Value Per Cost",
  },
  { value: "metrics.engagement_rate", label: "Engagement Rate" },
  { value: "metrics.engagements", label: "Engagements" },
  { value: "metrics.gmail_forwards", label: "Gmail Forwards" },
  { value: "metrics.gmail_saves", label: "Gmail Saves" },
  { value: "metrics.gmail_secondary_clicks", label: "Gmail Secondary Clicks" },
  { value: "metrics.impressions", label: "Impressions" },
  {
    value: "metrics.interaction_event_types",
    label: "Interaction Event Types",
  },
  { value: "metrics.interaction_rate", label: "Interaction Rate" },
  { value: "metrics.interactions", label: "Interactions" },
  { value: "metrics.percent_new_visitors", label: "Percent New Visitors" },
  { value: "metrics.phone_calls", label: "Phone Calls" },
  { value: "metrics.phone_impressions", label: "Phone Impressions" },
  { value: "metrics.phone_through_rate", label: "Phone Through Rate" },
  {
    value: "metrics.top_impression_percentage",
    label: "Top Impressions Percentage",
  },
  {
    value: "metrics.value_per_all_conversions",
    label: "Value Per All Conversions",
  },
  {
    value: "metrics.value_per_all_conversions_by_conversion_date",
    label: "Value Per Conversion By Date",
  },
  { value: "metrics.value_per_conversion", label: "Value Per Conversion" },
  {
    value: "metrics.value_per_current_model_attributed_conversion",
    label: "Value Per Current Model Attributed Conversion",
  },
  {
    value: "metrics.video_quartile_100_rate",
    label: "Video Quartile 100 Rate",
  },
  { value: "metrics.video_quartile_25_rate", label: "Video Quartile 25 Rate" },
  { value: "metrics.video_quartile_50_rate", label: "Video Quartile 50 Rate" },
  { value: "metrics.video_quartile_75_rate", label: "Video Quartile 75 Rate" },
  { value: "metrics.video_view_rate", label: "Video View Rate" },
  { value: "metrics.video_views", label: "Video Views" },
  {
    value: "metrics.view_through_conversions",
    label: "View Through Conversions",
  },
];

export const googleDimensionOptions = [
  { value: "segments.date", label: "Date" },
  { value: "ad_group.name", label: "Ad Group Name" },
  { value: "ad_group.id", label: "Ad Group Id" },
  { value: "campaign.id", label: "Campaign Id" },
  { value: "campaign.name", label: "Campaign Name" },
];
