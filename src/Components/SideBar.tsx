import "../App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { CustomModal } from "../Components/CustomModal";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "../App";

export const SideBar = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleEmbedClick = () => {
    setModal(true);
  };

  const handleURLClick = () => {
    console.log("redirct to another url with randomly generated id");
    navigate(RouterPath.SHARE);
  };

  return (
    <>
      <Button
        className="required"
        sx={{ mt: "3vh", height: "8vh" }}
        onClick={handleEmbedClick}
      >
        SHARE AS EMBED
      </Button>
      <Button
        className="required"
        sx={{ mt: "3vh", height: "8vh" }}
        onClick={handleURLClick}
      >
        SHARE AS URL
      </Button>
      <CustomModal parentshow={modal} setParentShow={setModal}>
        <>
          <h4>Iframe will go here</h4>
          <Button className="multOpt" onClick={() => setModal(false)}>
            &#10006; Close
          </Button>
        </>
      </CustomModal>
    </>
  );
};
