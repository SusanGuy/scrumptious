import React from "react";
import "./CustomInput.css";
const CustomInput = ({ children, ...rest }) => {
  return (
    <label className="custom-label">
      <span>{children}</span>
      <input className="custom-input" {...rest} />
    </label>
  );
};

export default CustomInput;
