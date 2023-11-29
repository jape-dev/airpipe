import React, { useState } from "react";
import { CustomModal } from "./CustomModal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

interface AddDataButtonProps {
  handleNameSubmit: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddDataButton: React.FC<AddDataButtonProps> = ({
  handleNameSubmit,
  handleNameChange,
  buttonText,
  modal,
  setModal,
  loading,
  setLoading,
}) => {
  const handleSubmit = () => {
    setLoading(true);
    handleNameSubmit();
  };

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="bg-teal-500 hover:bg-teal-600 mt-5 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
      >
        <PlusCircleIcon className="inline h-6 w-6 mr-2" />
        <span className="text-lg">{buttonText || "Add Data Source"}</span>
      </button>
      <CustomModal
        parentshow={modal}
        setParentShow={setModal}
        style={{ minWidth: "400px", minHeight: "300px" }}
      >
        <>
          <button
            className="ml-2 p-1 rounded-md text-gray-500 hover:text-gray-700 absolute top-0 right-0"
            onClick={() => setModal(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <h2 className="font-bold text-lg">Enter a table name</h2>
          <input
            type="text"
            onChange={handleNameChange}
            placeholder={"Table name"}
            className="block w-full bg-white border border-gray-400 shadow-sm h-10 mt-4 mb-2 py-2 px-4 rounded-md text-left focus:outline-none"
          />
          <button
            onClick={handleSubmit} // Call the new handleSubmit function
            className="bg-teal-500 text-white rounded-md px-4 py-2 h-12 w-30 flex items-center justify-center mt-4 mx-auto"
            disabled={loading} // Disable the button when loading
          >
            {loading ? ( // Render loading animation if isLoading is true
              <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
            ) : (
              <>
                <PlusCircleIcon className="inline h-6 w-6 mr-2" />
                <span className="text-md">Create View</span>
              </>
            )}
          </button>
        </>
      </CustomModal>
    </>
  );
};
