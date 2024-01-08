import { useState, useEffect } from "react";
import { BaseConnector } from "./BaseConnector";
import { User, ChannelType } from "../vizoApi";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";
import { AddDataSourceState } from "../Screens/AddDataSource";

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

export const InstagramConnector = (props: { currentUser?: User }) => {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);

  const onConnect = () => {
    const nextState: AddDataSourceState = {
      channel: ChannelType.INSTAGRAM,
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
        title={"Instagram Insights"}
        imgPath={"instagram-icon"}
        onConnect={onConnect}
        connected={connected}
      />
    </>
  );
};
