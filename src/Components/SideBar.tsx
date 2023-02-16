import { DefaultService, AdAccount, FacebookQuery, User } from "../vizoApi";
import { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { RouterPath } from "../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { metricOptions, dimensionOptions } from "../Data/Options";
import { ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import "../index.css";

const DOMAIN_URL =
  process.env.REACT_APP_DOMAIN_URL || "https://airpipe-api.onrender.com";

export const SideBar = (props: {
  setResults: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}) => {
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
  const [currentUser, setCurrentUser] = useState<User>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=3796703967222950&redirect_uri=${DOMAIN_URL}/facebook_login/&config_id=728465868571401&state=${token}`;
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
          if (error.status === 401) {
            window.location.href = RouterPath.LOGIN;
          } else {
            console.log(error);
          }
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
        DefaultService.runFacebookQueryRunFacebookQueryPost(token, query)
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserCurrentUserGet(token)
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const customThemeFn = (theme: any) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 30,
      baseUnit: 1,
    },
  });

  return (
    <div className="w-full h-full relative pt-8 border-2 bg-white border-white border-r-neutral-200">
      <p className="text-lg pl-8 pr-8 font-semibold">Data Sources</p>
      <div className="pl-8 pr-8 mt-2 hover:bg-gray-50">
        <div className="flex items-center">
          <img
            src={require("../Static/images/facebook-icon.png")}
            className="h-5 w-5 mr-2"
          />
          <p className="mr-2">Facebook Ads | </p>
          {currentUser?.access_token ? (
            <form
              onSubmit={handleAdAccountSubmit}
              className="flex items-center"
            >
              <p>Select Ad Account</p>
              <button>
                <ChevronDownIcon className="h-4 w-4 fill-gray-500" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center">
              <p className="mr-1">Connect</p>
              <button>
                <ArrowRightIcon className="h-4 w-4 fill-gray-300" />{" "}
              </button>
            </form>
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
                className="text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleQuerySubmit}
              >
                Run
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
