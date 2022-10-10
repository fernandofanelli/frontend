import React from "react";

const FormInput = (props) => {
  return (
    <div className={props.className}>
      <label htmlFor={props.type}>{props.text}</label>
      <input type={props.type} id={props.type} required />
    </div>
  );
};

export default FormInput;
