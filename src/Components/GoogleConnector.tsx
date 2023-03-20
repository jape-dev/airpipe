import { CustomModal } from "./CustomModal";
import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import {
  DefaultService,
  User,
  AdAccount,
  GoogleQuery,
  CurrentResults,
} from "../vizoApi";
import "react-datepicker/dist/react-datepicker.css";
import { googleMetricOptions, googleDimensionOptions } from "../Data/Options";
import { ConnectorForm } from "./ConnectorForm";

export const GoogleConnector = (props: {
  currentUser: User | undefined;
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
}) => {
  const [modal, setModal] = useState(false);
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

  const openSignInModal = () => {
    setModal(true);
  };

  const handleAdAccountSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    } else {
      DefaultService.adAccountsConnectorGoogleAdAccountsGet(token)
        .then((response: any) => {
          setAdAccounts(response);
        })
        .catch((error: any) => {
          if (error.status === 401) {
            alert("Google access token expired. Please connect again");
            window.location.reload();
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
      const query: GoogleQuery = {
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
        // Change this to append to results instead of setting directly
        DefaultService.runQueryConnectorGoogleRunQueryPost(token, query)
          .then((response) => {
            let newResults = response.results;
            props.setResults((results) => [{ ...results, newResults }]);
          })
          .catch((error) => {
            if (error.status === 401) {
              alert("Google access token expired. Please connect again");
              window.location.reload();
            } else {
              console.log(error);
            }
          });
      }
    }
  };

  return (
    <>
      <ConnectorForm
        accessToken={props.currentUser?.google_access_token}
        setResults={props.setResults}
        handleAdAccountSubmit={handleAdAccountSubmit}
        handleSubmit={openSignInModal}
        handleQuerySubmit={handleQuerySubmit}
        setMetrics={setMetrics}
        setDimensions={setDimensions}
        setStartTimestamp={setStartTimestamp}
        setEndTimestamp={setEndTimestamp}
        iconPath="google-ads-icon"
        adAccounts={adAccounts}
        name="Google"
        selectedAdAccount={selectedAdAccount}
        setSelectedAdAccount={setSelectedAdAccount}
        metricOptions={googleMetricOptions}
        dimensionOptions={googleDimensionOptions}
      />
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <GoogleSignIn />
        </>
      </CustomModal>
    </>
  );
};
