import React from "react";
import "./CustomInput.css";
const CustomInput = ({ children, ingro, ...rest }) => {
  const classes = ["custom-input"];
  if (rest.disabled) {
    classes.push("disabled");
  }

  const labelClasses = ["no-children"];
  if (ingro) {
    labelClasses.push("ingro-children");
  }

  const input = children ? (
    <label className="custom-label">
      <span>{children}</span>
      <input className={classes.join(" ")} {...rest} />
    </label>
  ) : (
    <div className={labelClasses.join(" ")}>
      <input className={classes.join(" ")} {...rest} />
    </div>
  );

  return input;
};

export default CustomInput;
