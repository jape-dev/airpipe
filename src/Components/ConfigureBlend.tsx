import React, { useState, useEffect } from "react";
import { CustomModal } from "./CustomModal";
import {
  DefaultService,
  DataSourceInDB,
  FieldOptionWithDataSourceId,
  JoinType,
  JoinCondition,
} from "../vizoApi";
import { LinkIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { JoinFields } from "./JoinFields";

interface ConfigureBlendProps {
  leftDataSource: DataSourceInDB;
  rightDataSource: DataSourceInDB;
  joinConditions: JoinCondition[];
  setJoinConditions: React.Dispatch<React.SetStateAction<JoinCondition[]>>;
}

export const ConfigureBlend: React.FC<ConfigureBlendProps> = ({
  leftDataSource,
  rightDataSource,
  joinConditions,
  setJoinConditions,
}) => {
  // State to store the selected join type
  const [modal, setModal] = useState(false);

  const [index, setIndex] = useState(0);
  const [joinType, setJoinType] = useState<JoinType>(JoinType.LEFT_JOIN);
  const [selectedLeftOption, setSelectedLeftOption] =
    useState<FieldOptionWithDataSourceId>();
  const [selectedRightOption, setSelectedRightOption] =
    useState<FieldOptionWithDataSourceId>();

  // Function to handle option selection and set the join type
  const handleSelectJoin = (type: JoinType) => {
    setJoinType(type);
    let selectedJoinCondition = joinConditions[index];
    if (selectedJoinCondition) {
      selectedJoinCondition.join_type = type;
      setJoinConditions((prevJoinConditions) => {
        const updatedJoinConditions = [...prevJoinConditions];
        updatedJoinConditions[index] = selectedJoinCondition;
        return updatedJoinConditions;
      });
    }
  };

  const saveJoinCondition = () => {
    setModal(false);
    if (selectedLeftOption && selectedRightOption && joinType) {
      const joinCondition: JoinCondition = {
        left_field: selectedLeftOption,
        right_field: selectedRightOption,
        join_type: joinType,
        left_data_source_id: leftDataSource.id,
        right_data_source_id: rightDataSource.id,
      };
      setJoinConditions([...joinConditions, joinCondition]);
    }
  };

  const handleButtonDoubleClick = (buttonIndex: number) => {
    setIndex(buttonIndex);
    setModal(true);
  };

  const getIconUrl = (imgPath: string, fileType: string = "png") => {
    return require(`../Static/images/${imgPath}.${fileType}`);
  };

  const getJoinTypeIconUrl = () => {
    switch (joinType) {
      case JoinType.LEFT_JOIN:
        return getIconUrl("left", "svg");
      case JoinType.RIGHT_JOIN:
        return getIconUrl("right", "svg");
      case JoinType.INNER_JOIN:
        return getIconUrl("inner", "svg");
      case JoinType.FULL_OUTER_JOIN:
        return getIconUrl("full", "svg");
      default:
        return getIconUrl("left", "svg");
    }
  };

  // Function to display explanation based on selected join type
  const renderJoinExplanation = () => {
    switch (joinType) {
      case JoinType.LEFT_JOIN:
        return "A Left Join returns all records from the left table, and the matched records from the right table. The result is NULL from the right side if there is no match.";
      case JoinType.RIGHT_JOIN:
        return "A Right Join returns all records from the right table, and the matched records from the left table. The result is NULL from the left side if there is no match.";
      case JoinType.INNER_JOIN:
        return "An Inner Join returns records that have matching values in both tables.";
      case JoinType.FULL_OUTER_JOIN:
        return "A Full Outer Join returns all records when there is a match in either left or right table. This join combines the results of both Left and Right joins.";
      default:
        return "Select a join type to see the explanation.";
    }
  };

  useEffect(() => {
    if (
      joinConditions[index] &&
      joinConditions[index].join_type !== undefined
    ) {
      setJoinType(joinConditions[index].join_type);
      let leftOption: FieldOptionWithDataSourceId = {
        ...joinConditions[index].left_field,
        data_source_id: leftDataSource.id,
      };
      setSelectedLeftOption(leftOption);
      let rightOption: FieldOptionWithDataSourceId = {
        ...joinConditions[index].right_field,
        data_source_id: rightDataSource.id,
      };
      setSelectedRightOption(rightOption);
    }
  }, [index]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <>
            {joinConditions.map((condition, buttonIndex) => (
              <button
                key={buttonIndex}
                onClick={() => setIndex(buttonIndex)}
                onDoubleClick={() => handleButtonDoubleClick(buttonIndex)}
                className={`w-full border border-gray-400 rounded-md hover:border-teal-500 px-4 py-2 mb-2 ${
                  index === buttonIndex ? "border-teal-500 border-2" : ""
                }`}
              >
                <p>
                  {condition.left_field.img && (
                    <img
                      src={getIconUrl(condition.left_field.img)}
                      alt="Left field Icon"
                      className="inline mr-2 h-5 w-5"
                    />
                  )}
                  {condition.left_field.label}{" "}
                  <LinkIcon className="inline h-5 w-5 rotate-45 ml-2 mr-2" />
                  {condition.right_field.img && (
                    <img
                      src={getIconUrl(condition.right_field.img)}
                      alt="Right field Icon"
                      className="inline mr-2 h-5 w-5"
                    />
                  )}
                  {condition.right_field.label}
                </p>
              </button>
            ))}
            <div>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-6000 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150"
                onClick={() => setModal(true)}
              >
                <span className="mr-2">+</span>
                Add New Join Condition
              </button>
            </div>
          </>
        </div>
        <div className="col-span-1">
          <div>
            <div className="border-2 rounded-md">
              <div className="flex flex-col space-y-2">
                {[
                  JoinType.LEFT_JOIN,
                  JoinType.RIGHT_JOIN,
                  JoinType.INNER_JOIN,
                  JoinType.FULL_OUTER_JOIN,
                ].map((type) => (
                  <button
                    key={type}
                    className={`p-2 ${
                      joinType === type
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleSelectJoin(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 border-t-2">
                <div className="col-span-1 p-2 mt-2">
                  <img src={getJoinTypeIconUrl()} alt="Description of Image" />
                </div>
                <div className="col-span-2 p-2">
                  <div className="mt-4 text-sm">{renderJoinExplanation()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        parentshow={modal}
        setParentShow={setModal}
        style={{ minHeight: "500px" }}
      >
        <>
          {" "}
          <button
            className="ml-2 p-1 rounded-md text-gray-500 hover:text-gray-700 absolute top-0 right-0"
            onClick={() => setModal(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <JoinFields
            leftDataSource={leftDataSource}
            rightDataSource={rightDataSource}
            selectedLeftOption={selectedLeftOption}
            setSelectedLeftOption={setSelectedLeftOption}
            selectedRightOption={selectedRightOption}
            setSelectedRightOption={setSelectedRightOption}
            saveJoinCondition={saveJoinCondition}
          />
        </>
      </CustomModal>
    </>
  );
};
