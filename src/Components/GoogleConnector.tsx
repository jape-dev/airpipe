import { CustomModal } from "./CustomModal";
import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import {
  DefaultService,
  User,
  AdAccount,
  GoogleQuery,
  CurrentResults,
  TabData,
  TableColumns,
} from "../vizoApi";
import "react-datepicker/dist/react-datepicker.css";
import { googleMetricOptions, googleDimensionOptions } from "../Data/Options";
import { ConnectorForm } from "./ConnectorForm";

export const GoogleConnector = (props: {
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
              // use response results to get columns and the results and then
              let columns: string[] = [];
              Object.entries(newResults).forEach(
                ([key, value]) => (columns = Object.keys(value))
              );
              const timestamp = Date.now();
              let results: CurrentResults = {
                name: `google_${timestamp}`,
                columns: columns,
                results: response.results,
              };
              let tableColumns: TableColumns = {
                name: `google_${timestamp}`,
                columns: columns,
              };
              DefaultService.createNewTableQueryCreateNewTablePost(
                results
              ).then(() => {
                let newTableNameList = props.tableNameList;
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
                newTableNameList = newTableNameList.filter(function (e) {
                  return e;
                });
                props.setTableNameList(newTableNameList);
                props.setQueryList((queryList) => [...queryList, [""]]);
                props.setResultsList((prev) => {
                  let newArr = [...prev];
                  if (props.tabIndex === 0) {
                    if (newArr[props.tabIndex] === undefined) {
                      newArr[props.tabIndex] = [newResults];
                    } else {
                      newArr[props.tabIndex + 1] = [newResults];
                    }
                  } else {
                    newArr[props.tabIndex + 1] = [newResults];
                  }
                  newArr = newArr.filter(function (e) {
                    return e;
                  });
                  return newArr;
                });
                props.updateSchema({
                  tabIndex: newTabIndex,
                  data: [tableColumns],
                } as TabData);
                props.setIndexList((indexList) => [...indexList, 0]);
              });
              props.setTabCount(props.tabCount + 1);
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
    }
  };

  return (
    <>
      <ConnectorForm
        accessToken={props.currentUser?.google_access_token}
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
