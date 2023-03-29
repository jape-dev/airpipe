import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  DefaultService,
  QueryResults,
  SqlQuery,
  TableColumns,
  CurrentResults,
  Schema,
  TabData,
} from "../vizoApi";

export const Search = (props: {
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setQueryList: React.Dispatch<React.SetStateAction<string[]>>;
  setResultsList: React.Dispatch<React.SetStateAction<object[][]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  schema: Schema;
  currentResults?: object[];
  currentColumns?: string[];
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
  tabIndex: number;
  tabData: TabData;
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (
      props.currentResults !== undefined &&
      props.currentColumns !== undefined
    ) {
      const timestamp = Date.now();
      let results: CurrentResults = {
        name: `airpipe_${timestamp}`,
        columns: props.currentColumns,
        results: props.currentResults,
      };
      let tableColumns: TableColumns = {
        name: `airpipe_${timestamp}`,
        columns: props.currentColumns,
      };
      DefaultService.createNewTableQueryCreateNewTablePost(results).then(() => {
        const newTableNameList = props.tableNameList;
        if (newTableNameList[props.tabIndex] === undefined) {
          newTableNameList[props.tabIndex] = [];
        }
        newTableNameList[props.tabIndex].push(tableColumns.name);
        props.setTableNameList(newTableNameList);
        DefaultService.sqlQueryQuerySqlQueryPost(input, {
          tabs: props.schema.tabs,
        }).then((res: SqlQuery) => {
          props.setQuery(res.query);
          props.setQueryList((prev) => [
            ...prev.slice(0, props.index + 1),
            res.query,
          ]);
          DefaultService.runQueryQueryRunQueryGet(res.query)
            .then((res: QueryResults) => {
              props.setResultsList((prev) => [
                ...prev.slice(0, props.index + 1),
                res.results,
              ]);
              props.setIndex((prev) => prev + 1);
              const newData = props.tabData.data;
              newData.splice(props.index, 1, tableColumns);
              props.setTabData({
                tabIndex: props.tabIndex,
                data: newData,
              } as TabData);
            })
            .catch((error) => {
              console.error(error);
              alert(
                "This query is invalid. Please tweak your prompt and try again."
              );
            });
        });
      });
    }
  };

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative w-full bg-white border-neutral-200">
      <input
        className="w-full h-5 p-4 m-0 focus:outline-none"
        placeholder="Describe a data transformation here"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        className="h-8 w-8 bg-teal-500 hover:bg-teal-700 rounded-md flex justify-center items-center m-1 p-2"
        onClick={handleSubmit}
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>
    </div>
  );
};
