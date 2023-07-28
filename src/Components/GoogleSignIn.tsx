import { channel } from "diagnostics_channel";
import { useRef, useEffect } from "react";
declare const google: any;

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const tokenLog = localStorage.getItem("token");

const GoogleSignIn = (props: { channel_type: string }) => {
  const g_sso = useRef(null);

  useEffect(() => {
    if (g_sso.current) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (res: any) => {
          localStorage.setItem("googleToken", res.credential);
          const token = localStorage.getItem("token");
          window.location.href = `${DOMAIN_URL}/connector/google/auth?token=${token}&googleToken=${res.credential}&channel=${props.channel_type}`;
        },
      });
      google.accounts.id.renderButton(g_sso.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        text: "signin_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: "220",
      });
    }
  }, [g_sso.current]);

  return <div ref={g_sso} />;
};

export default GoogleSignIn;
