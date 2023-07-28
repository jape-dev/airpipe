import { GoogleLogin } from "@react-oauth/google";

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

const GoogleSignIn = (props: { channel_type: string }) => {
  return (
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
  );
};
export default GoogleSignIn;
