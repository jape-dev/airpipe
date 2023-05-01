import React, { useEffect, useState } from "react";
import { Dropdown } from "../Components/DropDown";
import { AddDataButton } from "../Components/AddDataButton";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import {
  DefaultService,
  User,
  AdAccount,
  FieldOption,
  CurrentResults,
} from "../vizoApi";
import { RouterPath } from "../App";
import { FieldList } from "../Components/FieldList";

export const AddData: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [selectedAdAccount, setSelectedAdAccount] = useState<AdAccount>();
  const [selectedOptions, setSelectedOptions] = useState<FieldOption[]>([]);
  const [tableName, setTableName] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTableName(event.target.value);
  };

  const handleNameSubmit = () => {
    if (currentUser && selectedAdAccount) {
      const dataSource = {
        name: tableName,
        user: currentUser,
        fields: selectedOptions,
        adAccount: selectedAdAccount,
      };

      DefaultService.addDataSourceQueryAddDataSourcePost(dataSource).then(
        (response: CurrentResults) => {
          window.location.href = RouterPath.DATA_SOURCES;
        }
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 pb-10 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Add Data Source</h1>
            {adAccounts.length === 0 ? (
              <p>Loading</p>
            ) : (
              <Dropdown
                options={adAccounts}
                onSelectOption={handleSelectOption}
              />
            )}
            {selectedAdAccount && (
              <FieldList
                adAccount={selectedAdAccount}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            )}
            {selectedOptions.length > 0 && (
              <div className="">
                <AddDataButton
                  handleNameSubmit={handleNameSubmit}
                  handleNameChange={handleNameChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
