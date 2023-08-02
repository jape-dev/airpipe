import * as React from "react";
import { StickyHeadTable } from "./Table";

interface DataPreviewProps {
  columns: string[];
  results: Object[];
  tablePreview: boolean;
}

export const DataPreview: React.FC<DataPreviewProps> = ({
  columns,
  results,
  tablePreview = false,
}) => {
  return (
    <>
      {tablePreview ? (
        <StickyHeadTable columns={columns} results={results} rows={2} />
      ) : (
        <div className="bg-white p-4">
          <h2 className="text-gray-800">Column Names:</h2>
          <ul className="list-disc pl-4">
            {columns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
