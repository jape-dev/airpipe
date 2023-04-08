import { Search } from "./Search";
import { Toggle } from "./Toggle";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { StickyHeadTable } from "./Table";
import {
  DefaultService,
  TabData,
  Schema,
  CurrentResults,
  TableColumns,
  QueryResults,
  DebugResponse,
} from "../vizoApi";
import { CustomModal } from "./CustomModal";

export const Results = (props: {
  schema: Schema;
  tabIndex: number;
  updateSchema: (tabData: TabData) => void;
  tableNameList: string[][];
  setTableNameList: React.Dispatch<React.SetStateAction<string[][]>>;
  index: number;
  setIndexList: React.Dispatch<React.SetStateAction<number[]>>;
  queryList: string[];
  setQueryList: React.Dispatch<React.SetStateAction<string[][]>>;
  resultsList: Object[][];
  setResultsList: React.Dispatch<React.SetStateAction<object[][][]>>;
}) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<any[]>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuery, setEditedQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleQueryEdit = () => {
    setIsEditing(true);
    // need to replace linebreaks with space.
    // append rather than replace? Need to make it consistent with
    setEditedQuery(props.queryList[props.index]);
  };

  const handleQuerySave = () => {
    // should I replace or upgrade?
    props.queryList[props.index] = editedQuery;
    DefaultService.runQueryQueryRunQueryGet(editedQuery)
      .then((res: QueryResults) => {
        props.setQueryList((prev) => {
          const newArr = [...prev];
          newArr[props.tabIndex][props.index] = editedQuery;
          return newArr;
        });

        props.setResultsList((prev) => {
          const newArr = [...prev];
          newArr[props.tabIndex][props.index] = res.results;
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
        newTableNameList[props.tabIndex][props.index] = tableColumns.name;
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
        const errorMessage = error.body ? error.body.detail : "Unknown error";
        DefaultService.debugPromptQueryDebugPromptPost(
          editedQuery,
          errorMessage,
          props.schema
        ).then((res: DebugResponse) => {
          setModalContent(res.completion);
          setModal(true);
        });
      });
    setIsEditing(false);
  };

  const handleQueryCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (props.resultsList[props.index] !== undefined) {
      Object.entries(props.resultsList[props.index]).forEach(([key, value]) =>
        setColumns(Object.keys(value))
      );
    }
  }, [props.resultsList[props.index]]);

  useEffect(() => {
    if (props.resultsList[props.index] !== undefined) {
      setCsvData(props.resultsList[props.index]);
    }
  }, [props.resultsList[props.index]]);

  return (
    <>
      <div className="grid grid-cols-8 gap-2 p-5">
        <div className="col-span-6">
          <Search
            setQueryList={props.setQueryList}
            tableNameList={props.tableNameList}
            setTableNameList={props.setTableNameList}
            resultsList={props.resultsList}
            setResultsList={props.setResultsList}
            index={props.index}
            setIndexList={props.setIndexList}
            schema={props.schema}
            tabIndex={props.tabIndex}
            updateSchema={props.updateSchema}
          />
        </div>
        <div className="col-span-2">
          <Toggle
            index={props.index}
            setIndexList={props.setIndexList}
            columns={columns}
            setColumns={setColumns}
            resultsList={props.resultsList}
            tableNameList={props.tableNameList[props.tabIndex]}
            updateSchema={props.updateSchema}
            tabIndex={props.tabIndex}
          />
        </div>
        <div className="col-span-8 relative">
          <pre className="text-sm font-mono bg-gray-200 text-black p-4 rounded-lg overflow-auto">
            {isEditing ? (
              <div className="flex flex-col">
                <div className="flex flex-row-reverse">
                  <div className="flex items-center">
                    <button
                      onClick={handleQuerySave}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleQueryCancel}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="flex flex-grow">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      value={editedQuery}
                      onChange={(e) => setEditedQuery(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                {props.queryList[props.index] ? (
                  <>
                    <code>{props.queryList[props.index]}</code>
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                      <button
                        onClick={handleQueryEdit}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </pre>
        </div>
        <h2 className="mt-4 font-bold">
          Current Table: {props.tableNameList[props.tabIndex][props.index]}
        </h2>
        <div className="col-span-8">
          {columns === undefined ||
          props.resultsList[props.index] === undefined ? (
            <p> Something is undefined</p>
          ) : (
            <StickyHeadTable
              results={props.resultsList[props.index]}
              columns={columns}
            />
          )}
        </div>

        {csvData === undefined ? null : (
          <button
            type="button"
            className="text-white bg-teal-500 hover:bg-teal-700  font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
          >
            <CSVLink data={csvData}>Download CSV</CSVLink>
          </button>
        )}
      </div>
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <h2 className="mt-4 font-bold">There is an error in the query</h2>
          <p>{modalContent}</p>
        </>
      </CustomModal>
    </>
  );
};
