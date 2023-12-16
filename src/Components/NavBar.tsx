import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RouterPath } from "../App";
import { SideBarBurger } from "./SideBarV2";

export const NavBar = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const getLogoUrl = (logo: string) => {
    return require(`../Static/images/${logo}.svg`);
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500">
        <div className="container px-4 mx-2 flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to={RouterPath.HOME}>
              <img
                className="h-35 w-100 mr-4"
                src={getLogoUrl("logo_white")}
                alt="icon"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
