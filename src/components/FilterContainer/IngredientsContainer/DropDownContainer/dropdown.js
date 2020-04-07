import React from "react";
import "./dropdown.css";
const dropdown = ({ ingredients }) => {
  return (
    <div className="suggestion-container">
      {ingredients.map(({ _id, name }) => (
        <div key={_id} className="inner-suggestion">
          <div className="checkbox-group">{name}</div>
        </div>
      ))}
    </div>
  );
};

export default dropdown;
