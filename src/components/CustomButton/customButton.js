import React from "react";
import "./customButton.css";
const customButton = ({ children, width, rating, ...rest }) => {
  const classes = ["main-button"];
  if (rest.type === "submit") {
    classes.push("submit");
  }
  if (rest.edit) {
    classes.push("recipe-edit");
  }

  if (rating) {
    classes.push("rating-stars");
  }

  return (
    <button style={{ width }} className={classes.join(" ")} {...rest}>
      {rest.facebook && <i className="fab fa-facebook-f"></i>}

      {children}
    </button>
  );
};

export default customButton;
