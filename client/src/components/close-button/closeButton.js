import React from "react";
import "./closeButton.css";
const closeButton = ({ passwordChange, ...rest }) => {
  const classes = ["custom-close-button"];
  if (passwordChange) {
    classes.push("passwordchange-close-button");
  }
  return (
    <button {...rest} className={classes.join(" ")}>
      +
    </button>
  );
};

export default closeButton;
