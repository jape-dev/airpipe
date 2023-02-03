import { Search } from "./Search";
import { Toggle } from "./Toggle";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

export const Results = (props: {
  results: Object[];
  setResults: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}) => {
  const [query, setQuery] = useState<string>("");
  const [columns, setColumns] = useState<string[]>();
  const [csvData, setCsvData] = useState<any[]>();

  const [queryList, setQueryList] = useState<string[]>([""]);
  const [tableNameList, setTableNameList] = useState<string[]>([""]);
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
          currentResults={resultsList[index]}
          currentColumns={columns}
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
        <p>{queryList[index]}</p>
      </div>
      <div className="col-span-8">
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
            {!resultsList[index] ? null : (
              <tbody>
                {resultsList[index].map((item) => {
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
      {csvData === undefined ? null : (
        <CSVLink data={csvData}>Download</CSVLink>
      )}
    </div>
  );
};
