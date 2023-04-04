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
  setQueryList: React.Dispatch<React.SetStateAction<string[][]>>;
  resultsList: Object[][];
  setResultsList: React.Dispatch<React.SetStateAction<object[][][]>>;
  index: number;
  setIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  schema: Schema;
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
  tabIndex: number;
  updateSchema: (tabData: TabData) => void;
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    DefaultService.sqlQueryQuerySqlQueryPost(input, {
      tabs: props.schema.tabs,
    }).then((res: SqlQuery) => {
      props.setQueryList((prev) => {
        const newArr = [...prev];
        newArr[props.tabIndex].push(res.query);
        return newArr;
      });
      DefaultService.runQueryQueryRunQueryGet(res.query)
        .then((res: QueryResults) => {
          props.setResultsList((prev) => {
            const newArr = [...prev];
            newArr[props.tabIndex].push(res.results);
            return newArr;
          });
          props.setIndexList((prev) => {
            const newArr = [...prev];
            newArr[props.tabIndex] = props.resultsList.length;
            return newArr;
          });

          let columns: string[] = [];
          Object.entries(res.results).forEach(
            ([key, value]) => (columns = Object.keys(value))
          );
          const timestamp = Date.now();

          const name = `${
            props.tableNameList[props.tabIndex][0].split("_")[0]
          }_${timestamp}`;

          let results: CurrentResults = {
            name: name,
            columns: columns,
            results: res.results,
          };
          let tableColumns: TableColumns = {
            name: name,
            columns: columns,
          };

          const newTableNameList = props.tableNameList;
          if (newTableNameList[props.tabIndex] === undefined) {
            newTableNameList[props.tabIndex] = [];
          }
          newTableNameList[props.tabIndex].push(tableColumns.name);
          props.setTableNameList(newTableNameList);

          DefaultService.createNewTableQueryCreateNewTablePost(results).then(
            () => {
              props.updateSchema({
                tabIndex: props.tabIndex,
                data: [tableColumns],
              } as TabData);
            }
          );
        })
        .catch((error) => {
          console.error(error);
          alert(
            "This query is invalid. Please tweak your prompt and try again."
          );
        });
    });
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
