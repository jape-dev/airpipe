import { useState } from "react";
import { DefaultService, User, AdAccount, FacebookQuery } from "../vizoApi";
import { RouterPath } from "../App";
import "react-datepicker/dist/react-datepicker.css";
import Select, { MultiValue } from "react-select";
import { metricOptions, dimensionOptions } from "../Data/Options";
import { ConnectorForm } from "./ConnectorForm";

const DOMAIN_URL =
  process.env.REACT_APP_DOMAIN_URL || "https://airpipe-api.onrender.com";

export const FacebookConnector = (props: {
  currentUser: User | undefined;
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
}) => {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>();
  const [selectedAdAccount, setSelectedAdAccount] = useState<string>("");
  const [metrics, setMetrics] = useState<string[]>();
  const [dimensions, setDimensions] = useState<string[]>();
  const [startTimestamp, setStartTimestamp] = useState<number>(
    new Date().getTime() / 1000
  );
  const [endTimestamp, setEndTimestamp] = useState<number>(
    new Date().getTime() / 1000
  );

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=3796703967222950&redirect_uri=${DOMAIN_URL}/connector/facebook/login/&config_id=728465868571401&state=${token}`;
  };

  const handleAdAccountSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    } else {
      DefaultService.adAccountsConnectorFacebookAdAccountsGet(token)
        .then((response) => {
          setAdAccounts(response);
        })
        .catch((error) => {
          if (error.status === 401) {
            window.location.href = RouterPath.LOGIN;
          } else {
            console.log(error);
          }
        });
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
        dimensions: dimensions,
        start_date: startTimestamp,
        end_date: endTimestamp,
      };
      const token = localStorage.getItem("token");
      if (token === null) {
        alert("Please login to continue");
        return;
      } else {
        DefaultService.runQueryConnectorFacebookRunQueryPost(token, query)
          .then((response) => {
            console.log(response.results);
            let newResults = response.results;
            props.setResults((results) => [...results, newResults]);
          })
          .catch((error) => {
            if (error.status === 401) {
              window.location.href = RouterPath.LOGIN;
            } else {
              console.log(error);
            }
          });
      }
    }
  };

  return (
    <ConnectorForm
      accessToken={props.currentUser?.facebook_access_token}
      setResults={props.setResults}
      handleAdAccountSubmit={handleAdAccountSubmit}
      handleSubmit={handleSubmit}
      handleQuerySubmit={handleQuerySubmit}
      setMetrics={setMetrics}
      setDimensions={setDimensions}
      setStartTimestamp={setStartTimestamp}
      setEndTimestamp={setEndTimestamp}
      iconPath="facebook-icon"
      adAccounts={adAccounts}
      name="Facebook"
      selectedAdAccount={selectedAdAccount}
      setSelectedAdAccount={setSelectedAdAccount}
      metricOptions={metricOptions}
      dimensionOptions={dimensionOptions}
    />
  );
};
