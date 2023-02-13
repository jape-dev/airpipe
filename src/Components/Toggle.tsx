import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export const Toggle = (props: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  listLength: number;
}) => {
  const handleRightArrowClick = () => {
    props.setIndex(props.index + 1);
  };

  const handleLeftArrowClick = () => {
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
