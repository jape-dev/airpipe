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
    <>
      {props.index > 0 ? (
        <button
          className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2"
          onClick={handleLeftArrowClick}
        >
          <ArrowLeftIcon className="h-4 w-4 fill-gray-100" />
        </button>
      ) : null}
      {props.index < props.listLength - 1 ? (
        <button
          className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2"
          onClick={handleRightArrowClick}
        >
          <ArrowRightIcon className="h-4 w-4 fill-gray-100" />
        </button>
      ) : null}
    </>
  );
};
