import React from "react";

const FormInput = ({ className, type, text, innerRef }) => {
  return (
    <div className={className}>
      <label htmlFor={type}>{text}</label>
      <input type={type} id={type} required ref={innerRef} />
    </div>
  );
};

export default FormInput;
