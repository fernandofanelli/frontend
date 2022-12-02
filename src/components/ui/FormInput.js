import React from "react";

const FormInput = ({
  className,
  type,
  text,
  innerRef,
  maxLength = "30",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <label htmlFor={type}>{text}</label>
      <input
        type={type}
        id={type}
        required
        ref={innerRef}
        maxLength={maxLength}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
