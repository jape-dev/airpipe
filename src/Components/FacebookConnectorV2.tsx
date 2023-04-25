import { CustomModal } from "./CustomModal";
import { useState, useEffect } from "react";
import { BaseConnector } from "./BaseConnector";
import { User } from "../vizoApi";

const DOMAIN_URL = "http://localhost:8000";

export const FacebookConnectorV2 = (props: { currentUser?: User }) => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    const token = localStorage.getItem("token");
    window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=3796703967222950&redirect_uri=${DOMAIN_URL}/connector/facebook/login/&config_id=728465868571401&state=${token}`;
  };

  useEffect(() => {
    if (props.currentUser?.facebook_access_token) {
      setConnected(true);
    }
  });

  return (
    <>
      <BaseConnector
        title={"Facebook Ads"}
        imgPath={"facebook-icon"}
        onConnect={handleConnect}
        connected={connected}
      />
    </>
  );
};
