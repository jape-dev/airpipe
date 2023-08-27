import { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";
import { SideBar } from "../Components/SideBarV2";
import { GoogleConnectorV2 } from "../Components/GoogleConnectorV2";
import { GoogleAnalyticsConnector } from "../Components/GoogleAnalyticsConnector";
import { FacebookConnectorV2 } from "../Components/FacebookConnectorV2";

import { DefaultService } from "../vizoApi";
import { User, OnboardingStage } from "../vizoApi";
import { RouterPath } from "../App";
import { CustomModal } from "../Components/CustomModal";
import { XMarkIcon } from "@heroicons/react/20/solid";

export const Connect: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [modal, setModal] = useState(false);
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

  useEffect(() => {
    if (currentUser?.onboarding_stage == OnboardingStage.CONNECT) {
      if (
        currentUser?.facebook_access_token == null &&
        currentUser?.google_analytics_access_token == null &&
        currentUser?.google_access_token == null
      ) {
        setModal(true);
      } else {
        currentUser.onboarding_stage = OnboardingStage.COMPLETE;
        DefaultService.updateOnboardingStageUserUpdateOnboardingStagePost(
          currentUser
        );
        setModal(false);
      }
    }
  }, [currentUser]);

  return (
    <>
      <NavBar />
      <div className="h-screen grid grid-cols-7 gap-2 p-0">
        {!isMobile && (
          <div className="col-span-1">
            <SideBar />
          </div>
        )}
        <div className="col-span-6 justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mx-auto mt-10 my-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-1">Connectors</h1>
            <p className="mb-4 mt-0text-sm leading-5 text-gray-500">
              Get started by securely authenticating and connecting to your
              marketing channels.
            </p>
            <GoogleConnectorV2 currentUser={currentUser} />
            <FacebookConnectorV2 currentUser={currentUser} />
            <GoogleAnalyticsConnector currentUser={currentUser} />
          </div>
        </div>
      </div>
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <button
            className="ml-2 p-1 rounded-md text-gray-500 hover:text-gray-700 absolute top-0 right-0"
            onClick={() => setModal(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <p className="font-bold text-lg">Select a connector</p>
          <p className="mb-4 mt-0text-sm leading-5 text-gray-500">
            Connecting to your marketing channels is easy and secure. AirPipe
            never sends your channel data to any third party or AI model.
          </p>
          <button
            onClick={() => setModal(false)}
            className="bg-teal-500 text-white rounded-md px-4 py-2 h-8 flex items-center justify-center mt-4 mx-auto"
          >
            <span className="text-sm">Get started</span>
          </button>
        </>
      </CustomModal>
    </>
  );
};
