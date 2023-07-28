import React, { useState, useEffect } from "react";
import Modal from "react-overlays/Modal";
import styled from "styled-components";

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.3;
`;

const CenteredModal = styled(Modal)`
  position: absolute;
  width: 400px;
  z-index: 1040;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column; /* Added this */
  align-items: center; /* Added this */
  justify-content: center; /* Added this */
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  text-align: center;
  border-radius: 5px;
`;

export function CustomModal({
  parentshow,
  setParentShow,
  children,
}: {
  parentshow: boolean;
  setParentShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}) {
  const [show, setShow] = useState(parentshow);

  useEffect(() => {
    setShow(parentshow);
  }, [parentshow]);

  const onHide = () => {
    setShow(false);
    setParentShow(false);
  };

  const renderBackdrop = () => <Backdrop />;

  return (
    <div>
      <CenteredModal
        show={show}
        onHide={onHide}
        renderBackdrop={renderBackdrop}
      >
        {children}
      </CenteredModal>
    </div>
  );
}
