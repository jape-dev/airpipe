import { CustomModal } from "./CustomModal";
import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import { DefaultService, User, AdAccount, Query } from "../vizoApi";
import { RouterPath } from "../App";
import { ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { MultiValue } from "react-select";
import { metricOptions, dimensionOptions } from "../Data/Options";

export const GoogleConnector = (props: { currentUser: User | undefined }) => {
  const [modal, setModal] = useState(false);
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>();
  const [selectedAdAccount, setSelectedAdAccount] = useState<string>("");
  const [metrics, setMetrics] = useState<string[]>();
  const [dimensions, setDimensions] = useState<string[]>();
  const [startDate, setStartDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    )
  );
  const [endDate, setEndDate] = useState<Date>(new Date()); // change this to the current date minus one month
  const [startTimestamp, setStartTimestamp] = useState<number>(
    new Date().getTime() / 1000
  );
  const [endTimestamp, setEndTimestamp] = useState<number>(
    new Date().getTime() / 1000
  );

  const openSignInModal = () => {
    setModal(true);
  };

  const handeAdAccountSelect = (id: string) => {
    setSelectedAdAccount(id);
  };

  const handleAdAccountSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("googleToken");
    if (token === null) {
      return;
    } else {
      DefaultService.adAccountsConnectorGoogleAdAccountsGet(token)
        .then((response: any) => {
          setAdAccounts(response);
        })
        .catch((error: any) => {
          if (error.status === 401) {
            window.location.href = RouterPath.LOGIN;
          } else {
            console.log(error);
          }
        });
    }
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
    event: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    const values = [...event].map((opt) => opt.value);
    setDimensions(values);
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

  const customThemeFn = (theme: any) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 30,
      baseUnit: 1,
    },
  });

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
      const query: Query = {
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
            props.setResults(response.results);
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
    <>
      <div className="flex items-center">
        <img
          src={require("../Static/images/facebook-icon.png")}
          className="h-5 w-5 mr-2"
        />
        <p className="mr-2">Google Ads | </p>
        {props.currentUser?.google_access_token ? (
          <form onSubmit={handleAdAccountSubmit} className="flex items-center">
            <p>Select Ad Account</p>
            <button>
              <ChevronDownIcon className="h-4 w-4 fill-gray-500" />
            </button>
          </form>
        ) : (
          <>
            <button onClick={openSignInModal}>
              Connect
              <ArrowRightIcon className="h-4 w-4 fill-gray-300" />{" "}
            </button>
            <CustomModal parentshow={modal} setParentShow={setModal}>
              <>
                <GoogleSignIn />
              </>
            </CustomModal>
          </>
        )}
      </div>
      <div className="mt-2">
        {adAccounts
          ? adAccounts.map((adAccount) => {
              return (
                <div className="text-sm hover:bg-gray-200">
                  <button onClick={() => handeAdAccountSelect(adAccount.id)}>
                    {adAccount.name} ({adAccount.id})
                  </button>
                </div>
              );
            })
          : null}
      </div>
      <div className="p-8">
        {selectedAdAccount ? (
          <>
            <div className="mt-2">
              <p>Metrics</p>
              <Select
                options={metricOptions}
                onChange={(event) => handleSelectedMetrics(event)}
                isMulti
                theme={customThemeFn}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderColor: "#d4d3d3",
                    borderWidth: "2px",
                  }),
                }}
              />
            </div>
            <div className="mt-5">
              <p>Dimensions</p>
              <Select
                options={dimensionOptions}
                onChange={(event) => handleSelectedDimensions(event)}
                isMulti
                theme={customThemeFn}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderColor: "#d4d3d3",
                    borderWidth: "2px",
                  }),
                }}
              />
            </div>
            <div className="mt-5">
              <p>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDateClick(date)}
              />
            </div>
            <div className="mt-5">
              <p>End Date</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleEndDateClick(date)}
              />
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                onClick={handleQuerySubmit}
              >
                Run
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
