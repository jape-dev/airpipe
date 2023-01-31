import { Search } from "./Search";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

export const Results = (props: {
  results: Object[];
  setResults: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}) => {
  // Need to set Results from the sidebar and from Search.
  // Need to set results from the Home page
  const [query, setQuery] = useState<string>("");
  const [columns, setColumns] = useState<string[]>();
  const [csvData, setCsvData] = useState<any[]>();

  useEffect(() => {
    if (props.results !== undefined && columns !== undefined) {
      let data: any[] = [columns];
      props.results.map((item) => {
        let row: string[] = [];
        Object.values(item).map((value) => {
          row.push(value);
        });
        data.push(row);
      });
      setCsvData(data);
    }
  }, [props.results, columns]);

  useEffect(() => {
    if (props.results !== undefined) {
      Object.entries(props.results).forEach(([key, value]) =>
        setColumns(Object.keys(value))
      );
    }
  }, [props.results]);

  useEffect(() => {
    console.log(csvData);
  }, [csvData]);

  return (
    <div className="p-5">
      <Search
        setResults={props.setResults}
        setQuery={setQuery}
        currentResults={props.results}
        currentColumns={columns}
      />
      <p>{query}</p>
      <div className="relative overflow-x-auto">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns?.map((result) => {
                return (
                  <th scope="col" className="px-6 py-3">
                    {result}
                  </th>
                );
              })}
            </tr>
          </thead>
          {!props.results ? null : (
            <tbody>
              {props.results.map((item) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {Object.values(item).map((value) => {
                      return (
                        <td scope="row" className="px-6 py-4">
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {csvData === undefined ? null : (
        <CSVLink data={csvData}>Download</CSVLink>
      )}
    </div>
  );
};
