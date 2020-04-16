import React from "react";
import "./actionButton.css";
const actionButton = ({ remove, children, ...rest }) => {
  const classes = ["action-button"];
  if (remove) {
    classes.push("delete");
  }
  return (
    <button className={classes.join(" ")} {...rest}>
      <strong className="strong">{children}</strong>
    </button>
  );
};

export default actionButton;
