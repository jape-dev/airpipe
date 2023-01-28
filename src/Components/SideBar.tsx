import { DefaultService, AdAccount, FacebookQuery } from "../vizoApi";
import { useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SideBar = (props: {
  setResults: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}) => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>();
  const [selectedAdAccount, setSelectedAdAccount] = useState<string>("");
  const [metrics, setMetrics] = useState<string[]>();
  const [dimensions, setDimensions] = useState<string>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTimestamp, setStartTimestamp] = useState<number>(
    new Date().getTime() / 1000
  );
  const [endTimestamp, setEndTimestamp] = useState<number>(
    new Date().getTime() / 1000
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=3796703967222950&redirect_uri=https://aefe-2a01-4b00-c004-d500-41b7-6cd9-9c84-69b3.ngrok.io/facebook_login/&config_id=728465868571401&state=${token}`;
  };

  const handleAdAccountSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    } else {
      DefaultService.adAccountsAdAccountsGet(token)
        .then((response) => {
          setAdAccounts(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handeAdAccountSelect = (id: string) => {
    setSelectedAdAccount(id);
  };

  const handleSelectedMetrics = (
    event: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    const values = [...event].map((opt) => opt.value);
    setMetrics(values);
  };

  const handleSelectedDimensions = (
    event: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    // const values = [...event].map((opt) => opt.value);
    if (event === null) {
      return;
    } else {
      setDimensions(event.value);
    }
  };

  const handleStartDateClick = (date: Date | null) => {
    if (date === null) {
      return;
    } else {
      setStartDate(date);
      const timestamp = Math.floor(date.getTime() / 1000);
      setStartTimestamp(timestamp);
    }
  };

  const handleEndDateClick = (date: Date | null) => {
    if (date === null) {
      return;
    } else {
      setEndDate(date);
      const timestamp = Math.floor(date.getTime() / 1000);
      setEndTimestamp(timestamp);
    }
  };

  const handleQuerySubmit = () => {
    // Check if the state variables are undefined
    if (
      selectedAdAccount === "" ||
      metrics === undefined ||
      dimensions === undefined
    ) {
      alert("Please select an ad account, metrics and dimensions");
      return;
    } else {
      // Make a post request to the server
      const query: FacebookQuery = {
        account_id: selectedAdAccount,
        metrics: metrics,
        dimension: dimensions,
        start_date: startTimestamp,
        end_date: endTimestamp,
      };
      const token = localStorage.getItem("token");
      if (token === null) {
        alert("Please login to continue");
        return;
      } else {
        DefaultService.runFacebookQueryRunFacebookQueryPost(token, query)
          .then((response) => {
            console.log(response);
            props.setResults(response.results);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const metricOptions = [
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
    { value: "relevance_score", label: "Relevance Score" },
    { value: "social_clicks", label: "Social Clicks" },
    { value: "social_impressions", label: "Social Impressions" },
    { value: "social_reach", label: "Social Reach" },
    { value: "social_spend", label: "Social Spend" },
    { value: "spend", label: "Spend" },
    { value: "total_action_value", label: "Total Action Value" },
    { value: "total_actions", label: "Total Actions" },
    { value: "total_unique_actions", label: "Total Unique Actions" },
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
    { value: "unique_video_view_30_sec", label: "Unique Video View 30 Sec" },
    {
      value: "video_15_sec_watched_actions",
      label: "Video 15 Sec Watched Actions",
    },
    {
      value: "video_30_sec_watched_actions",
      label: "Video 30 Sec Watched Actions",
    },
    {
      value: "video_avg_pct_watched_actions",
      label: "Video Avg Pct Watched Actions",
    },
    {
      value: "video_avg_sec_watched_actions",
      label: "Video Avg Sec Watched Actions",
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

  const dimensionOptions = [
    { value: "account_id", label: "Account Id" },
    { value: "account_name", label: "Account Name" },
    { value: "adset_id", label: "Adset Id" },
    { value: "adset_name", label: "Adset Name" },
    { value: "campaign_id", label: "Campaign Id" },
    { value: "campaign_name", label: "Campaign Name" },
    { value: "ad_id", label: "Ad Id" },
    { value: "ad_name", label: "Ad Name" },
  ];

  return (
    <div className="w-full h-full relative p-8 border-2 bg-white border-white border-r-neutral-200">
      <form onSubmit={handleSubmit}>
        <button>Facebook</button>
      </form>
      <form onSubmit={handleAdAccountSubmit}>
        <button>Ad Accounts</button>
      </form>
      <div>
        {adAccounts
          ? adAccounts.map((adAccount) => {
              return (
                <button onClick={() => handeAdAccountSelect(adAccount.id)}>
                  {adAccount.name}
                </button>
              );
            })
          : null}
      </div>
      <div>
        {selectedAdAccount ? (
          <>
            <p>Metrics</p>
            <Select
              options={metricOptions}
              onChange={(event) => handleSelectedMetrics(event)}
              isMulti
            />
            <p>Dimensions</p>
            <Select
              options={dimensionOptions}
              onChange={(event) => handleSelectedDimensions(event)}
            />
            <p>Start Date</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleStartDateClick(date)}
            />
            <p>End Date</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleEndDateClick(date)}
            />
            <button onClick={handleQuerySubmit}>Run</button>
          </>
        ) : null}
      </div>
    </div>
  );
};
