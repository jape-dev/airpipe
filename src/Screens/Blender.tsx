import React, { useEffect, useState } from "react";
import { Dropdown } from "../Components/DropDown";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { DefaultService, User, AdAccount } from "../vizoApi";
import { RouterPath } from "../App";
import { FieldList } from "../Components/FieldList";

export const Blender: React.FC = () => {
  const options = ["Smoothie", "Milkshake", "Frozen Cocktail"];
  const [currentUser, setCurrentUser] = useState<User>();
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [selectedAdAccount, setSelectedAdAccount] = useState<AdAccount>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      DefaultService.currentUserUserAuthCurrentUserGet(token).then(
        (response) => {
          setCurrentUser(response);
        }
      );
      DefaultService.adAccountsConnectorGoogleAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error: any) => {
          if (error.status === 401) {
            alert("Google access token expired. Please connect again");
            window.location.href = RouterPath.CONNECT;
          } else {
            console.log(error);
          }
        });
      DefaultService.adAccountsConnectorFacebookAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error) => {
          if (error.status === 401) {
            window.location.href = RouterPath.LOGIN;
          } else {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleSelectOption = (selectedOption: AdAccount) => {
    setSelectedAdAccount(selectedOption);
  };

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Data Sources</h1>
            {adAccounts.length === 0 ? (
              <p>Loading</p>
            ) : (
              <Dropdown
                options={adAccounts}
                onSelectOption={handleSelectOption}
              />
            )}
            {selectedAdAccount && <FieldList adAccount={selectedAdAccount} />}
          </div>
        </div>
      </div>
    </>
  );
};
