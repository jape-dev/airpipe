import { useState, useEffect } from "react";
import { SideBar } from "../Components/SideBarV2";
import { NavBar } from "../Components/NavBar";
import { Overview } from "../Components/Overview";
import { User, DefaultService } from "../vizoApi";
import { RouterPath } from "../App";

export const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token)
        .then((response) => {
          setCurrentUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        {!isMobile && (
          <div className="col-span-1">
            <SideBar currentUser={currentUser} />
          </div>
        )}
        <div className={isMobile ? "col-span-7" : "col-span-6"}>
          <Overview />
        </div>
      </div>
    </>
  );
};
