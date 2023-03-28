import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { TabData, TableColumns } from "../vizoApi";

export const Toggle = (props: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  listLength: number;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  resultsList: object[];
  setTabData: React.Dispatch<React.SetStateAction<TabData>>;
  tableNameList: string[];
  tabData: TabData;
  tabIndex: number;
}) => {
  const handleRightArrowClick = () => {
    console.log("tableNameList before right arrow", props.tableNameList);
    console.log("index right", props.index);
    if (props.resultsList[props.index + 1] !== undefined) {
      Object.entries(props.resultsList[props.index + 1]).forEach(
        ([key, value]) => props.setColumns(Object.keys(value))
      );
    }
    let tableColumns: TableColumns = {
      name: props.tableNameList[props.index + 1],
      columns: props.columns,
    };
    const newData = props.tabData.data;
    newData.splice(props.index + 1, 1, tableColumns);
    props.setTabData({
      tabIndex: props.tabIndex,
      data: newData,
    } as TabData);
    props.setIndex(props.index + 1);
  };

  const handleLeftArrowClick = () => {
    console.log("tableNameList before left arrow", props.tableNameList);
    if (props.resultsList[props.index - 1] !== undefined) {
      Object.entries(props.resultsList[props.index - 1]).forEach(
        ([key, value]) => props.setColumns(Object.keys(value))
      );
    }
    let tableColumns: TableColumns = {
      name: props.tableNameList[props.index - 1],
      columns: props.columns,
    };
    const newData = props.tabData.data;
    console.log("newdData before splice left", newData);
    // something here is causing the data to be undefined
    // the tab data order should be shuffling around but it's not...
    // that is, whatever index is on should be the last in the list -- so basically rather than splice
    // I need to remove everything after props.index and insert tableColumns at the end?
    newData.splice(props.index - 1, 1, tableColumns);
    console.log("index left", props.index);
    console.log("newData left", newData);
    props.setTabData({
      tabIndex: props.tabIndex,
      data: newData,
    } as TabData);
    props.setIndex(props.index - 1);
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

      {props.index < props.listLength - 1 ? (
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
