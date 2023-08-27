import { useState, useEffect } from "react";
import { SideBar } from "../Components/SideBarV2";
import { NavBar } from "../Components/NavBar";
import { Overview } from "../Components/Overview";

export const Home = () => {
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

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        {!isMobile && (
          <div className="col-span-1">
            <SideBar />
          </div>
        )}
        <div className={isMobile ? "col-span-7" : "col-span-6"}>
          <Overview />
        </div>
      </div>
    </>
  );
};
