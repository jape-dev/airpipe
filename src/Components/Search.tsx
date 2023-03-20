import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  DefaultService,
  QueryResults,
  SqlQuery,
  TableColumns,
  CurrentResults,
  Schema,
} from "../vizoApi";

export const Search = (props: {
  setResults: React.Dispatch<React.SetStateAction<Object[][]>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setQueryList: React.Dispatch<React.SetStateAction<string[]>>;
  setTableNameList: React.Dispatch<React.SetStateAction<string[]>>;
  setResultsList: React.Dispatch<React.SetStateAction<object[][]>>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  schema: Schema;
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    // Need to replace this first endpoint call with the response from the query editor.
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
          props.setResults((results) => [...results, res.results]);
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
