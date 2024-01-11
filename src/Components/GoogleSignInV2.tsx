import { GoogleLogin } from "@react-oauth/google";
import { ChannelType } from "../vizoApi";
import { getIconUrl } from "../Utils/image";

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

export const GoogleSignIn = (props: { channel_type: string }) => {
  const handleYouTubeClick = () => {
    localStorage.setItem("googleToken", "abc123");
    const token = localStorage.getItem("token");
    window.location.href = `${DOMAIN_URL}/connector/google/auth?token=${token}&googleToken=abc123&channel=${props.channel_type}`;
  };

  return (
    <>
      {props.channel_type === ChannelType.YOUTUBE ? (
        <button
          className="rounded-md h-12 w-50 border border-gray-300 flex items-center justify-center overflow-hidden p-3"
          onClick={() => handleYouTubeClick()}
        >
          <p className="text-xs">Get Started</p>{" "}
          {/* Adjust the text size and add margin */}
          <img src={getIconUrl("developed-with-youtube")} className="h-16" />
        </button>
      ) : (
        <GoogleLogin
          onSuccess={(res: any) => {
            localStorage.setItem("googleToken", res.credential);
            const token = localStorage.getItem("token");
            window.location.href = `${DOMAIN_URL}/connector/google/auth?token=${token}&googleToken=${res.credential}&channel=${props.channel_type}`;
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </>
  );
};
