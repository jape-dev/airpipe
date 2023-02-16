import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  DefaultService,
  QueryResults,
  SqlQuery,
  TableColumns,
  CurrentResults,
} from "../vizoApi";

export const Search = (props: {
  setResults: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setQueryList: React.Dispatch<React.SetStateAction<string[]>>;
  setTableNameList: React.Dispatch<React.SetStateAction<string[]>>;
  setResultsList: React.Dispatch<React.SetStateAction<object[][]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  currentResults?: object[];
  currentColumns?: string[];
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    // Need to replace this first endpoint call with the response from the query editor.
    if (
      props.currentResults !== undefined &&
      props.currentColumns !== undefined
    ) {
      const timestamp = Date.now();
      let results: CurrentResults = {
        name: `facebook_${timestamp}`,
        columns: props.currentColumns,
        results: props.currentResults,
      };
      let tableColumns: TableColumns = {
        name: `facebook_${timestamp}`,
        columns: props.currentColumns,
      };
      // Need to add a conditional step to make this work with the query editor.
      // Query off whatever the latest table currently is
      // It's just about where the result is inserted in the array
      DefaultService.createNewTableCreateNewTablePost(results).then(() => {
        DefaultService.sqlQuerySqlQueryPost(input, tableColumns).then(
          (res: SqlQuery) => {
            props.setQuery(res.query);
            props.setTableNameList((prev) => [
              ...prev.slice(0, props.index + 1),
              tableColumns.name,
            ]);

            props.setQueryList((prev) => [
              ...prev.slice(0, props.index + 1),
              res.query,
            ]);

            DefaultService.runQueryRunQueryGet(res.query)
              .then((res: QueryResults) => {
                props.setResults(res.results);
                props.setResultsList((prev) => [
                  ...prev.slice(0, props.index + 1),
                  res.results,
                ]);
                props.setIndex((prev) => prev + 1);
              })
              .catch((error) => {
                console.error(error);
                alert(
                  "This query is invalid. Please tweak your prompt and try again."
                );
              });
          }
        );
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
