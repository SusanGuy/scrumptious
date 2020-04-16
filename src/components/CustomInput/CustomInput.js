import React from "react";
import "./CustomInput.css";
const CustomInput = ({ children, ...rest }) => {
  const classes = ["custom-input"];
  if (rest.disabled) {
    classes.push("disabled");
  }
  return (
    <label className="custom-label">
      <span>{children}</span>
      <input className={classes.join(" ")} {...rest} />
    </label>
  );
};

export default CustomInput;
