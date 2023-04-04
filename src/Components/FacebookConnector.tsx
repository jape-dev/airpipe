import { useState, useEffect } from "react";
import {
  DefaultService,
  User,
  AdAccount,
  FacebookQuery,
  CurrentResults,
  TableColumns,
  Schema,
  TabData,
} from "../vizoApi";
import { RouterPath } from "../App";
import "react-datepicker/dist/react-datepicker.css";
import { metricOptions, dimensionOptions } from "../Data/Options";
import { ConnectorForm } from "./ConnectorForm";

const DOMAIN_URL =
  process.env.REACT_APP_DOMAIN_URL || "https://airpipe-api.onrender.com";

export const FacebookConnector = (props: {
  currentUser: User | undefined;
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  updateSchema: (tabData: TabData) => void;
  setIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  setQueryList: React.Dispatch<React.SetStateAction<string[][]>>;
  setResultsList: React.Dispatch<React.SetStateAction<object[][][]>>;
  tabCount: number;
  setTabCount: React.Dispatch<React.SetStateAction<number>>;
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
  const [tabCount, setTabCount] = useState(0);

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
    if (props.tabCount > 0) {
      alert("Cannot have more than one Google tab open at a time");
    } else {
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
              let newResults = response.results;
              // use response results to get columns and the results and then
              let columns: string[] = [];
              Object.entries(newResults).forEach(
                ([key, value]) => (columns = Object.keys(value))
              );
              const timestamp = Date.now();
              let results: CurrentResults = {
                name: `facebook_${timestamp}`,
                columns: columns,
                results: response.results,
              };
              let tableColumns: TableColumns = {
                name: `facebook_${timestamp}`,
                columns: columns,
              };
              DefaultService.createNewTableQueryCreateNewTablePost(
                results
              ).then(() => {
                const newTableNameList = props.tableNameList;
                // if it's not zero need to do tabIndex plus 1
                let newTabIndex = props.tabIndex;
                if (props.tabIndex === 0) {
                  // if first time data being run
                  if (newTableNameList[props.tabIndex] === undefined) {
                    newTableNameList[props.tabIndex] = [];
                    newTableNameList[props.tabIndex].push(tableColumns.name);
                  } else {
                    // not first time data being run
                    newTableNameList[props.tabIndex + 1] = [];
                    newTableNameList[props.tabIndex + 1].push(
                      tableColumns.name
                    );
                    newTabIndex = props.tabIndex + 1;
                  }
                } else {
                  if (newTableNameList[props.tabIndex + 1] === undefined) {
                    newTableNameList[props.tabIndex + 1] = [];
                  }
                  newTableNameList[props.tabIndex + 1].push(tableColumns.name);
                  newTabIndex = props.tabIndex + 1;
                }
                props.setTableNameList(newTableNameList);
                props.setQueryList((queryList) => [...queryList, [""]]);
                // may need to do plus one here on tabIndex
                props.setResultsList((prev) => {
                  const newArr = [...prev];
                  if (props.tabIndex === 0) {
                    if (newArr[props.tabIndex] === undefined) {
                      newArr[props.tabIndex] = [newResults];
                    } else {
                      newArr[props.tabIndex + 1] = [newResults];
                    }
                  } else {
                    newArr[props.tabIndex + 1] = [newResults];
                  }
                  return newArr;
                });
                props.updateSchema({
                  tabIndex: newTabIndex,
                  data: [tableColumns],
                } as TabData);
                props.setIndexList((indexList) => [...indexList, 0]);
              });
              setTabCount(props.tabCount + 1);
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
    }
  };

  return (
    <ConnectorForm
      accessToken={props.currentUser?.facebook_access_token}
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
