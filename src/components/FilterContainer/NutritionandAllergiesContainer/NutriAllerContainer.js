import React from "react";
import "./NutriAllerContainer.css";
import TickMark from "./ClickedMark/ClickedMark";

const NutriAllerContainer = ({
  clicked,
  nutrition,
  description,
  allergies,
  name
}) => {
  return (
    <div onClick={clicked} className="filter-item">
      <h3
        className={`${
          allergies.includes(name) ? "allergy-clicked" : ""
        } filter-item-title`}
      >
        {name}
        {allergies.includes(name) && <TickMark />}
      </h3>
      {nutrition && <p class="filter-item-desc">{description}</p>}
    </div>
  );
};

export default NutriAllerContainer;
