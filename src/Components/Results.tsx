import { Search } from "./Search";
import { Toggle } from "./Toggle";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { StickyHeadTable } from "./Table";
import {
  DefaultService,
  TableColumns,
  TabData,
  Schema,
  CurrentResults,
} from "../vizoApi";
import { useIsMount } from "../Utils/useIsMount";

export const Results = (props: {
  results: Object[];
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
  schema: Schema;
  tabIndex: number;
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
  allResults: Object[][];
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
}) => {
  const [query, setQuery] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<any[]>();
  const [queryList, setQueryList] = useState<string[]>([""]);
  const [resultsList, setResultsList] = useState<Object[][]>([props.results]);
  const [index, setIndex] = useState<number>(0); // need to make this retain state - gets refreshed everytime tab is changed.
  const isMount = useIsMount();

  useEffect(() => {
    if (resultsList[index] !== undefined) {
      Object.entries(resultsList[index]).forEach(([key, value]) =>
        setColumns(Object.keys(value))
      );
    }
  }, [resultsList[index]]);

  return (
    <div className="grid grid-cols-8 gap-2 p-5">
      <div className="col-span-6">
        <Search
          setResults={props.setResults}
          setQuery={setQuery}
          setQueryList={setQueryList}
          tableNameList={props.tableNameList}
          setTableNameList={props.setTableNameList}
          setResultsList={setResultsList}
          index={index}
          setIndex={setIndex}
          schema={props.schema}
          currentResults={resultsList[index]}
          currentColumns={columns}
          tabIndex={props.tabIndex}
          tabData={props.tabData}
          setTabData={props.setTabData}
        />
      </div>
      <div className="col-span-2">
        <Toggle
          index={index}
          setIndex={setIndex}
          listLength={resultsList[index].length}
          columns={columns}
          setColumns={setColumns}
          resultsList={resultsList[index]}
          setTabData={props.setTabData}
          tableNameList={props.tableNameList[props.tabIndex]}
          tabData={props.tabData}
          tabIndex={props.tabIndex}
        />
      </div>
      <div className="col-span-8">
        <pre className="text-sm font-mono bg-gray-200 text-black p-4 rounded-lg overflow-auto">
          <code>{queryList[index]}</code>
        </pre>
      </div>
      <div className="col-span-8">
        {columns === undefined ? null : (
          <StickyHeadTable results={resultsList[index]} columns={columns} />
        )}
      </div>

      {csvData === undefined ? null : (
        <button
          type="button"
          className="text-white bg-teal-500 hover:bg-teal-700  font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
        >
          <CSVLink data={csvData}>Download CSV</CSVLink>
        </button>
      )}
    </div>
  );
};
