import React from "react";

const FormInput = ({ className, type, text, innerRef, maxLength = "30" }) => {
  return (
    <div className={className}>
      <label htmlFor={type}>{text}</label>
      <input
        type={type}
        id={type}
        required
        ref={innerRef}
        maxLength={maxLength}
      />
    </div>
  );
};

export default FormInput;
