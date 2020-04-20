import React from "react";
import "./actionButton.css";
import Aux from "../../hoc/Aux";
const actionButton = ({ edit, remove, fridge, clicked }) => {
  const classes = ["toggle-info"];
  if (fridge) {
    classes.push("fridge");
  }

  if (edit) {
    classes.push("favorite-edit");
  }

  if (remove) {
    classes.push("favorite-delete");
  }
  return (
    <button onClick={clicked} className={classes.join(" ")}>
      {edit ? (
        <i className="fas fa-edit"></i>
      ) : (
        <Aux>
          <span className="left-card"></span>
          <span className="right-card"></span>
        </Aux>
      )}
    </button>
  );
};

export default actionButton;
