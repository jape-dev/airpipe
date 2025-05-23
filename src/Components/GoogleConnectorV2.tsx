import { CustomModal } from "./CustomModal";
import { useState, useEffect } from "react";
import { GoogleSignIn } from "./GoogleSignInV2";
import { BaseConnector } from "./BaseConnector";
import { User, ChannelType, DefaultService, OnboardingStage } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { AddDataSourceState } from "../Screens/AddDataSource";

export const GoogleConnectorV2 = (props: { currentUser?: User }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [connected, setConnected] = useState(false);

  const openSignInModal = () => {
    setModal(true);
  };

  const onConnect = () => {
    const nextState: AddDataSourceState = {
      channel: ChannelType.GOOGLE,
    };
    if (props.currentUser?.onboarding_stage === OnboardingStage.SIGNED_UP) {
      DefaultService.updateOnboardingStageUserUpdateOnboardingStagePost(
        OnboardingStage.CONNECTED,
        props.currentUser
      );
    }
    navigate(RouterPath.ADD_DATA_SOURCE, {
      state: nextState,
    });
  };

  useEffect(() => {
    if (props.currentUser?.google_refresh_token) {
      setConnected(true);
    }
  });

  return (
    <>
      <BaseConnector
        title={"Google Ads"}
        imgPath={"google-ads-icon"}
        onConnect={onConnect}
        connected={connected}
      />
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <GoogleSignIn channel_type={"google"} />
        </>
      </CustomModal>
    </>
  );
};
