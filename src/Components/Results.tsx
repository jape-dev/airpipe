import { Search } from "./Search";
import { useState, useEffect } from "react";

export const Results = () => {
  const [results, setResults] = useState<Object[]>();
  const [query, setQuery] = useState<string>("");
  const [columns, setColumns] = useState<string[]>();

  // const tableDataToArray = () => {
  //   if (results !== undefined) {
  //     {
  //       results.map((item) => {
  //         return (
  //           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  //             {Object.values(item).map((value) => {
  //               return (
  //                 <td scope="row" className="px-6 py-4">
  //                   {value}
  //                 </td>
  //               );
  //             })}
  //           </tr>
  //         );
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    if (results !== undefined) {
      Object.entries(results).forEach(([key, value]) =>
        setColumns(Object.keys(value))
      );
    }
  }, [results]);

  return (
    <div className="p-5">
      <Search setResults={setResults} setQuery={setQuery} />
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
          {!results ? null : (
            <tbody>
              {results.map((item) => {
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
    </div>
  );
};
