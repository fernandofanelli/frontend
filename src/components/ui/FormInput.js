import React from "react";

const FormInput = ({ className, type, text, innerRef, maxLength = "30", value = "" }) => {
  return (
    <div className={className}>
      <label htmlFor={type}>{text}</label>
      <input
        type={type}
        id={type}
        required
        ref={innerRef}
        maxLength={maxLength}
        //value={value}
      />
    </div>
  );
};

export default FormInput;
