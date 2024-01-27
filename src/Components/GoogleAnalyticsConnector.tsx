import { CustomModal } from "./CustomModal";
import { useState, useEffect } from "react";
import { GoogleSignIn } from "./GoogleSignInV2";
import { BaseConnector } from "./BaseConnector";
import { User, ChannelType, OnboardingStage, DefaultService } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { AddDataSourceState } from "../Screens/AddDataSource";

export const GoogleAnalyticsConnector = (props: { currentUser?: User }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [connected, setConnected] = useState(false);

  const openSignInModal = () => {
    setModal(true);
  };

  const onConnect = () => {
    if (props.currentUser?.onboarding_stage === OnboardingStage.SIGNED_UP) {
      DefaultService.updateOnboardingStageUserUpdateOnboardingStagePost(
        OnboardingStage.CONNECTED,
        props.currentUser
      );
    }
    const nextState: AddDataSourceState = {
      channel: ChannelType.GOOGLE_ANALYTICS,
    };

    navigate(RouterPath.ADD_DATA_SOURCE, {
      state: nextState,
    });
  };

  useEffect(() => {
    if (props.currentUser?.google_analytics_refresh_token) {
      setConnected(true);
    }
  });

  return (
    <>
      <BaseConnector
        title={"Google Analytics"}
        imgPath={"google-analytics-icon"}
        onConnect={onConnect}
        connected={connected}
      />
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <GoogleSignIn channel_type={"google_analytics"} />
        </>
      </CustomModal>
    </>
  );
};
