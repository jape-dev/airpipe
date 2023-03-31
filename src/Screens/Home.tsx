import { useState, useEffect } from "react";
import { Results } from "../Components/Results";
import { SideBar } from "../Components/SideBar";
import { NavBar } from "../Components/NavBar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Schema, TabData } from "../vizoApi";

export const Home = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabData, setTabData] = useState<TabData>({
    tabIndex: tabIndex,
    data: [],
  });
  const [tableNameList, setTableNameList] = useState<string[][]>([]);
  const [indexList, setIndexList] = useState<number[]>([]);
  const [queryList, setQueryList] = useState<string[][]>([]);
  const [schema, setSchema] = useState<Schema>({ tabs: [tabData] });
  const [resultsList, setResultsList] = useState<Object[][][]>([]);

  const handleNewTabClick = () => {
    setResultsList([...resultsList, []]);
  };

  const handleRemoveTabClick = () => {
    setResultsList(resultsList.filter((result, index) => index !== tabIndex));
  };

  useEffect(() => {
    const index = schema.tabs.findIndex((item) => item.tabIndex === tabIndex);

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
  }, [tabData]);

  useEffect(() => {
    console.log("schema", schema);
  }, [schema]);

  useEffect(() => {
    console.log("tabData", tabData);
  }, [tabData]);

  useEffect(() => {
    console.log("resultsList", resultsList);
  }, [resultsList]);

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
            setTabData={setTabData}
            setIndexList={setIndexList}
            setQueryList={setQueryList}
            resultsList={resultsList}
            setResultsList={setResultsList}
          />
        </div>
        <div className="col-span-5">
          {resultsList[tabIndex] ? (
            <Tabs>
              <TabList>
                {resultsList.map((tab, index) => (
                  <Tab
                    onClick={() => {
                      setTabIndex(index);
                    }}
                  >
                    {schema.tabs[index] !== undefined &&
                    schema.tabs[index].data.length > 0
                      ? schema.tabs[index].data[
                          schema.tabs[index].data.length - 1
                        ]
                        ? schema.tabs[index].data[
                            schema.tabs[index].data.length - 1
                          ].name
                        : "Loading"
                      : "Loading"}
                  </Tab>
                ))}
              </TabList>
              <button onClick={handleNewTabClick}>Add new Tab</button>
              <button onClick={handleRemoveTabClick}>Remove tab</button>
              {resultsList.map((tab, index) => (
                <TabPanel>
                  <Results
                    schema={schema}
                    tabIndex={tabIndex}
                    tabData={tabData}
                    setTabData={setTabData}
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
            </Tabs>
          ) : (
            <p>Instructions go here </p>
          )}
        </div>
      </div>
    </>
  );
};
