import { SideBar } from "../Components/SideBarV2";
import { NavBar } from "../Components/NavBar";
import { Overview } from "../Components/Overview";

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6">
          <Overview />
        </div>
      </div>
    </>
  );
};
