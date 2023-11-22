import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RouterPath } from "../App";
import { SideBarBurger } from "./SideBarV2";

export const NavBar = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {isMobile && (
            <div className="lg:flex flex-grow items-center flex">
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <SideBarBurger
                    menuOpen={burgerOpen}
                    setMenuOpen={() => setBurgerOpen(!burgerOpen)}
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
