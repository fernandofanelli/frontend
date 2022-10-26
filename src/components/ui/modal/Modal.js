import React from "react";
import Button from "../Button";

import classes from "./Modal.module.css";

const Modal = ({ label, message, show, closed }) => {
  const cssClasses = [
    classes.modal,
    show ? classes.modalOpen : classes.modalClosed,
  ];

  return (
    <div className={cssClasses.join(" ")}>
      <h1>{label}</h1>
      <p>{message}</p>
      <Button type="button" className={classes.button} onClick={closed}>
        Close
      </Button>
    </div>
  );
};

export default Modal;
