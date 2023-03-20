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

export const Results = (props: {
  results: Object[];
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
  schema: Schema;
  tabIndex: number;
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
}) => {
  const [query, setQuery] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<any[]>();
  const [queryList, setQueryList] = useState<string[]>([""]);
  const [tableNameList, setTableNameList] = useState<string[]>([]);
  const [resultsList, setResultsList] = useState<Object[][]>([props.results]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (resultsList[index] !== undefined && columns !== undefined) {
      let data: any[] = [columns];
      resultsList[index].map((item) => {
        let row: string[] = [];
        Object.values(item).map((value) => {
          row.push(value);
        });
        data.push(row);
      });
      setCsvData(data);
    }
  }, [resultsList[index], columns]);

  useEffect(() => {
    if (resultsList[index] !== undefined) {
      Object.entries(resultsList[index]).forEach(([key, value]) =>
        setColumns(Object.keys(value))
      );
    }
  }, [resultsList[index]]);

  useEffect(() => {
    const check = props.schema.tabs.findIndex(
      (item) => item.tabIndex === props.tabIndex
    );
    // This is where the error might be occuring
    const tableColumns = {
      name: tableNameList[index],
      columns,
    };

    // this find and then elaliate to -1 logic may also be incorrect.
    if (
      tableColumns.name != undefined &&
      tableColumns.name != null &&
      Array.isArray(columns) &&
      columns.length > 0
    ) {
      if (check === -1) {
        // no matching element found, add a new one
        props.setTabData({
          tabIndex: props.tabIndex,
          data: [tableColumns],
        } as TabData);
      } else {
        // matching element found, update its data property
        const newData = props.tabData.data;
        newData.splice(index, 1, tableColumns);
        props.setTabData({
          tabIndex: props.tabIndex,
          data: newData,
        } as TabData);
      }
    }
  }, [tableNameList, props.tabIndex]);

  useEffect(() => {
    if (
      columns !== undefined &&
      columns !== null &&
      Array.isArray(columns) &&
      columns.length > 0
    ) {
      const timestamp = Date.now();
      let results: CurrentResults = {
        name: `facebook_${timestamp}`,
        columns: columns,
        results: props.results,
      };
      let tableColumns: TableColumns = {
        name: `facebook_${timestamp}`,
        columns: columns,
      };
      DefaultService.createNewTableQueryCreateNewTablePost(results).then(() =>
        setTableNameList((prev) => [
          ...prev.slice(0, index + 1),
          tableColumns.name,
        ])
      );
    }
  }, [columns, props.results]);

  return (
    <div className="grid grid-cols-8 gap-2 p-5">
      <div className="col-span-6">
        <Search
          setResults={props.setResults}
          setQuery={setQuery}
          setQueryList={setQueryList}
          setTableNameList={setTableNameList}
          setResultsList={setResultsList}
          index={index}
          setIndex={setIndex}
          schema={props.schema}
        />
      </div>
      <div className="col-span-2">
        <Toggle
          index={index}
          setIndex={setIndex}
          listLength={resultsList.length}
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
