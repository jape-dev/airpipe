import React, { useEffect, useState } from "react";
import { Dropdown } from "../Components/DropDown";
import { NavBar } from "../Components/NavBar";
import { DefaultService, User, AdAccount } from "../vizoApi";
import { RouterPath } from "../App";

export const Blender: React.FC = () => {
  const options = ["Smoothie", "Milkshake", "Frozen Cocktail"];
  const [currentUser, setCurrentUser] = useState<User>();
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);

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

  const handleSelectOption = (selectedOption: string) => {
    console.log(`Selected option: ${selectedOption}`);
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-200 p-4 mx-auto w-3/4">
        <h1 className="text-2xl font-bold mb-4">Add Data</h1>
        {adAccounts.length === 0 ? (
          <p>Loading</p>
        ) : (
          <Dropdown options={adAccounts} onSelectOption={handleSelectOption} />
        )}
      </div>
    </>
  );
};
