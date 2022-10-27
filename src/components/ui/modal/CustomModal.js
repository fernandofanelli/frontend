import React from "react";
import Modal from "react-modal";
import { customModalStyles } from "../../../utils/customStyles";
import { Zoom } from "react-awesome-reveal";

const CustomModal = (props) => {
  return (
    <Modal
      isOpen
      ariaHideApp={false}
      style={customModalStyles}
      closeTimeoutMS={2000}
      onRequestClose={props.closed}
    >
      <Zoom>{props.children}</Zoom>
    </Modal>
  );
};

export default CustomModal;
