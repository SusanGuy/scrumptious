import React from "react";
import "./authButton.css";
const authButton = ({ signout, children, ...rest }) => {
  const classes = ["sign-in"];
  if (signout) {
    classes.push("sign-out");
  }
  return (
    <button className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default authButton;
