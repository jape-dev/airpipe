import React, { useState, useEffect } from "react";
import { CustomModal } from "./CustomModal";
import {
  DefaultService,
  DataSourceInDB,
  FieldOptionWithDataSourceId,
  JoinType,
  JoinCondition,
} from "../vizoApi";

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
  const [joinType, setJoinType] = useState<JoinType>(JoinType.LEFT_JOIN);
  const [modal, setModal] = useState(false);

  const [selectedLeftOption, setSelectedLeftOption] =
    useState<FieldOptionWithDataSourceId>();
  const [selectedRightOption, setSelectedRightOption] =
    useState<FieldOptionWithDataSourceId>();

  // Function to handle option selection and set the join type
  const handleSelectJoin = (type: JoinType) => {
    setJoinType(type);
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

  useEffect(() => {
    if (selectedLeftOption && selectedRightOption && joinType) {
      // Do something soon.
      console.log(joinType);
    }
  }, [joinType]);

  const getIconUrl = (imgPath: string) => {
    return require(`../Static/images/${imgPath}.png`);
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

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <>
            {joinConditions.map((condition) => (
              <div className="w-full border border-gray-400 rounded-md hover:border-teal-500 px-4 py-2 mb-2">
                <p>
                  {condition.left_field.alt_value} {condition.join_type}{" "}
                  {condition.right_field.alt_value}
                </p>
              </div>
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
            <div className="border p-4">
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
                      joinType === type ? "bg-teal-200" : "bg-gray-100"
                    }`}
                    onClick={() => handleSelectJoin(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {/* Explainer text */}
              <div className="mt-4 text-sm">{renderJoinExplanation()}</div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        parentshow={modal}
        setParentShow={setModal}
        style={{ minHeight: "500px" }}
      >
        <JoinFields
          leftDataSource={leftDataSource}
          rightDataSource={rightDataSource}
          selectedLeftOption={selectedLeftOption}
          setSelectedLeftOption={setSelectedLeftOption}
          selectedRightOption={selectedRightOption}
          setSelectedRightOption={setSelectedRightOption}
          saveJoinCondition={saveJoinCondition}
        />
      </CustomModal>
    </>
  );
};
