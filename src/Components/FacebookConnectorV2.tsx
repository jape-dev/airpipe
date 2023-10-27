import { useState, useEffect } from "react";
import { BaseConnector } from "./BaseConnector";
import { User, ChannelType } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { AddDataSourceState } from "../Screens/AddDataSource";

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

export const FacebookConnectorV2 = (props: { currentUser?: User }) => {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    const token = localStorage.getItem("token");
    const redirect_uri = DOMAIN_URL.replace("www.", "");
    window.location.href = `https://www.facebook.com/v17.0/dialog/oauth?client_id=3796703967222950&redirect_uri=${redirect_uri}/connector/facebook/login/&config_id=728465868571401&state=${token}`;
  };

  const onConnect = () => {
    const nextState: AddDataSourceState = {
      channel: ChannelType.FACEBOOK,
    };
    navigate(RouterPath.ADD_DATA_SOURCE, {
      state: nextState,
    });
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
        onConnect={onConnect}
        connected={connected}
      />
    </>
  );
};
