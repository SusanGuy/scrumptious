import React from "react";
import "./authButton.css";
const authButton = ({ signout, admin, children, save, ...rest }) => {
  const classes = ["sign-in"];
  if (signout) {
    classes.push("sign-out");
  }

  if (admin) {
    classes.push("admin");
  }
  if (save) {
    classes.push("save");
  }
  return (
    <button className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default authButton;
