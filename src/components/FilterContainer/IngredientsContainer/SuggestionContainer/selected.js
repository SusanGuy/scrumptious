import React from "react";
import "./selected.css";
const selected = ({ ingredients }) => {
  return (
    <div className="chosen-ingredient-exclusions">
      {ingredients.map(({ _id, name }) => (
        <span key={_id} className="pill">
          <span className="delete-ingredient-suggested">
            <i className="fas fa-times"></i>
            {name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default selected;
