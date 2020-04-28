import React from "react";
import "./actionButton.css";
import Aux from "../../hoc/Aux";
const actionButton = ({
  edit,
  rate,
  view,
  userRecipes,
  remove,
  fridge,
  clicked,
}) => {
  const classes = ["toggle-info"];
  if (fridge) {
    classes.push("fridge");
  }

  if (rate) {
    classes.push("rate");
  }

  if (edit) {
    classes.push("favorite-edit");
  }

  if (remove) {
    if (userRecipes) {
      console.log("ayo");
      classes.push("all-alone");
    }
    classes.push("favorite-delete");
  }

  let mama;
  if (view) {
    mama = <i className="fas fa-eye"></i>;
  } else if (edit) {
    mama = <i className="fas fa-edit"></i>;
  } else if (rate) {
    mama = <i className="fas fa-star"></i>;
  } else {
    mama = (
      <Aux>
        <span className="left-card"></span>
        <span className="right-card"></span>
      </Aux>
    );
  }

  return (
    <button onClick={clicked} className={classes.join(" ")}>
      {mama}
    </button>
  );
};

export default actionButton;
