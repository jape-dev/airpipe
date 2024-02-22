import React, { useEffect, useState } from "react";
import { ChannelAuth } from "../Components/ChannelAuth";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import {
  DefaultService,
  User,
  AdAccount,
  FieldOption,
  ChannelType,
  FieldType,
  DataSourceInDB,
  ReportType,
} from "../vizoApi";
import { RouterPath } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldList } from "../Components/FieldList";
import { Dropdown, DropDownOption } from "../Components/DropDown";
import { getChannelTypeEnum } from "../Utils/StaticData";
import { v4 as uuidv4 } from "uuid";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ReportTypeModal } from "../Components/ReportType";

export interface AddDataSourceState {
  channel?: ChannelType;
}

export const AddDataSource: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as AddDataSourceState;

  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [selectedAdAccount, setSelectedAdAccount] = useState<AdAccount>();
  const [selectedOptions, setSelectedOptions] = useState<FieldOption[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<DropDownOption[]>([]);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date(2020, 9, 1))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [channel, setChannel] = useState<ChannelType>();
  const [isFieldListVisible, setIsFieldListVisible] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);
  const [fieldType, setFieldType] = useState<FieldType>(FieldType.METRIC);
  const [timer, setTimer] = useState(0);
  const [reportType, setReportType] = useState<ReportType>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (state?.channel) {
      localStorage.setItem("channel", state.channel);
      setChannel(state.channel);
    } else {
      var localStorageChannel: string | null = localStorage.getItem("channel");
      var channelEnum = getChannelTypeEnum(localStorageChannel as string);
      setChannel(ChannelType[localStorageChannel as keyof typeof ChannelType]);
      if (localStorageChannel !== null) {
        var channelEnum = getChannelTypeEnum(localStorageChannel as string);
        setChannel(channelEnum);
      }
    }
  }, []);

  useEffect(() => {
    if (
      selectedAdAccount &&
      (selectedAdAccount.channel === ChannelType.INSTAGRAM_ACCOUNT ||
        selectedAdAccount.channel === ChannelType.INSTAGRAM_MEDIA ||
        selectedAdAccount.channel === ChannelType.GOOGLE ||
        selectedAdAccount.channel === ChannelType.GOOGLE_VIDEO)
    ) {
      let selectedAdAccountCopy = { ...selectedAdAccount }; // Make a copy of selectedAdAccount
      if (reportType == ReportType.MEDIA) {
        selectedAdAccountCopy.channel = ChannelType.INSTAGRAM_MEDIA; // Assign the value
      } else if (reportType == ReportType.ACCOUNT) {
        selectedAdAccountCopy.channel = ChannelType.INSTAGRAM_ACCOUNT; // Assign the value
      } else if (reportType == ReportType.STANDARD) {
        selectedAdAccountCopy.channel = ChannelType.GOOGLE; // Assign the value
      } else if (reportType == ReportType.VIDEO) {
        selectedAdAccountCopy.channel = ChannelType.GOOGLE_VIDEO; // Assign the value
      }
      setSelectedAdAccount(selectedAdAccountCopy);
    }
  }, [reportType]);

  useEffect(() => {
    adAccounts.flatMap((adAccount) => {
      if (adAccount.channel === ChannelType.GOOGLE) {
        DefaultService.fieldsConnectorGoogleFieldsGet(
          true,
          false,
          false,
          reportType
        ).then((response) => {
          setSelectedOptions(response);
        });
      } else if (adAccount.channel === ChannelType.FACEBOOK) {
        DefaultService.fieldsConnectorFacebookFieldsGet(
          true,
          false,
          false
        ).then((response) => {
          setSelectedOptions(response);
        });
      } else if (
        adAccount.channel === ChannelType.INSTAGRAM_MEDIA ||
        adAccount.channel === ChannelType.INSTAGRAM_ACCOUNT
      ) {
        DefaultService.fieldsConnectorInstagramFieldsGet(
          true,
          false,
          false,
          reportType
        ).then((response) => {
          setSelectedOptions(response);
        });
      } else if (adAccount.channel === ChannelType.GOOGLE_ANALYTICS) {
        DefaultService.fieldsConnectorGoogleAnalyticsFieldsGet(
          true,
          false,
          false
        ).then((response) => {
          setSelectedOptions(response);
        });
      } else if (adAccount.channel === ChannelType.YOUTUBE) {
        DefaultService.fieldsConnectorYoutubeFieldsGet(true, false, false).then(
          (response) => {
            setSelectedOptions(response);
          }
        );
      }
    });
  }, [adAccounts, reportType]);

  useEffect(() => {
    if (fieldType === FieldType.METRIC) {
      adAccounts.flatMap((adAccount) => {
        if (adAccount.channel === ChannelType.GOOGLE) {
          DefaultService.fieldsConnectorGoogleFieldsGet(
            false,
            true,
            false,
            reportType
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (adAccount.channel === ChannelType.FACEBOOK) {
          DefaultService.fieldsConnectorFacebookFieldsGet(
            false,
            true,
            false
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (
          adAccount.channel === ChannelType.INSTAGRAM_MEDIA ||
          adAccount.channel === ChannelType.INSTAGRAM_ACCOUNT
        ) {
          DefaultService.fieldsConnectorInstagramFieldsGet(
            false,
            true,
            false,
            reportType
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (adAccount.channel === ChannelType.GOOGLE_ANALYTICS) {
          DefaultService.fieldsConnectorGoogleAnalyticsFieldsGet(
            false,
            true,
            false
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (adAccount.channel === ChannelType.YOUTUBE) {
          DefaultService.fieldsConnectorYoutubeFieldsGet(
            false,
            true,
            true
          ).then((response) => {
            setFieldOptions(response);
          });
        }
        return [];
      });
    } else if (fieldType === FieldType.DIMENSION) {
      adAccounts.flatMap((adAccount) => {
        if (adAccount.channel === ChannelType.GOOGLE) {
          DefaultService.fieldsConnectorGoogleFieldsGet(
            false,
            false,
            true,
            reportType
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (adAccount.channel === ChannelType.FACEBOOK) {
          DefaultService.fieldsConnectorFacebookFieldsGet(
            false,
            false,
            true
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (
          adAccount.channel === ChannelType.INSTAGRAM_MEDIA ||
          adAccount.channel === ChannelType.INSTAGRAM_ACCOUNT
        ) {
          DefaultService.fieldsConnectorInstagramFieldsGet(
            false,
            false,
            true,
            reportType
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (adAccount.channel === ChannelType.GOOGLE_ANALYTICS) {
          DefaultService.fieldsConnectorGoogleAnalyticsFieldsGet(
            false,
            false,
            true
          ).then((response) => {
            setFieldOptions(response);
          });
        } else if (adAccount.channel === ChannelType.YOUTUBE) {
          DefaultService.fieldsConnectorYoutubeFieldsGet(
            false,
            false,
            true
          ).then((response) => {
            setFieldOptions(response);
          });
        }
      });
    }
  }, [adAccounts, fieldType, reportType]);

  useEffect(() => {
    if (channel === ChannelType.GOOGLE && currentUser?.google_refresh_token) {
      setConnected(true);
    } else if (
      channel === ChannelType.FACEBOOK &&
      currentUser?.facebook_access_token
    ) {
      setConnected(true);
    } else if (
      channel === ChannelType.GOOGLE_ANALYTICS &&
      currentUser?.google_analytics_refresh_token
    ) {
      setConnected(true);
    } else if (
      channel === ChannelType.YOUTUBE &&
      currentUser?.youtube_refresh_token
    ) {
      setConnected(true);
    } else if (
      (channel === ChannelType.INSTAGRAM_MEDIA ||
        channel === ChannelType.INSTAGRAM_ACCOUNT) &&
      currentUser?.instagram_access_token
    ) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [currentUser, channel]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = RouterPath.LOGIN;
    } else {
      setToken(token);
      DefaultService.currentUserUserAuthCurrentUserGet(token).then(
        (response: User) => {
          setCurrentUser(response);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (channel === ChannelType.GOOGLE) {
      DefaultService.adAccountsConnectorGoogleAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error: any) => {
          if (error.status === 400) {
            const errorDetail: string = error.body.detail;
            if (errorDetail.includes("CUSTOMER_NOT_ENABLED")) {
              alert(
                "Error from Google Ads API: The account can't be accessed because it is not yet enabled or has been deactivated.\n\nPlease re-authenticate with an account that has an active Google Ads account associated.\n\nIf you think this is incorrect, please let us using the chat below. "
              );
              DefaultService.clearAccessTokenUserClearAccessTokenPost(
                token,
                ChannelType.GOOGLE
              );
              window.location.href = RouterPath.CONNECT;
            }
          } else {
            console.log(error);
          }
        });
    } else if (channel === ChannelType.FACEBOOK) {
      DefaultService.adAccountsConnectorFacebookAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      channel === ChannelType.INSTAGRAM_MEDIA ||
      channel === ChannelType.INSTAGRAM_ACCOUNT
    ) {
      DefaultService.adAccountsConnectorInstagramAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (channel === ChannelType.GOOGLE_ANALYTICS) {
      DefaultService.adAccountsConnectorGoogleAnalyticsAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error) => {
          if (error.status === 401) {
            // alert(
            //   "Google Analytics access token expired. Please connect again"
            // );
          } else {
            console.log(error);
          }
        });
    } else if (channel === ChannelType.YOUTUBE) {
      DefaultService.adAccountsConnectorYoutubeAdAccountsGet(token)
        .then((response: AdAccount[]) => {
          setAdAccounts((prev) => [...prev, ...response]);
        })
        .catch((error) => {
          if (error.status === 401) {
            // alert("Youtube access token expired. Please connect again");
          } else {
            console.log(error);
          }
        });
    }
  }, [channel]);

  useEffect(() => {
    // produce a list of DropDownOptions from the list of AdAccounts
    let options: DropDownOption[] = [];
    adAccounts.map((account) => {
      const option: DropDownOption = {
        id: account.id,
        name: account.name,
        img: account.img,
        ad_account_id: account.account_id,
      };
      options.push(option);
    });
    setDropDownOptions(options);
  }, [adAccounts]);

  const handleSelectOption = (selectedOption: DropDownOption) => {
    const selectedAccount = adAccounts.find(
      // Need to use an actual id field instead of ad_account_id
      (account) => account.account_id === selectedOption.ad_account_id
    );

    // Set the default reportType depending on the selectedAccount channel
    if (selectedAccount?.channel === ChannelType.GOOGLE) {
      setReportType(ReportType.STANDARD);
    } else if (selectedAccount?.channel === ChannelType.INSTAGRAM_MEDIA) {
      setReportType(ReportType.MEDIA);
    }

    setSelectedAdAccount(selectedAccount);
  };

  const handleAddDataSourceButtonClick = async () => {
    setIsLoading(true);
    // const startDateString = DateToString(startDate);
    // const endDateString = DateToString(endDate);

    if (currentUser && selectedAdAccount) {
      const dataSource = {
        name: uuidv4(),
        user: currentUser,
        fields: selectedOptions,
        adAccounts: [selectedAdAccount],
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      };
      DefaultService.addDataSourceQueryAddDataSourcePost(dataSource)
        .then((response: DataSourceInDB) => {
          DefaultService.connectDbQueryDataheraldConnectDbPost(
            response.id,
            response.db_schema
          );
          navigate(RouterPath.DATA_SOURCES);
        })
        .catch((error) => {
          setIsLoading(false);
          alert(
            "Could not add data source. Please change your fields and try again. Ensure that monetary fields are only used on accounts with active or previously active ads."
          );
        });
    }
  };

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        <div className="col-span-1">
          <SideBar currentUser={currentUser} />
        </div>
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 pb-10 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-2">Add Data Source</h1>
            <p className="mb-4 mt-0text-sm leading-5 text-gray-500">
              Select your ad accounts and choose the fields you want to import.
            </p>
            {channel && !connected && (
              <ChannelAuth
                channel={channel}
                currentUser={currentUser}
                connected={connected}
              />
            )}
            {connected &&
            dropDownOptions.length > 0 &&
            fieldOptions.length > 0 ? (
              <Dropdown
                options={dropDownOptions}
                onSelectOption={handleSelectOption}
              />
            ) : connected && timer < 10 ? (
              <p>Connecting...</p>
            ) : connected && timer >= 10 && adAccounts.length === 0 ? (
              <>
                <p>
                  If you see this, something went wrong. Please press the button
                  below to refresh the page.
                </p>
                <button
                  className="bg-teal-500 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center mt-2 mx-auto"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </button>
              </>
            ) : (
              <></>
            )}
            {selectedAdAccount && (
              <>
                {/* Render FieldList based on the toggle state */}
                {isFieldListVisible ? (
                  <>
                    <FieldList
                      fieldOptions={fieldOptions}
                      setFieldOptions={setFieldOptions}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      fieldType={fieldType}
                      setFieldType={setFieldType}
                    />
                    <button
                      onClick={() => setIsFieldListVisible(false)}
                      className="bg-teal-500 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                    >
                      <CheckCircleIcon className="inline h-6 w-6 mr-2" />
                      <span className="text-lg">Confirm</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="border border-teal-500 bg-teal-100 mb-6 p-4 flex flex-col items-center justify-center">
                      <h1 className="text-2xl font-bold mb-4">
                        Selected Fields
                      </h1>
                      <div className="flex justify-between space-x-20 items-start mb-6">
                        {selectedOptions.length > 0 && (
                          <>
                            <div className="text-center flex flex-col space-y-2">
                              <h3 className="text-xl font-semibold mb-3">
                                Metrics
                              </h3>
                              {selectedOptions.map((option) => {
                                if (option.type === FieldType.METRIC) {
                                  return (
                                    <div key={option.value} className="my-1">
                                      <p>{option.label}</p>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                            <div className="text-center flex flex-col space-y-2">
                              <h3 className="text-xl font-semibold mb-3">
                                Dimensions
                              </h3>
                              {selectedOptions.map((option) => {
                                if (option.type === FieldType.DIMENSION) {
                                  return (
                                    <div key={option.value} className="my-1">
                                      <p>{option.label}</p>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="button-container flex space-x-4">
                        <button
                          onClick={() =>
                            setIsFieldListVisible(!isFieldListVisible)
                          }
                          className="text-white bg-teal-500 hover:bg-teal-600 py-2 px-4 rounded transition duration-150 ease-in-out"
                        >
                          Edit Fields
                        </button>
                        {(channel == ChannelType.INSTAGRAM_MEDIA ||
                          channel == ChannelType.INSTAGRAM_ACCOUNT ||
                          ChannelType.GOOGLE) &&
                          channel &&
                          reportType && (
                            <ReportTypeModal
                              channel={channel}
                              reportType={reportType}
                              setReportType={setReportType}
                            />
                          )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddDataSourceButtonClick()}
                      className="bg-teal-500  hover:bg-teal-600  text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center  mx-auto"
                    >
                      <PlusCircleIcon className="inline h-6 w-6 mr-2" />
                      Add Data Source
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
