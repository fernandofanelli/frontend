import React from "react";
import Button from "../ui/Button";

import classes from "./CustomErrorModal.module.css";

const CustomErrorModal = ({ title, errMsg, onClick }) => {
  return (
    <div className={classes.errModal}>
      <h1>
        <u>
          <p>{title}</p>
        </u>
      </h1>
      <p>{errMsg}</p>
      <Button
        type="button"
        className={classes.actions}
        onClick={onClick}
        text="Close"
      />
    </div>
  );
};

export default CustomErrorModal;
