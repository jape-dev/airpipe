import { CustomModal } from "./CustomModal";
import { useState, useEffect } from "react";
import GoogleSignIn from "./GoogleSignInV2";
import { BaseConnector } from "./BaseConnector";
import { User, ChannelType } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { AddDataSourceState } from "../Screens/AddDataSource";

export const YouTubeConnector = (props: { currentUser?: User }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [connected, setConnected] = useState(false);

  const openSignInModal = () => {
    setModal(true);
  };

  const onConnect = () => {
    const nextState: AddDataSourceState = {
      channel: ChannelType.YOUTUBE,
    };
    navigate(RouterPath.ADD_DATA_SOURCE, {
      state: nextState,
    });
  };

  useEffect(() => {
    if (props.currentUser?.youtube_refresh_token) {
      setConnected(true);
    }
  });

  return (
    <>
      <BaseConnector
        title={"YouTube"}
        imgPath={"youtube-icon"}
        onConnect={onConnect}
        connected={connected}
      />
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <GoogleSignIn channel_type={"youtube"} />
        </>
      </CustomModal>
    </>
  );
};
