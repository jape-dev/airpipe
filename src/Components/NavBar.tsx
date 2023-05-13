import { useState } from "react";
import { Link } from "react-router-dom";
import { RouterPath } from "../App";

export const NavBar = () => {
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to={RouterPath.HOME}>
              <p className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white">
                AirPipe
              </p>
            </Link>
          </div>
          {/* <div className="lg:flex flex-grow items-center flex">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">My Account</span>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
};
