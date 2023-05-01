import { Link } from "react-router-dom";
import { RouterPath } from "../App";
import {
  CodeBracketIcon,
  CircleStackIcon,
  ChatBubbleLeftIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/20/solid";

export const SideBar = (props: {}) => {
  return (
    <div className="w-full h-full relative pt-8 pl-4 border-2 bg-gray-200 border-r-neutral-200">
      <div className="flex flex-col items-start">
        <Link
          to={RouterPath.CONNECT}
          className="flex items-center my-8 font-bold text-gray-700"
        >
          <CodeBracketIcon className="w-5 h-5 mr-2 text-gray-700" />
          Connect
        </Link>
        <Link
          to={RouterPath.ADD_DATA}
          className="flex items-center my-8 font-bold text-gray-700"
        >
          <ChartBarSquareIcon className="w-5 h-5 mr-2 text-gray-700" />
          Add Data
        </Link>
        <Link
          to={RouterPath.DATA_SOURCES}
          className="flex items-center my-8 font-bold text-gray-700"
        >
          <CircleStackIcon className="w-5 h-5 mr-2 text-gray-700" />
          Data Sources
        </Link>
        <Link
          to={RouterPath.ASK}
          className="flex items-center my-9 font-bold text-gray-700"
        >
          <ChatBubbleLeftIcon className="w-5 h-5 mr-2 text-gray-700" />
          Ask
        </Link>
      </div>
    </div>
  );
};
