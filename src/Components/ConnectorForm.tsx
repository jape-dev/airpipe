import { useState, useEffect } from "react";
import { AdAccount } from "../vizoApi";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { MultiValue } from "react-select";

export const ConnectorForm = (props: {
  accessToken: string | undefined;
  handleAdAccountSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  handleQuerySubmit: () => void;
  setMetrics: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setDimensions: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setStartTimestamp: React.Dispatch<React.SetStateAction<number>>;
  setEndTimestamp: React.Dispatch<React.SetStateAction<number>>;
  iconPath: string;
  adAccounts: AdAccount[] | undefined;
  name: string;
  selectedAdAccount: string;
  setSelectedAdAccount: React.Dispatch<React.SetStateAction<string>>;
  metricOptions: {
    value: string;
    label: string;
  }[];
  dimensionOptions: {
    value: string;
    label: string;
  }[];
}) => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    )
  );
  const [endDate, setEndDate] = useState<Date>(new Date()); // change this to the current date minus one month
  const [formToggle, setFormToggle] = useState<boolean>(false);

  const handleToggleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormToggle(!formToggle);
  };

  const handeAdAccountSelect = (id: string) => {
    props.setSelectedAdAccount(id);
  };

  const handleSelectedMetrics = (
    event: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    const values = [...event].map((opt) => opt.value);
    props.setMetrics(values);
  };

  const handleSelectedDimensions = (
    event: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    const values = [...event].map((opt) => opt.value);
    props.setDimensions(values);
  };

  const handleStartDateClick = (date: Date | null) => {
    if (date === null) {
      return;
    } else {
      setStartDate(date);
      const timestamp = Math.floor(date.getTime() / 1000);
      props.setStartTimestamp(timestamp);
    }
  };

  const handleEndDateClick = (date: Date | null) => {
    if (date === null) {
      return;
    } else {
      setEndDate(date);
      const timestamp = Math.floor(date.getTime() / 1000);
      props.setEndTimestamp(timestamp);
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

  const getIconUrl = () => {
    return require(`../Static/images/${props.iconPath}.png`);
  };

  return (
    <>
      <div className="pl-8 pr-8 mt-2 hover:bg-gray-50">
        <div className="flex items-center">
          <img src={getIconUrl()} className="h-5 w-5 mr-2" />
          <p className="mr-2">{props.name} Ads | </p>
          {props.accessToken ? (
            <>
              {formToggle === false ? (
                <form
                  onSubmit={(event) => {
                    props.handleAdAccountSubmit(event);
                    handleToggleForm(event);
                  }}
                  className="flex items-center"
                >
                  <button className="flex items-center">
                    <p className="mr-auto">Select Ad Account</p>
                    <ChevronDownIcon className="h-4 w-4 fill-gray-500" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleToggleForm} className="flex items-center">
                  <button className="flex items-center">
                    <p className="mr-auto">Select Ad Account</p>
                    <ChevronUpIcon className="h-4 w-4 fill-gray-500" />
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="flex items-center">
              <p className="mr-1">Connect</p>
              <button onClick={props.handleSubmit}>
                <ArrowRightIcon className="h-4 w-4 fill-gray-300" />{" "}
              </button>
            </div>
          )}
        </div>
        <div className="mt-2">
          {props.adAccounts && formToggle
            ? props.adAccounts.map((adAccount) => {
                return (
                  <div className="text-sm hover:bg-gray-200">
                    <button onClick={() => handeAdAccountSelect(adAccount.id)}>
                      {adAccount.name ? (
                        <>
                          {adAccount.name} ({adAccount.id})
                        </>
                      ) : (
                        <>{adAccount.id}</>
                      )}
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {props.selectedAdAccount && formToggle ? (
        <>
          <div className="p-8">
            <div className="mt-2">
              <p>Metrics</p>
              <Select
                options={props.metricOptions}
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
                options={props.dimensionOptions}
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
                onClick={props.handleQuerySubmit}
              >
                Run
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
