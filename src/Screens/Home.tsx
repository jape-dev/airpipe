import { useState, useEffect } from "react";
import { Results } from "../Components/Results";
import { SideBar } from "../Components/SideBar";
import { NavBar } from "../Components/NavBar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Schema, TabData } from "../vizoApi";

export const Home = () => {
  const [results, setResults] = useState<Object[][]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabData, setTabData] = useState<TabData>({
    tabIndex: tabIndex,
    data: [],
  });

  const [schema, setSchema] = useState<Schema>({ tabs: [tabData] });

  const handleNewTabClick = () => {
    setResults([...results, []]);
  };

  const handleRemoveTabClick = () => {
    setResults(results.filter((result, index) => index !== tabIndex));
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
    console.log(schema);
  }, [schema]);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-2">
          <SideBar setResults={setResults} />
        </div>
        <div className="col-span-5">
          {schema.tabs && schema.tabs[0].data.length > 0 ? (
            <Tabs>
              <TabList>
                {schema.tabs.map((tab, index) => (
                  <Tab
                    onClick={() => {
                      setTabIndex(index);
                    }}
                  >
                    {tab.data[tab.data.length - 1]
                      ? tab.data[tab.data.length - 1].name
                      : "Tab"}
                  </Tab>
                ))}
              </TabList>
              <button onClick={handleNewTabClick}>Add new Tab</button>
              <button onClick={handleRemoveTabClick}>Remove tab</button>
              {schema.tabs.map((tab, index) => (
                <TabPanel>
                  <Results
                    results={results[index]}
                    setResults={setResults}
                    schema={schema}
                    tabIndex={tabIndex}
                    tabData={tabData}
                    setTabData={setTabData}
                  />
                </TabPanel>
              ))}
            </Tabs>
          ) : (
            <p>Instructions go here</p>
          )}
        </div>
      </div>
    </>
  );
};
