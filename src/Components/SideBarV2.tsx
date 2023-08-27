import { Link } from "react-router-dom";
import { RouterPath } from "../App";
import {
  CodeBracketIcon,
  CircleStackIcon,
  ChatBubbleLeftIcon,
  ChartBarSquareIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";

export const SideBar = () => {
  return (
    <div className="w-full h-full relative pt-8 pl-4 border-2 bg-gray-200 border-r-neutral-200">
      <div className="flex flex-col items-start">
        <Link
          to={RouterPath.HOME}
          className="flex items-center my-8 font-bold text-gray-700"
        >
          <HomeIcon className="w-5 h-5 mr-2 text-gray-700" />
          Home
        </Link>
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
          Add Data Source
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

export const SideBarBurger = (props: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleMenu = () => {
    props.setMenuOpen(!props.menuOpen);
  };

  return (
    <div className="relative">
      <button
        className="fixed top-4 right-4 z-10 p-2 bg-gray-200 rounded-md"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {props.menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {props.menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full pt-8 pl-4 border-r border-neutral-200 bg-gray-200">
          <div className="flex flex-col items-start">
            <Link
              to={RouterPath.HOME}
              className="flex items-center my-4 font-bold text-gray-700"
            >
              <HomeIcon className="w-5 h-5 mr-2 text-gray-700" />
              Home
            </Link>
            <Link
              to={RouterPath.CONNECT}
              className="flex items-center my-4 font-bold text-gray-700"
            >
              <CodeBracketIcon className="w-5 h-5 mr-2 text-gray-700" />
              Connect
            </Link>
            <Link
              to={RouterPath.ADD_DATA}
              className="flex items-center my-4 font-bold text-gray-700"
            >
              <ChartBarSquareIcon className="w-5 h-5 mr-2 text-gray-700" />
              Add Data Source
            </Link>
            <Link
              to={RouterPath.DATA_SOURCES}
              className="flex items-center my-4 font-bold text-gray-700"
            >
              <CircleStackIcon className="w-5 h-5 mr-2 text-gray-700" />
              Data Sources
            </Link>
            <Link
              to={RouterPath.ASK}
              className="flex items-center my-4 font-bold text-gray-700"
            >
              <ChatBubbleLeftIcon className="w-5 h-5 mr-2 text-gray-700" />
              Ask
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
