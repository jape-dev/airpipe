import { useState } from "react";
import { Results } from "../Components/Results";
import { SideBar } from "../Components/SideBar";
import { NavBar } from "../Components/NavBar";

export const Home = () => {
  const [results, setResults] = useState<Object[]>();

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-2">
          <SideBar setResults={setResults} />
        </div>
        <div className="col-span-5">
          {results ? (
            <Results results={results} setResults={setResults} />
          ) : null}
        </div>
      </div>
    </>
  );
};
