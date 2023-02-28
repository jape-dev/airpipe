import { CustomModal } from "./CustomModal";
import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";

const DOMAIN_URL =
  process.env.REACT_APP_DOMAIN_URL || "https://airpipe-api.onrender.com";

export const GoogleConnector = () => {
  const [modal, setModal] = useState(false);

  const openSignInModal = () => {
    setModal(true);
  };

  return (
    <>
      <div>
        <button onClick={openSignInModal}>Sign in with google</button>
      </div>
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <GoogleSignIn />
        </>
      </CustomModal>
    </>
  );
};
