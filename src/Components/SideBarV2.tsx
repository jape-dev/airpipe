import { Link, useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { CustomModal } from "./CustomModal";
import GoogleSignIn from "./GoogleSignInV2";
import {
  CodeBracketIcon,
  CircleStackIcon,
  ChartBarSquareIcon,
  SparklesIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { User } from "../vizoApi";

export const SideBar = (props: { currentUser?: User }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const googleSheetsClick = () => {
    if (props.currentUser && props.currentUser.google_sheets_refresh_token) {
      // navigate to google sheets page
      navigate(RouterPath.GOOGLE_SHEETS);
      // window.location.href = RouterPath.GOOGLE_SHEETS;
    }
    setModal(true);
  };

  return (
    <>
      <div className="w-full h-full relative pt-8 pl-4 pr-4 border-2 bg-gray-200 border-r-neutral-200">
        <div className="flex flex-col items-start">
          <div className="w-full my-8">
            <div className="flex items-center 0 font-bold text-gray-700">
              {" "}
              <HomeIcon className="w-5 h-5 mr-2 text-gray-700 " />
              Home
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <Link
                to={RouterPath.HOME}
                className="flex items-center 0 text-gray-700"
              >
                Get-started
              </Link>
            </div>
          </div>
          <div className="w-full my-8">
            <div className="flex items-center 0 font-bold text-gray-700">
              {" "}
              <CodeBracketIcon className="w-5 h-5 mr-2 text-gray-700" />
              Connect
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <Link
                to={RouterPath.CONNECT}
                className="flex items-center 0 text-gray-700"
              >
                New data source
              </Link>
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <Link
                to={RouterPath.DATA_SOURCES}
                className="flex items-center 0 text-gray-700"
              >
                View data sources
              </Link>
            </div>
          </div>
          <div className="w-full my-8">
            <div className="flex items-center 0 font-bold text-gray-700">
              {" "}
              <CircleStackIcon className="w-5 h-5 mr-2 text-gray-700" />
              Manage
            </div>

            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <Link
                to={RouterPath.CREATE_VIEW}
                className="flex items-center 0 text-gray-700"
              >
                Create a view
              </Link>
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <Link
                to={RouterPath.VIEWS}
                className="flex items-center 0 text-gray-700"
              >
                Manage views
              </Link>
            </div>
          </div>
          <div className="w-full my-8">
            <div className="flex items-center 0 font-bold text-gray-700">
              {" "}
              <ChartBarSquareIcon className="w-5 h-5 mr-2 text-gray-700" />
              Share
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://datastudio.google.com/datasources/create?connectorId=AKfycbwpR3dKfTZHJfFSkoL_Yc-KimQffgM26SOiR-V7l5KGxYudDBRtHGJ0jNiav6JApJ0I&authuser=0"
              >
                Looker Studio
              </a>
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <button onClick={() => googleSheetsClick()}>Google Sheets</button>
            </div>
          </div>
          <div className="w-full my-8">
            <div className="flex items-center 0 font-bold text-gray-700">
              {" "}
              <SparklesIcon className="w-5 h-5 mr-2 text-gray-700" />
              Analyse
            </div>
            <div className="p-2 w-full hover:bg-gray-100 rounded-md">
              <Link
                to={RouterPath.ASK}
                className="flex items-center 0 text-gray-700"
              >
                Ask AI
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <GoogleSignIn channel_type={"sheets"} />
        </>
      </CustomModal>
    </>
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
            <div className="w-full my-8">
              <div className="flex items-center 0 font-bold text-gray-700">
                {" "}
                <HomeIcon className="w-5 h-5 mr-2 text-gray-700 " />
                Home
              </div>
              <div className="p-2 w-full hover:bg-gray-100 rounded-md">
                <Link
                  to={RouterPath.HOME}
                  className="flex items-center 0 text-gray-700"
                >
                  Get-started
                </Link>
              </div>
            </div>
            <div className="w-full my-8">
              <div className="flex items-center 0 font-bold text-gray-700">
                {" "}
                <CodeBracketIcon className="w-5 h-5 mr-2 text-gray-700" />
                Connect
              </div>
              <div className="p-2 w-full hover:bg-gray-100 rounded-md">
                <Link
                  to={RouterPath.CONNECT}
                  className="flex items-center 0 text-gray-700"
                >
                  Connectors
                </Link>
              </div>
            </div>
            <div className="w-full my-8">
              <div className="flex items-center 0 font-bold text-gray-700">
                {" "}
                <CircleStackIcon className="w-5 h-5 mr-2 text-gray-700" />
                Manage
              </div>
              <div className="p-2 w-full hover:bg-gray-100 rounded-md">
                <Link
                  to={RouterPath.ADD_DATA}
                  className="flex items-center 0 text-gray-700"
                >
                  Create data source
                </Link>
              </div>
              <div className="p-2 w-full hover:bg-gray-100 rounded-md">
                <Link
                  to={RouterPath.DATA_SOURCES}
                  className="flex items-center 0 text-gray-700"
                >
                  Explore data sources
                </Link>
              </div>
            </div>
            <div className="w-full my-8">
              <div className="flex items-center 0 font-bold text-gray-700">
                {" "}
                <ChartBarSquareIcon className="w-5 h-5 mr-2 text-gray-700" />
                Share
              </div>
              <div className="p-2 w-full hover:bg-gray-100 rounded-md">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://datastudio.google.com/datasources/create?connectorId=AKfycbwpR3dKfTZHJfFSkoL_Yc-KimQffgM26SOiR-V7l5KGxYudDBRtHGJ0jNiav6JApJ0I&authuser=0"
                >
                  Looker Studio
                </a>
              </div>
            </div>
            <div className="w-full my-8">
              <div className="flex items-center 0 font-bold text-gray-700">
                {" "}
                <SparklesIcon className="w-5 h-5 mr-2 text-gray-700" />
                Analyse
              </div>
              <div className="p-2 w-full hover:bg-gray-100 rounded-md">
                <Link
                  to={RouterPath.ASK}
                  className="flex items-center 0 text-gray-700"
                >
                  Ask AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
