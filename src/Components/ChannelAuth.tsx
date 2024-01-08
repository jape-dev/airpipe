import React, { useEffect, useState } from "react";
import { ChannelType, User } from "../vizoApi";
import GoogleSignIn from "../Components/GoogleSignInV2";

interface ChannelAuthProps {
  channel: ChannelType;
  currentUser?: User;
  connected: boolean;
}

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

export const ChannelAuth: React.FC<ChannelAuthProps> = ({ channel }) => {
  useEffect(() => {});
  const handleConnect = () => {
    const token = localStorage.getItem("token");
    const redirect_uri = DOMAIN_URL.replace("www.", "");
    window.location.href = `https://www.facebook.com/v17.0/dialog/oauth?client_id=3796703967222950&redirect_uri=${redirect_uri}/connector/facebook/login/&config_id=728465868571401&state=${token}&channel=${channel}`;
  };

  return (
    <>
      {channel === ChannelType.GOOGLE_ANALYTICS ||
      channel === ChannelType.GOOGLE ||
      channel === ChannelType.YOUTUBE ? (
        <GoogleSignIn channel_type={channel} />
      ) : (
        <button
          onClick={() => handleConnect()}
          className="bg-teal-500 text-white rounded-md px-4 py-2 h-16 w-60 mb-5 flex items-center justify-center mx-auto"
        >
          <span className="text-lg">Connect to Meta</span>
        </button>
      )}
    </>
  );
};
