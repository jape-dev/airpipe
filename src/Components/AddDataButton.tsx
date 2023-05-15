import React, { useState } from "react";
import { CustomModal } from "./CustomModal";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface AddDataButtonProps {
  handleNameSubmit: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddDataButton: React.FC<AddDataButtonProps> = ({
  handleNameSubmit,
  handleNameChange,
}) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="bg-teal-500 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
      >
        <span className="text-lg">Add Data Source</span>
      </button>
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <button
            className="ml-2 p-1 rounded-md text-gray-500 hover:text-gray-700 absolute top-0 right-0"
            onClick={() => setModal(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <p className="font-bold text-lg">Enter a table name</p>
          <input
            type="text"
            onChange={handleNameChange}
            placeholder={"Table name"}
            className="block w-full bg-white border border-gray-400 shadow-sm h-10 mt-4 mb-2 py-2 px-4 rounded-md text-left focus:outline-none"
          />
          <button
            onClick={handleNameSubmit}
            className="bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto"
          >
            <span className="text-sm">Submit</span>
          </button>
        </>
      </CustomModal>
    </>
  );
};
