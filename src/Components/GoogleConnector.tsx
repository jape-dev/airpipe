export const GoogleConnector = () => {
  const onLinkAdsAccount = () => {
    const token = localStorage.getItem("googleToken");
    window.location.href = `http://localhost:8000/connector/google/auth?token=${token}`;
  };

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="666024859022-rq09jru86c64amvrlqhkom354jtmg2k8.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleGoogleLogin"
        data-itp_support="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
      <div>
        <button onClick={onLinkAdsAccount}>Link Google Ads Account</button>
      </div>
    </>
  );
};
