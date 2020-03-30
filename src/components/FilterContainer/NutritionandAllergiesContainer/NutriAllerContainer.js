import React from "react";
import "./NutriAllerContainer.css";
import TickMark from "./ClickedMark/ClickedMark";

const NutriAllerContainer = ({
  clicked,
  isNutrition,
  description,
  allergies,
  name,
  nutritions
}) => {
  return (
    <div onClick={clicked} className="filter-item">
      <h3
        className={`${
          allergies && allergies.includes(name) ? "allergy-clicked" : ""
        } filter-item-title`}
      >
        {name}
        {((allergies && allergies.includes(name)) || nutritions) && (
          <TickMark />
        )}
      </h3>
      {isNutrition && <p class="filter-item-desc">{description}</p>}
    </div>
  );
};

export default NutriAllerContainer;
