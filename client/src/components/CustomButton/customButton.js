import React from "react";
import "./customButton.css";
const customButton = ({ children, width, edit, rating, admin, ...rest }) => {
  const classes = ["main-button"];
  if (rest.type === "submit") {
    classes.push("submit");
  }
  if (edit) {
    classes.push("recipe-edit");
  }
  if (admin) {
    classes.push("admin-custom");
  }

  if (rating) {
    classes.push("rating-stars");
  }

  return (
    <button style={{ width }} className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default customButton;
