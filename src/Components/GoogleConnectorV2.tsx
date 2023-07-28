import { CustomModal } from "./CustomModal";
import { useState, useEffect } from "react";
import GoogleSignIn from "./GoogleSignInV2";
import { BaseConnector } from "./BaseConnector";
import { User } from "../vizoApi";

export const GoogleConnectorV2 = (props: { currentUser?: User }) => {
  const [modal, setModal] = useState(false);
  const [connected, setConnected] = useState(false);

  const openSignInModal = () => {
    setModal(true);
  };

  useEffect(() => {
    if (props.currentUser?.google_access_token) {
      setConnected(true);
    }
  });

  return (
    <>
      <BaseConnector
        title={"Google Ads"}
        imgPath={"google-ads-icon"}
        onConnect={openSignInModal}
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
