import { Search } from "./Search";
import { Toggle } from "./Toggle";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { StickyHeadTable } from "./Table";
import { TabData, Schema } from "../vizoApi";

export const Results = (props: {
  schema: Schema;
  tabIndex: number;
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
  index: number;
  setIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  queryList: string[];
  setQueryList: React.Dispatch<React.SetStateAction<string[][]>>;
  resultsList: Object[][];
  setResultsList: React.Dispatch<React.SetStateAction<object[][][]>>;
}) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<any[]>();

  useEffect(() => {
    if (props.resultsList[props.index] !== undefined) {
      Object.entries(props.resultsList[props.index]).forEach(([key, value]) =>
        setColumns(Object.keys(value))
      );
    }
  }, [props.resultsList[props.index]]);

  return (
    <div className="grid grid-cols-8 gap-2 p-5">
      <div className="col-span-6">
        <Search
          queryList={props.queryList}
          setQueryList={props.setQueryList}
          tableNameList={props.tableNameList}
          setTableNameList={props.setTableNameList}
          resultsList={props.resultsList}
          setResultsList={props.setResultsList}
          index={props.index}
          setIndexList={props.setIndexList}
          schema={props.schema}
          currentResults={props.resultsList[props.index]}
          currentColumns={columns}
          tabIndex={props.tabIndex}
          tabData={props.tabData}
          setTabData={props.setTabData}
        />
      </div>
      <div className="col-span-2">
        <Toggle
          index={props.index}
          setIndexList={props.setIndexList}
          columns={columns}
          setColumns={setColumns}
          resultsList={props.resultsList[props.index]}
          setTabData={props.setTabData}
          tableNameList={props.tableNameList[props.tabIndex]}
          tabData={props.tabData}
          tabIndex={props.tabIndex}
        />
      </div>
      <div className="col-span-8">
        <pre className="text-sm font-mono bg-gray-200 text-black p-4 rounded-lg overflow-auto">
          <code>{props.queryList[props.index]}</code>
        </pre>
      </div>
      <div className="col-span-8">
        {columns === undefined ? null : (
          <StickyHeadTable
            results={props.resultsList[props.index]}
            columns={columns}
          />
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
