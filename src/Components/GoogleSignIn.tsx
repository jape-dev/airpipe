import { useRef, useEffect } from "react";
declare const google: any;

const DOMAIN_URL = process.env.REACT_APP_DOMAIN_URL || "http://localhost:8000";

const GoogleSignIn = () => {
  const g_sso = useRef(null);

  useEffect(() => {
    if (g_sso.current) {
      google.accounts.id.initialize({
        client_id:
          "666024859022-rq09jru86c64amvrlqhkom354jtmg2k8.apps.googleusercontent.com",
        callback: (res: any) => {
          console.log("setting google access token");
          localStorage.setItem("googleToken", res.credential);
          const token = localStorage.getItem("token");
          window.location.href = `${DOMAIN_URL}/connector/google/auth?token=${token}&googleToken=${res.credential}`;
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
