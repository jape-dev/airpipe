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
      console.log("currentResults", props.currentResults);
      DefaultService.createNewTableCreateNewTablePost(results).then(() => {
        DefaultService.sqlQuerySqlQueryPost(input, tableColumns).then(
          (res: SqlQuery) => {
            console.log(res.query);
            props.setQuery(res.query);
            DefaultService.runQueryRunQueryGet(res.query).then(
              (res: QueryResults) => {
                props.setResults(res.results);
              }
            );
          }
        );
      });
    }
  };

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative w-full bg-white border-neutral-200">
      <input
        className="w-full h-5 p-4 m-0 focus:outline-none"
        placeholder="Ask a question"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2"
        onClick={handleSubmit}
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>
    </div>
  );
};
