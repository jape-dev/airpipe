import { useState, useEffect } from "react";
import { Results } from "../Components/Results";
import { SideBar } from "../Components/SideBar";
import { NavBar } from "../Components/NavBar";
import { Overview } from "../Components/Overview";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "react-tabs/style/react-tabs.css";
import { Schema, TabData } from "../vizoApi";
import { useIsMount } from "../Utils/useIsMount";

interface TabPanelProps {
  children?: JSX.Element;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

export const Home = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tableNameList, setTableNameList] = useState<string[][]>([]);
  const [indexList, setIndexList] = useState<number[]>([]);
  const [queryList, setQueryList] = useState<string[][]>([]);
  const [schema, setSchema] = useState<Schema>({
    tabs: [
      {
        tabIndex: 0,
        data: [],
      } as TabData,
    ],
  });
  const [resultsList, setResultsList] = useState<Object[][][]>([]);
  const [facebookTabCount, setFacebookTabCount] = useState<number>(0);
  const [googleTabCount, setGoogleTabCount] = useState<number>(0);

  const handleRemoveTabClick = () => {
    if (schema.tabs[tabIndex].data[0].name.includes("google")) {
      setGoogleTabCount(0);
    } else if (schema.tabs[tabIndex].data[0].name.includes("facebook")) {
      setFacebookTabCount(0);
    }
    setResultsList(resultsList.filter((result, index) => index !== tabIndex));
    setTableNameList(
      tableNameList.filter((result, index) => index !== tabIndex)
    );
    setIndexList(indexList.filter((result, index) => index !== tabIndex));
    setQueryList(queryList.filter((result, index) => index !== tabIndex));
    setIndexList(indexList.filter((result, index) => index !== tabIndex));
    let newTabs = schema.tabs;
    newTabs.splice(tabIndex, 1);
    setSchema({
      tabs: newTabs,
    } as Schema);

    // change the tabIndex to the other tab
    if (tabIndex === 1) {
      setTabIndex(0);
    }
  };

  useIsMount(() => {
    localStorage.setItem("schema", JSON.stringify(schema));
  }, [schema]);

  useIsMount(() => {
    localStorage.setItem("resultsList", JSON.stringify(resultsList));
  }, [resultsList]);

  useIsMount(() => {
    localStorage.setItem("tableNameList", JSON.stringify(tableNameList));
  }, [resultsList]);

  useIsMount(() => {
    localStorage.setItem("queryList", JSON.stringify(queryList));
  }, [queryList]);

  useIsMount(() => {
    localStorage.setItem("indexList", JSON.stringify(indexList));
  }, [indexList]);

  useIsMount(() => {
    localStorage.setItem("facebookTabCount", JSON.stringify(facebookTabCount));
  }, [facebookTabCount]);

  useIsMount(() => {
    localStorage.setItem("googleTabCount", JSON.stringify(googleTabCount));
  }, [googleTabCount]);

  useEffect(() => {
    const schema = localStorage.getItem("schema");
    if (schema) {
      setSchema(JSON.parse(schema));
    }
    const resultsList = localStorage.getItem("resultsList");
    if (resultsList) {
      setResultsList(JSON.parse(resultsList));
    }
    const tableNameList = localStorage.getItem("tableNameList");
    if (tableNameList) {
      setTableNameList(JSON.parse(tableNameList));
    }
    const queryList = localStorage.getItem("queryList");
    if (queryList) {
      setQueryList(JSON.parse(queryList));
    }
    const indexList = localStorage.getItem("indexList");
    if (indexList) {
      setIndexList(JSON.parse(indexList));
    }
    const facebookTabCount = localStorage.getItem("facebookTabCount");
    if (facebookTabCount) {
      setFacebookTabCount(JSON.parse(facebookTabCount));
    }
    const googleTabCount = localStorage.getItem("googleTabCount");
    if (googleTabCount) {
      setGoogleTabCount(JSON.parse(googleTabCount));
    }
  }, []);

  const updateSchema = (tabData: TabData) => {
    const index = schema.tabs.findIndex(
      (item) => item.tabIndex === tabData.tabIndex
    );

    if (index === -1) {
      // no matching element found, add a new one
      setSchema((prevTabs) => {
        return {
          ...prevTabs,
          tabs: [...prevTabs.tabs, tabData],
        };
      });
    } else {
      // matching element found, update its data property
      const newTabs = schema.tabs;
      newTabs.splice(index, 1, tabData);
      setSchema({
        tabs: newTabs,
      } as Schema);
    }
  };

  const getTabName = (index: number) => {
    if (
      schema.tabs[index] !== undefined &&
      schema.tabs[index].data.length > 0
    ) {
      if (
        schema.tabs[index].data[schema.tabs[index].data.length - 1] !==
        undefined
      ) {
        return schema.tabs[index].data[
          schema.tabs[index].data.length - 1
        ].name.split("_")[0];
      } else {
        return "Loading";
      }
    } else {
      return "Loading";
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-2">
          <SideBar
            tableNameList={tableNameList}
            setTableNameList={setTableNameList}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            updateSchema={updateSchema}
            setIndexList={setIndexList}
            setQueryList={setQueryList}
            resultsList={resultsList}
            setResultsList={setResultsList}
            facebookTabCount={facebookTabCount}
            setFacebookTabCount={setFacebookTabCount}
            googleTabCount={googleTabCount}
            setGoogleTabCount={setGoogleTabCount}
          />
        </div>
        <div className="col-span-5">
          {resultsList[tabIndex] ? (
            <>
              <div className="col-span-8">
                <Tabs
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#009688",
                    },
                  }}
                  value={tabIndex}
                >
                  {resultsList.map((tab, index: number) => (
                    <Tab
                      onClick={() => {
                        setTabIndex(index);
                      }}
                      label={getTabName(index)}
                      value={index}
                      style={{ color: "#009688" }}
                    ></Tab>
                  ))}
                </Tabs>
              </div>
              <div className="col-span-4">
                <button
                  onClick={handleRemoveTabClick}
                  className="bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-2"
                >
                  <span className="text-sm">Remove tab</span>
                </button>
              </div>
              {resultsList.map((tab, index) => (
                <TabPanel index={index} value={tabIndex}>
                  <Results
                    schema={schema}
                    tabIndex={tabIndex}
                    updateSchema={updateSchema}
                    tableNameList={tableNameList}
                    setTableNameList={setTableNameList}
                    index={indexList[tabIndex]}
                    setIndexList={setIndexList}
                    queryList={queryList[tabIndex]}
                    setQueryList={setQueryList}
                    resultsList={resultsList[tabIndex]}
                    setResultsList={setResultsList}
                  />
                </TabPanel>
              ))}
            </>
          ) : (
            <Overview />
          )}
        </div>
      </div>
    </>
  );
};
