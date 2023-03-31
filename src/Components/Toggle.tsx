import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { TabData, TableColumns } from "../vizoApi";
import { useEffect } from "react";

export const Toggle = (props: {
  index: number;
  setIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  results: object[];
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
  tableNameList: string[];
  tabData: TabData;
  tabIndex: number;
}) => {
  const handleRightArrowClick = () => {
    if (props.results[props.index + 1] !== undefined) {
      Object.entries(props.results[props.index + 1]).forEach(([key, value]) =>
        props.setColumns(Object.keys(value))
      );
    }
    let tableColumns: TableColumns = {
      name: props.tableNameList[props.index + 1],
      columns: props.columns,
    };
    let newData = props.tabData.data;
    newData = newData.slice(props.index + 1);
    newData.push(tableColumns);
    props.setTabData({
      tabIndex: props.tabIndex,
      data: newData,
    } as TabData);
    props.setIndexList((prev) => {
      const newArr = [...prev];
      newArr[props.tabIndex] = props.index + 1;
      return newArr;
    });
  };

  const handleLeftArrowClick = () => {
    if (props.results[props.index - 1] !== undefined) {
      Object.entries(props.results[props.index - 1]).forEach(([key, value]) =>
        props.setColumns(Object.keys(value))
      );
    }
    let tableColumns: TableColumns = {
      name: props.tableNameList[props.index - 1],
      columns: props.columns,
    };
    let newData = props.tabData.data;
    newData = newData.slice(props.index - 1);
    newData.push(tableColumns);
    props.setTabData({
      tabIndex: props.tabIndex,
      data: newData,
    } as TabData);
    props.setIndexList((prev) => {
      const newArr = [...prev];
      newArr[props.tabIndex] = props.index - 1;
      return newArr;
    });
  };

  return (
    <div className="flex justify-center items-center w-fit my-4 border-2 rounded-md relative bg-white border-neutral-200">
      {props.index > 0 ? (
        <>
          <button
            className="h-8 w-8 bg-teal-500 hover:bg-teal-700 rounded-md flex justify-center items-center m-1 p-2"
            onClick={handleLeftArrowClick}
          >
            <ArrowLeftIcon className="h-4 w-4 fill-gray-100" />
          </button>
          <p className="mr-2 ml-2">Toggle Results</p>
        </>
      ) : null}

      {props.index < props.results.length - 1 ? (
        <button
          className="h-8 w-8 bg-teal-500 hover:bg-teal-700 rounded-md flex justify-center items-center m-1 p-2"
          onClick={handleRightArrowClick}
        >
          <ArrowRightIcon className="h-4 w-4 fill-gray-100" />
        </button>
      ) : null}
    </div>
  );
};
