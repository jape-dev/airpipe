import { Results } from "../Components/Results";
import { SideBar } from "../Components/SideBar";
import { NavBar } from "../Components/NavBar";

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-5">
          <Results />
        </div>
      </div>
    </>
  );
};
