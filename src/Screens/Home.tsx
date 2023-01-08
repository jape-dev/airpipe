import { Results } from "../Components/Results";
import { SideBar } from "../Components/SideBar";
import { NavBar } from "../Components/NavBar";

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-5 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-3">
          <Results />
        </div>
      </div>
    </>
  );
};
